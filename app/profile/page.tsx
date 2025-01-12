"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function Profile() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error || !user) {
                router.push('/'); // ログインしていない場合はホームにリダイレクト
            } else {
                setUser(user);
            }

            setLoading(false);
        };

        fetchUser();
    }, [router]);

    if (loading) {
        return <p>読み込み中...</p>;
    }

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
            <h1>プロフィール</h1>
            {user ? (
                <div>
                    <p><strong>メールアドレス:</strong> {user.email}</p>
                    <button
                        style={{ marginTop: '20px' }}
                        onClick={async () => {
                            await supabase.auth.signOut();
                            router.push('/user'); // ログアウト後ホームにリダイレクト
                        }}
                    >
                        ログアウト
                    </button>
                </div>
            ) : (
                <p>ユーザー情報が見つかりません。</p>
            )}
        </div>
    );
}
