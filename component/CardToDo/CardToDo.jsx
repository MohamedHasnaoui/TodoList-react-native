import { Image, Text, TouchableOpacity } from "react-native";
import checkImg from "../../assets/check.png";
import { s } from "./CardToDo.style";
export default function CardToDo({ todo, onPress, onLongPress }) {
  return (
    <TouchableOpacity
      onLongPress={() => onLongPress(todo)}
      onPress={() => onPress(todo)}
      style={s.card}
    >
      <Text
        style={[
          s.title,
          todo.isFinished && { textDecorationLine: "line-through" },
        ]}
      >
        {todo.task}
      </Text>
      {todo.isFinished && <Image style={s.checkImg} source={checkImg} />}
    </TouchableOpacity>
  );
}
