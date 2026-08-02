// app/admin/edit-user/[id]/page.tsx
import React from 'react';
import UserForm from '@/components/admin/UserForm';


export default async function EditUserPage({ params }: { params: { id: string } }) {
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/users/${params.id}`);
const json = await res.json();
const initial = json.user;
return (
<div>
<h1 className="text-2xl font-bold mb-4">Edit User</h1>
{/* @ts-ignore */}
<UserForm initial={initial} />
</div>
);
}