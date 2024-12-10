import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./app.style";
import Header from "./component/Header/Header";
import CardToDo from "./component/CardToDo/CardToDo";
import { useEffect, useRef, useState } from "react";
import TabButtomMenu from "./component/TabButtomMenu/TabButtomMenu";
import ButtonAdd from "./component/ButtonAdd/ButtonAdd";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
let isTheFirstRender = true;
let isLoadUpdate = false;
export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [selectedTabName, setSelectedTabName] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const scrollViewRef = useRef();
  useEffect(() => {
    loadTodoList();
  }, []);
  useEffect(() => {
    if (!isLoadUpdate) {
      if (!isTheFirstRender) {
        saveTodoList();
      }
    } else {
      isLoadUpdate = false;
    }
    isTheFirstRender = false;
  }, [todoList]);
  async function loadTodoList() {
    isLoadUpdate = true;
    try {
      const todoListString = await AsyncStorage.getItem("@todoList");
      const parsedTodoList = JSON.parse(todoListString);
      if (parsedTodoList != null) setTodoList(parsedTodoList);
    } catch (err) {
      alert(err);
    }
  }
  async function saveTodoList() {
    try {
      await AsyncStorage.setItem("@todoList", JSON.stringify(todoList));
    } catch (err) {
      alert(err);
    }
  }
  function getFilteredList() {
    switch (selectedTabName) {
      case "all": {
        return todoList;
      }
      case "inProgress": {
        return todoList.filter((todo) => !todo.isFinished);
      }
      case "done": {
        return todoList.filter((todo) => todo.isFinished);
      }
    }
  }
  function deleteTodo(todo) {
    Alert.alert("Delete ToDo", "are you sure you want to delete this todo", [
      {
        text: "delete",
        style: "destructive",
        onPress: () => {
          const todoListNew = todoList.filter((t) => t.id != todo.id);
          setTodoList(todoListNew);
        },
      },
      { text: "cancel", style: "cancel" },
    ]);
  }
  function resnderTodoList() {
    renderedList = getFilteredList();
    return renderedList.map((item) => (
      <View style={s.cardItem}>
        <CardToDo
          key={item.id}
          onPress={updateToDo}
          todo={item}
          onLongPress={deleteTodo}
        />
      </View>
    ));
  }
  function updateToDo(todo) {
    const updatedTodo = {
      ...todo,
      isFinished: !todo.isFinished,
    };
    const updatedTodoList = [...todoList];
    const index = updatedTodoList.findIndex((item) => item.id === todo.id);
    updatedTodoList[index] = updatedTodo;
    setTodoList(updatedTodoList);
  }
  function renderAddDialog() {
    return (
      <Dialog.Container
        visible={showAddDialog}
        onBackdropPress={() => setShowAddDialog(false)}
      >
        <Dialog.Title>Add todo</Dialog.Title>
        <Dialog.Description>Choose a name for your todo</Dialog.Description>
        <Dialog.Input
          placeholder="Ex: Go to the dentist"
          onChangeText={(text) => {
            setInputValue(text);
          }}
        />
        <Dialog.Button
          onPress={() => setShowAddDialog(false)}
          label="Cancel"
          color="grey"
        />
        <Dialog.Button
          disabled={inputValue.trim().length === 0}
          label="Save"
          onPress={saveTodo}
        />
      </Dialog.Container>
    );
  }
  function saveTodo() {
    todo = {
      id: uuid.v4(),
      task: inputValue,
      isFinished: false,
    };
    setTodoList([...todoList, todo]);
    setShowAddDialog(false);
    setInputValue("");
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd();
    }, 300);
  }
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <Header />
          <View style={s.body}>
            <ScrollView ref={scrollViewRef}>{resnderTodoList()}</ScrollView>
          </View>
          <ButtonAdd onPress={() => setShowAddDialog(true)} />
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <TabButtomMenu
          onPress={setSelectedTabName}
          selectedTabName={selectedTabName}
          toDoList={todoList}
        />
      </View>
      {renderAddDialog()}
    </>
  );
}
