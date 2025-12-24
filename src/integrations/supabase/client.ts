import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = 'https://jamftlvwvvkixefimiya.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphbWZ0bHZ3dnZraXhlZmltaXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MTg4MjYsImV4cCI6MjA2MjM5NDgyNn0.IyOXdVAA4bR7qUMVE51uYw_C56oYVv8';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
