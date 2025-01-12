import React from 'react'
import TestInput from '@/components/TestInput'
import { createClient } from '@/utils/supabase/server';

const page = () => {
    return (
        <div className='p-2'>
            This is TestPage.
            <TestInput/>
        </div>
    )
}

export default page