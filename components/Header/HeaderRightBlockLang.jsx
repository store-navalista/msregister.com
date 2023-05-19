import st from './HeaderRightBlockLang.module.css'
import empty from '../../src/assets/images/svg/empty_btn_cyrcle.svg'
import preloader from '../../src/assets/images/svg/lang_preloader.svg'
import en from '../../src/assets/images/svg/solid_lang_en.svg'
import ru from '../../src/assets/images/svg/solid_lang_ru.svg'
import { useRouter } from "next/router";
import Link from "next/link";


export default function HeaderRightBlockLang({ store }) {
	const router = useRouter()
	return (
		<>
			<img className={st.preloader} src={preloader.src} alt='loading' />
			<Link href={router.pathname} legacyBehavior>
				<a>
					<button onClick={(e) => {
						store.toggleLanguage(e)
					}} className={st.btn} title='Language switcher'>
						<img src={empty.src} alt='empty' />
						<div className={st.block}>
							<img data-id='0' src={ru.src} alt='english' />
							<img data-id='1' src={en.src} alt='russian' />
						</div>
					</button>
				</a>
			</Link>
		</>
	)
}


