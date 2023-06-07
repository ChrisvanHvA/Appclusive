// import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
dotenv.config();

// const supabaseUrl = process.env.SUPABASE_KEY;
// const supabaseKey = process.env.SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL
const sql = postgres(connectionString)

export default sql

