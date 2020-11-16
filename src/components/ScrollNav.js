function MyComponent({
  className='',
  unfilledJustify='start',
  direction='x',
  active=0,
  list=[ {label:'', value:'', className:''}],
  onClick=function(){}
}){

  const refScrollNav = React.useRef(null);
  const refRow = React.useRef(null);
  const refCol = React.useRef([]);
  const refItem = React.useRef(null);

  const clickHandler = function(clickIndex){

    let clickTarget = refCol.current[clickIndex];
    let targetPosition = $(clickTarget).offset().left - $(clickTarget).parent().offset().left;

    $(refScrollNav.current).stop().animate({scrollLeft: targetPosition - $(refScrollNav.current).width()/2}, 200);

    onClick({
      index: clickIndex,
      value: list[clickIndex].value,
      label: list[clickIndex].label,
    })
  }

  const unfilledJustifyWatcher = function(){
    if( direction !== 'x' || direction !== 'y' ){
      return false;
    }

    let $row = refRow.current;
    if( $row.scrollWidth <= $row.clientWidth ) { //no scroll bar

        $row.classList.remove('justify-content-start');
        $row.classList.remove('justify-content-center');
        $row.classList.remove('justify-content-end');

        switch( unfilledJustify ){
            case 'center':
                $row.classList.add('justify-content-center');
            break;

            case 'end':
                $row.classList.add('justify-content-end');
            break;

            default:
                $row.classList.add('justify-content-start');
            break;
        }

    }else{

        $row.classList.remove('justify-content-start');
        $row.classList.remove('justify-content-center');
        $row.classList.remove('justify-content-end');
    }
  }

  const scrollWatcher = function(){
    let target = $(refRow.current).find('.scrollNav-item.active').closest('.scrollNav-col');
    if( target.length > 0 ){
      refScrollNav.current.scrollTo(target.offset().left, 0);
    }
  }

  React.useEffect(()=>{

    scrollWatcher()
    unfilledJustifyWatcher()

    let resizeTimer;
    $(window).on('resize', function(e) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function(){
            unfilledJustifyWatcher();
            scrollWatcher();
        }, 250);
    });

  }, [])

  return (
    <>
    <div className={`scrollNav ${className}`} ref={refScrollNav}>
      <div className="scrollNav-row flex -mx-10px" ref={refRow}>
      {
          list.map((item, index)=>{
            return (
              <div className="scrollNav-col w-auto flex-shrink-0 pl-10px pr-10px" ref={el=>refCol.current[index]=el} onClick={()=>{ clickHandler(index) }} key={index}>
                <div ref={refItem} className={`scrollNav-item ${item.className ?item.className :''} ${active===index?'active' :''}`}>
                    {item.label}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
    <style global jsx>{`
    .scrollNav{
      font-size: 15px;
      width: 100%;
      overflow: hidden;
      overflow-x: auto;
    }
    .scrollNav-item{
        color: #888888;
        padding-bottom: 0.8em;
        border-bottom: 2px solid #888888;
        font-weight: 500;
        &.active{
            padding-bottom: 0.7619em;
            color: #c93a3a;
            border-color: #c93a3a;
            font-size: 1.4em;
            font-weight: 500;
        }
    }
    .scrollNav-row{
        cursor: pointer;
        align-items: flex-end;
      }
    `}</style>
    </>
  )
}


export default MyComponent