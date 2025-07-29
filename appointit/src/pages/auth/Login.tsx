import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCsrfToken, getUser, loginUser } from "../../services/auth";
import { setCredentials } from "../../store/authSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value});

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        try {
            await getCsrfToken();
            await loginUser(form);
            const res = await getUser();

            dispatch(setCredentials({
                user: res.data, 
            }))

            navigate('/dashboard');
        }

        catch(err) {
            console.log(err);
        }
    }

    return(
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
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
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
    
}