/**
 * Task status enum used for UI representation.
 */
export const TASK_STATUS = {
  DIDNT_STARTED: "didn't started",
  IN_PROGRESS: "in progress",
  FINISHED: "finished",
};

/**
 * Model: mTask
 *
 * Represents a task in the client application. Encapsulates mapping
 * between frontend properties and server payload fields.
 */
export class mTask {
  constructor(
    name,
    description = "",
    date = null,
    id = null,
    isdone = false,
    groupIndex = 0
  ) {
    this.id = id || crypto.randomUUID();
    this.name = name;
    this.description = description;
    this.isdone = isdone;
    this.date = date;
    this.groupIndex = groupIndex;
  }

  /**
   * Create a task instance from server data shape.
   * @param {Object} serverTask - Task as received from the server
   * @returns {mTask}
   */
  static fromServerData(serverTask) {
    return new mTask(
      serverTask.title, // Server uses 'title', frontend uses 'name'
      serverTask.description || "",
      serverTask.date ? new Date(serverTask.date) : null, // Server sends 'date', not 'dueDate'
      serverTask.id,
      serverTask.completed || serverTask.isDone, // Handle both 'completed' and 'isDone'
      serverTask.groupIndex || 0
    );
  }

  /**
   * Convert this task to the server payload shape.
   * @returns {{title:string, description:string, dueDate:Date|null, completed:boolean}}
   */
  toServerData() {
    return {
      title: this.name,
      description: this.description,
      dueDate: this.date,
      completed: this.isdone,
    };
  }
}
