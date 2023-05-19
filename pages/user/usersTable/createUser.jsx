import st from './createUser.module.css';
import { TextField, IconButton, InputAdornment, InputLabel, FormControl, OutlinedInput, FormHelperText } from '@mui/material';
import DoDisturbAltOutlinedIcon from '@mui/icons-material/DoDisturbAltOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import EmailValidator from 'email-validator';
import { useState, useContext, useRef } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import { Context } from '../../_app'
import { observer } from 'mobx-react-lite';

function CreateUser({ setCreateForm, getUsers, logging, table, currentPage }) {
	const { store } = useContext(Context)

	const useridField = useRef(null)

	const [userid, setUserid] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [isShowPassword, setShowPassword] = useState(false)

	const [errorLogin, setErrorLogin] = useState('')
	const [errorPassword, setErrorPassword] = useState('')
	const [errorEmail, setErrorEmail] = useState('')

	const [errorMessage, setErrorMessage] = useState('')

	const [creating, setCreating] = useState(false)

	async function createUser() {
		const userdArr = Array.from(table.current.querySelectorAll("input[name='userid']")).map(id => id.defaultValue)
		const emailArr = Array.from(table.current.querySelectorAll("input[name='email']")).map(email => email.defaultValue)
		setErrorLogin('')
		setErrorEmail('')
		setErrorPassword('')
		setErrorMessage('')
		if (!userid) {
			setErrorLogin('User ID field cannot be empty!')
			return
		}
		if (userid.length < 6) {
			setErrorLogin('The number of digits in the User ID must not be less than 6!')
			return
		}
		if (userdArr.includes(userid)) {
			setErrorLogin('User with this ID already exists!')
			return
		}
		if (!email) {
			setErrorEmail('Email field cannot be empty!')
			return
		}
		if (email) {
			if (!EmailValidator.validate(email)) {
				setErrorEmail('The email address format is incorrect!')
				return
			}
		}
		if (emailArr.includes(email)) {
			setErrorEmail('User with this E-Mail already exists!')
			return
		}
		if (!password) {
			setErrorPassword('Password field cannot be empty!')
			return
		}
		if (password.length < 3) {
			setErrorPassword('Password cannot be less than 3!')
			return
		}
		setCreating(true)
		const result = await store.createUser(userid, email, password, name, surname)
		if (typeof result === 'string') {
			return setErrorMessage(result)
		}
		if (!result) {
			setErrorMessage('Error: Server error!')
			setCreating(false)
			return
		}
		logging(`Success: User with ID:${result.data.userid} and E-Mail:${result.data.email} has been successfully created!`)
		await getUsers(currentPage)
		setCreateForm(false)
	}

	function generateID() {
		const userdArr = Array.from(table.current.querySelectorAll("input[name='userid']")).map(id => id.defaultValue)
		let uniqueID = 1;
		for (let i = 0; i < 9; i++) {
			if (uniqueID !== +userdArr[i]) {
				const digitsCount = uniqueID.toString().length
				let nullCount = '0'.repeat(6 - digitsCount),
					useridNew = nullCount + uniqueID
				setUserid(useridNew)
				return
			}
			uniqueID += 1;
		}
	}

	return (
		<>
			<div className={st.wrapper}>
				<form autoComplete='off' className={st.form}>
					<h2>Create User Form</h2>
					<TextField ref={useridField}
						onInput={e => {
							e.target.value = e.target.value.replace(/[^\d.]/g, '');
							setUserid(e.target.value)
						}}
						error={!!errorLogin}
						inputProps={{ maxLength: 6 }}
						autoComplete="userid"
						required
						name="userid"
						helperText={errorLogin ? errorLogin : "Enter user ID"}
						sx={{ marginBottom: '15px' }}
						size='small' label="User ID"
						value={userid ? userid : ''}
						variant="outlined" />
					<TextField onInput={e => setEmail(e.target.value)}
						error={!!errorEmail}
						autoComplete="email"
						name="email"
						required
						helperText={errorEmail ? errorEmail : "Enter user e-mail"}
						sx={{
							position: 'relative',
							marginBottom: '15px'
						}}
						size='small' label="E-Mail"
						variant="outlined" />
					<IconButton sx={{
						position: "absolute",
						padding: "4px",
						right: '42px',
						top: '55px'
					}}
						onClick={generateID}
						onMouseDown={e => e.preventDefault()}
						edge="end"
						title="Generate unique ID"
					>
						<ReplayCircleFilledIcon />
					</IconButton>
					<FormControl size='small' sx={{ marginBottom: '15px' }} variant="outlined">
						<InputLabel>Password</InputLabel>
						<OutlinedInput sx={{ paddingRight: "4px" }}
							onInput={e => setPassword(e.target.value)}
							type={isShowPassword ? 'text' : 'password'}
							error={!!errorPassword}
							endAdornment={
								<InputAdornment position="end">
									<IconButton sx={{
										padding: "4px",
										marginRight: 0
									}}
										onClick={() => isShowPassword ? setShowPassword(false) : setShowPassword(true)}
										onMouseDown={e => e.preventDefault()}
										edge="end"
									>
										{isShowPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label="Password"
						/>
						<FormHelperText error={!!errorPassword} variant='outlined'>{errorPassword ? errorPassword : 'Enter user password'}</FormHelperText>
					</FormControl>
					<TextField onInput={e => setName(e.target.value)}
						autoComplete='name'
						name="name"
						helperText="Enter user name"
						sx={{ marginBottom: '15px' }}
						size='small' label="Name"
						variant="outlined" />
					<TextField onInput={e => setSurname(e.target.value)}
						autoComplete="none"
						name="surname"
						helperText="Enter user surname"
						size="small"
						label="Surname"
						variant="outlined" />
					<div className={st.buttons}>
						<IconButton
							disabled={creating}
							size='small'
							title='Accept'
							onClick={createUser}>
							{creating ? <CircularProgress size={20} sx={{ color: '#777777' }} />
								: <CheckCircleOutlineOutlinedIcon sx={{ color: 'green' }} />}
						</IconButton>
						<IconButton size='small' title='Cancel' onClick={() => setCreateForm(false)}>
							<DoDisturbAltOutlinedIcon sx={{
								color: 'red'
							}} />
						</IconButton>
					</div>
					{errorMessage && <p className={st.error}>{errorMessage}</p>}
				</form>
			</div>
		</>
	)
}

export default observer(CreateUser)