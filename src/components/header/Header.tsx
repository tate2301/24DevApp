import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../utils/colors';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Fill in the missing word</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  text: {
    textAlign: 'center',
    color: colors.white,
  },
});
