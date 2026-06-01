"use client";

import { BarChart3Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCsrfHeaders } from "@/core/api/fetcher";
import { useAuth } from "@/core/auth/AuthProvider";
import { parseAuthError } from "@/core/auth/types";

type SetupMode = "loading" | "init_admin" | "change_password";

export default function SetupPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [mode, setMode] = useState<SetupMode>("loading");

  // --- Shared state ---
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // --- Change-password mode only ---
  const [currentPassword, setCurrentPassword] = useState("");

  useEffect(() => {
    let cancelled = false;

    if (isAuthenticated && user?.needs_setup) {
      setMode("change_password");
    } else if (!isAuthenticated) {
      // Check if the system has no users yet
      void fetch("/api/v1/auth/setup-status")
        .then((r) => r.json())
        .then((data: { needs_setup?: boolean }) => {
          if (cancelled) return;
          if (data.needs_setup) {
            setMode("init_admin");
          } else {
            // System already set up and user is not logged in — go to login
            router.push("/login");
          }
        })
        .catch(() => {
          if (!cancelled) router.push("/login");
        });
    } else {
      // Authenticated but needs_setup is false — already set up
      router.push("/workspace");
    }

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, user, router]);

  // ── Init-admin handler ─────────────────────────────────────────────
  const handleInitAdmin = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          password: newPassword,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        const authError = parseAuthError(data);
        setError(authError.message);
        return;
      }

      router.push("/workspace");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Change-password handler ────────────────────────────────────────
  const handleChangePassword = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getCsrfHeaders(),
        },
        credentials: "include",
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
          new_email: email || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        const authError = parseAuthError(data);
        setError(authError.message);
        return;
      }

      router.push("/workspace");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (mode === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading…</p>
      </div>
    );
  }

  // ── Admin initialization form ──────────────────────────────────────
  if (mode === "init_admin") {
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
              初始化管理员账号
            </p>
            <p className="mt-1 text-sm text-slate-500">
              首次使用前，请创建管理员账户。
            </p>
          </div>
          <form onSubmit={handleInitAdmin} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                邮箱
              </label>
              <Input
                id="email"
                type="email"
                placeholder="请输入管理员邮箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="请输入至少 8 位密码"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                确认密码
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="请再次输入密码"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            {error && <p className="ms-1 text-sm text-red-500">{error}</p>}
            <Button type="submit" className="h-11 w-full rounded-xl bg-slate-950 text-white hover:bg-slate-800" disabled={loading}>
              {loading ? "正在创建账户…" : "创建管理员账户"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // ── Change-password form (needs_setup after login) ─────────────────
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
            初始化管理员账号
          </p>
          <p className="mt-1 text-sm text-slate-500">
            请设置你的邮箱和新密码。
          </p>
        </div>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <Input
            type="email"
            placeholder="请输入邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="当前密码"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="新密码"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={8}
          />
          <Input
            type="password"
            placeholder="确认新密码"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="h-11 w-full rounded-xl bg-slate-950 text-white hover:bg-slate-800" disabled={loading}>
            {loading ? "正在设置…" : "完成设置"}
          </Button>
        </form>
      </div>
    </div>
  );
}
