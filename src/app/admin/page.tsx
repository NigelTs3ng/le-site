"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { User } from '@supabase/supabase-js';

type Submission = {
  id: number;
  name: string;
  email: string;
  phone: string | number;
  industry: string;
  description: string;
  file_url: string;
  created_at: string;
  country: string;
};

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<'industry' | 'country'>('industry');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    return () => { authListener?.subscription.unsubscribe(); };
  }, []);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
  };

  const signOutUser = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      supabase.from('submissions').select('*').then(({ data, error }) => {
        if (!error && data) setSubmissions(data as Submission[]);
        setLoading(false);
      });
    }
  }, [user]);

  const grouped: Record<string, Submission[]> = {};
  if (sortBy === 'industry') {
    submissions.forEach(sub => {
      const key = sub.industry || 'Uncategorized';
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(sub);
    });
  } else {
    submissions.forEach(sub => {
      const key = sub.country || 'Unknown';
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(sub);
    });
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <form onSubmit={signIn} className="bg-white p-8 rounded shadow max-w-sm w-full space-y-4">
          <h2 className="text-xl font-bold mb-2 text-gray-900">Admin Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded px-3 py-2 text-gray-900"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded px-3 py-2 text-gray-900"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded w-full">Sign In</button>
          {authError && <div className="text-red-600">{authError}</div>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-900">Admin Submissions</h1>
          <button onClick={signOutUser} className="text-blue-600 underline">Sign out</button>
        </div>
        <div className="mb-4 flex gap-4">
          <button onClick={() => setSortBy('industry')} className={sortBy === 'industry' ? 'font-bold underline text-gray-900' : 'text-gray-900'}>Group by Occupation</button>
          <button onClick={() => setSortBy('country')} className={sortBy === 'country' ? 'font-bold underline text-gray-900' : 'text-gray-900'}>Sort by Country</button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-8">
            {Object.entries(grouped).map(([group, items]) => (
              <div key={group}>
                <h2 className="text-xl font-semibold text-blue-800 mb-2">{group}</h2>
                <div className="space-y-4">
                  {items.map((sub) => (
                    <div key={sub.id} className="border rounded p-4">
                      <div className="text-gray-900"><b>Name:</b> {sub.name}</div>
                      <div className="text-gray-900"><b>Email:</b> {sub.email}</div>
                      <div className="text-gray-900"><b>Phone:</b> {sub.phone}</div>
                      <div className="text-gray-900"><b>Country:</b> {sub.country}</div>
                      <div className="text-gray-900"><b>Industry:</b> {sub.industry}</div>
                      <div className="text-gray-900"><b>Description:</b> {sub.description}</div>
                      <div className="text-gray-900"><b>Resume:</b> {sub.file_url ? <a href={sub.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Download/View</a> : "No file"}</div>
                      <div className="text-xs text-gray-700 mt-2">Submitted: {sub.created_at ? new Date(sub.created_at).toLocaleString() : ''}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}