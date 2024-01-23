import React, { useState } from 'react';
import styles from './CreatingTodo.module.css';
import Button from '../Button/Button';

function CreatingTodo({ isCreatingTodo, creatingNewTodo }) {
	const [inputValue, setInputValue] = useState('');

	const formInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleCreating = () => {
		creatingNewTodo(inputValue);
		setInputValue('');
	};

	return (
		<form className={styles.form}>
			<input
				className={styles.input}
				type="text"
				value={inputValue}
				onChange={formInputChange}
			/>
			<Button
				disabled={isCreatingTodo || inputValue === ''}
				onClick={handleCreating}
				titleButton="Добавить"
			/>
		</form>
	);
}

export default CreatingTodo;
