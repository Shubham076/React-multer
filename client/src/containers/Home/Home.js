import React , {useEffect , useState} from 'react'
import classes from "./home.module.scss"
import Sidebar from "../../components/sidebar/sidebar"
import Employee from "../../components/employee/employee"
import {connect} from "react-redux"
import {getEmployees , changeUpdate} from "../../store/actions/index"
import Modal from "../../components/Modal/Modal"
import AddEmployee from "../../components/addEmployee/addEmployee"

const Home = (props) => {

    useEffect(()=>{

        props.getEmployees()

    },[])

    const [showModal , setShowModal] = useState(false);
    const [showModal2 , setShowModal2] = useState(false);


  

    const close = () => {
        setShowModal(false)
    }

    const close2 = () => {
        setShowModal2(false)
    }

    const show = () => {

        if(!props.authenticated){

            props.history.push("/login")
        }
        

        setShowModal(true)
    }

    const show2 = () => {

        if(!props.authenticated){

            props.history.push("/login")
        }
        

        setShowModal2(true)
    }




    let allEmployees = null

    if(props.employees && !props.filtering){
       allEmployees =  props.employees.map((data,index)=>(<Employee show={show2} close={close2} {...data} key={index}/>))
    }

    else{
        allEmployees = props.filteredEmployess ? props.filteredEmployess.map((data,index)=>(<Employee {...data} key={index}/>)):null
    }
    return (
        <div className={classes.home}>

            <Modal show ={showModal} modalClosed = {close} >
                <AddEmployee update={false} close={close}/>
            </Modal>

            <Modal show ={showModal2} modalClosed = {close2} >
                <AddEmployee update={true} close={close2}/>
            </Modal>

            <div className = {classes.sidebar}>
                <Sidebar/>
            </div>

            <div className = {classes.employees} >
                <h2 className={classes.employees__header}>Employees</h2>

                <div onClick={show} className={classes.add}>
                    <svg className={classes.icon_plus} viewBox="0 0 24 24">
                        <path d="M5 13h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1z"></path>
                    </svg>Add
                </div>

                <div className={classes.allEmployees}>
                    {allEmployees}
                </div>
            </div>
            
            
        </div>
    )
}

const mapStateToProps = state => {
    return{
        employees:state.employees.data,
        filtering:state.employees.filtering,
        filteredEmployess:state.employees.filteredEmployess,
        authenticated:state.auth.token ? true:false,
    
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getEmployees : ()=>dispatch(getEmployees())
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Home)
