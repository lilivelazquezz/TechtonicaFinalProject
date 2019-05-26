import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button, Container, Col, Row, Badge } from 'react-bootstrap';
import Dashboard from '../Dashboard';


export default class avatar extends Component {
  
    constructor(props) {
      
        super(props);
    this.state={
        
        avatarUrl :`https://avatars.dicebear.com/v2/female/1.svg`  
    }
    this.onClick= this.onClick.bind(this);
}

    getRandomAvatar(){
        
        let random = Math.floor(Math.random() * 1000)
        this.setState({avatarUrl:`https://avatars.dicebear.com/v2/${this.state.gender}/${random}.svg`}, console.log(random))
       
    }

    selectAvatar(){
        console.log('almost there')
        console.log(this.props.user_info.id)
        let body = {
            user_id: this.state.user_id,
            avatar: this.state.avatarUrl
        }
        console.log(body)

        fetch('/avatar', {
            method: 'put',
            body: JSON.stringify(body),
			headers: {
			  "Content-type": "application/json"
			}
        })
        .then(res => console.log(res));
         

    }

    onClick=(e) => {this.getRandomAvatar(e)}

    handelMaleSelected=(e) => {this.setState({gender:'male', user_id:this.props.user_info.id})}
    handelFemaleSelected=(e) => {this.setState({gender:'female', user_id:this.props.user_info.id})}
  

    

    render() {


        return (
            <div >
                <div style={{ margin:'auto', textAlign:'center'}}>
                    <h1>Select Gender</h1>
                    <button onClick= {this.handelMaleSelected.bind(this)}>Male </button>
                    <button onClick= {this.handelFemaleSelected.bind(this)}>Female </button>
                    <br/>
                    <h1>Get Avatar!</h1>
                    <button  onClick={this.onClick.bind(this)}>Click Me!</button>
                    <br/>
                </div>
            <img style={{width:"30%", marginTop:'20px', marginLeft:'35%'}} src={this.state.avatarUrl} alt={'random avatar'}/>
            <br/>
            
            <Link to ='/callback'>
            <button style={{width:"30%", marginTop:'10px', marginLeft:'35%'}} onClick={this.selectAvatar.bind(this)}>
            Use this Avatar</button>
             <h1> link </h1> 
            </Link>
            </div>
        )


    }
}