export interface TaskItem {
    taskID: number
    summary: string;
    priority: string;
    description: string;
    status: string;
}

export enum TaskStatus {
    TO_DO = 'TO DO',
    IN_PROGRESS = 'IN PROGRESS',
    DONE = 'DONE'
}

export enum Priority {
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW'
}
