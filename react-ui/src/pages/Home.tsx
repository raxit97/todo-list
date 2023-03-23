import { IonContent, IonPage, IonButton } from '@ionic/react';
import React from 'react';
import ReactDom from 'react-dom';
import Employee from '../components/Employee';
import './Home.css';
import * as request from 'request';
import { HomeState } from '../interfaces/Home/HomeState';
import { Users } from '../components/Users/Users';

class Home extends React.Component<{}, HomeState> {

  timerInterval: any;

  constructor(public props: any) {
    super(props);
    this.state = {
      currentDate: new Date(),
      message: 'Hello',
      selectedUser: undefined,
      userList: []
    };
  }

  fetchEmployeesData() {
    request.get('http://dummy.restapiexample.com/api/v1/employees', (error, response, body) => {
      const responseData = JSON.parse(body);
      const employeesData = responseData.data;
      const employeesDataElement = document.getElementsByClassName('employees-data')[0];
      ReactDom.render(<Employee employeesData={employeesData} />, employeesDataElement);
    })
  }

  receiveUser(user: any) {
    this.setState({
      selectedUser: user
    });
  }

  fetchUserData(pageIndex: number) {
    request.get(`https://reqres.in/api/users?page=${pageIndex}`, (error, response, body) => {
      const responseData = JSON.parse(body);
      const userList = responseData.data;
      this.setState({
        userList: userList
      })
    });
  }

  render() {
    return (
      <IonPage>
        <IonContent>
          <IonButton onClick={() => this.fetchUserData(1)}>
            First Page
          </IonButton>
          <IonButton onClick={() => this.fetchUserData(2)}>
            Second Page
          </IonButton>
          <React.Fragment>
            {
              this.state.selectedUser ? <p>Selected User Email ID: {this.state.selectedUser.email}</p> : null
            }
          </React.Fragment>
          <div className="employees-data"></div>
          <div className="user-data">
          <Users sendUser={this.receiveUser.bind(this)} userList={this.state.userList} />
          </div>
        </IonContent>
      </IonPage>
    );
  }

};

export default Home;
