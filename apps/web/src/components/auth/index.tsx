import { GalleryVerticalEnd } from "lucide-react";

import { AuthForm } from "./auth-form";

type props = {
  mode: "login" | "register";
};

const imageLink =
  "https://images.unsplash.com/photo-1611448746128-7c39e03b71e4?q=80&w=2249&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function Auth({ mode }: props) {
  console.log(mode);
  return (
    <div
      className={`min-h-svh flex ${mode === "register" ? "flex-row-reverse" : "flex-row"}`}
    >
      <div className="flex-1 flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Cobber Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <AuthForm mode={mode} />
          </div>
        </div>
      </div>
      <div className="relative flex-1 hidden bg-muted lg:block">
        <img
          src={imageLink}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
