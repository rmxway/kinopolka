import { useState } from 'react';

export const RequestForm = () => {
	const [email, setEmail] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		setSubmitted(true);
	};

	return (
		<section className="request" aria-labelledby="request-title">
			<h2>Анонсы киновечеров</h2>
			<p>Обязательно сохраним ваш адрес</p>
			{submitted ? (
				<div role="status">
					<p className="alert alert-success">
						Отлично. Введенный адрес: {email}
					</p>
					<button
						type="button"
						className="btn btn-outline-success"
						onClick={() => {
							setSubmitted(false);
							setEmail('');
						}}
					>
						Заполнить ещё раз
					</button>
				</div>
			) : (
				<form className="announce" onSubmit={handleSubmit}>
					<label htmlFor="email">Электронная почта</label>
					<div className="input-group">
						<input
							type="email"
							id="email"
							name="email"
							placeholder="mail@host.com"
							className="form-control"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<button className="btn btn-primary" type="submit">
							Проверить форму
						</button>
					</div>
				</form>
			)}
		</section>
	);
};
