import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBContainer,MDBAnimation, MDBRow,MDBScrollbar,ToastContainer} from "mdbreact";
import "../index.css";
import Navbar from '../Components/Navbar'
import logo from "../logo.png";
import ClubNews from '../Containers/ClubNews'
import PanelPage from '../Components/PanelPage'
import LoginForm from '../Components/LoginForm'
import Subscription from '../Components/Subscription'
import Footer from '../Components/Footer'
import {connect} from 'react-redux'
import axios from 'axios'
class Home extends Component {



  render() {
    let comp = ()=>{}

    if (this.props.formStatus===true) {
      comp = ()=>{return (<MDBAnimation type="slideInLeft"><LoginForm/></MDBAnimation>)}
    }else if (this.props.formStatus===false) {
        comp = ()=>{return (<MDBAnimation type="fadeInDown"><Subscription/></MDBAnimation>)}
    }


    return (

      <div style={{overflowY:"scroll",overflowX:"hidden",height:"100vh"}}>
        <MDBRow >
          <Navbar search={false}/>
        </MDBRow >

          <MDBRow  style={{width:"100%"}}  className="d-flex justify-content-center ">
            <MDBCol style={{paddingTop:"100px"}}  md="4" xs="4"   className="d-flex justify-content-center ">
            {comp()}
            </MDBCol>
        </MDBRow>
        <ToastContainer
               hideProgressBar={true}
               newestOnTop={true}
               autoClose={5000}
               toastClassName={this.props.toastType==="error"?"rounded-pill red":"rounded-pill purple-gradient"}
               bodyClassName="d-flex justify-content-center align-self-center"
               style={{maxWidth:"15rem"}}
             />

        </div>


    );
  }
}
const mapStatetoProps = state =>({
  formStatus:state.Reducer.statusForm,
  toastType:state.Reducer.toastType
})
const mapDispatchtoProps = dispatch =>({
    switchForm:()=>dispatch({type:"SWITCHFORM"})
})
export default connect(mapStatetoProps,mapDispatchtoProps)(Home);
