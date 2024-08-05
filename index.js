const redux = require('redux')
const reduxLogger = require('redux-logger')
const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware //usa la función de 'redux' para aplicar middlewares
const logger = reduxLogger.createLogger() //crea el logger de 'redux-logger'

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

function buyCake () {
  return {
    type: BUY_CAKE,
    info: 'First redux action'
  }
}

function buyIceCream () {
  return { type: BUY_ICECREAM}
}

const initialCakeState = {numOfCakes: 10}
const initialIceCreamState = {numOfIceCreams: 20}

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE: return {
      ...state,
      numOfCakes: state.numOfCakes - 1
    }
    default: return state
  }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM: return {
      ...state,
      numOfIceCreams: state.numOfIceCreams - 1
    }
    default: return state
  }
}

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
})
// el middleware nos muestra: el estado previio, la acción y el estado posterior
  //  action BUY_CAKE @ 01:13:58.143
  //  prev state { cake: { numOfCakes: 10 }, iceCream: { numOfIceCreams: 20 } }
  //  action     { type: 'BUY_CAKE', info: 'First redux action' }
  //  next state { cake: { numOfCakes: 9 }, iceCream: { numOfIceCreams: 20 } }

const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Initial State ', store.getState()) //lee el contenido del store
const unsubscribe = store.subscribe(() => { }) //cualquier cambio de estado se llama esta función
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe() //abando es subscribe, ya  no se ejecuta más la función al cambiar el valor del estado
