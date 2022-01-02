import React, {useEffect} from 'react';
import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import CheckAnswer from './components/button/CheckAnswer';
import Container from './components/container/Container';
import Header from './components/header/Header';
import Question from './components/header/Question';
import Option from './components/option/Option';
import {AppContext} from './context';
import {firestore} from './lib/__firebase__';
import {collection, onSnapshot} from 'firebase/firestore';
import colors from './utils/colors';

type Question = {
  id: string;
  text: string;
  translatedQuestionPreview: string;
  options: Array<string>;
  answer: string;
};

export const AppNavigator = (): JSX.Element => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState<string>('');
  const [hasCheckedAnswer, setHasCheckAnswer] = React.useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = React.useState(false);
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [loading, setLoading] = React.useState(true);

  const appContext = React.useContext(AppContext);

  // memoize getQuestionsSnapshot
  const getQuestions = React.useCallback(() => {
    setLoading(true);
    onSnapshot(collection(firestore, 'questions'), docs => {
      const questionsDocs: Array<Question> = docs.docs.map(doc => {
        const thisDoc = doc.data();
        return {
          id: doc.id,
          text: thisDoc.text,
          translatedQuestionPreview: thisDoc.translatedQuestionPreview,
          options: thisDoc.options,
          answer: thisDoc.answer,
        };
      });
      setQuestions(questionsDocs);

      setLoading(false);
    });
  }, []);

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
      correctAnswer: questions.length > 0 ? questions[currentQuestion].answer : '',
    });
  }, [hasCheckedAnswer, isCorrectAnswer, selectedAnswer, currentQuestion]);

  if (loading) {
    return (
      <Container>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.white} />
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View style={styles.container}>
        <Header />
        <Question
          text={questions[currentQuestion].text}
          translatedQuestionPreview={questions[currentQuestion].translatedQuestionPreview}
        />
        <View style={styles.optionsContainer}>
          {questions[currentQuestion].options.map((option, index) => (
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
