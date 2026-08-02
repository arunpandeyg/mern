import SignUpForm from "@/components/SignUpForm";
import Navbar from "@/components/Navbar";

export default function CreateUserPage() {
  return (
    <div>
      <Navbar />
      <main className="py-8">
        <SignUpForm />
      </main>
    </div>
  );
}
