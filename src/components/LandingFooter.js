import { withTranslation } from '../../i18n'
import { Link } from '../../i18n'

function MyComponent({t}){
  return (
    <>
    <div className="landingFooter">
      <div className="deco">
          <img className="left" src="/assets/img/footer_landing_deco.svg" />
          <img className="right" src="/assets/img/footer_landing_deco.svg" style={{transform:'rotateY(180deg)'}} />
      </div>

      <div className="container" style={{maxWidth:'1085px'}}>
          <div className="flex -mx-10px justify-between lg:flex-nowrap flex-wrap">
            <div className="px-10px lg:w-3/12 w-full lg:mb-0 mb-12">
              <Link href="/">
                <a className="mb-4 block"><img src="/assets/img/logo_white.svg" /></a>
              </Link>
              <a className="text-12px mb-4 block" href="tel:+886277305580">+886 2 7730 5580</a>
              <div className="text-12px">{t('106 台北市大安區忠孝東路四段285號5樓')}</div>
            </div>
            <div className="px-10px lg:w-auto w-full lg:mb-0 flex-shrink-0">
              <div className="mb-6">
                <div className="text-18px font-medium">{t('網站地圖')}</div>
              </div>
              <div className="flex -mx-10px flex-wrap">
                <div className="px-10px w-6/12 mb-4">
                  <Link href="/about">
                    <a className="text-12px">> {t('關於我們')}</a>
                  </Link>
                </div>
                <div className="px-10px w-6/12 mb-4">
                  <Link href="/service">
                    <a className="text-12px">> {t('服務條款')}</a>
                  </Link>
                </div>
                <div className="px-10px w-6/12 mb-4">
                  <Link href="/gdpr">
                    <a className="text-12px">> {t('隱私權條款')}</a>
                  </Link>
                </div>
                <div className="px-10px w-6/12 mb-4">
                  <Link href="/faq">
                    <a className="text-12px">> FAQ</a>
                  </Link>
                </div>
            </div>
            </div>
            <div className="px-10px lg:w-4/12 w-full lg:max-w-xs"></div>
          </div>
          <div className="text-13px text-white text-center mt-10" style={{marginBottom:'-25px'}}>Copyright © 2020 JGB Smart Property Ltd. All rights reserved.</div>
      </div>
    </div>
    <style jsx>{`
      .landingFooter a{
        &:hover{
          color: white;
        }
      }
    `}</style>
    </>
  )
}

MyComponent.getInitialProps = async (ctx) => {
  return {
    namespacesRequired: ['common'],
  }
}

export default withTranslation('common')(MyComponent)