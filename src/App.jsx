import React, { useState, useEffect, useRef } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
	method: "GET",
	headers: {
		accept: "application/json",
	},
};

function App() {
	const [searchTerm, setSearchTerm] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [movieList, setMovieList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const movies = useRef([]);
	const fetchMovies = async () => {
		setIsLoading(true);
		setErrorMessage("");
		try {
			const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
			const response = await fetch(endpoint, API_OPTIONS);

			if (!response.ok) {
				throw new Error("Failed to fetch movies");
			}

			const data = await response.json();
			console.log(data);

			// TMDB API returns movies in 'results' array
			if (data.results && data.results.length > 0) {
				setMovieList(data.results);
				setErrorMessage(""); // Clear any previous errors
			} else {
				setErrorMessage("No movies found");
				setMovieList([]);
			}
		} catch (error) {
			console.log(`Error while fetching movies: ${error}`);
			setErrorMessage(`Error while fetching movies: ${error}`);
		} finally {
			setIsLoading(false);
			//So no matter if we succeed or not, it always sets the Isloading to false
		}
	};
	// Fetch movies only once when component mounts
	useEffect(() => {
		fetchMovies();
	}, []);

	// Filter movies whenever searchTerm or movieList changes
	useEffect(() => {
		if (searchTerm.trim() === "") {
			movies.current = []; // Show all movies when search is empty
		} else {
			// Filter movies that match the search term
			const filteredMovies = movieList.filter((movie) =>
				movie.title.toLowerCase().includes(searchTerm.toLowerCase())
			);
			movies.current = filteredMovies;
		}
	}, [searchTerm, movieList]);
	return (
		<>
			<main>
				<div className="pattern" />
				<div className="wrapper">
					<header>
						<img src="./hero.png" alt="" />
						<h1>
							Search Up For{" "}
							<span className="text-gradient">Movies</span>
						</h1>
						<Search
							searchTerm={searchTerm}
							setSearchTerm={setSearchTerm}
						/>
					</header>
					<section className="all-movies">
						<h2 className="mt-[40px]">All Movies</h2>

						{isLoading ? (
							<Spinner />
						) : errorMessage ? (
							<p className="text-red-500">{errorMessage}</p>
						) : (
							<ul>
								{/* Show filtered movies if searching, otherwise show all movies */}
								{searchTerm.trim() === ""
									? movieList.map((movie) => (
											<p
												className="text-white"
												key={movie.id}
											>
												{movie.title}
											</p>
									  ))
									: movies.current.map((movie) => (
											<p
												className="text-white"
												key={movie.id}
											>
												{movie.title}
											</p>
									  ))}

								{/* Show "no results" message if searching but no matches */}
								{searchTerm.trim() !== "" &&
									movies.current.length === 0 && (
										<p className="text-gray-400">
											No movies found matching "
											{searchTerm}"
										</p>
									)}
							</ul>
						)}
					</section>
				</div>
			</main>
		</>
	);
}

export default App;
