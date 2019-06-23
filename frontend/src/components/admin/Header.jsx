import React,{Component} from 'react';
import {BrowserRouter,Route,NavLink} from 'react-router-dom'
import Nav from '../Nav'

export default class AdminHome extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return(
            <header>
                <div>
                    <Nav buttonType="logout"/>

                    <div class="w3-sidebar w3-bar-block w3-light-grey w3-card" style={{width:"15%"}}>
                        
                        <h6 class="side-title">Administrator</h6>
                        <NavLink to="/admin/addAdmin"><button type="submit"  className="linker w3-bar-item w3-button font" >Add Administrator</button></NavLink>
                        <NavLink to="/admin/viewAdmin"><button type="submit"  className="linker w3-bar-item w3-button font" >View Administrator</button></NavLink>
                        <h6 class="side-title">Instructor</h6>
                        <NavLink to="/admin/addInstructor"><button type="submit"  className="linker w3-bar-item w3-button font" >Add Instructor</button></NavLink>
                        <NavLink to="/admin/viewInstructor"><button type="submit"  className="linker w3-bar-item w3-button font" >View Instructor</button></NavLink>
                        <h6 class="side-title">Student</h6>
                        <NavLink to="/admin/viewStudent"><button type="submit"  className="linker w3-bar-item w3-button font" >View Student</button></NavLink>
                        <h6 class="side-title">Course</h6>
                        <NavLink to="/admin/addCourse"><button type="submit"  className="linker w3-bar-item w3-button font" >Add Course</button></NavLink>
                        <NavLink to="/admin/viewCourse"><button type="submit"  className="linker w3-bar-item w3-button font" >View Course</button></NavLink>
                        
                    </div>

                    <div>
                    <div class="jumbotron jumbotron-fluid">
                        <div class="container">
                            <h1 class="display-4">Welcome to Administrator Portal</h1>
                            {/* <p class="lead">You can Add, View, Edit, Delete Administrator</p>
                            <p class="lead">You can Add, View, Edit, Delete Instructor</p>
                            <p class="lead">You can View, Edit, Delete Student</p>
                            <p class="lead">You can Add, View, Edit, Delete Course</p> */}
                        </div>
                        </div>
                    </div>

                </div>
            </header>
            
        )
    }
}