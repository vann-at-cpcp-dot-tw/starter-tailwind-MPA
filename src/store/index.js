const ContextStore = React.createContext({
  viewportData: {
    width: 0,
    height: 0,
  },
  lightbox: '',
});

export function contextReducer(state, action) {
  switch(action.type) {
    case 'UPDATE':
      let stateCopy =  Object.assign({}, state);
      let data = action.data;

      if( Object.keys(data).length > 0 ){
        Object.keys(data).map((key, i)=>{
            try {
                switch( typeof data[key] ){
                    case 'object':
                        if( Array.isArray(data[key]) ){
                            eval(`stateCopy.${key} = data['${key}']`);
                            eval(`stateCopy.${key}`).concat();
                        }else{
                            Object.assign(eval(`stateCopy.${key}`), data[key]);
                        }
                    break;

                    default:
                        eval(`stateCopy.${key} = data['${key}']`); //ex: state.info.address.country = 'TW';
                    break;
                }

            } catch (error) {

                //state 沒有對應 key 的話
                console.error(error);

            }
        })
      }
      return Object.assign({}, state,  stateCopy)
    break;

    default:
      return state
    break;
  }
}

export default ContextStore