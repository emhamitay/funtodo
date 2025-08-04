import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login({ setRegisterOpen, setPopupOpen, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        alert('Login successful!');
        onLoginSuccess(data.userId); // Pass userId to callback
      } else {
        const data = await res.json();
        alert('Login failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };

  return (
    <div>
      <header>
        <h1 className="text-lg font-medium text-blue-600">Login: </h1>
        <p className="text-sm italic font-thin mb-3 text-blue-500">
          Sign in to take control of your day — track your tasks, manage your
          progress, and stay effortlessly organized.
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
              <Input id="password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <Button className="w-full" onClick={handleLogin}>Login</Button>
          </form>
          <Separator className="bg-blue-200" />
          <p className="text-sm font-light mb-3 text-gray-700">
            Don't have an account?{" "}
            <a href="#" className="text-blue-700 underline" onClick={() => {
                setRegisterOpen(true)}}>
              Register Now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
