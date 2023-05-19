import Link from "next/link";
import st from "./ErrorScreen.module.css";

export default function ErrorScreen() {
	return (
		<>
			<aside className={st.aside}>
				<Link href='/' legacyBehavior>
					<a className={st.link}>CLICK TO BACK HOME!</a>
				</Link>
			</aside>
		</>
	)
}