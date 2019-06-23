import React,{Component} from 'react'
import axios from 'axios'
import CourseViewRow from './CourseViewRow'
import AdminAdd from './AdminAdd'
import Nav from '../Nav'
import '../../stylesheet/common.css'


export default class CourseView extends Component{
    constructor(props){
        super(props);
        this.state = {
            courses:[],
            showEdit:false
        }

        this.loadAdminView=this.loadAdminView.bind(this);
        this.showAdminTableOrEdit=this.showAdminTableOrEdit.bind(this);
        this.viewEditForm=this.viewEditForm.bind(this);
    }

    componentDidMount(){
        this.loadAdminView();
    }

    loadAdminView(){
        fetch('/courses', {method: 'GET'})
            .then(res => res.json())
            .then(jsonRes => {console.log(jsonRes.data)
                    this.setState({courses:jsonRes.data}) 
                })
            .catch(err => console.log(err));
    }


    showAdminTableOrEdit(){
        var show = this.state.showEdit;
        console.log(show)
        if(show == false){
            return(
                <div>
                    {/* <Nav buttonType="logout"/> */}
                    <div className="container">
                    <br/><br/>
                    <h2 className="font head-font text-center">View Courses</h2>
                    
                        <table className="table table-striped table-main">
                            <thead className="font table-head">
                                <tr>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Instructor</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody className="font">
                                {this.state.courses.map((cou)=>{
                                    return <CourseViewRow key={cou._id} instructor={cou} loadAdminView={this.loadAdminView} viewEditForm={this.viewEditForm}/>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        } 
    }

    viewEditForm(){
        // this.setState({
        //     showEdit:true
        // });
        // this.showAdminTableOrEdit();
    }

    render(){
        return(
            <div>
                {this.showAdminTableOrEdit()}
            </div>
        )
    }
}