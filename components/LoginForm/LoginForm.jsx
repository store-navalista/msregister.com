import st from './LoginForm.module.css';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import DoneIcon from '@mui/icons-material/Done';
import CircularProgress from '@mui/material/CircularProgress';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { TextField, IconButton, FormControl, InputLabel, OutlinedInput, InputAdornment, FormHelperText } from '@mui/material';
import { useState, useContext } from 'react';
import { Context } from '../../pages/_app';
import { useRouter } from 'next/router';

export default function LoginForm({ setLoginHidden }) {
	const router = useRouter();
	const [userid, setUserid] = useState('')
	const [password, setPassword] = useState('')
	const [loginError, setLoginError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [successMessage, setSuccessMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [isShowPassword, setShowPassword] = useState(false)
	const [loading, setLoading] = useState(false)

	const { store } = useContext(Context);

	async function login() {
		setLoginError('')
		setPasswordError('')
		setErrorMessage('')
		if (!userid) {
			return setLoginError('User ID or Email cannot be empty!')
		}
		if (!password) {
			return setPasswordError('Password cannot be empty!')
		}
		setLoading(true)
		const response = await store.login(userid, password);
		if (!response) {
			setErrorMessage('Error: Server error')
			setLoading(false)
			return
		}
		if (typeof response === 'string') {
			setLoading(false)
			return setErrorMessage(response)
		}
		setPasswordError('')
		setSuccessMessage("User successfully logged in!")
		router.push(`/user/${store.user.userid}`);
		setTimeout(() => {
			setLoginHidden(false)
		}, 1000)
	}
	return (
		<>
			<div className={st.wrapper}>
				<div className={st.form}>
					<h3>AUTHORIZATION</h3>
					<TextField
						onInput={(e) => setUserid(e.target.value)}
						sx={{ marginBottom: '10px' }}
						fullWidth={true}
						error={!!loginError}
						size="small"
						label="Enter User ID or Email"
						helperText={loginError ? loginError : "Enter User ID or Email"}
					/>
					<FormControl fullWidth={true} size='small' variant="outlined">
						<InputLabel error={!!passwordError}>Password</InputLabel>
						<OutlinedInput onInput={e => setPassword(e.target.value)}
							type={isShowPassword ? 'text' : 'password'}
							error={!!passwordError}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
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
						<FormHelperText error={!!passwordError} variant='outlined'>{passwordError ? passwordError : 'Enter user password'}</FormHelperText>
					</FormControl>
					<div className={st.buttonGroup}>
						{loading ? <CircularProgress size={20} sx={{ color: '#777777', p: '10px' }} />
							: <IconButton
								disabled={loading}
								onClick={login}
								color="success">
								<DoneIcon />
							</IconButton>
						}
						<IconButton
							onClick={() => setLoginHidden(false)}
							sx={{ marginLeft: "10px" }}
							color="error">
							<DoDisturbAltIcon />
						</IconButton>
					</div>
					{successMessage && <p className={st.success}>{successMessage}</p>}
					{errorMessage && <p className={st.error}>{errorMessage}</p>}
				</div>
			</div>
		</>
	)
}

