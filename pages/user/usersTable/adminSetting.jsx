import st from './adminSetting.module.css'
import { useState } from 'react';
import { Context } from '../../_app'
import { useContext, useRef } from 'react';
import Portal from '../../../HOC/Portal'
import ChangeAdminPasswordForm from './changeAdminPasswordForm'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import { IconButton } from '@mui/material';
import { useEffect } from 'react';
import { useRouter } from "next/router"


export default function AdminSetting({ logging }) {
	const router = useRouter()

	useEffect(() => {
		setDefaultEmail(store?.user?.email)
	}, [])

	const input = useRef(null)

	const { store } = useContext(Context)

	const [isAdminPasswordForm, setAdminPasswordForm] = useState(false)
	const [email, setEmail] = useState('')
	const [defaultEmail, setDefaultEmail] = useState('')
	const [isEmailChange, setEmailChange] = useState(false)
	const [loading, setLoading] = useState(false)

	function changePasswordForm() {
		isAdminPasswordForm ? setAdminPasswordForm(false) : setAdminPasswordForm(true)
	}

	function resetForm() {
		input.current.value = defaultEmail
		setEmailChange(false)
	}

	function checkMutate(e) {
		setEmail(e.target.value)
		e.target.value !== e.target.defaultValue ? setEmailChange(true) : setEmailChange(false)
	}

	async function updateEmailAdmin() {
		setLoading(true)
		if (confirm('Are you sure you want to change the admin mail?When you change your email you will be logged out!')) {
			const result = await store.updateEmailAdmin(email);
			if (!result) {
				setEmailChange(false)
				setLoading(false)
				resetForm()
				logging(`Error: Server error!`)
				return
			}
			await store.logout()
			router.push('/')
		}
		setLoading(false)
	}

	return (
		<div className={st.wrapper}>
			<h3>Administrator Setting</h3>
			<form className={st.setting}>
				<p>E-mail administrator</p>
				<input ref={input} name='E-mail administrator'
					defaultValue={defaultEmail}
					placeholder='Enter E-mail'
					type='email'
					onInput={e => checkMutate(e)}
				/>
				{isEmailChange ? <div className={st.save}>
					<IconButton disabled={loading} onClick={updateEmailAdmin}
						title='Save edit' sx={{ p: '5px', color: 'rgb(231 14 55)' }} aria-label="Save">
						<SaveOutlinedIcon sx={{ width: '20px', height: '20px' }} />
					</IconButton>
				</div> : null
				}
				{isEmailChange ? <div className={st.save} name='reset'>
					<IconButton disabled={loading} onClick={resetForm} sx={{
						bgcolor: "rgb(44, 44, 44)",
						p: '5px'
					}}>
						<RestartAltOutlinedIcon sx={{ width: '20px', height: '20px', fill: "white" }} />
					</IconButton>
				</div> : null
				}
				<button name='password'
					type='button'
					className={st.password}
					onClick={e => changePasswordForm(e)}
				>
					change admin password
				</button>
			</form>
			{isAdminPasswordForm && <Portal selector="#portal">
				<ChangeAdminPasswordForm setAdminPasswordForm={setAdminPasswordForm} logging={logging} />
			</Portal>}
		</div>
	)
}