import { useState } from 'react';
import MovieCard from './MovieCard';
import useMovies from './hooks/useMovies';
import useFavorites from './hooks/useFavorites';
import { MotionConfig } from 'motion/react';
import { RequestForm } from './RequestForm';

const FilterButton = ({ condition, setTab, children }) => {
	return (
		<button
			className={`btn ${condition ? 'btn-success' : 'btn-outline-success'}
								`}
			type="button"
			aria-pressed={condition}
			onClick={setTab}
		>
			{children}
		</button>
	);
};

export default function App() {
	const { error, loading, movies, retry } = useMovies();
	const [query, setQuery] = useState('');
	const [tab, setTab] = useState('all');
	const { error: favError, favorites, toggle } = useFavorites();

	const countFavorites = movies.filter((item) =>
		favorites.includes(item.id),
	).length;

	const visible = movies.filter(
		(movie) =>
			movie.title.toLowerCase().includes(query.trim().toLowerCase()) &&
			(favorites.includes(movie.id) || tab === 'all'),
	);

	return (
		<MotionConfig reducedMotion="user">
			<main>
				<header>
					<div className="container">
						<span className="eyebrow">Фильм начинается здесь</span>
						<h1 className="fs-1">
							{import.meta.env.VITE_APP_TITLE || 'Кинополка'}
						</h1>
						<p>
							выберите фильм для уютного вечера и соберите весь
							список
						</p>
					</div>
				</header>
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
							Фильмов не найдено. Измените поиск или добавьте
							фильм.
						</p>
					)}

					<RequestForm />
				</section>
				<footer>
					<div className="container">
						Фильмы почти настоящие. 2026
					</div>
				</footer>
			</main>
		</MotionConfig>
	);
}
