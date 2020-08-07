import React , {useEffect} from 'react';
import Login from "./containers/login/login"
import SignUp from "./containers/signUp/signUp"
import Layout from "./components/Layout"
import Home from "./containers/Home/Home"
import {Switch, Route , Redirect} from "react-router-dom"
import * as actions from "./store/actions/index"
import {connect} from "react-redux"
import Logout from "./containers/logout"

function App(props) {

  useEffect(()=>{
    props.auth_check()
  } ,[props.auth_check()])

  let routes = <Switch>
    <Route path="/login" component={Login} />
    <Route path="/signUp" component={SignUp} />
    <Route path="/" component={Home} />
    <Redirect to="/" />
</Switch>

if(props.authenticated){
  routes = <Switch>
  <Route path="/logout" component={Logout} />
  <Route path="/" component={Home} />
  <Redirect to="/" />
</Switch>

}


  return (
    <div className="App">
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return{
    auth_check : ()=>dispatch(actions.auth_check())
  }
}

const mapStateToProps = state=>{
  return{
    authenticated : state.auth.token ? true :false
  }
}

export default connect(mapStateToProps , mapDispatchToProps) (App);
