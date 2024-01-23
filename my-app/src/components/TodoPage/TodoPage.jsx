import React, { useEffect, useState } from 'react';
import styles from './TodosPage.module.css';
import todosImg from './todos100x100.png';
import TodoList from '../TodoList/TodoList';
import CreatingTodo from '../CreatingTodo/CreatingTodo';
import { TodosContext } from '../../context/context';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [refreshTodosList, setRefreshTodosList] = useState(false);

	const [isCreatingTodo, setIsCreatingTodo] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdatingTodo, setIsUpdatingTodo] = useState(false);
	const [isDeletingTodo, setIsDeletingTodo] = useState(false);

	const [searchTerm, setSearchTerm] = useState('');
	const [checkedSortCheckbox, setCheckedSortCheckbox] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch('http://localhost:3005/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [refreshTodosList, isUpdatingTodo, checkedSortCheckbox]);

	const editTodo = (id, isEditTodo) => {
		setIsUpdatingTodo(true);

		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ title: isEditTodo }),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Дело отредактировано.', response);
				setRefreshTodosList(!refreshTodosList);
			})
			.finally(() => setIsUpdatingTodo(false));
	};

	const creatingNewTodo = (inputValue) => {
		setIsCreatingTodo(true);
		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: inputValue,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Новое дело добавлено.', response);
				setRefreshTodosList(!refreshTodosList);
			})

			.finally(() => {
				setIsCreatingTodo(false);
			});
	};

	const deleteTodo = (id) => {
		setIsDeletingTodo(true);

		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Дело удалено.', response);
				setRefreshTodosList(!refreshTodosList);
			})
			.finally(() => {
				setIsDeletingTodo(false);
			});
	};

	return (
		<main className={styles.TodoPage}>
			<section className={styles.PageHeader}>
				<img src={todosImg} alt="todos" />
				<h1 className={styles.TitlePageHeader}>Список дел</h1>
			</section>
			<section className={styles.formContainer}>
				<CreatingTodo
					creatingNewTodo={creatingNewTodo}
					isCreatingTodo={isCreatingTodo}
				/>
			</section>
			<TodosContext.Provider
				value={{
					todos,
					editTodo,
					deleteTodo,
					isDeletingTodo,
					searchTerm,
					setSearchTerm,
					checkedSortCheckbox,
					setCheckedSortCheckbox,
				}}
			>
				{isLoading ? <div className={styles.loader}></div> : <TodoList />}
			</TodosContext.Provider>
		</main>
	);
};

export default TodoPage;
