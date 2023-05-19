import Link from 'next/link';
import st from './HeaderNav.module.css';
import logo from '../../src/assets/images/svg/logo.svg';
import menu from '../../src/assets/images/svg/menu-mobile.svg';
import arrow from "../../src/assets/images/svg/long-arrow-alt-left-solid.svg";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { Context } from '../../pages/_app';
import HeaderUser from './HeaderUser';
import { observer } from 'mobx-react-lite';

function HeaderNav(props) {
	const { store } = useContext(Context)
	const router = useRouter()
	const [isMenuOpen, setMenuState] = useState(false)
	const { headerPages, asidePages, asidePagesTitle } = props.store
	const menuVisibleToggle = () => isMenuOpen ? setMenuState(false) : setMenuState(true)
	return (
		<>
			<div className={st.headerNav}>
				<Link href='/' legacyBehavior>
					<a title={headerPages[0].title}>
						<img className={st.logo} src={logo.src} alt='logo' />
					</a>
				</Link>
				<nav className={st.screen}>
					{headerPages.map(page => {
						const { id, href, title } = page
						return (
							<Link key={id} href={href} legacyBehavior>
								<a className={st.link + (router.pathname === page.href ? ` ${st.link__active}` : '')}>
									{title}
								</a>
							</Link>
						)
					})}
				</nav>
				<nav className={st.mobile + (isMenuOpen ? ` ${st.mobileClick}` : '')} onClick={menuVisibleToggle}>
					<img src={menu.src} alt='menu' />
					<ul>
						<div>
							<img src={arrow.src} alt='close menu' />
						</div>
						{headerPages.map(page => {
							const { id, href, title } = page
							return (
								<Link key={id} href={href} legacyBehavior>
									<a>
										<li data-id={id}>{title}</li>
									</a>
								</Link>
							)
						})}
						<h2>{asidePagesTitle}</h2>
						{asidePages.map(page => {
							const { id, href, title } = page
							return (
								<Link key={headerPages.length + id} href={href} legacyBehavior>
									<a>
										<li data-id={headerPages.length + id}>
											{title}
										</li>
									</a>
								</Link>
							)
						})}
					</ul>
				</nav>
				{store.isAuth && <HeaderUser />}
			</div>
		</>
	)
}

export default observer(HeaderNav)