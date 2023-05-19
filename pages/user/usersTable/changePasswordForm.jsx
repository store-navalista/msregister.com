import st from './changePasswordForm.module.css';
import DoDisturbAltOutlinedIcon from '@mui/icons-material/DoDisturbAltOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useContext } from 'react';
import { IconButton, InputLabel, FormControl, OutlinedInput, InputAdornment, FormHelperText } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { Context } from '../../_app'

function ChangePasswordForm({ setPasswordForm, passwordId, logging }) {
	const [errorPassword, setErrorPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [loading, setLoading] = useState(false)
	const [isShowPassword, setShowPassword] = useState(false)
	const [newPassword, setNewPassword] = useState('')

	const { store } = useContext(Context)

	async function changePasswordUser() {
		if (!newPassword) {
			setErrorPassword("Password field cannot be empty!")
			return
		}
		if (newPassword.length < 3) {
			setErrorPassword("Password must contain at least 3 characters!")
			return
		}
		if (confirm('Are you sure you want to save this user password?')) {
			setErrorPassword('')
			setLoading(true)
			const user = await store.updatePasswordUser(passwordId, newPassword);
			if (!user) {
				setErrorMessage(`Error: Server error!`)
				setLoading(false)
				return
			}
			logging(`Success: User with ID:${user.data.userid} and E-mail:${user.data.email} successfully changed password!`)
			setPasswordForm(false)
		}
	}

	return (
		<>
			<div className={st.wrapper}>
				<form autoComplete='off' className={st.form}>
					<h2>Change Password Form</h2>
					<FormControl size='small' sx={{ marginBottom: '15px' }} variant="outlined">
						<InputLabel error={!!errorPassword}>Password</InputLabel>
						<OutlinedInput onInput={e => setNewPassword(e.target.value)}
							type={isShowPassword ? 'text' : 'password'}
							error={!!errorPassword}
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
						<FormHelperText error={!!errorPassword} variant='outlined'>{errorPassword ? errorPassword : 'Enter user password'}</FormHelperText>
					</FormControl>
					<div className={st.buttons}>
						<IconButton
							onClick={changePasswordUser}
							disabled={loading}
							size='small'
							title='Accept'>
							{loading ? <CircularProgress size={20} sx={{ color: '#777777' }} />
								: <CheckCircleOutlineOutlinedIcon sx={{ color: 'green' }} />
							}
						</IconButton>
						<IconButton onClick={() => setPasswordForm(false)} size='small' title='Cancel'>
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

export default ChangePasswordForm