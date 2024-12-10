import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { s } from "./TabButtomMenu.style";

export default function TabButtomMenu({ selectedTabName, onPress, toDoList }) {
  const countByStatus = toDoList.reduce(
    (acc, todo) => {
      todo.isFinished ? acc.done++ : acc.inProgress++;
      return acc;
    },
    {
      all: toDoList.length,
      inProgress: 0,
      done: 0,
    }
  );
  function setStyle(tabName) {
    return {
      fontWeight: "bold",
      color: tabName === selectedTabName ? "#2776E5" : "#000",
    };
  }
  return (
    <View style={s.root}>
      <TouchableOpacity onPress={() => onPress("all")}>
        <Text style={setStyle("all")}>all ({countByStatus.all})</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress("inProgress")}>
        <Text style={setStyle("inProgress")}>
          in progress ({countByStatus.inProgress})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress("done")}>
        <Text style={setStyle("done")}>done ({countByStatus.done})</Text>
      </TouchableOpacity>
    </View>
  );
}
