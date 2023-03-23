import React from 'react';
import './Users.css';
import { UsersProps } from '../../interfaces/Users/UserProps';

export class Users extends React.Component<UsersProps, { selectedUserID: number }> {

    constructor(public props: UsersProps) {
        super(props);
        this.state = {
            selectedUserID: -1
        };
    }

    selectUser(user: any) {
        this.props.sendUser(user);
        this.setState({
            selectedUserID: user.id
        })
    }

    render() {
        if (this.props.userList && this.props.userList.length > 0) {
            return (
                this.props.userList.map((user: any) => {
                    return (
                        <div key={user.id}
                            className="col-xs-12 user" onClick={() => this.selectUser(user)}>
                            <span className={`${user.id === this.state.selectedUserID ? 'font-weight-600 color-red' : ''}`}>
                                {user.first_name} {user.last_name}
                            </span>
                        </div>
                    )
                })
            );
        } else {
            return null;
        }
    }

}
