import st from './AsideMenu.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function AsideMenu({ store }) {
   const router = useRouter()
   const { asidePages, asidePagesTitle } = store
   return (
      <>
         <aside className={st.aside}>
            <h2 className={st.h2}>{asidePagesTitle}</h2>
            <nav className={st.nav}>
               {asidePages.map((page) => {
                  const { id, href, title } = page
                  const isActive = router.pathname.startsWith(href) // Проверяем, начинается ли текущий путь с href
                  return (
                     <Link key={id} href={href} legacyBehavior>
                        <a className={st.link + (isActive ? ` ${st.link__active}` : '')}>{title}</a>
                     </Link>
                  )
               })}
            </nav>
            <p className={st.rights}>MSR. All rights reserved</p>
         </aside>
      </>
   )
}
