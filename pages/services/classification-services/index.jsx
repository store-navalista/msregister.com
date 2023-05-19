import React from 'react'
import store from "../../../store/store";
import data from "./data.json";
import ServicesContent from "../../../components/PagesComponents/contents/ServicesContent";

function ClassificationServices({ data }) {
	return (
		<>
			<div className='body-wrapper'>
				<ServicesContent data={data} />
			</div>
		</>
	)
}

export async function getStaticProps() {
	const seo = store.asidePages[0].seo
	return {
		props: {
			data,
			seo
		},
	}
}

export default ClassificationServices