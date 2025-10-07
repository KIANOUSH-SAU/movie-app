const Search = ({ searchTerm, setSearchTerm }) => {
	//Props should never change by the child component!!! They are read ONLY
	return (
		<div className="search">
			<div>
				<img src="search.svg" alt="search" />
				<input
					type="text"
					placeholder="search through 300+ movies online"
					value={searchTerm}
					// Comes from the parent(App.jsx) and is displayed on the search bar as the initial search text
					onChange={(event) => setSearchTerm(event.target.value)}
				/>
			</div>
		</div>
	);
};

export default Search;
