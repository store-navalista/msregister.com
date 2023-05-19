import st from './index.module.css'
import store from '../store/store'
import data from "./data.json";
import { useEffect } from 'react';

function Index({ data }) {
	const { h1, text } = data
	return (
		<>
			<div className={st.wrapper}>
				<div className={st.title}>
					<h1 className={st.h1}>{h1}</h1>
					<h2 className={st.h2}>{text}</h2>
				</div>
			</div>
		</>
	)
}

export async function getStaticProps() {
	const seo = store.headerPages[0].seo
	return {
		props: {
			data,
			seo
		},
	}
}

export default Index
