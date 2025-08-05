import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export default function Register({ setRegisterOpen, setPopupOpen, onRegisterSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation function
  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate email
    if (!email.trim()) {
      toast.error('Hey! Please enter your email address');
      return;
    }

    if (!isValidEmail(email)) {
      toast.error('That doesn\'t look like a valid email. Try something like user@example.com');
      return;
    }

    // Validate password
    if (!password.trim()) {
      toast.error('Don\'t forget your password!');
      return;
    }

    if (!isValidPassword(password)) {
      toast.error('Password needs to be at least 6 characters. Make it strong!');
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        toast.success('Welcome to FunTodo! Your account is ready.');
        onRegisterSuccess(data.userId); // Pass userId to callback
      } else {
        const data = await res.json();
        toast.error('Registration failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      toast.error('Registration failed: ' + err.message);
    }
  };

  return (
    <div>
      <header>
        <h1 className="text-lg font-medium text-blue-600">Register: </h1>
        <p className="text-sm italic font-thin mb-3 text-blue-500">
          Register a new account to take control of your day — track your tasks,
          manage your progress, and stay effortlessly organized.
        </p>
      </header>
      <Separator className="bg-blue-200" />
      <div className="flex h-full flex-1 items-center justify-center">
        <div className="flex flex-col gap-3">
          <form className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-[60px_1fr] items-center gap-2">
              <Label htmlFor="email">Email:</Label>
              <Input id="email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="grid grid-cols-[60px_1fr] items-center gap-2">
              <Label htmlFor="password">Password:</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <Button className="w-full" onClick={handleSubmit}>Register</Button>
          </form>
          <Separator className="bg-blue-200" />
          <p className="text-sm font-light mb-3 text-gray-700">
            Back to{" "}
            <a
              href="#"
              className="text-blue-700 underline"
              onClick={() => {
                setRegisterOpen(false);
              }}
            >
              Login.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
