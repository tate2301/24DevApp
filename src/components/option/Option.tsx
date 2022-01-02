import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../../utils/colors';
import {normalizeFont} from '../../utils/help';

type OptionProps = {
  disabled?: boolean;
  selected?: boolean;
  text: string;
  onPress: (index: number) => void;
  index: number;
};

export default function Option({index, disabled, selected, text, onPress}: OptionProps) {
  const backgroundColor = disabled || selected ? colors.disabled_bg : colors.white;
  const textColor = disabled || selected ? colors.disabled_text : colors.black;

  // call on press and pass index
  const doCallback = () => {
    onPress(index);
  };

  return (
    <TouchableOpacity style={{backgroundColor, ...styles.container}} onPress={doCallback}>
      <Text style={{color: textColor, ...styles.text}}>
        {selected ? Array(text.length).fill('\xa0') : text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    padding: 16,
    borderRadius: 8,
  },
  text: {
    fontWeight: '700',
    fontSize: normalizeFont(16),
  },
});
