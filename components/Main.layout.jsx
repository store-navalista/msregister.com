import Header from './Header/Header'
import Seo from './seo'
import st from './Main.layout.module.css'
import AsideMenu from "./AsideMenu/AsideMenu";
import bg from '../src/assets/images/index/main_bg.jpg'
import store from "../store/store";
import FooterMenu from "./Footer/FooterMenu";

function MainLayout({ children }) {
	let description = 'Error',
		pageTitle = 'Error Page',
		siteTitle = 'Mediterranean Shipping Register'
	if (children.props.seo) {
		description = children.props.seo.description
		pageTitle = children.props.seo.pageTitle
		siteTitle = children.props.seo.siteTitle
	}
	return (
		<>
			<Seo
				description={description}
				pageTitle={pageTitle}
				siteTitle={siteTitle}
			/>
			<div className={st.content}>
				<Header store={store} />
				<AsideMenu store={store} />
				<main style={{
					backgroundImage: "url(" + `${bg.src}` + ")",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					backgroundPosition: "50% 50%",
					height: '100vh',
					overflow: 'hidden'
				}}>
					{children}
				</main>
				<FooterMenu info={store.info} />
			</div>
		</>
	)
}

export default MainLayout