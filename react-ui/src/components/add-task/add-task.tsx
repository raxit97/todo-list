import React from 'react';
import { AddTaskProps } from '../../interfaces/TodoList/AddTaskProps';
import { TaskItem, Priority } from '../../interfaces/TodoList/TaskItem';
import { IonSelect, IonSelectOption, IonButton } from '@ionic/react';
import { AddTaskState } from '../../interfaces/TodoList/AddtaskState';
import { ACTION_TYPES } from '../../store/actions/action-types';
import { connect } from 'react-redux';

export class AddTaskComponent extends React.Component<AddTaskProps, AddTaskState> {

    constructor(props: AddTaskProps) {
        super(props);
        this.state = {
            summary: '',
            description: '',
            status: 'TO DO',
            priority: 'LOW'
        };
    }

    addTask() {
        const taskItem: TaskItem = {
            taskID: -1,
            summary: this.state.summary,
            description: this.state.description,
            status: this.state.status,
            priority: this.state.priority
        }
        this.props.addTaskItem(taskItem);
    }

    componentDidUpdate() {
        if (this.props.isTaskItemAdded) {
            this.setState({
                summary: '',
                description: '',
                status: 'TO DO',
                priority: 'LOW'
            });
            this.props.resetAddedStatus();
        }
    }

    render() {
        return (
            <div className=" add-task col-xs-12">

                <div className="col-xs-12">
                    <input className="col-xs-12" type="text" placeholder="Enter the Summary" value={this.state.summary}
                        onChange={(e) => this.setState({ summary: e.target.value })} />
                </div>

                <div className="col-xs-12">
                    <textarea rows={6} className="col-xs-12" value={this.state.description} placeholder="Enter the task description"
                        onChange={(e) => this.setState({ description: e.target.value })}>
                    </textarea>
                </div>

                <div className="col-xs-12">
                    <IonSelect value={this.state.priority} onIonChange={(e) => this.setState({ priority: e.detail.value })}
                        className="col-xs-4 col-md-2" placeholder="Update Priority">
                        <IonSelectOption value={Priority.LOW}>LOW</IonSelectOption>
                        <IonSelectOption value={Priority.MEDIUM}>MEDIUM</IonSelectOption>
                        <IonSelectOption value={Priority.HIGH}>HIGH</IonSelectOption>
                    </IonSelect>
                </div>

                <div className="col-xs-12">
                    <IonButton onClick={() => this.addTask()} className="float-right add-task-button">
                        ADD TASK
                    </IonButton>
                </div>

            </div>
        )
    }

}

const mapStateToProps = (state: any) => {
    return { isTaskItemAdded: state.todoList.isTaskItemAdded };
};

const mapDispatchToProps = (dispatch: any) => {
    return { resetAddedStatus: () => dispatch({ type: ACTION_TYPES.RESET_ADDED_STATUS }) };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskComponent);
