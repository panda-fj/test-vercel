"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        try {
            const { data, error } = isLogin
                ? await supabase.auth.signInWithPassword({ email, password })
                : await supabase.auth.signUp({ email, password });

            if (error) {
                setMessage(error.message);
            } else if (data.user) {
                router.push('/profile'); // プロフィールページにリダイレクト
            }
        } catch (error) {
            setMessage(`エラーが発生しました。もう一度お試しください。(${error})`);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
            <h1>{isLogin ? 'ログイン' : 'ユーザー登録'}</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        メールアドレス:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ display: 'block', width: '100%' }}
                            className='text-gray-500'
                        />
                    </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        パスワード:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ display: 'block', width: '100%' }}
                            className='text-gray-500'
                        />
                    </label>
                </div>
                <button type="submit" style={{ marginTop: '10px' }}>
                    {isLogin ? 'ログイン' : '登録'}
                </button>
            </form>
            <p style={{ marginTop: '10px', cursor: 'pointer' }} onClick={() => {
                setIsLogin(!isLogin)
                setEmail('')
                setPassword('')
            }}>
                {isLogin ? '新規登録はこちら' : 'ログインはこちら'}
            </p>
            {message && <p>{message}</p>}
        </div>
    );
}
