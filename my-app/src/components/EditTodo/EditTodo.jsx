import React, { useContext, useState } from 'react';
import styles from './EditTodo.module.css';
import Button from '../Button/Button';
import { TodosContext } from '../../context/context';

function EditTodo({ handleEdit, ...props }) {
	const [isEditTodo, setisEditTodo] = useState(props.title);

	const { editTodo } = useContext(TodosContext);

	const handleChange = (event) => {
		setisEditTodo(event.target.value);
	};

	const handleEditTodo = () => {
		editTodo(props.id, isEditTodo);
	};

	return (
		<>
			<textarea
				className={styles.todoInput}
				autoFocus
				rows={5}
				name={props.id}
				defaultValue={props.title}
				onChange={handleChange}
			/>
			<Button onClick={handleEditTodo} titleButton="Сохранить" />
			<Button onClick={handleEdit} titleButton="Отмена" />
		</>
	);
}

export default EditTodo;
