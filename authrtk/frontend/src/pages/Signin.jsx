import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogin } from "../hooks/useSignin";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const Signin = () => {
  const form = useForm({ resolver: zodResolver(schema) });
  const navigate = useNavigate();
  const { mutate, isLoading } = useLogin();

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Welcome back!");
        navigate("/profile");
      },
      onError: (err) => toast.error(err.response?.data?.message),
    });
  }; 

  return (
    <div className="bg-gray-300/15 text-gray-700 text-center w-full ">
      <Form {...form} className="w-96 p-4 mx-auto mt-3 text-white bg-gray-700/50 backdrop-filter backdrop-blur-sm    ">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-sm mx-auto mt-20 border border-gray-600 p-4 rounded-lg shadow-lg  hover:transition-transform hover:scale-105 ease-in-out delay-150 cursor-pointer"
        >
          <h1 className="text-2xl font-bold mb-2 text-center">Sign In</h1>
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button className="w-full cursor-pointer" disabled={isLoading}>
            Signin
          </Button>
        </form>
        <p>Don&apos;t have an account? <Link to="/signup" className="hover:underline">Sign Up</Link></p>
      </Form>
    </div>
  );
};

export default Signin;

// import { useForm } from "react-hook-form";
// import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useSignin } from "../hooks/useAuth";
// import { toast } from "sonner";

// const SignIn = () => {
//   const form = useForm();
//   const { mutate, isPending } = useSignin();

//   const onSubmit = (values) => {
//     mutate(values, {
//       onSuccess: () => toast.success("Welcome back"),
//       onError: e => toast.error(e.response.data.message),
//     });
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <Input type="password" {...field} />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         <Button className="w-full">
//           {isPending ? "Signing in..." : "Sign In"}
//         </Button>
//       </form>
//     </Form>
//   );
// }

// export default SignIn;

// // import { useSignin } from "../hooks/useAuth";
// // import { useDispatch } from "react-redux";
// // import { loginSuccess } from "../store/authSlice";
// // import { toast } from "sonner";

// // export default function SignIn() {
// //   const dispatch = useDispatch();
// //   const { mutate, isPending } = useSignin();

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const form = new FormData(e.target);

// //     mutate(
// //       {
// //         email: form.get("email"),
// //         password: form.get("password"),
// //       },
// //       {
// //         onSuccess: (res) => {
// //           dispatch(loginSuccess(res.data));
// //           toast.success("Signed in");
// //         },
// //         onError: (err) => {
// //           toast.error(err.response.data.message);
// //         },
// //       }
// //     );
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 space-y-4">
// //       <input name="email" placeholder="Email" className="input" />
// //       <input name="password" type="password" placeholder="Password" className="input" />
// //       <button className="btn w-full">
// //         {isPending ? "Loading..." : "Sign In"}
// //       </button>
// //     </form>
// //   );
// // }
