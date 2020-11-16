import ContextStore from 'src/store';

function MyComponent(){
  return(
    <ContextStore.Consumer>{store=>(<>

    </>)}</ContextStore.Consumer>)
}

export default MyComponent