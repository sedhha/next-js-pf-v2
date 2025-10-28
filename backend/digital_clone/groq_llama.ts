// lib/groq-service.ts
import { Groq } from 'groq-sdk';
import type { ChatCompletionMessageParam } from 'groq-sdk/resources/chat/completions';

const groq = new Groq({
	apiKey: process.env.GROQ_API_KEY
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

	// Go backwards through history to keep most recent messages
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
) => {
	const finalSystemPrompt = `${systemPrompt}

**Personal Context:**
${personaContext}`;

	// Filter history to fit token limit (keep last ~2000 tokens of history)
	const filteredHistory = filterHistoryByTokens(chatHistory, 2000);

	// Build messages array with filtered history
	const messages: ChatCompletionMessageParam[] = [
		...filteredHistory.map((msg) => ({
			role: msg.role as 'user' | 'assistant',
			content: msg.content
		})),
		{
			role: 'user' as const,
			content: userMessage
		}
	];

	const chatCompletion = await groq.chat.completions.create({
		messages: [
			{
				role: 'system',
				content: finalSystemPrompt
			},
			...messages
		],
		model: 'openai/gpt-oss-120b', //'llama-3.3-70b-versatile',
		temperature: 0.85,
		max_completion_tokens: 256,
		top_p: 0.95,
		stream: true,
		stop: null
	});

	return chatCompletion;
};
