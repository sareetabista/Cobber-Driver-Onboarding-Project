import type React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { login, register } from "../../api/services/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BaseAxiosErrorFormat } from "@/types";

// Define the form schema with Zod
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// Infer the type from the schema
type FormValues = z.infer<typeof formSchema>;

export function AuthForm({
  className,
  mode,
  ...props
}: React.ComponentProps<"div"> & { mode: "login" | "register" }) {
  const navigate = useNavigate();
  // Initialize the form with react-hook-form and zod resolver
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  async function onSubmit(data: FormValues) {
    const response = await mutateAsync(data);
    console.log(response);
    localStorage.setItem("token", response?.data?.access_token);
    toast("user logged in successfully!");
    navigate("/");
  }

  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: mode === "login" ? login : register,
    onError: (error: BaseAxiosErrorFormat) => {
      error?.response?.data?.error?.map((error) => {
        toast.error(error);
      });
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          {mode === "login" ? "Login to your Account" : "Register your Account"}
        </h1>
        <p className="text-muted-foreground text-sm text-balance">
          {mode === "login"
            ? "Enter your email below to login to your account"
            : "Enter your email below to register to your account"}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {mode === "login"
              ? isLoading
                ? "Logging in..."
                : "Login"
              : isLoading
                ? "Register in..."
                : "Register"}
          </Button>

          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>
        </form>
      </Form>

      <div className="text-center text-sm">
        {mode === "login"
          ? "Don't have an account?"
          : "Alredy have an account?"}

        <a
          href={mode === "login" ? "/register" : "login"}
          className="underline underline-offset-4"
        >
          {mode === "login" ? " Sign up" : " Sign in"}
        </a>
      </div>
    </div>
  );
}
