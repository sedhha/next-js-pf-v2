import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_SERVICE_ROLE) {
	throw new Error('Missing SUPABASE_SERVICE_ROLE env variable');
}

if (!process.env.SUPABASE_PROJECT_ID) {
	throw new Error('Missing SUPABASE_PROJECT_ID env variable');
}

const admin = createClient(
	`https://${process.env.SUPABASE_PROJECT_ID}.supabase.co`,
	process.env.SUPABASE_SERVICE_ROLE
);

export default admin;
