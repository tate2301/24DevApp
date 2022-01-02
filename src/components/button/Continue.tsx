import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../../utils/colors';

type ContinueButtonProps = {
  colorScheme: 'default' | 'success' | 'error';
  onPress?: () => void | null;
};

export default function ContinueButton({colorScheme, onPress}: ContinueButtonProps) {
  const backgroundColor = colorScheme === 'default' ? colors.default_btn_bg : '#fff';
  const textColor =
    colorScheme === 'default'
      ? colors.white
      : colorScheme === 'error'
      ? colors.error
      : colors.success;
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={onPress} style={{backgroundColor, ...styles.container}}>
        <Text style={{color: textColor, ...styles.text}}>CONTINUE</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderRadius: 24,
  },
  text: {
    textAlign: 'center',
    fontWeight: '700',
  },
});
