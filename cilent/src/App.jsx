import Logo from "@/features/Logo";
import Toolbar from "@/features/Toolbar";
import Inbox from "@/features/Inbox";
import { Separator } from "@/components/ui/separator";
import AiToolbar from "./features/AiToolbar";
import { TaskCalendar } from "./features/TaskCalendar";
import { useState } from "react";
import TasksView from "@/features/TasksView";
import Information from "@/features/Information";
import { DndProvider, GhostLayer } from "bhi-dnd";
import Tutorial from "@/lib/tutorial/Tutorial";
import steps from "@/lib/tutorial/steps";
import { Button } from "@/components/Button";
import LoginFeature from "./features/login/LoginFeature";

function App() {
  // Selected date State
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isTutorialOn, setTutorialOn] = useState(true);

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
        <div className="flex h-screen w-screen">
          {/* Sidebar (Left) */}
          <aside className="w-64 flex flex-col p-4 gap-3 justify-center items-center">
            {/* Logo */}
            <div className="flex-1">
              <Logo />
            </div>
            <Separator />
            {/* Container for tasks & toolbar */}
            <div className="h-full flex flex-col gap-3">
              <Toolbar /> {/* tutorial-step-1 */}
              <Inbox /> {/*  tutorial-step-2 */}
            </div>
          </aside>

          <Separator orientation="vertical" />

          {/* Main Content (Right) */}
          <main className="flex flex-1 flex-col p-3 h-full overflow-y-auto space-y-4">
            {/* Github / maybe login and more toolbar */}
            <div className=""></div>

            {/* AI container & Options*/}
            <div className="flex items-center gap-2">
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
            </div>
            <Separator />

            {/* Calendar */}
            <div className="flex flex-row gap-6 items-start justify-start w-full p-3 ">
              <TaskCalendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />{" "}
              {/* tutorial-step-3 */}
              <Separator orientation="vertical" />
              <Information />
            </div>

            <Separator />
            {/* Another Component */}
            <div className="items-start justify-start gap-1 flex-1">
              <TasksView selectedDate={selectedDate} /> {/* tutorial-step-4 */}
            </div>
          </main>
        </div>
      </DndProvider>
    </>
  );
}

export default App;
