import { motion } from 'motion/react';

export const MovieCard = ({ movie, liked, onToggle }) => {
	const btnClass = `btn btn-${!liked ? 'outline-primary' : 'primary'}`;
	return (
		<motion.article
			className="movie"
			whileHover={{ scale: 1.03 }}
			transition={{
				duration: 0.2,
			}}
		>
			<div className="picture" aria-hidden="true">
				{movie.icon}
			</div>
			<p className="small mt-3 mb-3">
				{movie.category} | {movie.duration}
			</p>
			<h2 className="fs-4 mb-3">{movie.title}</h2>
			<p className="description">{movie.description}</p>
			<p>
				Год выпуска: <strong>{movie.year}</strong>
			</p>

			<button
				className={btnClass}
				type="button"
				aria-pressed={liked}
				onClick={() => onToggle(movie.id)}
			>
				{liked ? 'В моём списке' : 'Смотреть позже'}
			</button>
		</motion.article>
	);
};

export default MovieCard;
