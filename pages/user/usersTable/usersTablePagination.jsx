import st from './usersTablePagination.module.css'
import CircularProgress from '@mui/material/CircularProgress';
import { observer } from 'mobx-react-lite'
import { useState, useContext } from 'react'
import { Context } from '../../_app'

function UsersTablePagination({ usersCount, pagination, logging }) {
	const [activePage, setActivePage] = useState(1)
	const [loading, setLoading] = useState(false)

	const { store } = useContext(Context)

	let count;
	const buttons = []
	const loaders = []
	if (usersCount !== 0) {
		count = usersCount
	}
	for (let i = 1; i < Math.ceil(count / 10 + 1); i++) {
		buttons.push(<button
			onClick={e => changePage(e, i)}
			disabled={activePage === i}
			type='button'
			style={i < 10 ? { padding: '3px 7px' } : { padding: '3px 4px' }}
			key={i}
			data-id={i}
		>
			{i}
		</button>)
		loaders.push(<CircularProgress key={i}
			size={20} sx={{
				color: '#777777',
				padding: '2px 5px'
			}} />)
	}

	async function changePage(e, i) {
		setLoading(true)
		const response = await store.fetchUsers()
		if (!response) {
			logging(`Error: Server error!`)
			setLoading(false)
			return
		}
		if (!usersCount) {
			logging(`Error: Server error!`)
			setLoading(false)
		}
		pagination(e.target.dataset.id)
		setActivePage(i)
		setLoading(false)
	}
	return (
		<>
			<div className={st.pagination}>
				{loading ? loaders : buttons}
			</div>
		</>
	)
}

export default observer(UsersTablePagination)