import React from 'react';
import {Pressable, PressableProps, StyleSheet, Text} from 'react-native';
import colors from '../../styles/variables';

interface Props extends PressableProps {
  styleType: 'filled' | 'outlined' | 'blank' | 'alert';
  enable?: boolean;
  title: string;
}

const Btn = ({title, enable = true, styleType, ...props}: Props) => {
  const styles = StyleSheet.create({
    btn: {
      borderRadius: 10,
      alignItems: 'center',
      padding: 10,
    },
    filled: {
      backgroundColor: enable ? colors.green_1 : colors.green_3,
      minWidth: 300,
    },
    outlined: {
      padding: 8,
      backgroundColor: enable ? colors.white : colors.light_gray_1,
      borderColor: enable ? colors.green_1 : colors.green_3,
      borderWidth: 4,
    },
    blank: {
      backgroundColor: enable ? colors.white : colors.light_gray_1,
    },
    alert: {
      backgroundColor: enable ? colors.alert_1 : colors.alert_3,
    },
    text: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    text_filled: {color: enable ? colors.white : colors.light_gray_1},
    text_outlined: {color: enable ? colors.green_1 : colors.green_3},
    text_blank: {color: enable ? colors.green_1 : colors.green_3},
    text_alert: {color: enable ? colors.white : colors.light_gray_1},
  });

  return (
    <Pressable
      disabled={!enable}
      onPress={props.onPress}
      style={[styles.btn, styles[styleType]]}>
      <Text style={[styles.text, styles[`text_${styleType}`]]}> {title}</Text>
    </Pressable>
  );
};

export default Btn;
