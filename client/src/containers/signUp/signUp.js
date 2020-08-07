import React  , {useEffect}from 'react'
import classes from "./signUp.module.scss"
import {Formik , Form , Field ,ErrorMessage} from "formik";
import * as yup from "yup";
import {Link} from "react-router-dom"
import Spinner from "../../components/Spinner/spinner"
import {connect} from "react-redux"
import * as actions from "../../store/actions/index"


const initialValues = {
    email:"",
    password:"",
    username:""
}



const validationSchema = yup.object({
    username:yup.string().required("This field is required"),
    email:yup.string().required("This field is required").email("Please enter a valid email"),
    password:yup.string().required("This field is required").min(6,"Password should be 6 characters long")

})

const SignUp = (props) => {

    useEffect(()=>{
        props.clear()
    },[])

    

    let btnContent = "Submit";
    if(props.loading){
        btnContent = <Spinner/>
    }

                
    let error = props.error ?  <div className={classes.form__error}>{props.error}</div> : null

    return (
        <div className = {classes.form}>
			{error}

			<h2 className={classes.form__header}>Sign Up</h2>


            <Formik initialValues={initialValues}
            onSubmit = {values=>{

                props.auth(values.email, values.password , values.username , props)
            }}
            validationSchema= {validationSchema}
            validateOnMount>

                {formik => {
                    return(
                        <Form style={{display:"flex" , flexDirection:"column" , width:"45rem"}}>

                            <div className={classes.input}>
                                <Field className = {classes.input__field} type="text" name="username" />

                                <label
									className={
										classes.input__label +
										' ' +
										( formik.touched.username ? classes.move : null)
									}
									htmlFor="username"
								>
									Username
								</label>

                                <ErrorMessage name="username">
                                    {msg => <div className={classes.error_box}>{msg}</div>}
                                </ErrorMessage>
                            </div>

                            <div className={classes.input}>
                                <Field className = {classes.input__field} type="text" name="email" />

                                <label
									className={
										classes.input__label +
										' ' +
										( formik.touched.email ? classes.move : null)
									}
									htmlFor="email"
								>
									Email
								</label>

                                <ErrorMessage name="email">
                                    {msg => <div className={classes.error_box}>{msg}</div>}
                                </ErrorMessage>
                            </div>
                           
                           <div className={classes.input}>
                                <Field className = {classes.input__field} type="password" name="password" />

                                <label
									className={
										classes.input__label +
										' ' +
										( formik.touched.password ? classes.move : null)
									}
									htmlFor="password"
								>
									Password
								</label>

                                <ErrorMessage name="password">
                                    {msg => <div className={classes.error_box}>{msg}</div>}
                                </ErrorMessage>
                            </div>
                          

                                <button type ="submit"  disabled = {!formik.isValid} className = {classes.btn__submit}>{btnContent}</button>
                            <Link className={classes.link} to="/login" >Already have an account ? Click here</Link>

                        </Form>
                    )
                }}
            </Formik>
            
        
            
        </div>
    )
}

const mapStateToProps = state => {
	return{
        loading:state.auth.loading,
        error:state.auth.error
	}
}
const mapDispatchToProps = dispatch => {
	return {
        auth:(email , password , username , props)=>dispatch(actions.auth(email , password , username , props)),
        clear:()=>dispatch(actions.clear())
	}
}

export default connect(mapStateToProps , mapDispatchToProps)(SignUp)
