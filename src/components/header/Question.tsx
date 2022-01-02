import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../utils/colors';
import {normalizeFont} from '../../utils/help';

type QuestionProps = {
  text: string;
  translatedQuestionPreview: string;
};

export default function Question({text, translatedQuestionPreview}: QuestionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.questionText}>{translatedQuestionPreview}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  text: {
    textAlign: 'center',
    fontSize: normalizeFont(28),
    color: colors.white,
  },
  questionText: {
    textAlign: 'center',
    fontSize: normalizeFont(16),
    marginTop: 24,
    color: colors.white,
  },
});
