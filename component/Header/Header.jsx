import { View, Text, Image } from "react-native";
import React from "react";
import logo from "../../assets/logo.png";
import { s } from "./header.style";
export default function Header() {
  return (
    <>
      <Image style={s.logo} source={logo} resizeMode="contain" />
      <Text style={s.subtitle}>you probably have something to do</Text>
    </>
  );
}
