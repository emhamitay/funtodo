/**
 * LoginForm Component (Login)
 *
 * A controlled form component that handles user login authentication.
 * This is a child component used within AuthenticationModal.
 *
 * Features:
 * - Email and password input fields with validation
 * - Password visibility toggle (show/hide)
 * - Client-side validation (email format, required fields)
 * - API integration with /api/auth/login endpoint
 * - Toast notifications for success/error feedback
 * - Link to switch to registration form
 *
 * @param {Function} setRegisterOpen - Callback to switch to registration view
 * @param {Function} setPopupOpen - Callback to close the authentication modal
 * @param {Function} onLoginSuccess - Callback executed after successful login, receives userId
 */
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import authService from "@/lib/authService";

export default function Login({
  setRegisterOpen,
  setPopupOpen,
  onLoginSuccess,
}) {
  // Form state
  const [email, setEmail] = useState(""); // User's email input
  const [password, setPassword] = useState(""); // User's password input
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  /**
   * Validate email format using regex
   * @param {string} email - Email address to validate
   * @returns {boolean} True if email format is valid
   */
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Handle login form submission
   * Validates inputs and makes API call to authenticate user
   */
  const handleLogin = async (event) => {
    event.preventDefault();

    // Validate email
    if (!email.trim()) {
      toast.error("Hey! Please enter your email address");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error(
        "That doesn't look like a valid email. Try something like user@example.com"
      );
      return;
    }

    // Validate password
    if (!password.trim()) {
      toast.error("Don't forget your password!");
      return;
    }

    authService.Login(
      email,
      password,
      // On Success callback
      (userId) => {
        toast.success("Welcome back! You're all set.");
        onLoginSuccess(userId); // Pass userId to callback
      },
      // On Error callback
      (message) => {
        toast.error(message);
      }
    );
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
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-[60px_1fr] items-center gap-2">
              <Label htmlFor="password">Password:</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            <Button className="w-full" onClick={handleLogin}>
              Login
            </Button>
          </form>
          <Separator className="bg-blue-200" />
          <p className="text-sm font-light mb-3 text-gray-700">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-blue-700 underline"
              onClick={() => {
                setRegisterOpen(true);
              }}
            >
              Register Now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
