import React , {useState} from 'react'
import classes from "./employee.module.scss"
import {connect} from "react-redux"
import * as actions from "../../store/actions/index"
import {withRouter} from "react-router-dom"


const Employee = ( props) => {

    const {employeeName , email ,department ,position , address , contactNo ,imgUrl, _id} = props

    const employee = {
        employeeName,
        email,
        department,
        position,
        address,
        contactNo,
        _id
    }

    const deleteEmployee = id => {

        if(! props.authenticated){
            props.history.push("/login")
        }
        else{
            props.delete(id);
        }

    }

    const clicked = (id)=>{
        props.show();
        props.setEmployee(id)

    }
    



    return (
        <div className = {classes.card}>

        

            <div className= {classes.card__header}>


                <div className={classes.card__image}> 
                    <img src={ props.src ? props.src : "http://localhost:4000/"+imgUrl} />
                </div>

                <div className ={classes.card__content}>
                    <svg onClick={()=>deleteEmployee(props._id)} className={classes.icon +" "+ classes.icon__delete} viewBox="0 0 24 24">
                        <path d="M18.984 3.984v2.016h-13.969v-2.016h3.469l1.031-0.984h4.969l1.031 0.984h3.469zM6 18.984v-12h12v12q0 0.797-0.609 1.406t-1.406 0.609h-7.969q-0.797 0-1.406-0.609t-0.609-1.406z"></path>
                    </svg>

                    <p className={classes.name}>{employeeName}</p>
                    <p className={classes.position}>{position}</p>
                    <p className={classes.department}>{department}</p>

                </div>

            </div>

            <hr className={classes.hr}/>

            <div className={ classes.car__body}>

                <div>
                    <svg className={classes.icon} viewBox="0 0 20 20">
                        <path d="M1.574 5.286c0.488 0.262 7.248 3.894 7.5 4.029s0.578 0.199 0.906 0.199c0.328 0 0.654-0.064 0.906-0.199s7.012-3.767 7.5-4.029c0.489-0.263 0.951-1.286 0.054-1.286h-16.919c-0.897 0-0.435 1.023 0.053 1.286zM18.613 7.489c-0.555 0.289-7.387 3.849-7.727 4.027s-0.578 0.199-0.906 0.199-0.566-0.021-0.906-0.199-7.133-3.739-7.688-4.028c-0.39-0.204-0.386 0.035-0.386 0.219s0 7.293 0 7.293c0 0.42 0.566 1 1 1h16c0.434 0 1-0.58 1-1 0 0 0-7.108 0-7.292s0.004-0.423-0.387-0.219z"></path>
                    </svg><span className={classes.email}>{email}</span>
                </div>
           
                <div>
                    <svg className={classes.icon} viewBox="0 0 32 28">
                        <path d="M16 17.672c0 1.359-0.891 2.328-2 2.328h-8c-1.109 0-2-0.969-2-2.328 0-2.422 0.594-5.109 3.062-5.109 0.766 0.438 1.797 1.188 2.938 1.188s2.172-0.75 2.938-1.188c2.469 0 3.062 2.688 3.062 5.109zM13.547 9.547c0 1.969-1.594 3.547-3.547 3.547s-3.547-1.578-3.547-3.547c0-1.953 1.594-3.547 3.547-3.547s3.547 1.594 3.547 3.547zM28 16.5v1c0 0.281-0.219 0.5-0.5 0.5h-9c-0.281 0-0.5-0.219-0.5-0.5v-1c0-0.281 0.219-0.5 0.5-0.5h9c0.281 0 0.5 0.219 0.5 0.5zM28 12.563v0.875c0 0.313-0.25 0.562-0.562 0.562h-8.875c-0.313 0-0.562-0.25-0.562-0.562v-0.875c0-0.313 0.25-0.562 0.562-0.562h8.875c0.313 0 0.562 0.25 0.562 0.562zM28 8.5v1c0 0.281-0.219 0.5-0.5 0.5h-9c-0.281 0-0.5-0.219-0.5-0.5v-1c0-0.281 0.219-0.5 0.5-0.5h9c0.281 0 0.5 0.219 0.5 0.5zM30 23.5v-19c0-0.266-0.234-0.5-0.5-0.5h-27c-0.266 0-0.5 0.234-0.5 0.5v19c0 0.266 0.234 0.5 0.5 0.5h5.5v-1.5c0-0.281 0.219-0.5 0.5-0.5h1c0.281 0 0.5 0.219 0.5 0.5v1.5h12v-1.5c0-0.281 0.219-0.5 0.5-0.5h1c0.281 0 0.5 0.219 0.5 0.5v1.5h5.5c0.266 0 0.5-0.234 0.5-0.5zM32 4.5v19c0 1.375-1.125 2.5-2.5 2.5h-27c-1.375 0-2.5-1.125-2.5-2.5v-19c0-1.375 1.125-2.5 2.5-2.5h27c1.375 0 2.5 1.125 2.5 2.5z"></path>
                    </svg><span  className={classes.address}>{address}</span>
                </div>
            
                <div>
                    <svg className={classes.icon} viewBox="0 0 22 28">
                        <path d="M22 19.375c0 0.562-0.25 1.656-0.484 2.172-0.328 0.766-1.203 1.266-1.906 1.656-0.922 0.5-1.859 0.797-2.906 0.797-1.453 0-2.766-0.594-4.094-1.078-0.953-0.344-1.875-0.766-2.734-1.297-2.656-1.641-5.859-4.844-7.5-7.5-0.531-0.859-0.953-1.781-1.297-2.734-0.484-1.328-1.078-2.641-1.078-4.094 0-1.047 0.297-1.984 0.797-2.906 0.391-0.703 0.891-1.578 1.656-1.906 0.516-0.234 1.609-0.484 2.172-0.484 0.109 0 0.219 0 0.328 0.047 0.328 0.109 0.672 0.875 0.828 1.188 0.5 0.891 0.984 1.797 1.5 2.672 0.25 0.406 0.719 0.906 0.719 1.391 0 0.953-2.828 2.344-2.828 3.187 0 0.422 0.391 0.969 0.609 1.344 1.578 2.844 3.547 4.813 6.391 6.391 0.375 0.219 0.922 0.609 1.344 0.609 0.844 0 2.234-2.828 3.187-2.828 0.484 0 0.984 0.469 1.391 0.719 0.875 0.516 1.781 1 2.672 1.5 0.313 0.156 1.078 0.5 1.188 0.828 0.047 0.109 0.047 0.219 0.047 0.328z"></path>
                    </svg><span  className={classes.contactNo}>{contactNo}</span>
                </div>
                <div onClick = {()=>clicked(props._id)} className={classes.update}>
                    Update
                </div>
           

            </div>
            
        </div>
    )
}

const mapStateToProps = state => {
    return{

        authenticated : state.auth.token ? true :false

    }
}


const mapDispatchToProps = dispatch=>{
return{
    delete :(id)=>dispatch(actions.removeEmployee(id)),
    setEmployee : (id)=>dispatch(actions.setEmployee(id))
}
}

export default connect(mapStateToProps , mapDispatchToProps)(withRouter(Employee))
