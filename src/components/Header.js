//store
import ContextStore, { contextReducer } from '../store';

//next
import { useRouter } from 'next/router'

//i18n
import { withTranslation } from '../../i18n'
import { Link } from '../../i18n'

//Mui
import Button from '@material-ui/core/Button';

//components
import LangSwitcher from '../components/LangSwitcher'

function Header({t}){
  const store = React.useContext(ContextStore)
  const router = useRouter()
  const refHeader = React.useRef(null)

  React.useEffect(()=>{
    const topFixedItems = Object.assign(store.state.topFixedItems, {
      'Header': refHeader.current.clientHeight
    })
    store.dispatch({type:'UPDATE', data: {topFixedItems}})

    return function(){
      const topFixedItems = store.state.topFixedItems;
      delete topFixedItems.Header;
      store.dispatch({type:'UPDATE', data: {topFixedItems}})
    }
  }, [])

  return(
    <ContextStore.Consumer>
    {store=>(
      <>
      {function(){
        switch( router.pathname ){
          case '/':
          case '/about':
          case '/gdpr':
          case '/service':
          case '/faq':
          case '/news/[id]':
            return(
              <header style={{backgroundColor: 'rgba(255,255,255,0.85)', boxShadow: '0 2px 8px 0 rgba(199, 42, 42, 0.5)'}} ref={refHeader}>
                <div className="container h-full">
                  <div className="flex space-x-20px justify-between h-full items-center">
                    <div className="flex-shrink-0">
                    <Link href="/">
                      <a>
                        <img className="lg:block hidden" src="/assets/img/logo_main.svg"/>
                        <img className="lg:hidden block" src="/assets/img/logo_main_m.svg"/>
                      </a>
                    </Link>
                    </div>
                    <div className="flex space-x-10px">
                      <LangSwitcher></LangSwitcher>
                      <Link href="/login">
                        <a>
                          <Button variant="contained" color="primary" disableElevation>{t('登入')}</Button>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </header>
            )
          break;

          default:
            return(
              <header style={{backgroundColor: 'rgba(255,255,255,0.85)', boxShadow: '0 2px 2px rgba(0,0,0,0.1)'}} ref={refHeader}>
                <div className="container h-full">
                  <div className="flex space-x-20px justify-between h-full items-center">
                    <div className="flex-shrink-0">
                    <Link href="/">
                      <a>
                        <img className="lg:block hidden" src="/assets/img/logo_main.svg"/>
                        <img className="lg:hidden block" src="/assets/img/logo_main_m.svg"/>
                      </a>
                    </Link>
                    </div>
                    <div className="flex space-x-10px">
                      <LangSwitcher></LangSwitcher>
                    </div>
                  </div>
                </div>
              </header>
            )
          break;
        }
      }()}
      <style jsx>{`
        header{
          position: fixed;
          width: 100%;
          height: 60px;
          left: 0;
          top: 0;
          padding: 8px 0px;
          background-color: white;
          box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
          z-index: 120;
        }
        .logo-customer{
          img{
            max-width: 150px;
            max-height: 40px;
            @media(max-width: 991px){
              max-width: 50px;
            }
          }
        }
      `}</style>
      </>
    )}
    </ContextStore.Consumer>
  )
}

Header.getInitialProps = async (ctx) => {
  return {
    namespacesRequired: ['common'],
  }
}

export default withTranslation('common')(Header)