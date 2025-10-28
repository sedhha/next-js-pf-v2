// lib/openai-service.ts
import OpenAI from 'openai';
import type { Stream } from 'openai/streaming';
import type { ChatCompletionChunk } from 'openai/resources/chat/completions';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

/**
 * Count approximate tokens in text (rough estimate)
 */
function estimateTokens(text: string): number {
	return Math.ceil(text.length / 4);
}

/**
 * Filter chat history to fit within token limit
 */
function filterHistoryByTokens(
	history: Array<{ role: 'user' | 'assistant'; content: string }>,
	maxTokens: number = 2000
): Array<{ role: 'user' | 'assistant'; content: string }> {
	let totalTokens = 0;
	const filtered = [];

	for (let i = history.length - 1; i >= 0; i--) {
		const message = history[i];
		const messageTokens = estimateTokens(message.content);

		if (totalTokens + messageTokens <= maxTokens) {
			filtered.unshift(message);
			totalTokens += messageTokens;
		} else {
			break;
		}
	}

	return filtered;
}

export const chatWithPersona = async (
	userMessage: string,
	personaContext: string,
	systemPrompt: string,
	chatHistory: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<Stream<ChatCompletionChunk>> => {
	const finalSystemPrompt = `${systemPrompt}
	**Personal Context:**
	${personaContext}`;

	const filteredHistory = filterHistoryByTokens(chatHistory, 2000);

	const messages = [
		...filteredHistory.map((msg) => ({
			role: msg.role as 'user' | 'assistant',
			content: msg.content
		})),
		{
			role: 'user' as const,
			content: userMessage
		}
	];

	return openai.chat.completions.create({
		model: 'gpt-4o-mini',
		messages: [
			{
				role: 'system',
				content: finalSystemPrompt
			},
			...messages
		],
		temperature: 0.85,
		max_tokens: 256,
		top_p: 0.95,
		stream: true
	});
};
