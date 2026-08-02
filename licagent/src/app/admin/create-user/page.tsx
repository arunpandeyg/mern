// app/admin/create-user/page.tsx
import React from 'react';
import UserForm from '@/components/admin/UserForm';


export default function CreateUserPage() {
return (
<div className="w-full h-[470px] bg-gradient-to-b from-gray-500 to-gray-300">
<h1 className="text-2xl font-bold mb-4 text-center text-white">Create User</h1>
<UserForm />
</div>
);
}