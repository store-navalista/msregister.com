import st from './HeaderRightBlock.module.css'

import call from '../../src/assets/images/svg/phone-alt-solid.svg'

export default function HeaderRightBlock(props) {
	const { phone, text } = props.store.info
	let phoneClear = phone => {
		let reg = /\D/;
		return '+' + phone.split(reg).join("")
	}
	return (
		<>
			<div className={st.wrapper}>
				<div className={st.block}>
					<a className={st.link}
						href={`tel:${phoneClear(phone)}`}>{text}:&nbsp; {phone}
					</a>
					<a href={`tel:${phoneClear(phone)}`} className={st.call}>
						<img src={call.src} alt='call' />
					</a>
				</div>
				{/* <HeaderRightBlockLang store={props.store} /> */}
			</div>
		</>
	)
}