import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eklmksyuzhiwbdtnyzms.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrbG1rc3l1emhpd2JkdG55em1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4ODgwODgsImV4cCI6MjA3MjQ2NDA4OH0.mRgtiHmDODQ494tjB24oTW4DRWAKdEWNtdqpRFVAZug'

export const supabase = createClient(supabaseUrl, supabaseKey)