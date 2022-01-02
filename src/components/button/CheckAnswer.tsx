import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppContext} from '../../context';
import colors from '../../utils/colors';
import {normalizeFont} from '../../utils/help';
import ContinueButton from './Continue';

type CheckAnswerBtnProps = {
  isCorrectAnswer: boolean;
  hasCheckedAnswer: boolean;
  correctAnswer: string;
  checkMyAnswer: () => void;
  nextQuestion: () => void;
};

type CheckAnswerResultProps = {
  isCorrectAnswer: boolean;
  correctAnswer: string;
  nextQuestion: () => void;
};

type CheckAnswerProps = {
  data: {
    answer: string;
    correctAnswer: string;
  };
  nextQuestion: () => void;
  checkAnswer: () => void;
};

export default function CheckAnswer({data, nextQuestion, checkAnswer}: CheckAnswerProps) {
  const appContext = useContext(AppContext);

  return (
    <View style={styles.container}>
      {appContext.selectedAnswer ? (
        <View>
          <CheckAnswerButton
            hasCheckedAnswer={appContext.hasCheckedAnswer}
            isCorrectAnswer={appContext.isCorrectAnswer}
            checkMyAnswer={checkAnswer}
            nextQuestion={nextQuestion}
            correctAnswer={appContext.correctAnswer}
          />
        </View>
      ) : (
        <View style={styles.continueButtonContainer}>
          <ContinueButton colorScheme="default" />
        </View>
      )}
    </View>
  );
}

function CheckAnswerButton({
  isCorrectAnswer,
  hasCheckedAnswer,
  checkMyAnswer,
  correctAnswer,
  nextQuestion,
}: CheckAnswerBtnProps) {
  return (
    <View style={styles.container}>
      {hasCheckedAnswer ? (
        <CheckAnswerResult
          correctAnswer={correctAnswer}
          isCorrectAnswer={isCorrectAnswer}
          nextQuestion={nextQuestion}
        />
      ) : (
        <SafeAreaView>
          <TouchableOpacity style={styles.checkAnswerBtnContainer} onPress={checkMyAnswer}>
            <Text style={styles.checkAnswerBtnText}>CHECK ANSWER</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </View>
  );
}

function CheckAnswerResult({isCorrectAnswer, correctAnswer, nextQuestion}: CheckAnswerResultProps) {
  const backgroundColor = isCorrectAnswer ? colors.success : colors.error;
  return (
    <View style={{backgroundColor: backgroundColor, ...styles.checkAnswerResultContainer}}>
      <Text style={styles.checkAnswerResultText}>
        {isCorrectAnswer ? 'Great Job!' : `Answer: ${correctAnswer}`}
      </Text>
      <ContinueButton colorScheme={isCorrectAnswer ? 'success' : 'error'} onPress={nextQuestion} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  checkAnswerBtnContainer: {
    borderRadius: 24,
    paddingVertical: 16,
    margin: 24,
    backgroundColor: colors.success,
  },
  checkAnswerBtnText: {
    textAlign: 'center',
    color: colors.white,
  },
  checkAnswerResultContainer: {
    paddingTop: 16,
    paddingBottom: 48,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  checkAnswerResultText: {
    color: colors.white,
    fontSize: normalizeFont(16),
    fontWeight: '600',
    paddingVertical: 16,
  },
  continueButtonContainer: {
    paddingHorizontal: 24,
  },
});
