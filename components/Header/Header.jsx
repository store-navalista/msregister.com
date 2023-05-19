import st from './Header.module.css'
import HeaderNav from "./HeaderNav";

export default function Header({ store }) {
	return (
		<>
			<header className={st.header}>
				<HeaderNav store={store} />
				{/*<HeaderRightBlock store={store} />*/}
			</header>
		</>
	)
}




