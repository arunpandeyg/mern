'use client';


import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';


export default function SignUpForm() {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [imageFile, setImageFile] = useState<File | null>(null);
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
const router = useRouter();


const uploadImage = async (file: File) => {
const fd = new FormData();
fd.append('file', file);
const res = await fetch('/api/upload', { method: 'POST', body: fd });
const data = await res.json();
if (!res.ok) throw new Error(data?.message || 'Upload failed');
return data.url as string;
};


const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
setLoading(true);
try {
let imageUrl = '';
if (imageFile) imageUrl = await uploadImage(imageFile);


const res = await fetch('/api/auth/signup', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ name, email, phone, image: imageUrl, password }),
});
const data = await res.json();
if (!res.ok) throw new Error(data?.message || 'Signup failed');


toast.success('Account created. Please complete your profile');
// Redirect user to profile edit page to update profile
router.push(`/users/${data.userId}/edit`);
} catch (err: any) {
toast.error(err.message || 'Signup failed');
} finally {
setLoading(false);
}
};
return (
<form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 bg-white p-6 rounded-lg shadow">
<h2 className="text-xl font-semibold">Create account</h2>
<div>
<Label className="block text-sm">Name</Label>
<Input required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded" />
</div>
<div>
<Label className="block text-sm">Email</Label>
<Input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full px-3 py-2 border rounded" />
</div>
<div>
<Label className="block text-sm">Phone number</Label>
<Input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 border rounded" />
</div>
<div>
<Label className="block text-sm">Profile image</Label>
<Input accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} type="file" className="w-full" />
</div>
<div>
<Label className="block text-sm">Password</Label>
<Input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full px-3 py-2 border rounded" />
</div>
<Button disabled={loading} className="w-full px-4 py-2 bg-indigo-600 text-white rounded">{loading ? 'Creating...' : 'Create account'}</Button>
<p className="text-sm">Already a member? <a href="/signin" className="text-indigo-600">Please signin</a></p>
</form>
);
}


