import { QdrantClient } from '@qdrant/js-client-rest';

export const client = new QdrantClient({
	url: process.env.QDRANT_URL,
	apiKey: process.env.QDRANT_API_KEY
});

const generateEmbedding = async (text: string): Promise<number[]> => {
	const response = await fetch('https://api.openai.com/v1/embeddings', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			model: process.env.OPENAI_EMBED_MODEL || 'text-embedding-3-small',
			input: text,
			encoding_format: 'float'
		})
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(
			`OpenAI API error: ${error.error?.message || 'Unknown error'}`
		);
	}

	const data = await response.json();
	return data.data[0].embedding;
};

export const searchInCollection = async (
	userQuestion: string,
	personaSpecificCollection: string
) => {
	const genericCollectionName =
		process.env.QDRANT_GENERIC_COLLECTION_NAME || 'general_persona';

	// Generate embedding for the question
	const queryEmbedding = await generateEmbedding(userQuestion);

	// Search in both collections
	const [genericResults, specificResults] = await Promise.all([
		client.search(genericCollectionName, {
			vector: queryEmbedding,
			limit: 10,
			score_threshold: 0.4
		}),
		client.search(personaSpecificCollection, {
			vector: queryEmbedding,
			limit: 10,
			score_threshold: 0.4
		})
	]);

	// Apply weights and combine results
	const weightedResults = [
		...genericResults.map((result) => ({
			...result,
			score: (result.score || 0) * 0.3,
			source: 'generic'
		})),
		...specificResults.map((result) => ({
			...result,
			score: (result.score || 0) * 0.7,
			source: 'specific'
		}))
	];

	// Sort by weighted score descending
	weightedResults.sort((a, b) => b.score - a.score);

	return weightedResults;
};
