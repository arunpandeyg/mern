import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";

import { useRegister } from "../hooks/useRegister";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
});

const Signup = () => {
  const form = useForm({ resolver: zodResolver(schema), defaultValues: { name: "", email: "", password: "", phone: "", gender: "" } });
  const navigate = useNavigate();
  const { mutate, isLoading } = useRegister();

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Account created. Verify your email.");
        navigate("/signin");
      },
      onError: (err) => toast.error(err.response?.data?.message),
    });
  };

  return (
    <div className="bg-gray-300/15 text-gray-700 text-center w-full ">
    <Form {...form} className="w-96 p-4 mx-auto mt-2 text-white shadow-lg bg-gray-700/50 backdrop-filter backdrop-blur-sm transition-all ease-in-out delay-300">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-1 max-w-sm mx-auto mt-2 border border-gray-600 p-4 rounded-lg shadow-lg  hover:transition-transform hover:scale-105 ease-in-out delay-150 cursor-pointer"
      >
        <h1 className="text-2xl font-bold mb-2 text-center">Sign Up</h1>
        {["name", "email", "password", "phone"].map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{field.name}</FormLabel>
                <FormControl>
                  <Input
                    type={field.name === "password" ? "password" : "text"}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ))}

        <Button onClick={form.handleSubmit(onSubmit)} type="submit" className="w-full cursor-pointer" disabled={isLoading}>
          Signup
        </Button>
        <p>Already have an account? <Link to="/signin" className="hover:underline">Sign In</Link></p>
      </form>
      
    </Form>
    </div>
  );
};

export default Signup;
