import { Header } from "./components/Header";

import styles from "./App.module.css";
import "./global.css";
import { NewTask } from "./components/NewTask";
import { useState } from "react";
import { TaskItem } from "./components/TaskItem";

interface ITask {
	title: string;
	isCompleted: boolean;
}

function App() {
	const [tasks, setTasks] = useState<ITask[]>([]);
	function handleAddTask(title: string) {
		const newTask: ITask = {
			title,
			isCompleted: false
		};
		setTasks(prevState => [...prevState, newTask]);
	}

	function handleRemoveTask(task: ITask) {
		setTasks(prevState => prevState.filter(t => t.title !== task.title));
	}

	function handleCompleteTask(task: ITask, value: boolean) {
		setTasks(prevState =>
			prevState.map(t => {
				if (t.title === task.title) {
					t.isCompleted = value;
				}
				return t;
			})
		);
	}

	return (
		<div>
			<Header />
			<main className={styles.wrapper}>
				<NewTask addTask={handleAddTask} />

				<section className={styles.container}>
					<header>
						<p>
							Tarefas Criadas<span>{tasks.length}</span>
						</p>
						<p>
							Concluídas
							<span>
								{tasks.filter(d => d.isCompleted).length} de{" "}
								{tasks.length}
							</span>
						</p>
					</header>
					<main>
						{tasks.map(t => (
							<TaskItem
								key={t.title}
								task={t}
								onComplete={handleCompleteTask}
								onRemove={handleRemoveTask}
							/>
						))}
					</main>
				</section>
			</main>
		</div>
	);
}

export default App;
