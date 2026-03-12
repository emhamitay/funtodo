import Logo from "@/features/Logo";
import Toolbar from "@/features/Toolbar";
import Inbox from "@/features/Inbox";
import { Separator } from "@/components/ui/separator";
import AiToolbar from "./features/ai/AiToolbar";
import { TaskCalendar } from "./features/TaskCalendar";
import { useState, useEffect } from "react";
import TasksView from "@/features/TasksView";
import Information from "@/features/Information";
import { DndProvider, GhostLayer } from "bhi-dnd";
import Tutorial from "@/lib/tutorial/Tutorial";
import steps from "@/lib/tutorial/steps";
import { Button } from "@/components/Button";
import LoginFeature from "./features/login/AuthenticationModal";
import useTasksStore from "@/store/TasksStore";
import { Toaster } from "sonner";
import Mocker from "./mock/Mocker";

function App() {
  // Selected date State
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isTutorialOn, setTutorialOn] = useState(true);

  // Initialize store with local storage data
  const initialize = useTasksStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, []);

  return (
    <>
      <DndProvider>
        {isTutorialOn && (
          <Tutorial
            AskAtFirstStage={true}
            steps={steps}
            className="w-72 shadow-blue-500/50 shadow-lg ring-1 ring-blue-500/50"
            onFinish={() => {
              setTutorialOn(false);
            }}
          />
        )}
        <GhostLayer />
        <div className="flex h-screen w-screen bg-white">
          {/* Sidebar (Left) */}
          <aside className="w-64 flex flex-col bg-blue-50/50 border-r border-blue-100 h-full">
            {/* Logo */}
            <div className="px-4 pt-5 pb-4 border-b border-blue-100">
              <Logo />
            </div>

            {/* Toolbar + Inbox */}
            <div className="flex flex-col flex-1 px-3 py-4 gap-4 overflow-y-auto">
              <Toolbar /> {/* tutorial-step-1 */}
              <Inbox /> {/* tutorial-step-2 */}
            </div>
          </aside>

          {/* Main Content (Right) */}
          <main className="flex flex-1 flex-col h-full overflow-y-auto">
            {/* Top bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-blue-100 bg-white">
              <AiToolbar />
              {/* tutorial-step-5 */}
              <Button
                onClick={() => {
                  setTutorialOn(true);
                }}
              >
                Help
              </Button>
              <LoginFeature />
              {/* tutorial-step-6 */}
            </div>

            {/* Calendar + Info row */}
            <div className="flex flex-row gap-6 items-start justify-start w-full px-5 py-4 border-b border-blue-100">
              <TaskCalendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
              {/* tutorial-step-3 */}
              <div className="w-px self-stretch bg-blue-100" />
              <Information />
            </div>

            {/* Tasks */}
            <div className="flex-1 px-5 py-4">
              <TasksView selectedDate={selectedDate} /> {/* tutorial-step-4 */}
            </div>
          </main>
        </div>
      </DndProvider>
      <Toaster position="top-center" richColors closeButton duration={4000} />
      <Mocker run={true} />
    </>
  );
}

export default App;
