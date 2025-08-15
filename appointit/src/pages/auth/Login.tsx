import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser, loginUser } from "../../services/auth";
import { setCredentials } from "../../store/authSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { RootState } from "@/store";

export default function Login() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [error, setError] = useState("");
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
      const resLogin = await loginUser(form);

      if (resLogin?.success === false) {
        setError(resLogin?.message || "Invalid credentials.");
        return;
      }
      const userData = await getUser();

      const transformedUserData = {
        id: userData.data.users.id,
        name: userData.data.users.name,
        email: userData.data.users.email,
        role: userData.data.users.roles?.[0]?.name || "customer",
      };
      console.log("User data: ", transformedUserData);
      dispatch(
        setCredentials({
          user: transformedUserData,
        })
      );
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";
      console.error("Login error:", error);
      console.log("Message", message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} replace />;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="Email"
          />
          <Input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Password"
          />
          <Button type="submit" className="w-full mt-10">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
