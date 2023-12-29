import Header from "../../components/header/BaseHeader"

import Hero from "./Hero"
import Categories from "./Categories"
import Introduction from "./Introduction"

export default () => {
	return (
		<>
			<Header theme="white"/>
			<main>
				<Hero/>
				<Categories/>
				<Introduction/>
			</main>
		</>
	)
}