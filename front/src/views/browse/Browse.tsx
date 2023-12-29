import Header from "../../components/header/BaseHeader"
import BrowseFilter from "./BrowseFilter"
import BrowseListArea from "./BrowseListArea"

import "./browse.css"

export default () => {
	return (
		<>
			<Header />
			<main className="container__browse">
        <BrowseFilter/>
				<BrowseListArea/>
			</main>
		</>
	)
}