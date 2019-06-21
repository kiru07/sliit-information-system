import React,{Component} from 'react';
import {BrowserRouter,Route,Link} from 'react-router-dom'
import Nav from '../Nav'

export default class AdminHome extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return(
            <div>
                <Nav buttonType="logout"/>

                <div className="card" style={{width:"18rem"}}>
                {/* <img src="..." class="card-img-top" alt="..."/> */}
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
                </div>
            </div>
            
        )
    }
}