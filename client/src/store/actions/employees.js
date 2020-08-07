import axios from '../../serverInstance';
import * as actionTypes from './actionTypes';

export const getEmployeeStart = () => {
	return {
		type: actionTypes.GET_EMPLOYEES_START
	};
};

export const getEmployeeSuccess = (data) => {
	return {
		type: actionTypes.GET_EMPLOYEES_SUCCESS,
		data: data
	};
};

export const getEmployeeFailure = (err) => {
	return {
		type: actionTypes.GET_EMPLOYEES_FAILURE,
		error: err
	};
};

export const getEmployees = () => {
	return (dispatch) => {
		dispatch(getEmployeeStart());

		axios
			.get('/employees')
			.then((res) => {
				dispatch(getEmployeeSuccess(res.data.employeeData));
			})
			.catch((err) => {
				if (err.response) {
					dispatch(getEmployeeFailure(err.response.data.message));
				} else {
					dispatch(getEmployeeFailure('Network Error'));
				}
			});
	};
};

export const filter = (name) => {
	return {
		type: actionTypes.FILTER_EMPLOYEES,
		name: name
	};
};

export const addEmployeeSuccess = (data) => {
	return {
		type: actionTypes.ADD_EMPLOYEE,
		employee: data
	};
};

export const addId = (id) => {
	return {
		type: actionTypes.ADD_ID,
		id: id
	};
};

export const addEmployeeFailure = (error) => {
	return {
		type: actionTypes.ADD_EMPLOYEE_FAILURE,
		error: error
	};
};

export const addEmployee = (data, fd) => {
	return (dispatch) => {
		dispatch(addEmployeeSuccess(data));

		axios
			.post('/employee', fd)
			.then((res) => {
				dispatch(addId(res.data.id));
			})
			.catch((err) => {
				if (err.response) {
					dispatch(addEmployeeFailure(err.response.data.message));
				} else {
					dispatch(addEmployeeFailure('Network Error'));
				}
			});
	};
};

export const removeEmployeefailure = (error) => {
	return {
		type: actionTypes.REMOVE_EMPLOYEE_FAILURE,
		error: error
	};
};

export const removeEmploye = (id) => {
	return {
		type: actionTypes.REMOVE_EMPLOYEE,
		id: id
	};
};

export const removeEmployee = (id) => {
	return (dispatch) => {
		dispatch(removeEmploye(id));

		axios.delete('/employee/' + id).then(() => {}).catch((err) => {
			if (err.response) {
				dispatch(removeEmployeefailure(err.response.data.message));
			} else {
				dispatch(removeEmployeefailure('Network Error'));
			}
		});
	};
};

const updateEmployeeSuccess = (data,id) => {
	return{
		type :actionTypes.UPDATE_EMPLOYEE,
		data:data,
		id:id
	}
}

export const updateEmployee = (data ,id) => {

	return dispatch =>{
		axios.put("/employee/"+id, {employee : data})
		.then(()=>{
			dispatch(updateEmployeeSuccess(data ,id))
		})

		.catch(err =>{

		})
	}
}



export const setEmployee = (id)=>{
	return{
		type:actionTypes.SET_EMPLOYEE,
		id:id
	}
}
