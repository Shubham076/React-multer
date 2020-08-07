import * as actionTypes from './actionTypes'
import axios from "../../serverInstance"
import jwtDecode from 'jwt-decode'



export const auth_start = ()=>{
    return{
        type:actionTypes.AUTH_START
    }

}

export const auth_check_timeout = (time)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(auth_logout())
        } , time)
    }

}

export const auth_logout= ()=>{

    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('username')
    delete axios.defaults.headers.common["authorization"]

    return{
        type:actionTypes.LOGOUT
    }

}

export const auth_failure= (error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        err:error
    }

}

export const auth_success= (token , username)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        username :username
    }
}

export const auth = ( email , password , username , props)=>{
    return dispatch=>{

        dispatch(auth_start())

        let user;
        let url;


        if(username.trim() === ''){
            user = {
                email:email,
                password:password
            }
    
             url = "/login"

            

        }

        else{
            user={
                email:email,
                password:password,
                username:username
            }

            url= '/signUp'
        }

        

     
        axios.post(url,user)
        .then(res=>{

            const token = res.data.token
            let decodedToken = jwtDecode(token)
            let expirationDate = new Date(decodedToken.exp *1000);
            let username = res.data.username;
            localStorage.setItem('token',token)
            localStorage.setItem("Username",username)
            localStorage.setItem('expirationDate',expirationDate)

            dispatch(auth_success(token , username))
            props.history.push("/home")

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    
        })
        
        .catch(err=>{
            if(err.response){   

            dispatch(auth_failure(err.response.data.message))

            }

//when internet is not connected
            else dispatch(auth_failure("Network Error"))
        })



    }
}

export const auth_check = ()=>{

    return dispatch=>{
        let token = localStorage.getItem('token');
        let expirationDate = new Date(localStorage.getItem('expirationDate'))

      
        if(!token){
          
          dispatch(auth_logout())

        }

        else if(expirationDate > new Date()){

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

            let username  = localStorage.getItem("Username")
            dispatch(auth_success(token , username))
            dispatch(auth_check_timeout((expirationDate.getTime() - new Date().getTime())))
        }

        else{
            dispatch(auth_logout())
        }
        }

}

export const clear = ()=>{
    return{
        type:actionTypes.CLEAR_ERRORS
    }
}







