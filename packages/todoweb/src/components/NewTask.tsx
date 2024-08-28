import { PlusCircle } from "phosphor-react";
import { ChangeEvent, useState } from "react";
import styles from "./NewTask.module.css";

interface IProps {
	addTask: (text: string) => void;
}

export function NewTask({ addTask }: IProps) {
	const [task, setTask] = useState("");
	function handleChangeTaskText(event: ChangeEvent<HTMLInputElement>) {
		setTask(event.target.value);
	}

	function handleAddTask() {
		if (isFilled) {
			addTask(task);
			setTask("");
		}
	}

	const isFilled = task.length > 0;

	return (
		<span className={styles.container}>
			<input
				className={isFilled ? styles.filled : ""}
				placeholder="Adicione uma nova tarefa"
				value={task}
				onChange={handleChangeTaskText}
			/>
			<button onClick={handleAddTask}>
				Criar
				<PlusCircle size={20} />
			</button>
		</span>
	);
}
