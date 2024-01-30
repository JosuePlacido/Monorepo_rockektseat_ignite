import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

interface TodoInputProps {
  addTask: (task: string) => void;
}

export function TodoInput({ addTask }: TodoInputProps) {
  const [task, setTask] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  function handleAddNewTask() {
    if (task) {
      addTask(task);
      setTask("");
    } else {
      Alert.alert("Informe uma tarefa");
    }
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[
          styles.input,
          { borderColor: isFocused ? "#5E60CE" : "#808080" },
        ]}
        placeholder="Adicionar uma nova tarefa..."
        placeholderTextColor="#B2B2B2"
        returnKeyType="send"
        selectionColor="#1E6F9F"
        value={task}
        onChangeText={setTask}
        onSubmitEditing={() => handleAddNewTask()}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <TouchableOpacity
        testID="add-new-task-button"
        activeOpacity={0.7}
        style={styles.addButton}
        onPress={() => handleAddNewTask()}
      >
        <Icon name="plus-circle" size={24} color="#B2B2B2" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: -28,
    marginHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 56,
    padding: 16,
    backgroundColor: "#262626",
    borderRadius: 8,
    borderWidth: 1,
    color: "#fff",
  },
  addButton: {
    marginLeft: 4,
    backgroundColor: "#1E6F9F",
    height: 56,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
