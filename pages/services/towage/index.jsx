import React from 'react'
import data from "./data.json";
import store from "../../../store/store";
import ServicesContent from "../../../components/PagesComponents/contents/ServicesContent";

function Towage({ data }) {
	return (
		<>
			<div className='body-wrapper'>
				<ServicesContent data={data} />
			</div>
		</>
	)
}

export async function getStaticProps() {
	const seo = store.asidePages[3].seo
	return {
		props: {
			data,
			seo
		},
	}
}

export default Towage