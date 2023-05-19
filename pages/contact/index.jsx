import React from 'react'
import store from "../../store/store";
import data from './data.json'
import ServicesContent from "../../components/PagesComponents/contents/ServicesContent";
import CallbackForm from "../../components/PagesComponents/contents/CallbackForm";

function Contact({ data }) {
	return (
		<>
			<div className='body-wrapper'>
				<ServicesContent data={data} />
				<CallbackForm />
			</div>
		</>
	)
}

export async function getStaticProps() {
	const seo = store.headerPages[2].seo
	return {
		props: {
			seo,
			data
		},
	}
}

export default Contact