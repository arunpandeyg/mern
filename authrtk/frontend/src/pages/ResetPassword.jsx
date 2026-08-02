import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { useResetPassword } from "../hooks/useResetPassword";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  password: z.string().min(6),
});

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const form = useForm({ resolver: zodResolver(schema) });
  const { mutate, isLoading } = useResetPassword();

  const onSubmit = ({ password }) => {
    mutate(
      { token, password },
      {
        onSuccess: () => {
          toast.success("Password updated");
          navigate("/signin");
        },
        onError: (err) =>
          toast.error(err.response?.data?.message),
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={isLoading}>Reset Password</Button>
      </form>
    </Form>
  );
}
