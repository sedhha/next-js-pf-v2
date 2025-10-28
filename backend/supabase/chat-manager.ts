// lib/supabase/chat-manager.ts
import admin from '@/backend/supabase/client';

const TABLE = 'chat_messages';

export interface ChatMessage {
	id: string;
	user_id: string;
	role: 'user' | 'assistant';
	content: string;
	created_at: string;
}

/**
 * Clean up messages older than 30 days
 */
async function cleanupOldMessages(): Promise<void> {
	try {
		const thirtyDaysAgo = new Date(
			Date.now() - 30 * 24 * 60 * 60 * 1000
		).toISOString();

		const { error } = await admin
			.from(TABLE)
			.delete()
			.lt('created_at', thirtyDaysAgo);

		if (error) throw error;

		console.log('[Chat Manager] Cleaned up messages older than 30 days');
	} catch (error) {
		console.error('[Supabase Error] Failed to cleanup old messages:', error);
	}
}

/**
 * Store a chat message
 */
export async function saveChatMessage(
	userId: string,
	role: 'user' | 'assistant',
	content: string
): Promise<ChatMessage> {
	try {
		// Cleanup old messages periodically
		await cleanupOldMessages();

		const { data, error } = await admin
			.from(TABLE)
			.insert({
				user_id: userId,
				role,
				content
			})
			.select()
			.single();

		if (error) throw error;

		return data as ChatMessage;
	} catch (error) {
		console.error('[Supabase Error] Failed to save chat message:', error);
		throw error;
	}
}

/**
 * Get recent chat messages (up to last N messages)
 */
export async function getRecentChatMessages(
	userId: string,
	limit: number = 100
): Promise<ChatMessage[]> {
	try {
		const { data, error } = await admin
			.from(TABLE)
			.select('*')
			.eq('user_id', userId)
			.order('created_at', { ascending: false })
			.limit(limit);

		if (error) throw error;

		// Reverse to get chronological order
		return (data as ChatMessage[]).reverse();
	} catch (error) {
		console.error('[Supabase Error] Failed to get recent chat messages:', error);
		throw error;
	}
}

/**
 * Get all chat messages for a user
 */
export async function getAllChatMessages(
	userId: string
): Promise<ChatMessage[]> {
	try {
		const { data, error } = await admin
			.from(TABLE)
			.select('*')
			.eq('user_id', userId)
			.order('created_at', { ascending: true });

		if (error) throw error;

		return data as ChatMessage[];
	} catch (error) {
		console.error('[Supabase Error] Failed to get all chat messages:', error);
		throw error;
	}
}

/**
 * Delete all chat messages for a user
 */
export async function clearChatHistory(userId: string): Promise<boolean> {
	try {
		const { error } = await admin.from(TABLE).delete().eq('user_id', userId);

		if (error) throw error;

		console.log(`[Chat Manager] Cleared chat history for user: ${userId}`);
		return true;
	} catch (error) {
		console.error('[Supabase Error] Failed to clear chat history:', error);
		throw error;
	}
}
