import React from "react";
import st from './AboutContent.module.css'
import Link from "next/link";
import AboutContentSwitcher from "./AboutContentSwitcher";

function AboutContent({ data, pages, aboutPage }) {
	const { h1, text } = data
	let key = 0
	return (
		<>
			<div className={st.wrapper}>
				<div className={st.content}>
					<h1 className={st.h1}>{h1}</h1>
					<div className={st.block}>
						{text.map(sentence => {
							if (!Array.isArray(sentence)) {
								if (typeof sentence === 'string') {
									key++
									return (
										<p key={key} className={st.paragraph}>{sentence}</p>
									)
								} else {
									switch (Object.keys(sentence)[0]) {
										case "h2":
											key++
											return (
												<h2 key={key} className={st.h2}>{sentence.h2}</h2>
											)
										default:
											key++
											return (
												<Link key={key} href={sentence.link} legacyBehavior>
													<a className={st.link}
														title={"Link to " + sentence.link}
														rel="external"
														target="_blank">{sentence.title}</a>
												</Link>
											)
									}
								}
							} else {
								key++
								return (
									<ul key={key}>
										{sentence.map(row => {
											key++
											return (
												<li key={key}>&#183;  {row}</li>
											)
										})}
									</ul>
								)
							}
						})}
						 <AboutContentSwitcher data={data} pages={pages} aboutPage={aboutPage} />
					</div>
				</div>
			</div>
		</>
	)
}

export default AboutContent
