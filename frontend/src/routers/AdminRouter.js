import React,{Component} from 'react';
import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom'
import AdminHome from '../components/admin/AdminHome'
import AdminAdd from '../components/admin/AdminAdd'
import AdminView from '../components/admin/AdminView'
import AdminEdit from '../components/admin/AdminEdit'
import InstructorAdd from '../components/admin/InstructorAdd'
import InstructorView from '../components/admin/InstructorView'
import InstructorEdit from '../components/admin/InstructorEdit'
import Header from '../components/admin/Header'
import CourseAdd from '../components/admin/CourseAdd';
import CourseView from '../components/admin/CourseView';
import StudentView from '../components/admin/StudentView';

export default class AdminRouter extends Component {


    render(){
        return(
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/admin/addAdmin" component={AdminAdd} />
                        <Route path="/admin/viewAdmin" component={AdminView} />
                        <Route path="/admin/editAdmin/:id" component={AdminEdit} />
                        <Route path="/admin/addInstructor" component={InstructorAdd} />
                        <Route path="/admin/viewInstructor" component={InstructorView} />
                        <Route path="/admin/editInstructor/:id" component={InstructorEdit} />
                        <Route path="/admin/addCourse" component={CourseAdd} />
                        <Route path="/admin/viewCourse" component={CourseView} />
                        <Route path="/admin/viewStudent" component={StudentView} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
    
};
