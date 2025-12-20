import { Button } from "@/components/Button";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Login from './Login'
import Register from './Register'
import useTasksStore from "@/store/TasksStore";
import { toast } from "sonner";

export default function LoginFeature() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUserId, loadTasks, clearTasks, initialize, mergeLocalTasks, isOnline } = useTasksStore();

  // Initialize store with local storage data on component mount
  useEffect(() => {
    initialize();
    // Check if user was previously logged in
    const localUserId = localStorage.getItem('funtodo_local_user_id');
    if (localUserId) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    clearTasks(); // Clear tasks from store and local storage
    toast.success('See you later! Your tasks are safe and sound locally.');
  };

  const handleLoginSuccess = async (userId) => {
    setIsLoggedIn(true);
    setPopupOpen(false);
    setUserId(userId);
    
    // Merge local tasks with server tasks if any exist
    await mergeLocalTasks(userId);
    
    // Load tasks from server
    await loadTasks(userId);
  };

  const handleRegisterSuccess = async (userId) => {
    setIsLoggedIn(true);
    setPopupOpen(false);
    setUserId(userId);
    
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
        {isLoggedIn ? 'Logout' : 'Login'}
      </Button>

      {/* Status indicator */}
      {!isLoggedIn && (
        <div className="text-xs text-gray-500 ml-2">
          Working offline
        </div>
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
