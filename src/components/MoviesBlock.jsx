import { useState } from 'react';
import { useFavorites, useMovies } from '../hooks';
import { FilterButton, MovieCard, RequestForm } from './';

export const MoviesBlock = () => {
	const { error, loading, movies, retry } = useMovies();
	const [query, setQuery] = useState('');
	const [tab, setTab] = useState('all');
	const { error: favError, favorites, toggle, clear } = useFavorites();
	7;
	const countFavorites = movies.filter((item) =>
		favorites.includes(item.id),
	).length;

	const visible = movies.filter(
		(movie) =>
			movie.title.toLowerCase().includes(query.trim().toLowerCase()) &&
			(favorites.includes(movie.id) || tab === 'all'),
	);
	return (
		<section className="container">
			<nav aria-label="Разделы каталога">
				<FilterButton
					condition={tab === 'all'}
					setTab={() => setTab('all')}
				>
					Все фильмы
				</FilterButton>
				<FilterButton
					condition={tab === 'favorites'}
					setTab={() => setTab('favorites')}
				>
					Моё избранное ({countFavorites})
				</FilterButton>
				{countFavorites != 0 && (
					<button className="btn btn-primary" onClick={clear}>
						Удалить избранное
					</button>
				)}
			</nav>
			<form role="search" onSubmit={(e) => e.preventDefault()}>
				<label htmlFor="search">Поиск по названию</label>
				<div className="input-group toolbar">
					<input
						type="text"
						id="search"
						className="form-control"
						placeholder="Какой фильм ищем?"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<button
						className="btn btn-empty"
						onClick={() => setQuery('')}
					>
						&times;
					</button>
				</div>
			</form>
			{favError && <p>{favError}</p>}

			{loading && <p>Загружаем фильмы...</p>}
			{error && (
				<div className="alert alert-danger">
					{error}
					<button className="btn btn-primary" onClick={retry}>
						Повторить
					</button>
				</div>
			)}

			{!error && !loading && (
				<div className="cards">
					{visible.map((movie) => (
						<MovieCard
							key={movie.id}
							movie={movie}
							liked={favorites.includes(movie.id)}
							onToggle={toggle}
						/>
					))}
				</div>
			)}

			{!loading && !error && visible.length == 0 && (
				<p className="alert alert-warning">
					Фильмов не найдено. Измените поиск или добавьте фильм.
				</p>
			)}

			<RequestForm />
		</section>
	);
};
