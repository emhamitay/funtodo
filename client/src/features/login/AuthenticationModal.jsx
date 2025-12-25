/**
 * AuthenticationModal Component (LoginFeature)
 *
 * A fullscreen modal that manages the complete authentication flow (login/register).
 * This component orchestrates authentication state, task synchronization, and user session management.
 *
 * Key Responsibilities:
 * - Toggle between login and registration views
 * - Manage user authentication state (logged in/out)
 * - Integrate with Zustand task store for data synchronization
 * - Handle local-to-server task merging on login/register
 * - Display offline/online status indicator
 * - Persist login state using localStorage
 *
 * Post-authentication Actions:
 * - Sets user ID in global store
 * - Merges local tasks with server tasks
 * - Loads user tasks from server
 * - Shows success notifications
 */
import { Button } from "@/components/Button";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Login from "./LoginForm";
import Register from "./RegisterForm";
import useTasksStore from "@/store/TasksStore";
import { toast } from "sonner";

export default function LoginFeature() {
  // UI state management
  const [isPopupOpen, setPopupOpen] = useState(false); // Controls modal visibility
  const [isRegisterOpen, setRegisterOpen] = useState(false); // Toggles between login/register views
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks authentication status

  // Zustand store functions for task management
  const {
    setUserId, // Set the current user ID
    loadTasks, // Fetch tasks from server
    clearTasks, // Clear all tasks from store and localStorage
    initialize, // Initialize store with localStorage data
    mergeLocalTasks, // Merge local tasks with server tasks
    isOnline, // Online/offline status
  } = useTasksStore();

  // Initialize store with local storage data on component mount
  useEffect(() => {
    initialize();
    // Check if user was previously logged in
    const localUserId = localStorage.getItem("funtodo_local_user_id");
    const token = localStorage.getItem("funtodo_access_token");
    if (localUserId && token) {
      setIsLoggedIn(true);
    }
  }, []);

  /**
   * Handle user logout
   * Clears authentication state and tasks from memory/storage
   */
  const handleLogout = () => {
    setIsLoggedIn(false);
    clearTasks(); // Clear tasks from store and local storage
    // Clear auth token
    localStorage.removeItem("funtodo_access_token");
    toast.success("See you later! Your tasks are safe and sound locally.");
  };

  /**
   * Handle successful login
   * Sets user ID, merges local tasks with server, and loads user's tasks
   * @param {string} userId - The authenticated user's ID
   */
  const handleLoginSuccess = async (userId, token) => {
    setIsLoggedIn(true);
    setPopupOpen(false);
    setUserId(userId);
    // Persist bearer token for authenticated requests
    localStorage.setItem("funtodo_access_token", token);

    // Merge local tasks with server tasks if any exist
    await mergeLocalTasks(userId);

    // Load tasks from server
    await loadTasks(userId);
  };

  /**
   * Handle successful registration
   * Sets user ID, merges local tasks with server, and loads user's tasks
   * @param {string} userId - The newly registered user's ID
   */
  const handleRegisterSuccess = async (userId, token) => {
    setIsLoggedIn(true);
    setPopupOpen(false);
    setUserId(userId);
    // Persist bearer token for authenticated requests
    localStorage.setItem("funtodo_access_token", token);

    // Merge local tasks with server tasks if any exist
    await mergeLocalTasks(userId);

    // Load tasks from server
    await loadTasks(userId);
  };

  return (
    <>
      {/* Trigger */}
      <Button
        className="tutorial-step-6"
        onClick={() => {
          if (isLoggedIn) {
            handleLogout();
          } else {
            setPopupOpen(true);
          }
        }}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </Button>

      {/* Status indicator */}
      {!isLoggedIn && (
        <div className="text-xs text-gray-500 ml-2">Working offline</div>
      )}

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 w-screen h-screen bg-white z-[100] p-5">
          <div className="font-sans h-full antialiased">
            <div className="bg-blue-50 border-blue-100 rounded-md border w-full h-full shadow-xs p-5 flex flex-col relative">
              {/* Close (X) button */}
              <button
                onClick={() => {
                  setRegisterOpen(false);
                  setPopupOpen(false);
                }}
                className="absolute top-2 right-2 text-zinc-400 hover:text-zinc-600 transition cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {!isRegisterOpen ? (
                <Login
                  setRegisterOpen={setRegisterOpen}
                  setPopupOpen={setPopupOpen}
                  onLoginSuccess={handleLoginSuccess}
                />
              ) : (
                <Register
                  setRegisterOpen={setRegisterOpen}
                  setPopupOpen={setPopupOpen}
                  onRegisterSuccess={handleRegisterSuccess}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
