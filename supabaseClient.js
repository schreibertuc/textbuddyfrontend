// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project.supabase.co'; // replace
const supabaseKey = 'your-anon-key'; // replace

export const supabase = createClient(supabaseUrl, supabaseKey);
