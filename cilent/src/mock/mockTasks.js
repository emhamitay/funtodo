// mockTasks.js

export const TASK_STATUS = {
  DIDNT_STARTED: "didn't started",
  IN_PROGRESS: "in progress",
  FINISHED: "finished",
}

export class mTask {
  constructor(name, description = "", isdone = false, date = null) {
    this.name = name
    this.description = description
    this.isdone = isdone
    this.date = date // Date object or null
  }
}

const mockTasks = [
  new mTask("Buy groceries", "Milk, Eggs, Bread", false, new Date(2025, 6, 6)),
  new mTask("Complete project report", "Final version", true, new Date(2025, 6, 10)),
  new mTask("Read a book", "Atomic Habits", false),
  new mTask("Doctor appointment", "Check-up", true, new Date(2025, 6, 15)),
  new mTask("Call mom", "", false),
  new mTask("Fix bike", "Change tires", false, new Date(2025, 7, 3)),
  new mTask("Pay bills", "Electricity and Water", true, new Date(2025, 6, 10)),
  new mTask("Plan vacation", "Look for flights", false, new Date(2025, 7, 12)),
  new mTask("Clean house", "", true),
  new mTask("Prepare presentation", "For Monday meeting", false, new Date(2025, 6, 20)),
  new mTask("Water plants", "", false, new Date(2025, 6, 6)),
  new mTask("Learn Zustand", "State management in React", false),
  new mTask("Update resume", "", true),
  new mTask("Visit grandparents", "Bring cake", true, new Date(2025, 7, 15)),
  new mTask("Organize workspace", "", false, new Date(2025, 7, 1)),
]

export default mockTasks
