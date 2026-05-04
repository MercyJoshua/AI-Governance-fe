import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://jbnbbbddcotpivdqeffq.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImMxYWUzYWYyLTBlYWItNGQyZS1hNGEyLWRjZmE4YjQwZTVjOCJ9.eyJwcm9qZWN0SWQiOiJqYm5iYmJkZGNvdHBpdmRxZWZmcSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc3Njc0NjE2LCJleHAiOjIwOTMwMzQ2MTYsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.NtSvYgRZpw_rmh3YZJw_0Y7Wv2995S2YY5nVhMfExE8';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };