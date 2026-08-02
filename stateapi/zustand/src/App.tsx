import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { useAppStore } from "./zuststore/store";

function UpdateUserForm() {
  const { username, email, setUsername, setEmail } = useAppStore();
  return (
    <Card className="flex flex-col gap-4 shadow-2xl transition-all transform hover:scale-105 duration-500 ease-in-out bg-gray-700 hove:bg-gray-800 text-white p-4">
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="flex justify-center">
        <Button className='bg-gray-600 hover:bg-gray-700 text-white cursor-pointer'>Update</Button>
      </div>
    </Card>
  );
}

function App() {
  const { username, email, setUsername, setEmail } = useAppStore();

  return (
    <>
      <div className="w-full h-screen flex flex-col gap-4  bg-gray-300">
        <h1 className="text-3xl font-bold underline text-center mt-15">
          Zustand Practice
        </h1>
        <div className="flex flex-col gap-4 items-center justify-center mt-10">
          <div>{username}</div>
          <div>{email}</div>
          <UpdateUserForm />
        </div>
        <div>
         
        </div>
      </div>
    </>
  );
}

export default App;
