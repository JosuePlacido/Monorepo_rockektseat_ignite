import { Check, Trash } from "phosphor-react";
import styles from "./TaskItem.module.css";
import { ChangeEvent } from "react";

export interface ITask {
	title: string;
	isCompleted: boolean;
}
interface IProps {
	task: ITask;
	onRemove: (data: ITask) => void;
	onComplete: (data: ITask, value: boolean) => void;
}

export function TaskItem({ task, onRemove, onComplete }: IProps) {
	function handleRemove() {
		onRemove(task);
	}

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		onComplete(task, event.target.checked);
	}

	return (
		<article
			className={`${styles.container} ${
				task.isCompleted ? styles.completed : ""
			}`}
		>
			<span className={styles.checkmark}>
				<Check />
				<input type="checkbox" onChange={handleChange} />
			</span>

			<p>{task.title}</p>
			<button onClick={handleRemove}>
				<Trash size={20} />
			</button>
		</article>
	);
}
