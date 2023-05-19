import React from 'react'
import data from "./data.json";
import AboutContent from "../../components/PagesComponents/contents/AboutContent";
import store from "../../store/store";

function About({ data, pages, aboutPage }) {
	return (
		<>
			<div className='body-wrapper'>
				<AboutContent data={data} pages={pages} aboutPage={aboutPage} />
			</div>
		</>
	)
}

export async function getStaticProps() {
	const seo = store.headerPages[1].seo,
		pages = store.headerPages[1].pages,
		aboutPage = store.headerPages[1]
	return {
		props: {
			data,
			pages,
			aboutPage,
			seo
		},
	}
}

export default About

