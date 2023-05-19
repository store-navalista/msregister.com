import SubmitForm from './submitForm/submitFrom'
import Table from './usersTable/usersTable';
import CircularProgress from '@mui/material/CircularProgress';
import st from './[id].module.css'
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { observer } from 'mobx-react-lite'
import { Context } from '../_app'
import { toJS } from "mobx";
import { useMediaQuery } from '@mui/material';

function User() {
	const matches = useMediaQuery('(min-width:1480px)')
	useEffect(() => {
		const redirect = setTimeout(() => {
			if (store) {
				if (store.hasOwnProperty('user')) {
					const main_page = toJS(store.user.userid)
					router.push(`${main_page}`)
				}
				if (!store.isAuth) {
					router.push('/')
				}
			}
		}, 1000)
	}, [])
	const router = useRouter()
	const { store } = useContext(Context)
	const user = toJS(store.user.roles)
	return (
		<>
			{user ? <div className='body-wrapper'>
				<div className={st.componentWrapper}>
					{user[0] === 'USER' && <SubmitForm />}
					{user[0] === 'ADMIN' && (matches ? <Table /> : <p className={st.warning}>This UI is designed for high resolution screens for ease of use. Minimum screen width should be 1480px!</p>)}
				</div>
			</div>
				: <div className={st.loader_wrapper}>
					<div className={st.loader_block}>
						<CircularProgress size={80} sx={{ color: 'white' }} />
						<p>loading...</p>
					</div>
				</div>
			}
		</>
	)
}

export default observer(User)
