import React from 'react'
import {NavLink} from "react-router-dom"
import classes from "./navbar.module.scss"
import {connect} from "react-redux"

const navbar = (props) => {
    return (
        <div className = {classes.navbar}>
            <div className={classes.navbar__links}>

                <NavLink exact className={classes.navbar__link} activeClassName={classes.active} to="/">Home</NavLink>
                {!props.authenticated ? <NavLink  className={classes.navbar__link} activeClassName={classes.active} to="/login">Login</NavLink> :null}
               {!props.authenticated  ? <NavLink  className={classes.navbar__link} activeClassName={classes.active} to="/signUp">SignUp</NavLink> :null}
                {props.authenticated ? <NavLink  className={classes.navbar__link} activeClassName={classes.active} to="/logout">Logout</NavLink> : null}

                { props.authenticated ? <NavLink  className={classes.navbar__link} activeClassName={classes.active} to="/logout">{props.username}</NavLink>:null}
                


            </div>
            
        </div>
    )
}

const mapStateToProps = state=>{
    return{
        authenticated:state.auth.token ? true :false,
        username : state.auth.username
    }
}

export default connect(mapStateToProps , null)(navbar)
