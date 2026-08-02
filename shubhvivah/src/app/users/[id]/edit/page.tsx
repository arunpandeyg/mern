import UpdateProfileForm from "@/components/users/UpdateProfileForm";



export default function updateProfilePage({ params }: { readonly params: { readonly id: string } }) {
  return (
    <div>     
      <main className="py-8">
        <UpdateProfileForm />
      </main>
    </div>
  );
}
