import st from './HeaderUser.module.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../pages/_app';
import { useMediaQuery, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';

function HeaderUser() {
	const { store } = useContext(Context)
	const router = useRouter();
	const matches = useMediaQuery('(min-width:1024px)')
	return (
		<>
			{store.isLoading ?
				<CircularProgress size='20px' sx={{ color: '#000000' }} />
				:
				<>
					{matches && <AccountCircleIcon sx={{
						fill: 'var(--color-first-orange)',
						width: '30px',
						height: '30px'
					}}
					/>}
					{matches && <p className={st.userInfo}>{`${store.user.email}`}<span> | </span>{`id::${store.user.userid}`}</p>}
					<button onClick={() => router.push(`/user/${store.user.userid}`)} className={st.cabinet}>cabinet</button>
				</>
			}
		</>
	)
}

export default observer(HeaderUser)
