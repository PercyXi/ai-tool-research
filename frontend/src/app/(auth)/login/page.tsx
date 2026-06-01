"use client";

import { BarChart3Icon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/core/auth/AuthProvider";
import { parseAuthError } from "@/core/auth/types";

/**
 * Validate next parameter
 * Prevent open redirect attacks
 * Per RFC-001: Only allow relative paths starting with /
 */
function validateNextParam(next: string | null): string | null {
  if (!next) {
    return null;
  }

  // Need start with / (relative path)
  if (!next.startsWith("/")) {
    return null;
  }

  // Disallow protocol-relative URLs
  if (
    next.startsWith("//") ||
    next.startsWith("http://") ||
    next.startsWith("https://")
  ) {
    return null;
  }

  // Disallow URLs with different protocols (e.g., javascript:, data:, etc)
  if (next.includes(":") && !next.startsWith("/")) {
    return null;
  }

  // Valid relative path
  return next;
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Get next parameter for validated redirect
  const nextParam = searchParams.get("next");
  const redirectPath = validateNextParam(nextParam) ?? "/workspace";

  // Redirect if already authenticated (client-side, post-login)
  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectPath);
    }
  }, [isAuthenticated, redirectPath, router]);

  // Redirect to setup if the system has no users yet
  useEffect(() => {
    let cancelled = false;

    void fetch("/api/v1/auth/setup-status")
      .then((r) => r.json())
      .then((data: { needs_setup?: boolean }) => {
        if (!cancelled && data.needs_setup) {
          router.push("/setup");
        }
      })
      .catch(() => {
        // Ignore errors; user stays on login page
      });

    return () => {
      cancelled = true;
    };
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin
        ? "/api/v1/auth/login/local"
        : "/api/v1/auth/register";
      const body = isLogin
        ? `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        : JSON.stringify({ email, password });

      const headers: HeadersInit = isLogin
        ? { "Content-Type": "application/x-www-form-urlencoded" }
        : { "Content-Type": "application/json" };

      const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body,
        credentials: "include", // Important: include HttpOnly cookie
      });

      if (!res.ok) {
        const data = await res.json();
        const authError = parseAuthError(data);
        setError(authError.message);
        return;
      }

      // Both login and register set a cookie — redirect to workspace
      router.push(redirectPath);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(139,92,246,0.18),transparent_28%),radial-gradient(circle_at_75%_28%,rgba(59,130,246,0.14),transparent_24%),linear-gradient(135deg,#ffffff_0%,#f8f7ff_52%,#eef5ff_100%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="absolute -bottom-28 left-16 size-80 rounded-full border border-indigo-100" />
      <div className="absolute -right-24 top-12 size-72 rounded-full border border-blue-100" />
      <div className="relative z-10 w-full max-w-md space-y-7 rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-2xl shadow-indigo-950/10 backdrop-blur-xl">
        <div className="text-center">
          <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
            <BarChart3Icon className="size-6" />
          </div>
          <h1 className="text-3xl font-bold text-slate-950">
            AI Tool Research
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            AI工具深度测评系统
          </p>
          <p className="mt-6 text-lg font-semibold text-slate-950">
            {isLogin ? "欢迎回来" : "创建账户"}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {isLogin ? "登录后继续使用你的测评工作台" : "创建你的测评工作台账户"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              邮箱
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入邮箱地址"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">
              密码
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              required
              minLength={isLogin ? 6 : 8}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" className="h-11 w-full rounded-xl bg-slate-950 text-white hover:bg-slate-800" disabled={loading}>
            {loading
              ? "请稍候..."
              : isLogin
                ? "登录"
                : "创建账户"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <Link href="/setup" className="text-slate-500 hover:text-indigo-600">
            还没有账号？初始化管理员账号
          </Link>
        </div>

        <div className="text-center text-xs text-slate-400">
          <Link href="/" className="hover:text-slate-700">
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
