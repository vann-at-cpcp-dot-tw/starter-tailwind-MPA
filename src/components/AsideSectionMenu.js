function MyComponent({
  list=[{label:'', value:''}],
  active=0,
  onClick=function(){}
}){

  const activeStyle = {
    color: '#444444',
    backgroundColor: 'rgba(201, 58, 58, 0.2)',
  }

  const clickHandler = function(clickIndex){
    onClick({
      index: clickIndex,
      value: list[clickIndex].value,
      label: list[clickIndex].label,
    })
  }

  return(<div style={{width:'230px', boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.3)', position:'sticky', left:'0px', top:'80px'}}>
    {
      list.map((item, index)=>{
        return (
          <div key={index}
          style={
            Object.assign({
              padding:'16px',
              color:'#888888',
              cursor:'pointer',
            }, active===index ?activeStyle :{})
          }
          onClick={()=>{ clickHandler(index) }}>
            <div className="text-18px">{item['label']}</div>
          </div>
        )
      })
    }
  </div>)
}

export default MyComponent