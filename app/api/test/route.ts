// import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'POST') {
//         const { name } = req.body;

//         // データを挿入
//         const { data, error } = await supabase.from('countries').insert([{ name }]);

//         if (error) {
//             return res.status(500).json({ error: error.message });
//         }

//         return res.status(200).json({ data });
//     } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json();
    const { id, name } = body;
    console.log({ id, name })

    // データ処理（例: データベースへの挿入）
    const { data, error } = await supabase.from('countries').insert([{
        name: name
    }]);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}
