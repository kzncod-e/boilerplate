import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "./components/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
            <Image
              src={'/logo.jpeg'}
              alt="logo"
              width={100}
              height={100}
              className="rounded-sm md:mb-5"
            />
            <h1 className="text-xl font-bold text-center">
Selamat datang di optimasi official template            </h1>
          </div>
        <LoginForm />
      </div>
    </div>
  );
}
