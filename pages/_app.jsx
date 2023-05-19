import '../styles/globals.css'
import MainLayout from "../components/Main.layout";
import Store from '../src/store/store';
import { createContext, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react';

const store = new Store();

export const Context = createContext({
	store,
});

const MyApp = ({ Component, pageProps }) => {
	const { store } = useContext(Context)

	useEffect(() => {
		if (localStorage.getItem('token')) {
			store.checkAuth()
		}
	}, [])

	// if (store.isLoading) {
	// 	return <div>Loading...</div>
	// }

	return (
		<>
			<Context.Provider value={{
				store
			}}>
				<MainLayout description={pageProps.description}
					pageTitle={pageProps.pageTitle}
					siteTitle={pageProps.siteTitle}
				>
					<Component {...pageProps} />
				</MainLayout>
			</Context.Provider>
		</>
	)
}

export default observer(MyApp)
