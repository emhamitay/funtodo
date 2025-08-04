export const TASK_STATUS = {
  DIDNT_STARTED: "didn't started",
  IN_PROGRESS: "in progress",
  FINISHED: "finished",
};

export class mTask {
  constructor(
    name,
    description = "",
    date = null,
    id = null,
    isdone = false,
    priority = "medium"
  ) {
    this.id = id || crypto.randomUUID();
    this.name = name;
    this.description = description;
    this.isdone = isdone;
    this.date = date;
    this.groupIndex = null; // would be updated in the store
    this.priority = priority;
  }

  // Static method to create from server data
  static fromServerData(serverTask) {
    return new mTask(
      serverTask.title, // Server uses 'title', frontend uses 'name'
      serverTask.description || '',
      serverTask.dueDate ? new Date(serverTask.dueDate) : null,
      serverTask.id,
      serverTask.completed, // Server uses 'completed', frontend uses 'isdone'
      serverTask.priority
    );
  }

  // Convert to server format
  toServerData() {
    return {
      title: this.name,
      description: this.description,
      dueDate: this.date,
      completed: this.isdone,
      priority: this.priority
    };
  }
}
