import React, { useState } from 'react';
import { Alert, RecyclerViewBackedScrollViewBase, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (tasks.filter(t => t.title === newTaskTitle).length > 0) {
      Alert.alert('Task já Cadastrada!', 'Você não pode cadastrar uma task com o mesmo nome');
      return;
    }
    let task: Task = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      title: newTaskTitle,
      done: false
    };
    setTasks(old => [...old, task]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        t.done = !t.done;
      }
      return t;
    }));
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover Item', 'Tem certeza que você deseja remover este item?',
      [{
        text: "Não"
      },
      { text: "Sim", onPress: () => setTasks(tasks.filter(t => t.id !== id)) }]);
  }

  function handleEditTask(id: number, title: string) {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        t.title = title;
      }
      return t;
    }));
  }
  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})