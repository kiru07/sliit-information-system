import React from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import AdminHome from '../components/admin/AdminHome'
import AdminAdd from '../components/admin/AdminAdd'
import AdminView from '../components/admin/AdminView'
import InstructorAdd from '../components/admin/InstructorAdd'
import InstructorView from '../components/admin/InstructorView'

const AdminRouter = () => {
    <BrowserRouter>
        <div>
            <AdminHome />
            <Switch>
                <Route path="/admin/addAdmin" component={AdminAdd} />
                <Route path="/admin/viewAdmin" component={AdminView} />
                <Route path="/admin/addInstructor" component={InstructorAdd} />
                <Route path="/admin/viewInstructor" component={InstructorView} />
            </Switch>
        </div>
    </BrowserRouter>
}

export default AdminRouter;