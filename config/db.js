import dotenv from 'dotenv';
dotenv.config();

import postgres from 'postgres';
import { createClient } from '@supabase/supabase-js';

const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString);

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
    { auth: { persistSession: false } }
);

export default sql;
export { supabase };