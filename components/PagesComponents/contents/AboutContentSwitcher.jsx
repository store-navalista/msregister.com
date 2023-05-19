import React from "react";
import st from './AboutContentSwitcher.module.css'
import Link from "next/link";
import { useRouter } from "next/router";


function AboutContentSwitcher({ pages, aboutPage }) {
	const router = useRouter()
	return (
		<>
			<nav className={st.wrapper}>
				<div className={st.page}
					data-title={aboutPage.tip}
					style={{ backgroundImage: "url(" + `${aboutPage.background}` + ")" }}
					hidden={router.pathname === aboutPage.href}
				>
					<Link href={aboutPage.href} legacyBehavior>
						<a />
					</Link>
				</div>
				{pages.map(page => {
					if (router.pathname === page.href) return
					return (
						<div key={page.id}
							className={st.page}
							data-title={page.tip}
							style={{ backgroundImage: "url(" + `${page.background}` + ")" }}
						>
							<Link href={page.href} legacyBehavior>
								<a />
							</Link>
						</div>
					)
				})}
			</nav>
		</>
	)
}

export default AboutContentSwitcher
