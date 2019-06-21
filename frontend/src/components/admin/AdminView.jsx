import React,{Component} from 'react'
import axios from 'axios'
import AdminViewRow from './AdminViewRow'
import Nav from '../Nav'
import '../../stylesheet/common.css'


export default class AdminView extends Component{
    constructor(props){
        super(props);
        this.state = {
            admins:[]
        }
    }

    componentDidMount(){
        // axios.get("http://localhost:4000/api/admin/get")
        //     .then(res => {this.setState({admins:res.data}) 
        //         console.log(res.data)})
        //     .catch(err => console.log(err))

        fetch('http://localhost:4000/api/admin/get', {method: 'GET'})
            .then(res => res.json())
            .then(jsonRes =>  {this.setState({admins:jsonRes.data}) 
                console.log(jsonRes.data)})
            .catch(err => console.log(err));
    }

    render(){
        return(
            <div>
                <Nav buttonType="logout"/>
                <div className="container">
                <br/><br/>
                <h2 className="font text-center">View Administrator</h2>
                
                    <table className="table table-striped table-main">
                        <thead className="font table-head">
                            <tr>
                                <th>Registration Number</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Qualification</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody className="font">
                            {this.state.admins.map((admin)=>{
                                return <AdminViewRow key={admin._id} admin={admin}/>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}