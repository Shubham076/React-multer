import * as actionTypes from "../actions/actionTypes"
import { updateEmployee } from "../actions"

const initialState = {
    data: [],
    error:null,
    loading:false,
    filteredEmployess:null,
    filtering:false,
    tempEmployee:null,
    update:false,
    employee:{}
}

const employeeReducer   = (state = initialState , action) => {

    switch(action.type){

        case(actionTypes.GET_EMPLOYEES_START):
            return{
                ...state,
                loading:true
            
            }

            case actionTypes.GET_EMPLOYEES_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    data:action.data
                }

            case actionTypes.GET_EMPLOYEES_FAILURE:
                return{
                    ...state,
                    loading:false,
                    error:action.error
                }

            case actionTypes.FILTER_EMPLOYEES:
                let filtered = state.data.filter((employee)=>employee.department === action.name);
                let boolean = action.name === "All Departments" ? false :true;
                return{
                    ...state,
                    filteredEmployess:filtered,
                    filtering:boolean
                }
                
            case actionTypes.ADD_EMPLOYEE:
                const updatedData = [...state.data];
                 updatedData.splice(0,0,action.employee)
                return{
                     ...state,
                     data:updatedData
                }
                
            case actionTypes.ADD_EMPLOYEE_FAILURE:
                const newArray = [...state.data];
                newArray.splice(0,1)
                return{
                    ...state,
                    data:newArray,
                    error:action.error
                }

            case actionTypes.REMOVE_EMPLOYEE:
                
                return{
                    ...state,
                    tempEmployee:{...state.data.find(employee=>employee._id === action.id)},
                    data:state.data.filter((employee)=>employee._id !== action.id) 
                }

            case actionTypes.REMOVE_EMPLOYEE_FAILURE:
                let array = [...state.data]
                array.splice(0,0,state.tempEmployee)
                return{
                    ...state,
                    data:array,
                    error:action.error


                }

            case actionTypes.ADD_ID:
                let list = [...state.data];
                let employee = {...list[0]};
                employee._id = action.id;
                list[0] = employee
                
                return{
                    ...state,
                    data:list
                }

            case actionTypes.UPDATE_EMPLOYEE:
                let employeeData = [...state.data];
                let Employee = {...employeeData.find(employee => employee._id === action.id)};
                let index = employeeData.findIndex(employee => employee._id === action.id)
                let updatedEmployee = {...action.data ,_id:action.id};
                if(Employee.imgUrl){
                    updatedEmployee.imgUrl = Employee.imgUrl
                }
                else{
                    updateEmployee.src = Employee.src
                }

    
                employeeData[index] = updatedEmployee

                return{
                    ...state,
                    data:employeeData
                }

            case actionTypes.SET_EMPLOYEE:
                let foundEmployee = state.data.find(employee=>employee._id === action.id)
                return{
                    ...state,
                    employee:foundEmployee
                }

            

                default:return state
        }
    }

    export default employeeReducer
