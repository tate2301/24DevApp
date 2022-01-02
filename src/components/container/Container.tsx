import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../../utils/colors';

export default function Container({children}: {children: React.ReactNode}) {
  return (
    <View style={styles.backdrop}>
      <View style={styles.container}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop: 96,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    paddingTop: 32,
  },
  backdrop: {
    backgroundColor: colors.backdrop,
    flex: 1,
  },
});
