export const Header = () => {
	return (
		<header>
			<div className="container">
				<span className="eyebrow">Фильм начинается здесь</span>
				<h1 className="fs-1">
					{import.meta.env.VITE_APP_TITLE || 'Кинополка'}
				</h1>
				<p>выберите фильм для уютного вечера и соберите весь список</p>
			</div>
		</header>
	);
};
