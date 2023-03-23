import React, { useEffect, useState } from 'react';
import './todo-list.css';
import { IonPage, IonContent, IonSelect, IonSelectOption } from '@ionic/react';
import TaskItemComponent from '../../components/task-item/task-item';
import { TaskItem, Priority, TaskStatus } from '../../interfaces/TodoList/TaskItem';
import AddTaskComponent from '../../components/add-task/add-task';
import { withApollo } from "react-apollo";
import { GET_LIST_ITEMS, ADD_OR_UPDATE_LIST_ITEM, DELETE_TASK_ITEM } from '../../constants/graphql-queries';
import { ApolloClient } from 'apollo-boost';
import { useDispatch } from 'react-redux';
import { ACTION_TYPES } from '../../store/actions/action-types';

const TodoList: React.FC<{ client: ApolloClient<any> }> = (props) => {

    const [taskItems, setTaskItems] = useState(new Array<TaskItem>());
    const [filteredTaskItems, setFilteredTaskItems] = useState(new Array<TaskItem>());
    const [filterByPriority, setFilterByPriority] = useState(new Array<string>());
    const [filterByTaskStatus, setFilterByTaskStatus] = useState(new Array<string>());
    const dispatch = useDispatch();
    const taskItemAdded = () => dispatch({ type: ACTION_TYPES.TASK_ITEM_ADDED });

    useEffect(() => {
        const fetchData = async () => {
            const res = await props.client.query({ query: GET_LIST_ITEMS });
            const responseBody = res && res.data && res.data.getListItems;
            if (responseBody && responseBody.isSuccess) {
                setTaskItems(responseBody.ResponseBody);
                setFilteredTaskItems(responseBody.ResponseBody);
            }
        }
        fetchData();
    }, [props.client]);

    /**
     * @function addOrUpdateTaskItem
     * @description
     */
    const addOrUpdateTaskItem = async (taskItem: TaskItem) => {
        const { status, description, priority, summary, taskID } = taskItem;
        const res = await props.client.query({
            query: ADD_OR_UPDATE_LIST_ITEM,
            variables: {
                listItem: { status, description, priority, summary, taskID }
            }
        });
        const responseBody = res && res.data && res.data.addOrUpdateListItem;
        if (responseBody && responseBody.isSuccess) {
            return;
        }
    }

    /**
     * @function addItem
     * @description This method adds a task item in the todo-list
     */
    const addItem = async (taskItem: TaskItem) => {
        taskItem.taskID = getTaskID();
        await addOrUpdateTaskItem(taskItem);
        const updatedTaskItems: Array<TaskItem> = [...taskItems];
        updatedTaskItems.push(taskItem);
        setTaskItems(updatedTaskItems);
        filterTaskItems(updatedTaskItems);
        taskItemAdded();
        // addTaskEventEmitter.emit('addTaskSuccess');
    }

    /**
     * @function getTaskID
     * @description This method gets the ID of the task item during addition of a task item in the todo-list
     */
    const getTaskID = (): number => {
        if (taskItems && taskItems.length > 0) {
            return taskItems[taskItems.length - 1].taskID + 1;
        } else {
            return 1;
        }
    }

    /**
     * @function updateItem
     * @description This method updates the task status or priority of the task item
     */
    const updateItem = async (type: string, value: string, selectedTaskItem: TaskItem) => {
        if (type === 'status') {
            selectedTaskItem.status = value;
        } else {
            selectedTaskItem.priority = value;
        }
        await addOrUpdateTaskItem(selectedTaskItem);
        const selectedTaskItemIndex = taskItems.findIndex((taskItem: TaskItem) => {
            return taskItem.taskID === selectedTaskItem.taskID;
        });
        const updatedTaskItems: Array<TaskItem> = [...taskItems];
        updatedTaskItems[selectedTaskItemIndex] = selectedTaskItem;
        setTaskItems(updatedTaskItems);
        filterTaskItems(updatedTaskItems);
    }

    /**
     * @function deleteItem
     * @description This method deletes the task item from the todo-list
     */
    const deleteItem = async (selectedTaskItem: TaskItem) => {
        const response = await props.client.query({
            query: DELETE_TASK_ITEM,
            variables: { taskID: selectedTaskItem.taskID }
        });
        const responseBody = response && response.data && response.data.deleteTaskItem;
        if (responseBody.isSuccess) {
            const selectedTaskItemIndex = taskItems.findIndex((taskItem: TaskItem) => {
                return taskItem.taskID === selectedTaskItem.taskID;
            });
            const updatedTaskItems: Array<TaskItem> = [...taskItems];
            updatedTaskItems.splice(selectedTaskItemIndex, 1);
            setTaskItems(updatedTaskItems);
            filterTaskItems(updatedTaskItems);
        }
    }

    /**
     * @function onFilterChange
     * @description Event listener during onChange of the filter selectors
     */
    const onFilterChange = (filterBy: string, value: Array<string>) => {
        if (filterBy === 'priority') {
            setFilterByPriority(value);
        } else {
            setFilterByTaskStatus(value);
        }
        filterTaskItems(taskItems);
    }

    /**
     * @function filterTaskItems
     * @description This method filters the task items based on the filter selectors. This is invoked on every updation of the list.
     */
    const filterTaskItems = (taskItems: Array<TaskItem>) => {
        let filteredTaskItems: Array<TaskItem> = taskItems;
        filteredTaskItems = filteredTaskItems.filter((taskItem: TaskItem) => {
            let isPrioritySatisfied: boolean = true;
            let isTaskStatusSatisfied: boolean = true;
            if (filterByPriority.length > 0) {
                isPrioritySatisfied = filterByPriority.includes(taskItem.priority);
            }
            if (filterByTaskStatus.length > 0) {
                isTaskStatusSatisfied = filterByTaskStatus.includes(taskItem.status);
            }
            return isPrioritySatisfied && isTaskStatusSatisfied;
        });
        console.log('filterTaskItems ::: ', filteredTaskItems);
        setFilteredTaskItems(filteredTaskItems);
    }

    let todoList = null;
    if (filteredTaskItems.length > 0) {
        todoList = filteredTaskItems.map((taskItem: TaskItem) => {
            return (
                // Task Item Component which displays each task item
                <TaskItemComponent
                    key={taskItem.taskID}
                    taskItem={taskItem}
                    updateItem={updateItem}
                    deleteItem={deleteItem}>
                </TaskItemComponent>
            )
        });
    } else {
        todoList = <div className="col-xs-12">
            <p className="text-center">There are no items for this selection. Please update your filters.</p>
        </div>;
    }
    console.log('render ::: ', filteredTaskItems);
    return (
        <IonPage>
            <IonContent>
                <div className="page-content">
                    <div className="col-xs-12">
                        <h1 className="text-center">ADD TASK ITEM</h1>
                    </div>

                    {/* Add Task Component to add task items in the tdod-list */}
                    <AddTaskComponent addTaskItem={addItem}></AddTaskComponent>

                    <div className="col-xs-12">
                        <h1 className="text-center">YOUR CURRENT TODO-LIST</h1>
                    </div>

                    {/* Filter By Task Status */}
                    <IonSelect multiple className="col-xs-5 col-md-3" placeholder="Filter By Status"
                        onIonChange={(e) => onFilterChange('taskStatus', e.detail.value)}>
                        <IonSelectOption value={TaskStatus.TO_DO}>TO DO</IonSelectOption>
                        <IonSelectOption value={TaskStatus.IN_PROGRESS}>IN PROGRESS</IonSelectOption>
                        <IonSelectOption value={TaskStatus.DONE}>DONE</IonSelectOption>
                    </IonSelect>

                    {/* Filter By Task Priority */}
                    <IonSelect multiple className="float-right col-xs-5 col-md-3" placeholder="Filter By Priority"
                        onIonChange={(e) => onFilterChange('priority', e.detail.value)}>
                        <IonSelectOption value={Priority.LOW}>LOW</IonSelectOption>
                        <IonSelectOption value={Priority.MEDIUM}>MEDIUM</IonSelectOption>
                        <IonSelectOption value={Priority.HIGH}>HIGH</IonSelectOption>
                    </IonSelect>

                    {/* Displaying the TODO-LIST */}
                    {todoList}
                </div>
            </IonContent>
        </IonPage>
    )

}

export default withApollo(TodoList);
