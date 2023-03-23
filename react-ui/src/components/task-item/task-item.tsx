import React from 'react';
import { TaskItemProps } from '../../interfaces/TodoList/TaskItemProps';
import { TaskItem, Priority, TaskStatus } from '../../interfaces/TodoList/TaskItem';
import { IonSelect, IonSelectOption } from '@ionic/react';

const TaskItemComponent: React.FC<TaskItemProps> = (props) => {
    const taskItem: TaskItem = props.taskItem;

    const deleteTaskItem = () => {
        props.deleteItem(taskItem);
    }

    let priorityClassList = ['font-weight-bolder'];
    if (taskItem.priority === Priority.HIGH) {
        priorityClassList.push('high-priority');
    } else if (taskItem.priority === Priority.MEDIUM) {
        priorityClassList.push('medium-priority');
    } else {
        priorityClassList.push('low-priority');
    }

    let statusClassList = ['font-weight-bolder'];
    if (taskItem.status === TaskStatus.DONE) {
        statusClassList.push('done-status');
    } else if (taskItem.status === TaskStatus.IN_PROGRESS) {
        statusClassList.push('in-progress-status');
    } else {
        statusClassList.push('todo-status');
    }

    return (
        <div className="task-item col-xs-12">

            {/* Task Summary and Description */}
            <div className="col-xs-12">
                <div className="col-xs-8 col-md-7 font-weight-bolder">Task-{taskItem.taskID} {taskItem.summary}</div>
                <button onClick={deleteTaskItem} className="delete-button font-weight-bolder float-right">
                    DELETE
                </button>
                <div className="col-xs-12 col-md-8">{taskItem.description}</div>
            </div>

            {/* Update task status and priority */}
            <div className="col-xs-12 col-md-6">
                <IonSelect value={taskItem.status} className="col-xs-5" placeholder="Update Status"
                    onIonChange={(e) => props.updateItem('status', e.detail.value, taskItem)}>
                    <IonSelectOption value={TaskStatus.TO_DO}>TO DO</IonSelectOption>
                    <IonSelectOption value={TaskStatus.IN_PROGRESS}>IN PROGRESS</IonSelectOption>
                    <IonSelectOption value={TaskStatus.DONE}>DONE</IonSelectOption>
                </IonSelect>

                <IonSelect value={taskItem.priority} className="float-right col-xs-4" placeholder="Update Priority"
                    onIonChange={(e) => props.updateItem('priority', e.detail.value, taskItem)}>
                    <IonSelectOption value={Priority.LOW}>LOW</IonSelectOption>
                    <IonSelectOption value={Priority.MEDIUM}>MEDIUM</IonSelectOption>
                    <IonSelectOption value={Priority.HIGH}>HIGH</IonSelectOption>
                </IonSelect>
            </div>

            <div className="col-xs-12 col-md-6 footer">

                {/* Task Priority */}
                <div className="task-priority float-right">
                    PRIORITY &nbsp;
                    <div className={priorityClassList.join(' ')}>
                        {taskItem.priority}
                    </div>
                </div>

                {/* Task Status */}
                <div className="task-status float-right">
                    STATUS &nbsp;
                    <div className={statusClassList.join(' ')}>
                        {taskItem.status}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskItemComponent;
