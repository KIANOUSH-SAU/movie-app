const Search = ({ searchTerm, setSearchTerm }) => {
	//Props should never change by the child component!!! They are read ONLY
	function changeHandler(e) {
		setSearchTerm(e.target.value);
		// Event handlers should NOT return JSX!
		// They just update state, then React re-renders the component
	}
	return (
		<>
			<div className="search">
				<div>
					<img src="search.svg" alt="search" />
					<input
						type="text"
						placeholder="search through 300+ movies online"
						value={searchTerm}
						// Comes from the parent(App.jsx) and is displayed on the search bar as the initial search text
						// onChange={(event) => setSearchTerm(event.target.value)}
						onChange={changeHandler}
					/>
				</div>
				{/* This is where you display dynamic content - in the component's return! */}
			</div>
			{searchTerm && <h1 className="text-white mt-4">{searchTerm}</h1>}
		</>
	);
};

export default Search;
