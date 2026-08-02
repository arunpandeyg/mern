// app/admin/create-user/page.tsx
import React from 'react';
import UserForm from '@/components/admin/UserForm';


export default function CreateUserPage() {
return (
<div>
<h1 className="text-2xl font-bold mb-4">Create User</h1>
<UserForm />
</div>
);
}