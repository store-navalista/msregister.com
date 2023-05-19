import st from './changePasswordForm.module.css';
import { useState, useContext } from 'react';
import { IconButton, InputLabel, FormControl, OutlinedInput, InputAdornment, FormHelperText } from '@mui/material';
import DoDisturbAltOutlinedIcon from '@mui/icons-material/DoDisturbAltOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { Context } from '../../_app'
import CircularProgress from '@mui/material/CircularProgress';


function ChangeAdminPasswordForm({ setAdminPasswordForm, logging }) {
	const [errorPassword, setErrorPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [isShowPassword, setShowPassword] = useState(false)
	const [newPassword, setNewPassword] = useState('')
	const [loading, setLoading] = useState(false)

	const { store } = useContext(Context)

	async function changePasswordAdmin() {
		setErrorMessage('')
		if (!newPassword) {
			setErrorPassword("Password field cannot be empty!")
			return
		}
		if (newPassword.length < 6) {
			setErrorPassword("Password must contain at least 6 characters!")
			return
		}
		if (confirm('Are you sure you want to change admin password?')) {
			setErrorPassword('')
			setLoading(true)
			const result = await store.updatePasswordAdmin(newPassword)
			if (!result) {
				setErrorMessage(`Error: Server error!`)
				setLoading(false)
				return
			}
			logging(`Success: Admin password successfully changed!`)
			setAdminPasswordForm(false)
		}
	}

	return (
		<>
			<div className={st.wrapper}>
				<form autoComplete='off' className={st.form}>
					<h2>Change Admin Password</h2>
					<FormControl size='small' sx={{ marginBottom: '15px' }} variant="outlined">
						<InputLabel error={!!errorPassword}>Password</InputLabel>
						<OutlinedInput onInput={e => setNewPassword(e.target.value)}
							type={isShowPassword ? 'text' : 'password'}
							autoComplete='new-password'
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
							onClick={changePasswordAdmin}
							disabled={loading}
							size='small'
							title='Accept'>
							{loading ? <CircularProgress size={20} sx={{ color: '#777777' }} />
								: <CheckCircleOutlineOutlinedIcon sx={{ color: 'green' }} />
							}
						</IconButton>
						<IconButton onClick={() => setAdminPasswordForm(false)} size='small' title='Cancel'>
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

export default ChangeAdminPasswordForm