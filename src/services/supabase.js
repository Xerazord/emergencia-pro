/* ─── Supabase Client & Configuração ─── */
// ─── Supabase config ───────────────────────────────────────────────────────
const SUPABASE_URL = 'https://vysgohdcvtresrszvdft.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5c2dvaGRjdnRyZXNyc3p2ZGZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMjE2NzUsImV4cCI6MjA5MzY5NzY3NX0.XpgRd1RYp6ej_uwcBLEBOvGyAFqcT32_oy1P1MqVHm8';
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
