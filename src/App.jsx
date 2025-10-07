import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Debug: Let's see what we're working with
console.log("API_KEY:", API_KEY);
console.log("API_KEY type:", typeof API_KEY);
console.log("API_KEY length:", API_KEY?.length);

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
	useEffect(() => {
		fetchMovies();
	}, []);

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
								{movieList.map((movie) => {
									return (
										<p
											className="text-white"
											key={movie.id}
										>
											{movie.title}
										</p>
									);
								})}
							</ul>
						)}

						{/* {errorMessage && (
							<p className="text-red-500">{errorMessage}</p>
						)} */}
					</section>
				</div>
			</main>
		</>
	);
}

export default App;
