import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ user: data.user }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: 'サーバーエラーが発生しました。' }, { status: 500 });
    }
}
