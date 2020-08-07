import React ,{useState} from 'react';
import classes from './addEmployee.module.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import {connect} from "react-redux"
import * as actions from "../../store/actions/index"



const validationSchema = yup.object({
	email: yup.string().required('This field is required').email('Please enter a valid email'),
	employeeName: yup.string().required('This field is required'),
	department: yup.string().required('This field is required'),
	position: yup.string().required('This field is required'),
	contactNo: yup.number().required('This field is required'),
	address: yup.string().required('This field is required'),


});

const Login = (props) => {




	const [ departments ] = useState([
		
		'Tech',
		'Content',
		'Marketing',
		'Sales',
		'Finance',
		'Human Resouce'
	]);

	
	const {email , employeeName , address , contactNo , department , position} = props.employee
	

	let initialValues = {
		email: props.update && email?email:'',
		employeeName: props.update && employeeName? employeeName:'',
		address: props.update && address ? address:'',
		position: props.update && position ? position :'',
		department: props.update && department ? department :'',
		contactNo: props.update && contactNo ? contactNo :''
	}

	
	

	



	const [file , setFile] = useState('');
	const [error , setError] = useState('');


	

	const HandleChange = (event)=>{
		setFile(event.target.files[0]);
	}
	

	let btnContent = "ADD";
	let header = "Add Employee";

	if(props.update){
		header = "Update Employee"
		btnContent = "Update"
	}



	
	
	let options = departments.map((name,index)=>(<option key={index} value={name}>{name}</option>))

	const addEmployee = (data)=>{

		if(props.update){

	

			props.updateEmployee(data , props.employee._id);
			props.close();

		}

		else{

			
		if(file === ''){
			setError("This Field is required")
		}
	

		const fd = new FormData();
		fd.append("name",data.employeeName);
		fd.append("email",data.email)
		fd.append("image",file)
		fd.append("department",data.department)
		fd.append("position",data.position)
		fd.append("contactNo",data.contactNo)
		fd.append("address",data.address)

		let employee = {...data};
		employee.src = URL.createObjectURL(file);

		if(error.trim() === '' ){

		props.addEmployee(employee , fd)
		props.close();


		}
		}

		


	}

	

	

	return (
		<div className={classes.form}>
			
			
			<h2 className={classes.form__header}>{header}</h2>
			<Formik
				initialValues={initialValues}
				enableReinitialize
				onSubmit={(values , {resetForm}) =>{

					addEmployee(values)
					resetForm({values:''})
					setFile('')
			}}
				validationSchema={validationSchema}
				validateOnMount
			>
				{(formik) => {
		
					return (
						<Form autoComplete="off" style={{ display: 'flex', flexDirection: 'column', width: '35rem' }}>
							<div className={classes.input}>
								<Field id="employeeName" className={classes.input__field} type="text" name="employeeName" />
								<label
									className={
										classes.input__label +
										' ' +
										(formik.touched.employeeName ? classes.move : null) +
										' ' + 
										(props.update ? classes.move : null)

									}
									htmlFor="employeeName"
								>
									Employee Name
								</label>

								<ErrorMessage name="employeeName">
									{(msg) => <div className={classes.error_box}>{msg}</div>}
								</ErrorMessage>
							</div>

							<div className={classes.input}>
								<Field id="email" className={classes.input__field} type="text" name="email" />
								<label
									className={
										classes.input__label +
										' ' +
										( formik.touched.email ? classes.move : null)+
										' '+
										(props.update ? classes.move : null)

									}
									htmlFor="email"
								>
									Email
								</label>

								<ErrorMessage name="email">
									{(msg) => <div className={classes.error_box}>{msg}</div>}
								</ErrorMessage>
							</div>

						{!props.update ?	<div className={classes.input}>
								<input id="imgUrl" onChange = {(event)=>HandleChange(event)} className={classes.file} type="file" name="imgUrl" />
								<label
									className={
										classes.file__label
									}
									htmlFor="imgUrl"
								>
									{file !== '' ? file.name :"Upload An image"}
								</label>

								
									<div className={classes.error_box}>{error.trim() !== '' ? error : null}</div>
								
								</div> :null }

							<div className={classes.input}>
								<Field id="department" className={classes.input__field} as="select" name="department">
									<option value="">Select Department</option>
									{options}
								</Field>
								<label
									className={
										classes.input__label +
										' ' +
										( formik.touched.department ? classes.move : null)
					
									} style={{top:'-2rem'}}
									htmlFor="email"
								>
									Department
								</label>

								<ErrorMessage name="department">
									{(msg) => <div className={classes.error_box}>{msg}</div>}
								</ErrorMessage>
							</div>

							<div className={classes.input}>
								<Field id="position" className={classes.input__field} type="text" name="position" />
								<label
									className={
										classes.input__label +
										' ' +
										( formik.touched.position ? classes.move : null) +' '
										+ (props.update ? classes.move : null)
										
									}
									htmlFor="position"
								>
									Position
								</label>

								<ErrorMessage name="position">
									{(msg) => <div className={classes.error_box}>{msg}</div>}
								</ErrorMessage>
							</div>

							<div className={classes.input}>
								<Field id="contactNo" className={classes.input__field} type="number" name="contactNo" />
								<label
									className={
										classes.input__label +
										' ' +
										( formik.touched.contactNo ? classes.move : null) +
										' '+
										(props.update ? classes.move : null)

									}
									htmlFor="contactNo"
								>
									ContactNo
								</label>

								<ErrorMessage name="contactNo">
									{(msg) => <div className={classes.error_box}>{msg}</div>}
								</ErrorMessage>
							</div>

							<div className={classes.input}>
								<Field id="address" className={classes.input__field} type="text" name="address" />
								<label
									className={
										classes.input__label +
										' ' +
										( formik.touched.address ? classes.move : null) +
										' ' +
										(props.update ? classes.move : null)

									}
									htmlFor="address"
								>
									Address
								</label>

								<ErrorMessage name="address">
									{(msg) => <div className={classes.error_box}>{msg}</div>}
								</ErrorMessage>
							</div>

							<button type="submit" disabled={!formik.isValid} className={classes.btn__submit}>
								{btnContent}
							</button>

						
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

const mapStateTopProps = state => {
	return{
		employee: state.employees.employee
	}
}

const mapDispatchToProps = dispatch => {
	return{

		addEmployee : (data , formdata)=>dispatch(actions.addEmployee(data , formdata)),
		updateEmployee : (data ,id) => dispatch(actions.updateEmployee(data , id))
		
	}
}
	


export default connect(mapStateTopProps , mapDispatchToProps)(Login);
