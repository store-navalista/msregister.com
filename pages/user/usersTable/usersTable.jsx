import st from './usersTable.module.css'
import Portal from '../../../HOC/Portal'
import CreateUser from './createUser';
import ChangePasswordForm from './changePasswordForm';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import EditIcon from '@mui/icons-material/Edit';
import EmailValidator from 'email-validator';
import UsersTablePagination from './usersTablePagination';
import AdminSetting from './adminSetting';
import { IconButton, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { toJS } from 'mobx';
import { Context } from '../../_app'
import { useEffect, useRef, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';


const header = ['№', 'User ID', 'E-Mail', 'Password', 'Name', 'Surname']

const theme = createTheme({
	components: {
		MuiIconButton: {
			styleOverrides: {
				root: {
					'&': {
						backgroundColor: "transparent"
					},
					'&:hover': {
						backgroundColor: "#ffffff98"
					}
				},
			},
		},
	},
});


function UsersTable() {
	const [usersCount, setUsersCount] = useState('')
	const [users, setUsers] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [saving, setSaving] = useState(false)
	const [deleting, setDeleting] = useState(false)

	useEffect(() => {
		getUsers()
	}, [])

	let initialArr = [];

	for (let i = 0; i < usersCount; i++) {
		initialArr.push(0)
	}

	const table = useRef(null)
	const logger = useRef(null)

	const { store } = useContext(Context)

	const [changeTableArr, setChangeTableArr] = useState([])
	const [isResetBtn, setResetBtn] = useState(false)
	const [isCreateForm, setCreateForm] = useState(false)
	const [isPasswordForm, setPasswordForm] = useState(false)
	const [passwordId, setPasswordId] = useState('')

	if (initialArr.length !== 0) {
		if (changeTableArr.length === 0) {
			setChangeTableArr(initialArr)
		}
	}

	function checkMutate(e) {
		let t = e.target.closest('form'),
			order = t.dataset.order,
			newArr = [...changeTableArr]
		if (changeTableArr.length === 0) {
			return
		}
		const inputArr = Array.from(t.getElementsByTagName('input'))
		function check() {
			newArr.some(n => n === 1) ? setResetBtn(true) : setResetBtn(false)
		}
		if (inputArr.some(input => input.value !== input.defaultValue)) {
			newArr[order] = 1
			setChangeTableArr(newArr)
		} else {
			newArr[order] = 0
			setChangeTableArr(newArr)
		}
		check()
	}

	async function pagination(page) {
		setCurrentPage(page)
		getUsers(page)
		initialArr = [];
		for (let i = 0; i < usersCount; i++) {
			initialArr.push(0)
		}
		setChangeTableArr(initialArr)
		setResetBtn(false)
	}

	async function getUsers(page) {
		const response = await store.fetchUsers(page)
		const users = toJS(store.getUsers())
		setUsers(users)
		setUsersCount(response.length)
	}

	async function deleteUser(e) {
		setDeleting(true)
		if (confirm('Are you sure you want to delete this user?')) {
			const user = e.target.closest('form').querySelector('input[name="id"').value
			const result = await store.deleteUser(user);
			if (!result) {
				logging(`Error: Server error!`)
				setDeleting(false)
				return
			}
			logging(`Success: ${result}`)
			getUsers(currentPage)
			setDeleting(false)
		}
		setDeleting(false)
	}

	async function updateUser(e) {
		const data = Array.from(e.target.closest('form').getElementsByTagName('input')).map(input => input.value)
		const [id, userid, email, name, surname] = data
		const useridArr = Array.from(table.current.querySelectorAll("input[name='userid']")).map(id => id.defaultValue)
		const emailArr = Array.from(table.current.querySelectorAll("input[name='email']")).map(email => email.defaultValue)
		if (!userid) {
			logging('Error: User ID field cannot be empty!')
			return
		}
		if (userid !== e.target.closest('form').querySelector("input[name='userid']").defaultValue) {
			if (useridArr.includes(userid)) {
				logging('Error: User with this ID already exists!')
				return
			}
		}
		if (userid.length < 6) {
			logging('Error: The number of digits in the User ID must not be less than 6!')
			return
		}
		if (!email) {
			logging('Error: Email field cannot be empty!')
			return
		}
		if (email) {
			if (!EmailValidator.validate(email)) {
				logging('Error: The email address format is incorrect!')
				return
			}
		}
		if (email !== e.target.closest('form').querySelector("input[name='email']").defaultValue) {
			if (emailArr.includes(email)) {
				logging('Error: User with this E-mail already exists!')
				return
			}
		}
		setSaving(true)
		if (confirm('Are you sure you want to save this user?')) {
			const user = await store.updateUser(id, userid, email, name, surname);
			if (!user) {
				logging(`Error: Server error!`)
				setSaving(false)
				return
			}
			logging(`Success: User with ID:${user.data.userid} was successfully updated!`)
			setSaving(false)
			await getUsers(currentPage)
			checkMutate(e)
		}
		setSaving(false)
	}
	function changePasswordUser(e) {
		const userid = e.target.closest('form').querySelector(`input[name="id"]`).value
		setPasswordId(userid)
		setPasswordForm(true)
	}

	function formReset() {
		let formArr = Array.from(table.current.getElementsByTagName('form'))
		formArr.map(form => form.reset())
		setChangeTableArr(initialArr)
		setResetBtn(false)
	}

	function inputBlurFocus(e, opacity) {
		e.target.parentNode.querySelector('svg').style.opacity = opacity
	}

	function logging(log) {
		const options = {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric'
		};
		const time = new Date().toLocaleTimeString("ru", options)
		logger.current.value += `\n${time} -> "${log}"`
		logger.current.scrollTop = logger.current.scrollHeight - logger.current.clientHeight;
	}
	return (
		<>
			<ThemeProvider theme={theme}>
				<AdminSetting logging={logging} />
				<div className={st.wrapper}>
					<div ref={table} className={st.table}>
						<div className={st.header}>
							{header.map((title, index) => {
								return (
									<div key={index} className={st.header_item}><span>{title}</span></div>
								)
							})}
						</div>
						<div className={st.body}>
							{users.map(user => {
								return (
									<form data-order={user.table_id - 1} key={user.table_id} className={st.body_row}>
										<div className={st.row_item}>
											<span>{user.table_id}</span>
											<input style={{ display: 'none' }} name={'id'} defaultValue={user._id} />
										</div>
										<div className={st.row_item}>
											<input name={'userid'}
												defaultValue={user.userid}
												maxLength='6'
												placeholder='Enter userID'
												onFocus={e => inputBlurFocus(e, '1')}
												onBlur={e => inputBlurFocus(e, '0')}
												onInput={e => checkMutate(e)}
											/>
											<div className={st.row_edit}>
												<EditIcon style={{ width: '15px', paddingTop: '5px', fill: '#18c7de', opacity: '0' }} />
											</div>
										</div>
										<div className={st.row_item}>
											<input name={'email'}
												defaultValue={user.email}
												placeholder='Enter E-mail'
												type='email'
												onFocus={e => inputBlurFocus(e, '1')}
												onBlur={e => inputBlurFocus(e, '0')}
												onInput={e => checkMutate(e)}
											/>
											<div className={st.row_edit}>
												<EditIcon style={{ width: '15px', paddingTop: '5px', fill: '#18c7de', opacity: '0' }} />
											</div>
										</div>
										<div className={st.row_item}>
											<button type='button'
												className={st.password}
												onClick={e => changePasswordUser(e)}>
												change password</button>
										</div>
										<div className={st.row_item}>
											<input name={'name'}
												maxLength='20'
												defaultValue={user.name}
												placeholder='Enter user name'
												onFocus={e => inputBlurFocus(e, '1')}
												onBlur={e => inputBlurFocus(e, '0')}
												onInput={e => checkMutate(e)}
											/>
											<div className={st.row_edit}>
												<EditIcon style={{ width: '15px', paddingTop: '5px', fill: '#18c7de', opacity: '0' }} />
											</div>
										</div>
										<div className={st.row_item}>
											<input name={'surname'}
												maxLength='20'
												defaultValue={user.surname}
												placeholder='Enter user surname'
												onFocus={e => inputBlurFocus(e, '1')}
												onBlur={e => inputBlurFocus(e, '0')}
												onInput={e => checkMutate(e)}
											/>
											<div className={st.row_edit}>
												<EditIcon style={{ width: '15px', paddingTop: '5px', fill: '#18c7de', opacity: '0' }} />
											</div>
										</div>
										<div className={st.row_delete}>
											<IconButton disabled={deleting}
												onClick={e => deleteUser(e)} title='Delete user' sx={{ bgcolor: '#ffffff' }} color="error" aria-label="Add">
												<RemoveCircleOutlineIcon sx={{ width: '20px', height: '20px' }} />
											</IconButton>
										</div>
										{changeTableArr[user.table_id - 1] ?
											<div className={st.row_save}>
												<IconButton disabled={saving}
													onClick={e => updateUser(e)} title='Save edit' sx={{ color: '#314633', bgcolor: 'transparent' }} aria-label="Save">
													<SaveOutlinedIcon sx={{ width: '20px', height: '20px' }} />
												</IconButton>
											</div> : null
										}
									</form>
								)
							})}
							<UsersTablePagination logging={logging} usersCount={usersCount} pagination={pagination} />
							<div style={{ padding: '4px', display: 'flex', alignItems: 'center' }}>
								<IconButton onClick={() => setCreateForm(true)}>
									<AddCircleOutlineIcon sx={{
										color: '#0e5deb'
									}} />
								</IconButton>
								<span style={{ color: '#0e5deb', fontSize: '16px', display: 'inline-block', marginLeft: '5px' }}>Add user</span>
							</div>
							{isCreateForm && <Portal selector="#portal">
								<CreateUser setCreateForm={setCreateForm} getUsers={getUsers} logging={logging} table={table} currentPage={currentPage} />
							</Portal>}
							{isPasswordForm && <Portal selector="#portal">
								<ChangePasswordForm logging={logging}
									passwordId={passwordId}
									setPasswordForm={setPasswordForm} />
							</Portal>}
							<div className={st.save_btn}>
								{isResetBtn && <>
									<Button onClick={e => formReset(e)} size='small' sx={{ marginLeft: '15px' }} variant='contained' endIcon={<RestartAltOutlinedIcon />}>
										Reset all changes
									</Button>
								</>
								}
							</div>
							<div className={st.reset_logger_btn}>
								<IconButton onClick={() => logger.current.value = 'Logging:'} sx={{
									bgcolor: "rgb(44, 44, 44)",
									p: '5px'
								}}>
									<RestartAltOutlinedIcon sx={{ fill: "white" }} />
								</IconButton>
							</div>
						</div>
					</div>
					<textarea ref={logger} defaultValue='Logging:' readOnly={true} className={st.logging}></textarea>
				</div>
			</ThemeProvider>
		</>
	)
}

export default observer(UsersTable)