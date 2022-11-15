import { createClient } from '@supabase/supabase-js';
import { environmentCheck } from 'utils/envVariablesCheck';

environmentCheck();

const client = createClient(
  process.env.SUPABASE_URL ?? 'Undefined-Variable',
  process.env.SUPABASE_KEY ?? 'Undefined-Variable'
);

export { client };
