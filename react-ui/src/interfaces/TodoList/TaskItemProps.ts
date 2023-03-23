import { TaskItem } from "./TaskItem";

export interface TaskItemProps {
    taskItem: TaskItem;
    updateItem(type: string, value: string, item: TaskItem): any;
    deleteItem(item: any): any;
}
