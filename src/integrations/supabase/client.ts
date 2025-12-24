import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = 'https://jamftlvwvvkixefimiya.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphbWZ0bHZ3dnZraXhlZmltaXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0OTg4NDMsImV4cCI6MjA4MjA3NDg0M30.cLl33qoCTthOvqwGu7-KCKjpzGC2fsQWpucl-ivjNqo';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
