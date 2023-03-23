import React from 'react';
import { EmployeeProps } from '../interfaces/Employee/EmployeeProps';

const Employee: React.FC<EmployeeProps> = (props) => {
    const employeesData: Array<any> = props.employeesData;
    if (employeesData && employeesData.length > 0) {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employeesData.map((employeeData: any) => {
                            return (
                                <tr key={employeeData.id}>
                                    <td>{employeeData.employee_name}</td>
                                    <td>{employeeData.employee_salary}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    } else {
        return (
            <p>Employee data not found</p>
        )
    }
}

export default Employee;
