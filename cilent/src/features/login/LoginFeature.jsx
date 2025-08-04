import { Button } from "@/components/Button";
import { useState } from "react";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Login from './Login'
import Register from './Register'
import useTasksStore from "@/store/TasksStore";

export default function LoginFeature() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUserId, loadTasks, clearTasks } = useTasksStore();

  const handleLogout = () => {
    setIsLoggedIn(false);
    clearTasks(); // Clear tasks from store
  };

  const handleLoginSuccess = (userId) => {
    setIsLoggedIn(true);
    setPopupOpen(false);
    setUserId(userId);
    loadTasks(userId); // Load tasks from server
  };

  const handleRegisterSuccess = (userId) => {
    setIsLoggedIn(true);
    setPopupOpen(false);
    setUserId(userId);
    loadTasks(userId); // Load tasks from server
  };

  return (
    <>
      {/* Trigger */}
      <Button
        onClick={() => {
          if (isLoggedIn) {
            handleLogout();
          } else {
            setPopupOpen(true);
          }
        }}
      >
        {isLoggedIn ? 'Logout' : 'Login'}
      </Button>

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
