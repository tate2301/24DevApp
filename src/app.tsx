import React, {useEffect} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import CheckAnswer from './components/button/CheckAnswer';
import Container from './components/container/Container';
import Header from './components/header/Header';
import Question from './components/header/Question';
import Option from './components/option/Option';
import {AppContext} from './context';
import {getQuestionsSnapshot} from './services/questions.service';

export const AppNavigator = (): JSX.Element => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState<string>('');
  const [hasCheckedAnswer, setHasCheckAnswer] = React.useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = React.useState(false);

  const appContext = React.useContext(AppContext);

  const questions = [
    {
      text: 'The house is small',
      answer: 'haus',
      translatedQuestionPreview: 'Das _____ ist klein',
      options: ['folgen', 'haus', 'klein', 'kommen'],
    },
    {
      text: 'The house is small',
      answer: 'haus',
      translatedQuestionPreview: 'Das _____ ist klein',
      options: ['folgen', 'haus', 'klein', 'kommen'],
    },
    {
      text: 'The house is small',
      answer: 'haus',
      translatedQuestionPreview: 'Das _____ ist klein',
      options: ['folgen', 'haus', 'klein', 'kommen'],
    },
    {
      text: 'The house is small',
      answer: 'haus',
      translatedQuestionPreview: 'Das _____ ist klein',
      options: ['folgen', 'haus', 'klein', 'kommen'],
    },
  ];

  // memoize getQuestionsSnapshot
  const getQuestions = React.useCallback(() => getQuestionsSnapshot, []);

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  const onPress = (index: number) => {
    // Get selected option from current question
    setSelectedAnswer(questions[currentQuestion].options[index]);
  };

  const nextQuestion = () => {
    // If all exercises have been completed reset back to 0
    if (currentQuestion + 1 === questions.length) {
      Alert.alert('Hooray', 'You have completed all exercises', [
        {
          text: 'OK',
          onPress: () => {
            setCurrentQuestion(0);
            reset();
          },
        },
      ]);
      return;
    }

    setCurrentQuestion(currentQuestion + 1);
    reset();
  };

  // Reset other state variables except for currentQuestion
  const reset = () => {
    setHasCheckAnswer(false);
    setIsCorrectAnswer(false);
    setSelectedAnswer('');
  };

  const checkAnswer = () => {
    // Check if answer is correct
    if (selectedAnswer === questions[currentQuestion].answer) {
      setIsCorrectAnswer(true);
    }

    return setHasCheckAnswer(true);
  };

  // Update context values on change
  useEffect(() => {
    appContext.setValues({
      hasCheckedAnswer,
      isCorrectAnswer,
      selectedAnswer,
      correctAnswer: questions[currentQuestion].answer,
    });
  }, [hasCheckedAnswer, isCorrectAnswer, selectedAnswer, currentQuestion]);

  return (
    <Container>
      <View style={styles.container}>
        <Header />
        <Question
          text={questions[0].text}
          translatedQuestionPreview={questions[0].translatedQuestionPreview}
        />
        <View style={styles.optionsContainer}>
          {questions[0].options.map((option, index) => (
            <Option
              key={index}
              index={index}
              text={option}
              onPress={onPress}
              selected={selectedAnswer === option}
              disabled={!!selectedAnswer && selectedAnswer !== option}
            />
          ))}
        </View>
      </View>
      <CheckAnswer
        data={{
          answer: selectedAnswer,
          correctAnswer: questions[currentQuestion].answer,
        }}
        nextQuestion={nextQuestion}
        checkAnswer={checkAnswer}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  optionsContainer: {
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});
