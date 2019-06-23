import React,{Component} from 'react'
import axios from 'axios'
import StudentViewRow from './StudentViewRow'
import AdminAdd from './AdminAdd'
import Nav from '../Nav'
import '../../stylesheet/common.css'


export default class StudentsView extends Component{
    constructor(props){
        super(props);
        this.state = {
            students:[],
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
        fetch('/student/get', {method: 'GET'})
            .then(res => res.json())
            .then(jsonRes => {console.log(jsonRes.data)
                    this.setState({students:jsonRes.data}) 
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
                    <h2 className="font head-font text-center">View Students</h2>
                    
                        <table className="table table-striped table-main">
                            <thead className="font table-head">
                                <tr>
                                    <th>Registration Number</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Year</th>
                                    <th>Semester</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody className="font">
                                {this.state.students.map((instructor)=>{
                                    return <StudentViewRow key={instructor._id} instructor={instructor} loadAdminView={this.loadAdminView} viewEditForm={this.viewEditForm}/>
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