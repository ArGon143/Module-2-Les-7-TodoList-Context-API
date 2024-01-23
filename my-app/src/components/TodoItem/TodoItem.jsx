import React, { useContext, useState } from 'react';
import styles from './TodoItem.module.css';
import EditTodo from '../EditTodo/EditTodo';
import Button from '../Button/Button';
import { TodosContext } from '../../context/context';

const TodoItem = ({ ...props }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [checked, setChecked] = useState(false);

	const { deleteTodo } = useContext(TodosContext);

	const handleEdit = () => {
		setIsEdit((prevState) => !prevState);
	};

	const handleDelete = () => {
		deleteTodo(props.id);
	};

	const checkboxChange = () => {
		setChecked(!checked);
	};

	return (
		<>
			{isEdit ? (
				<EditTodo {...props} handleEdit={handleEdit} />
			) : (
				<>
					<div className={styles.todo}>{props.title}</div>
					<input type="checkbox" checked={checked} onChange={checkboxChange} />
					{checked ? (
						<Button onClick={handleDelete} titleButton="Удалить" />
					) : (
						<></>
					)}
					<Button onClick={handleEdit} titleButton="Редактировать" />
				</>
			)}
		</>
	);
};

export default TodoItem;
