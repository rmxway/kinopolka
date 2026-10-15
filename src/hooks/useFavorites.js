import { useState, useEffect } from 'react';

const STORAGE_KEY = 'movie-watch-list';

function readFavorites() {
	try {
		const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
		return Array.isArray(saved) ? saved.filter((id) => Number.isInteger(id)) : [];
	} catch {
		return [];
	}
}

export default function useFavorites() {
	const [favorites, setFavorites] = useState(readFavorites);
	const [error, setError] = useState('');

	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
			setError('');
		} catch {
			setError('Браузер запретил сохранение');
		}
	}, [favorites]);

	function toggle(id) {
		setFavorites((current) =>
			current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
		);
	}

	return { favorites, toggle, error };
}
