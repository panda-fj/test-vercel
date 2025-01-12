'use client'; // Client Componentとして定義

import { useState } from 'react';

export default function AddUserForm() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        setMessage('');
        try {
            const response = await fetch('/api/test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: 4,
                    name: name
                }),
            });

            if (!response.ok) {
                const { error } = await response.json();
                setMessage(`Error: ${error}`);
                return;
            }

            setMessage('User added successfully!');
            setName('');
        } catch (err) {
            setMessage('An error occurred while adding the user.');
        }
    };

    return (
        <div>
            <h2>Add User</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                className='text-gray-500'
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleSubmit}>Add User</button>
            {message && <p>{message}</p>}
        </div>
    );
}
