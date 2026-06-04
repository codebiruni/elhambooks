"use client";
import { LoginForm } from "@/components/login-form";
import useContextData from "@/defaults/custom-component/useContextData";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const { UserData } = useContextData();
  const router = useRouter();
  useEffect(() => {
    if (UserData) {
      router.push(UserData.role == "user" ? "/profile" : "/dashboard");
    }
  }, [UserData, router]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
        <LoginForm />
    </div>
  );
}
