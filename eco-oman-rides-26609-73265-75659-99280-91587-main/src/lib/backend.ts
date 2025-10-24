import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://frrbtqxfzrvmrbamkfsc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZycmJ0cXhmenJ2bXJiYW1rZnNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MzE2OTcsImV4cCI6MjA3NjAwNzY5N30.uCmsONAhqmyJaI1pfP0n_nneo3N5XASKPHkByjldWgI'; // Get from Supabase Settings > API

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const auth = {
  signup: async (email: string, password: string, name: string, role: string, phone?: string) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
      if (authError) throw authError;

      const { error: profileError } = await supabase.from('users').insert([{
        id: authData.user?.id,
        email,
        name,
        role,
        phone: phone || '',
      }]);
      
      if (profileError) throw profileError;
      return { success: true, data: authData };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  login: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
  },

  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  getProfile: async (userId: string) => {
    const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
    return { data, error };
  },
};

export const rides = {
  search: async (from?: string, to?: string, date?: string) => {
    let query = supabase.from('rides').select(`*, driver:users!driver_id(name, rating, phone)`)
      .eq('status', 'scheduled').gt('seats_available', 0);

    if (from) query = query.ilike('from_location', `%${from}%`);
    if (to) query = query.ilike('to_location', `%${to}%`);
    if (date) query = query.eq('date', date);

    const { data, error } = await query;
    return { data, error };
  },

  create: async (rideData: any) => {
    const user = await auth.getCurrentUser();
    const { data, error } = await supabase.from('rides').insert([{
      driver_id: user?.id,
      from_location: rideData.from_location,
      from_lat: rideData.from_lat || 23.588,
      from_lng: rideData.from_lng || 58.383,
      to_location: rideData.to_location,
      to_lat: rideData.to_lat || 23.610,
      to_lng: rideData.to_lng || 58.410,
      date: rideData.date,
      time: rideData.time,
      seats_available: rideData.seats,
      seats_total: rideData.seats,
      price_per_seat: rideData.price,
      distance_km: rideData.distance || 0,
      passengers: [],
    }]).select();
    
    return { data, error };
  },

  join: async (rideId: string) => {
    const user = await auth.getCurrentUser();
    const { data, error } = await supabase.rpc('join_ride', {
      ride_id_param: rideId,
      user_id_param: user?.id,
    });
    return { data, error };
  },

  getById: async (rideId: string) => {
    const { data, error } = await supabase.from('rides')
      .select(`*, driver:users!driver_id(name, rating, phone)`)
      .eq('id', rideId).single();
    return { data, error };
  },
};

export const wallet = {
  getBalance: async () => {
    const user = await auth.getCurrentUser();
    const { data, error } = await supabase.from('users')
      .select('wallet_balance, eco_credits').eq('id', user?.id).single();
    return { data, error };
  },

  topup: async (amount: number) => {
    const user = await auth.getCurrentUser();
    const { data, error } = await supabase.rpc('topup_wallet', {
      user_id: user?.id,
      amount,
    });
    return { data, error };
  },
};

export const analytics = {
  getUserStats: async () => {
    const user = await auth.getCurrentUser();
    const { data, error } = await supabase.from('users')
      .select('total_rides, eco_credits, wallet_balance, rating').eq('id', user?.id).single();

    const { data: ridesData } = await supabase.from('rides')
      .select('distance_km').contains('passengers', [user?.id]).eq('status', 'completed');

    const totalDistance = ridesData?.reduce((sum, r) => sum + (r.distance_km || 0), 0) || 0;
    const co2Saved = Math.round(totalDistance * 0.21 * 100) / 100;

    return {
      data: {
        ...data,
        total_distance_km: totalDistance,
        co2_saved_kg: co2Saved,
        trees_equivalent: Math.round((co2Saved / 22) * 10) / 10,
      },
      error,
    };
  },

  getLeaderboard: async (limit = 100) => {
    const { data, error } = await supabase.from('users')
      .select('name, eco_credits, total_rides, rating')
      .order('eco_credits', { ascending: false }).limit(limit);
    return { data, error };
  },
};
