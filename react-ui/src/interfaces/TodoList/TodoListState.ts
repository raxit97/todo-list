import { TaskItem } from "./TaskItem";

export interface TodoListState {
    taskItems: Array<TaskItem>;
    filteredTaskItems: Array<TaskItem>;
    filterByPriority: Array<string>;
    filterByTaskStatus: Array<string>;
}
