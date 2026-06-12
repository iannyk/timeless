import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ktzvzdqodmvpherqwzlb.supabase.co'
const SUPABASE_KEY = 'sb_publishable_U9NBcZlsYFuGS2EiAv1xCg_jeATsLDj'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)