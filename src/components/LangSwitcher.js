
//store
import ContextStore, { contextReducer } from '../store';

//i18n
import { I18nContext } from 'next-i18next'

//Mui
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function LangSwitcher(){
  const { i18n } = React.useContext(I18nContext)
  const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return(
    <ContextStore.Consumer>
    {store=>(
    <>
      <Button aria-controls="langSwitcher" aria-haspopup="true" onClick={(event)=>{
        setAnchorEl(event.currentTarget);
      }}>
      <div className="flex space-x-5px items-center text-13px">
        <div><img src="/assets/img/icon_earth.svg" style={{width:'24px'}}/></div>
        <div className="lg:block hidden">
          {
            i18n.options.allLanguages.map((langKey, langIndex)=>{
              if( langKey === i18n.language ){
                return(<span key={langIndex}>{store.state.locale[langKey].native}</span>)
              }
            })
          }
        </div>
      </div>
      </Button>
      <Menu id="langSwitcher"
      anchorEl={anchorEl}
      keepMounted
      disableScrollLock
      open={Boolean(anchorEl)}
      onClose={()=>{ setAnchorEl(null); }}>
      {i18n.options.allLanguages.map((langKey, langIndex)=>{
        return (
          <MenuItem value={langKey} key={langIndex}
          onClick={()=>{
            setAnchorEl(null);
            i18n.changeLanguage(langKey);
          }}>
            <span className="text-13px">{store.state.locale[langKey].native}</span>
          </MenuItem>
        )
      })}
      </Menu>
    </>
    )}
    </ContextStore.Consumer>
  )
}

export default LangSwitcher;