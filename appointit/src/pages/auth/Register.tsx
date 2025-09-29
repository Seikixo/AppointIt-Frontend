import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "@/components/ui/loader";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { type UserRole } from "@/types/types";

export default function Register() {
  const { register, isRegisterLoading } = useAuth();

  const userRole: UserRole = "customer";
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: userRole,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");

    if (fieldErrors[e.target.name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[e.target.name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(form);
    } catch (error: any) {
      console.error(error.errors);
      setError(error.message);
      setFieldErrors(error.errors || {});
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg rounded-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Registration</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Fill in the details for registration
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={error ? "border-red-500" : ""}
              required
            />
            {fieldErrors.name && (
              <p className="text-red-500 text-sm">{fieldErrors.name[0]}</p>
            )}
          </div>

          {/* Email */}
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
              className={fieldErrors.email ? "border-red-500" : ""}
              required
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-sm">{fieldErrors.email[0]}</p>
            )}
          </div>

          {/* Password */}
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
              className={fieldErrors.password ? "border-red-500" : ""}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {fieldErrors.password && (
              <p className="text-red-500 text-sm">{fieldErrors.password[0]}</p>
            )}
          </div>

          {/* Password Confirmation */}
          <div className="space-y-2 relative">
            <label
              htmlFor="password_confirmation"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <Input
              id="password_confirmation"
              name="password_confirmation"
              type={showConfirmPassword ? "text" : "password"}
              value={form.password_confirmation}
              onChange={handleChange}
              placeholder="••••••••"
              className={
                fieldErrors.password_confirmation ? "border-red-500" : ""
              }
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {fieldErrors.password_confirmation && (
              <p className="text-red-500 text-sm">
                {fieldErrors.password_confirmation[0]}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="mt-8">
            <Button
              type="submit"
              className="w-full h-11 text-base mb-4"
              disabled={isRegisterLoading}
            >
              {isRegisterLoading ? <Loader /> : "Register"}
            </Button>
            <Link to={"/login"}>
              <Button variant="outline" className="w-full h-11 text-base">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
