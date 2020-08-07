import React, { useState } from 'react';
import classes from './sidebar.module.scss';
import {connect} from 'react-redux'
import {filter} from "../../store/actions/index"

const Sidebar = (props) => {

	const [ deparments ] = useState([
		'All Departments',
		'Tech',
		'Content',
		'Marketing',
		'Sales',
		'Finance',
		'Human Resouce'
	]);
	const [ active, setActive ] = useState('All Departments');
	


    const changeActive = (depName)=>{

	
		setActive(depName)
		props.filter(depName);
    }

	let deparmentList = deparments.map((depName, index) => (
		<div key={index} onClick={()=>changeActive(depName)} className={classes.department +" "+ (active === depName ? classes.active:null)}>
			{depName}
		</div>
	));
	return <div className={classes.sidebar}>{deparmentList}</div>;
};


const mapDispatchToprops = dispatch => {
	return{
		filter:(name )=>dispatch(filter(name))
	}
}
export default connect(null , mapDispatchToprops)(Sidebar);
