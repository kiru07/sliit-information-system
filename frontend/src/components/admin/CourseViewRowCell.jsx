import React,{Component} from 'react'
import {BrowserRouter,Route,NavLink} from 'react-router-dom'
import axios from 'axios'
import '../../stylesheet/common.css'


export default class CourseViewRowCell extends Component{
    constructor(props){
        super(props);
        this.state = {
            instructor:props.instructor,
           
        }

        this.deleteAdmin=this.deleteAdmin.bind(this);
    }

    deleteAdmin() {
      console.log(document.getElementById('delete').name)
      var regId = document.getElementById('delete').name;

      
      axios.delete('/courses/'+this.state.instructor._id)
        .then(res => {
          {this.props.loadAdminView()}
          console.log(res)
          alert("Deleted Successfully!")
        })

      console.log(document.getElementById('delete').name)
      var regId = document.getElementById('delete').name;


    }

    render(){
        return(
            <tr>
                <td>{this.state.instructor.name}</td>
            </tr>
        )
    }

}