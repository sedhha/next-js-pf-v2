import admin from '@/backend/supabase/client';

const TABLE = 'contact_forms';

export async function createContactDraft() {
	const { data, error } = await admin
		.from(TABLE)
		.insert({})
		.select('uuid')
		.single();
	if (error) throw error;
	return data.uuid as string;
}

type ContactUpdate = {
	name: string;
	email: string;
	subject: string;
	description: string;
};

export async function updateContactByUuid(uuid: string, fields: ContactUpdate) {
	const { data, error } = await admin
		.from(TABLE)
		.update(fields)
		.eq('uuid', uuid)
		.select('uuid')
		.single();

	if (error) return { error: true, message: error.message };
	return { error: false, message: data.uuid as string };
}
