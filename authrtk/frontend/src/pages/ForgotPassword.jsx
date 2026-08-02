import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForgotPassword } from "../hooks/useForgotPassword";

const schema = z.object({
  email: z.string().email(),
});

export default function ForgotPassword() {
  const form = useForm({ resolver: zodResolver(schema) });
  const { mutate, isLoading } = useForgotPassword();

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: () =>
        toast.success("Password reset email sent"),
      onError: (err) =>
        toast.error(err.response?.data?.message),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="you@example.com" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={isLoading}>Send reset link</Button>
      </form>
    </Form>
  );
}
