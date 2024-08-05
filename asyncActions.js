const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware

const initialState = {
  loading: false, //spinner
  users: [], //from the API
  error: '' //Is there any error?
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST' //petición de lectura
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS' //resultado de la lectura correcto
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'//resultado de la lectura con error

const fetchUsersRequest = () => {
  return { type: FETCH_USERS_REQUEST //no tiene payload
 }
}

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS, //lee correcto y le doy el array de usuarios para que los meta en el store
    payload: users //los registros leidos de la API los envio para que los guarde en el store de redux
  }
}

const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE, //error en la lectura de la API, no guarda nada ym uestra 
    payload: error //el tipo de error
  }
}

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest()) //type: FETCH_USERS_REQUEST -> loading a true,users: [],
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        // response.data is the users
        const users = response.data.map(user => user.id)
       //{type FETCH_USERS_SUCCESS, payload: error} -> {loading: false,action.payload,error:''}
        dispatch(fetchUsersSuccess(users))
      })
      .catch(error => {
        // error.message is the error message
       //{type: FETCH_USERS_FAILURE, payload: error} -> {loading: false,error: action.payload
        dispatch(fetchUsersFailure(error.message)) 
      })
  }
}

const reducer = (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: ''
      }
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload
      }
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => { console.log(store.getState()) }) //cada cambio de estado lo imprime todo en la consola
store.dispatch(fetchUsers()) //lanza la lectura de la API con axios y el almacenamiento en el store.
