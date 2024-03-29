import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {applyMiddleware ,createStore , compose , combineReducers} from 'redux'
import thunk from 'redux-thunk'
import AuthReducer from "./store/reducers/authReducer"
import EmployeeReducer from "./store/reducers/employees"
import * as serviceWorker from './serviceWorker';


const logger = store=>{
  return next=>{
      return action=>{

          // console.log("Middleware dispatching" +action)
          next(action)

      }
  }
}

const composeEnhancers = process.env.NODE_ENV === 'development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;


const rootReducer = combineReducers({
  auth:AuthReducer,
  employees:EmployeeReducer
})

const store = createStore( rootReducer , composeEnhancers(applyMiddleware( logger ,thunk)))

const app = <Provider store = {store}>
              <BrowserRouter>
                <React.StrictMode>
                  <App />
                </React.StrictMode>
              </BrowserRouter>    
            </Provider>


ReactDOM.render(
  app
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
