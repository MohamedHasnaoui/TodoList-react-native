import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { s } from "./ButtonAdd.style";

export default function ButtonAdd({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={s.btn}>
      <Text style={s.txt}>+ new todo</Text>
    </TouchableOpacity>
  );
}
