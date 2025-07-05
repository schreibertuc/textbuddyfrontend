// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wgbldbyohrxjdlkglryp.supabase.co'; // replace
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnYmxkYnlvaHJ4amRsa2dscnlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MzkyNDksImV4cCI6MjA2NzMxNTI0OX0.g839T_i_CJq66GvUXZHTgq7n_f6kqe58-tnvhtYXydY'; // replace

export const supabase = createClient(supabaseUrl, supabaseKey);
