// app/admin/page.tsx (dashboard shell)
import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';


export default function AdminShell({ children }: { children?: React.ReactNode }) {
return (
<div className="min-h-screen flex bg-gray-50">
<AdminSidebar />
<main className="flex-1 p-6">{children || <div>Welcome to Admin</div>}</main>
</div>
);
}