// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache, revalidateTag } from 'next/cache';
import {
	withAuthHeaders,
	AuthContext
} from '@/backend/auth/birthday-middleware';
import { pullConfigByUserId } from '@/backend/supabase/birthday-config';
import { searchInCollection } from '@/backend/qdrant/client';
import { chatWithPersona } from '@/backend/digital_clone/groq_llama';
import {
	saveChatMessage,
	getRecentChatMessages,
	getAllChatMessages
} from '@/backend/supabase/chat-manager';

// Cache the Supabase config fetch per user
const getCachedPersonaConfig = unstable_cache(
	async (userId: string) => pullConfigByUserId(userId),
	['persona-config'],
	{ revalidate: 3600, tags: ['persona-config'] }
);

async function chatHandler(
	req: NextRequest,
	auth: AuthContext
): Promise<NextResponse> {
	try {
		const { message } = await req.json();

		if (!message) {
			return NextResponse.json({ error: 'Missing message' }, { status: 400 });
		}

		// Get user ID from token_id (injected by middleware)
		const userId = auth.payload.token_id;

		console.log(`[Chat] Processing message for user: ${userId}`);

		// Get persona config from Supabase (will be cached)
		const config = await getCachedPersonaConfig(userId);

		if (!config) {
			return NextResponse.json(
				{ error: 'Persona configuration not found' },
				{ status: 404 }
			);
		}

		if (!config.qdrant_colection_name || !config.system_prompt) {
			return NextResponse.json(
				{ error: 'Invalid persona configuration' },
				{ status: 400 }
			);
		}

		// Save user message
		await saveChatMessage(userId, 'user', message);

		// Get recent chat history (last 100 messages)
		let chatHistory = await getRecentChatMessages(userId, 100);

		// If no chat history exists, prepend initial message from assistant
		if (chatHistory.length === 0 && config.initial_message) {
			chatHistory = [
				{
					id: '',
					user_id: userId,
					role: 'assistant',
					content: config.initial_message,
					created_at: new Date().toISOString()
				},
				...chatHistory
			];
		}

		// Search vector database for context
		const searchResults = await searchInCollection(
			message,
			config.qdrant_colection_name
		);

		const personaContext = searchResults
			.slice(0, 5)
			.map((r: any) => r.payload?.text)
			.join('\n');

		// Get stream from Groq
		const stream = await chatWithPersona(
			message,
			personaContext,
			config.system_prompt,
			chatHistory.map((msg) => ({
				role: msg.role,
				content: msg.content
			}))
		);

		// Create a ReadableStream for streaming response
		const responseStream = new ReadableStream({
			async start(controller) {
				let fullResponse = '';

				try {
					for await (const chunk of stream) {
						const content = chunk.choices[0]?.delta?.content || '';
						if (content) {
							fullResponse += content;
							controller.enqueue(
								new TextEncoder().encode(
									`data: ${JSON.stringify({ chunk: content })}\n\n`
								)
							);
						}
					}

					// Save assistant message after streaming completes
					await saveChatMessage(userId, 'assistant', fullResponse);

					controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
					controller.close();
				} catch (error) {
					console.error('Stream error:', error);
					controller.error(error);
				}
			}
		});

		return new NextResponse(responseStream, {
			headers: {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				'Connection': 'keep-alive'
			}
		});
	} catch (error) {
		console.error('Chat error:', error);
		return NextResponse.json(
			{ error: 'Failed to generate response' },
			{ status: 500 }
		);
	}
}

async function getHandler(
	req: NextRequest,
	auth: AuthContext
): Promise<NextResponse> {
	try {
		const userId = auth.payload.token_id;

		console.log(`[Chat History] Fetching history for user: ${userId}`);

		const config = await getCachedPersonaConfig(userId);
		let messages = await getAllChatMessages(userId);

		// Always prepend initial message if it exists
		if (config?.initial_message) {
			messages = [
				{
					id: '',
					user_id: userId,
					role: 'assistant',
					content: config.initial_message,
					created_at: new Date().toISOString()
				},
				...messages
			];
		}

		return NextResponse.json({
			success: true,
			messages,
			count: messages.length
		});
	} catch (error) {
		console.error('History error:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch chat history' },
			{ status: 500 }
		);
	}
}

// Create a revalidation endpoint
async function revalidateHandler(
	// eslint-disable-next-line no-unused-vars
	req: NextRequest
): Promise<NextResponse> {
	try {
		// Revalidate the cache tag
		revalidateTag('persona-config');

		return NextResponse.json({
			success: true,
			message: 'Cache revalidated successfully'
		});
	} catch (error) {
		console.error('Revalidation error:', error);
		return NextResponse.json(
			{ error: 'Failed to revalidate cache' },
			{ status: 500 }
		);
	}
}

export const POST = withAuthHeaders(chatHandler);
export const GET = withAuthHeaders(getHandler);
export const PATCH = revalidateHandler;
