import UserProfileForm from "@/components/UserProfileForm";


export default function EditUserPage({ params }: { readonly params: { readonly id: string } }) {
  return (
    <div>
     
      <main className="py-8">
        <UserProfileForm userId={params.id} />
      </main>
    </div>
  );
}
