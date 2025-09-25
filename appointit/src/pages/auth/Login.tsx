import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "@/components/ui/loader";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const { login, isLoading } = useAuth();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";
      console.error("Login error:", error);
      console.log("Message", message);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg rounded-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Please sign in to continue
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={error ? "border-red-500" : ""}
              required
            />
          </div>

          <div className="space-y-2 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={error ? "border-red-500" : ""}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Don’t have an account?{" "}
              <a href="/register" className="text-primary hover:underline">
                Sign up
              </a>
            </span>
            <a href="/forgot-password" className="text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full h-11 text-base"
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
