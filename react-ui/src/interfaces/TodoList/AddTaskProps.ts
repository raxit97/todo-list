import { TaskItem } from "./TaskItem";

export interface AddTaskProps {
    addTaskItem(taskItem: TaskItem): any;
    isTaskItemAdded: boolean;
    resetAddedStatus: any;
}
