import Head from 'next/head'

export default function Seo({ description = 'Error', pageTitle = 'Error Page', siteTitle = 'MSR' }) {
	return (
		<Head>
			<title>{`${pageTitle} | ${siteTitle}`}</title>
			<meta charSet="utf-8" />
			<meta name="description" content={description} />
			<meta name="author" content="Serhii Otinov | Сергей Отинов" />
			<meta property="og:type" content="website" />
			<meta property="og:title" content={pageTitle} />
			<meta property="og:description" content={description} />
			<meta property="og:site_name" content={siteTitle} />
			<meta property="twitter:card" content="summary" />
			{/* <meta property="twitter:creator" content={config.social.twitter} /> */}
			<meta property="twitter:title" content={pageTitle} />
			<meta property="twitter:description" content={description} />
		</Head>
	)
}