import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Login from "../../features/login/LoginForm";

// Mock the toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("Login Component", () => {
  const mockProps = {
    setRegisterOpen: vi.fn(),
    setPopupOpen: vi.fn(),
    onLoginSuccess: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it("renders login form", () => {
    render(<Login {...mockProps} />);

    expect(screen.getByText("Login:")).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("handles successful login", async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve({ userId: "123" }),
    };
    global.fetch.mockResolvedValueOnce(mockResponse);

    render(<Login {...mockProps} />);

    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          password: "password123",
        }),
      });
    });
  });

  it("handles login failure", async () => {
    const mockResponse = {
      ok: false,
      json: () => Promise.resolve({ error: "Invalid credentials" }),
    };
    global.fetch.mockResolvedValueOnce(mockResponse);

    render(<Login {...mockProps} />);

    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  it("toggles password visibility", () => {
    render(<Login {...mockProps} />);

    const passwordInput = screen.getByLabelText("Password:");
    const eyeButton = screen.getByRole("button", { name: "" }); // Eye button

    // Initially password should be hidden
    expect(passwordInput).toHaveAttribute("type", "password");

    // Click eye button to show password
    fireEvent.click(eyeButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    // Click again to hide password
    fireEvent.click(eyeButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
