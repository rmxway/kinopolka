export const FilterButton = ({ condition, setTab, children }) => {
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
