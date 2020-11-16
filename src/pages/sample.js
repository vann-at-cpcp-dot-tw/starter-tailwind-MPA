//store
import ContextStore, { contextReducer } from 'src/store'

function MyPage(){
  const store = React.useContext(ContextStore)
  const [state, dispatch] = React.useReducer(contextReducer, store)

  return(
  <ContextStore.Provider value={{state:state, dispatch:dispatch}}>

  </ContextStore.Provider>
  )
}

ReactDOM.render(
  <MyPage></MyPage>,
  document.getElementById("root")
);