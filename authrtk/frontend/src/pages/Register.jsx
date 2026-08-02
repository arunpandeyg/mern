import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router";

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

export default function Register() {
  const form = useForm({ resolver: zodResolver(schema) });
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
    <div className="bg-gray-300/15 text-gray-700 text-center w-full h-120 ">
      <Form {...form} className="w-96 p-4 mx-auto mt-3 text-white shadow-lg bg-gray-700/50 backdrop-filter backdrop-blur-sm ">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          {["name", "email", "password", "phone"].map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field}</FormLabel>
                  <FormControl>
                    <Input
                      type={field === "password" ? "password" : "text"}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}

          <Button className="w-full" disabled={isLoading}>
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
}
