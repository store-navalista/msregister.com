import LoginForm from '../LoginForm/LoginForm'
import Portal from '../../HOC/Portal'
import { useState, useContext } from "react"
import st from './FooterMenu.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from '../../pages/_app'
import { useRouter } from 'next/router'

function FooterMenu({ info }) {
	const { store } = useContext(Context)
	const router = useRouter()
	const { isAuth } = store
	const { facebook, instagram, linkedin, telegram, twitter } = info
	const [isLoginHidden, setLoginHidden] = useState(false)
	const handleAuth = () => {
		if (isAuth) {
			store.logout()
			router.push('/')
		} else {
			setLoginHidden(true)
		}
	}
	return (
		<>
			<footer className={st.footer}>
				<nav className={st.nav}>
					{/* <a className={st.link} target='_blank' data-title='Telegram'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
							<path d="m74.35 31.34-8.18 38.55c-.62 2.72-2.22 3.4-4.51 2.12l-12.45-9.18-6 5.78a3.15 3.15 0 0 1-2.51 1.22l.9-12.68 23.07-20.86c1-.9-.22-1.39-1.56-.5l-28.54 18-12.28-3.88c-2.67-.83-2.72-2.67.56-3.95L70.9 27.45c2.22-.84 4.17.49 3.45 3.89Z" />
						</svg>
					</a> */}
					<a href={facebook} className={st.link} target='_blank' rel="noopener noreferrer" data-title='Facebook'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
							<path d="m62.61 53.59 1.5-9.75h-9.36v-6.33c0-2.66 1.31-5.27 5.5-5.27h4.25v-8.3a51.78 51.78 0 0 0-7.5-.66c-7.71 0-12.74 4.67-12.74 13.13v7.43h-8.62v9.75h8.57v23.57h10.54V53.59Z" />
						</svg>
					</a>
					<a className={st.link} target='_blank' rel="noopener noreferrer" data-title='Linkedin'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
							<path d="M37.34 71.45H26.66V37.06h10.68ZM32 32.37a6.22 6.22 0 1 1 6.18-6.25A6.24 6.24 0 0 1 32 32.37Zm45.32 39.08H66.66V54.71c0-4-.08-9.11-5.55-9.11s-6.41 4.34-6.41 8.82v17H44V37.06h10.28v4.69h.15a11.22 11.22 0 0 1 10.1-5.55c10.81 0 12.8 7.11 12.8 16.36v18.89Z" />
						</svg>
					</a>
					{/* <a className={st.link} target='_blank' rel="noopener noreferrer" data-title='Twitter'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
							<path d="M76.71 38.57v1.66c0 16.83-12.81 36.22-36.22 36.22A35.91 35.91 0 0 1 21 70.73a25.86 25.86 0 0 0 3.07.16 25.52 25.52 0 0 0 15.81-5.44A12.76 12.76 0 0 1 28 56.62a15.88 15.88 0 0 0 2.41.2 13.79 13.79 0 0 0 3.35-.43 12.74 12.74 0 0 1-10.26-12.5v-.15a12.91 12.91 0 0 0 5.75 1.61 12.75 12.75 0 0 1-3.94-17 36.24 36.24 0 0 0 26.25 13.3 14.19 14.19 0 0 1-.31-2.92 12.74 12.74 0 0 1 22-8.71A25.24 25.24 0 0 0 81.36 27a12.74 12.74 0 0 1-5.6 7 25.15 25.15 0 0 0 7.33-2 27.31 27.31 0 0 1-6.38 6.58Z" />
						</svg>
					</a>
					<a className={st.link} target='_blank' rel="noopener noreferrer" data-title='Instagram'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
							<path d="M49.8 34.2a15.28 15.28 0 1 0 15.28 15.28A15.25 15.25 0 0 0 49.8 34.2Zm0 25.21a9.93 9.93 0 1 1 9.94-9.93 10 10 0 0 1-9.94 9.93Zm19.47-25.83A3.57 3.57 0 1 1 65.71 30a3.56 3.56 0 0 1 3.56 3.58Zm10.12 3.61c-.23-4.77-1.32-9-4.82-12.48s-7.71-4.57-12.48-4.81c-4.92-.28-19.66-.28-24.58 0-4.76.22-9 1.31-12.49 4.8s-4.57 7.71-4.81 12.48-.28 19.66 0 24.58 1.32 9 4.81 12.49 7.71 4.57 12.49 4.81 19.66.28 24.58 0c4.77-.23 9-1.32 12.48-4.81s4.58-7.72 4.82-12.49.28-19.65 0-24.57ZM73 67a10 10 0 0 1-5.66 5.66c-3.92 1.56-13.23 1.2-17.57 1.2s-13.65.35-17.56-1.2A10 10 0 0 1 26.58 67c-1.56-3.92-1.2-13.23-1.2-17.56s-.38-13.62 1.2-17.53a10 10 0 0 1 5.66-5.66c3.92-1.55 13.23-1.2 17.56-1.2s13.66-.34 17.57 1.2A10.09 10.09 0 0 1 73 31.91c1.56 3.93 1.2 13.23 1.2 17.57S74.59 63.13 73 67Z" />
						</svg>
					</a> */}
					<a onClick={handleAuth} data-role='loginBtn' className={st.link} data-title={isAuth ? 'Logout' : 'Login'}>
						{!isAuth ?
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
								<path d="M65.54 68.44h-8.41a1.21 1.21 0 0 1-1.2-1.21v-4a1.2 1.2 0 0 1 1.2-1.2h8.41a3.2 3.2 0 0 0 3.2-3.2V39.61a3.2 3.2 0 0 0-3.2-3.2h-8.41a1.21 1.21 0 0 1-1.2-1.21v-4a1.2 1.2 0 0 1 1.2-1.2h8.41a9.61 9.61 0 0 1 9.61 9.61v19.22a9.62 9.62 0 0 1-9.61 9.61Zm-4.71-20.12L44 31.5a2.41 2.41 0 0 0-4.11 1.7v9.61H26.3a2.39 2.39 0 0 0-2.4 2.4v9.61a2.4 2.4 0 0 0 2.4 2.41h13.61v9.6A2.41 2.41 0 0 0 44 68.54l16.83-16.82a2.4 2.4 0 0 0 0-3.4Z" />
							</svg>
							:
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
								<path d="M65.5 68.4h-8.4c-.7 0-1.2-.5-1.2-1.2v-4c0-.7.5-1.2 1.2-1.2h8.4c1.8 0 3.2-1.4 3.2-3.2V39.6c0-1.8-1.4-3.2-3.2-3.2h-8.4c-.7 0-1.2-.5-1.2-1.2v-4c0-.7.5-1.2 1.2-1.2h8.4c5.3 0 9.6 4.3 9.6 9.6v19.2c0 5.3-4.3 9.6-9.6 9.6zM24.6 51.7l16.8 16.8c.9.9 2.5.9 3.4 0 .4-.4.7-1.1.7-1.7v-9.6h13.6c1.3 0 2.4-1.1 2.4-2.4v-9.6c0-1.3-1.1-2.4-2.4-2.4H45.5v-9.6c0-1.3-1.1-2.4-2.4-2.4-.6 0-1.2.2-1.7.7L24.6 48.3c-.9.9-.9 2.5 0 3.4z" />
							</svg>
						}
					</a>
				</nav>
			</footer>
			{isLoginHidden &&
				<Portal selector="#portal">
					<LoginForm setLoginHidden={setLoginHidden} />
				</Portal>}
		</>
	)
}

export default observer(FooterMenu)