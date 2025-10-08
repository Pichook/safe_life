import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://umjmsywbmbgyozdpxbqx.supabase.co"
const supabasePublishableKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtam1zeXdibWJneW96ZHB4YnF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3ODU3MTIsImV4cCI6MjA3NTM2MTcxMn0.285JOPcTJgYrIyUtLVytEwWbA2XAPIWjMm1qU5_P78c"

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})