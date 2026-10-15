import { useEffect, useState } from 'react';

export const useMovies = () => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [attempt, setAttempt] = useState(0);

	useEffect(() => {
		const controller = new AbortController();
		setError('');
		setLoading(true);

		async function load() {
			try {
				const response = await fetch(`${import.meta.env.BASE_URL}/movies.json`, {
					signal: controller.signal,
				});

				if (!response.ok) {
					throw new Error('Не удалось загрузить фильм');
				}

				const data = await response.json();

				if (
					!Array.isArray(data) ||
					!data.every(
						(item) =>
							item &&
							Number.isInteger(item.id) &&
							typeof item.title === 'string' &&
							typeof item.category === 'string' &&
							typeof item.duration === 'string' &&
							typeof item.icon === 'string' &&
							typeof item.description === 'string' &&
							typeof item.year === 'number'
					)
				) {
					throw new Error('Проверьте формат данных');
				}
				if (!controller.signal.aborted) setMovies(data);
			} catch (e) {
				if (!controller.signal.aborted) setError(e.message);
			} finally {
				if (!controller.signal.aborted) setLoading(false);
			}
		}

		load();

		return () => controller.abort();
	}, [attempt]);

	return { movies, loading, error, retry: () => setAttempt((prev) => prev + 1) };
};

export default useMovies;
