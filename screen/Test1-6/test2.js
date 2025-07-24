import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
  Alert
} from 'react-native';

const { width, height } = Dimensions.get('window');

// ข้อสอบ Describing People and Appearance
const quizData = [
  // การใช้ Have/Has (10 ข้อ)
  {
    id: 1,
    question: "She ________ beautiful long hair.",
    options: ["have", "has", "is", "are"],
    correctAnswer: 1,
    category: "Have/Has"
  },
  {
    id: 2,
    question: "They ________ brown eyes.",
    options: ["has", "have", "is", "are"],
    correctAnswer: 1,
    category: "Have/Has"
  },
  {
    id: 3,
    question: "My father ________ a thick mustache.",
    options: ["have", "has", "is", "are"],
    correctAnswer: 1,
    category: "Have/Has"
  },
  {
    id: 4,
    question: "I ________ curly hair like my mother.",
    options: ["has", "have", "am", "is"],
    correctAnswer: 1,
    category: "Have/Has"
  },
  {
    id: 5,
    question: "The twins ________ the same blue eyes.",
    options: ["has", "have", "is", "are"],
    correctAnswer: 1,
    category: "Have/Has"
  },
  {
    id: 6,
    question: "Does she ________ freckles on her face?",
    options: ["has", "have", "is", "are"],
    correctAnswer: 1,
    category: "Have/Has"
  },
  {
    id: 7,
    question: "My brother ________ a beard and mustache.",
    options: ["have", "has", "is", "are"],
    correctAnswer: 1,
    category: "Have/Has"
  },
  {
    id: 8,
    question: "We ________ dark hair in our family.",
    options: ["has", "have", "is", "are"],
    correctAnswer: 1,
    category: "Have/Has"
  },
  {
    id: 9,
    question: "________ you ________ green eyes?",
    options: ["Does / have", "Do / have", "Are / have", "Is / have"],
    correctAnswer: 1,
    category: "Have/Has"
  },
  {
    id: 10,
    question: "The baby ________ tiny hands and feet.",
    options: ["have", "has", "is", "are"],
    correctAnswer: 1,
    category: "Have/Has"
  },
  
  // การใช้ be + adjective (10 ข้อ)
  {
    id: 11,
    question: "She ________ very tall for her age.",
    options: ["has", "have", "is", "are"],
    correctAnswer: 2,
    category: "Be + Adjective"
  },
  {
    id: 12,
    question: "My grandfather ________ quite old now.",
    options: ["has", "have", "is", "are"],
    correctAnswer: 2,
    category: "Be + Adjective"
  },
  {
    id: 13,
    question: "The children ________ very cute.",
    options: ["has", "have", "is", "are"],
    correctAnswer: 3,
    category: "Be + Adjective"
  },
  {
    id: 14,
    question: "I ________ shorter than my sister.",
    options: ["has", "have", "am", "is"],
    correctAnswer: 2,
    category: "Be + Adjective"
  },
  {
    id: 15,
    question: "Her hair ________ blonde and wavy.",
    options: ["has", "have", "is", "are"],
    correctAnswer: 2,
    category: "Be + Adjective"
  },
  {
    id: 16,
    question: "The model ________ extremely beautiful.",
    options: ["has", "have", "is", "are"],
    correctAnswer: 2,
    category: "Be + Adjective"
  },
  {
    id: 17,
    question: "His eyes ________ bright blue.",
    options: ["has", "have", "is", "are"],
    correctAnswer: 3,
    category: "Be + Adjective"
  },
  {
    id: 18,
    question: "You ________ very handsome today.",
    options: ["has", "have", "is", "are"],
    correctAnswer: 3,
    category: "Be + Adjective"
  },
  {
    id: 19,
    question: "The twins ________ identical.",
    options: ["has", "have", "is", "are"],
    correctAnswer: 3,
    category: "Be + Adjective"
  },
  {
    id: 20,
    question: "My grandmother ________ quite short.",
    options: ["has", "have", "is", "are"],
    correctAnswer: 2,
    category: "Be + Adjective"
  },
  
  // การใช้ look like (10 ข้อ)
  {
    id: 21,
    question: "She ________ her mother.",
    options: ["looks like", "look like", "looks", "look"],
    correctAnswer: 0,
    category: "Look Like"
  },
  {
    id: 22,
    question: "What ________ your sister ________?",
    options: ["does / looks like", "does / look like", "do / look like", "is / look like"],
    correctAnswer: 1,
    category: "Look Like"
  },
  {
    id: 23,
    question: "They ________ their father.",
    options: ["looks like", "look like", "looks", "look"],
    correctAnswer: 1,
    category: "Look Like"
  },
  {
    id: 24,
    question: "He ________ a movie star.",
    options: ["looks like", "look like", "looks", "look"],
    correctAnswer: 0,
    category: "Look Like"
  },
  {
    id: 25,
    question: "Who ________ you ________ in your family?",
    options: ["does / looks like", "do / look like", "are / look like", "is / look like"],
    correctAnswer: 1,
    category: "Look Like"
  },
  {
    id: 26,
    question: "The baby ________ his grandmother.",
    options: ["looks like", "look like", "looks", "look"],
    correctAnswer: 0,
    category: "Look Like"
  },
  {
    id: 27,
    question: "You ________ your brother when you smile.",
    options: ["looks like", "look like", "looks", "look"],
    correctAnswer: 1,
    category: "Look Like"
  },
  {
    id: 28,
    question: "________ she ________ her mother?",
    options: ["Does / looks like", "Does / look like", "Do / look like", "Is / look like"],
    correctAnswer: 1,
    category: "Look Like"
  },
  {
    id: 29,
    question: "My cousins ________ each other.",
    options: ["looks like", "look like", "looks", "look"],
    correctAnswer: 1,
    category: "Look Like"
  },
  {
    id: 30,
    question: "The actor ________ a famous singer.",
    options: ["looks like", "look like", "looks", "look"],
    correctAnswer: 0,
    category: "Look Like"
  }
];

export default function AppearanceQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(2100); // 35 minutes = 2100 seconds
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [progressAnim] = useState(new Animated.Value(0));

  // Animation เมื่อ component โหลด
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: currentQuestion / quizData.length,
        duration: 500,
        useNativeDriver: false,
      })
    ]).start();
  }, [currentQuestion]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleQuizComplete();
    }
  }, [timeLeft, showResult]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      Alert.alert('กรุณาเลือกคำตอบ', 'คุณต้องเลือกคำตอบก่อนที่จะไปข้อถัดไป');
      return;
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    setShowResult(true);
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
    setTimeLeft(2100);
  };

  const getScoreColor = () => {
    const percentage = (score / quizData.length) * 100;
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 60) return '#FF9800';
    return '#F44336';
  };

  const getScoreGrade = () => {
    const percentage = (score / quizData.length) * 100;
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  };

  if (showResult) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#e91e63" />
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Animated.View 
            style={[
              styles.resultContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>🎯 ผลการสอบ</Text>
              <Text style={styles.resultSubtitle}>Describing People & Appearance</Text>
            </View>

            <View style={[styles.scoreCard, { borderColor: getScoreColor() }]}>
              <Text style={[styles.scoreText, { color: getScoreColor() }]}>
                {score}/{quizData.length}
              </Text>
              <Text style={styles.scorePercentage}>
                {Math.round((score / quizData.length) * 100)}%
              </Text>
              <Text style={[styles.scoreGrade, { color: getScoreColor() }]}>
                เกรด {getScoreGrade()}
              </Text>
            </View>

            <View style={styles.resultStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{score}</Text>
                <Text style={styles.statLabel}>ข้อที่ถูก</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{quizData.length - score}</Text>
                <Text style={styles.statLabel}>ข้อที่ผิด</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{formatTime(2100 - timeLeft)}</Text>
                <Text style={styles.statLabel}>เวลาที่ใช้</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.retryButton}
              onPress={handleRetry}
              activeOpacity={0.8}
            >
              <Text style={styles.retryButtonText}>ทำแบบทดสอบอีกครั้ง</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#e91e63" />
      
      {/* Header */}
      <Animated.View 
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Text style={styles.headerTitle}>English Grammar Quiz</Text>
        <Text style={styles.headerSubtitle}>Describing People & Appearance</Text>
        
        {/* Timer */}
        <View style={styles.timerContainer}>
          <Text style={styles.timerIcon}>⏰</Text>
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              ข้อที่ {currentQuestion + 1} จาก {quizData.length}
            </Text>
            <Text style={styles.progressPercentage}>
              {Math.round(((currentQuestion + 1) / quizData.length) * 100)}%
            </Text>
          </View>
          <View style={styles.progressBar}>
            <Animated.View 
              style={[
                styles.progressFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                    extrapolate: 'clamp'
                  })
                }
              ]} 
            />
          </View>
        </View>
      </Animated.View>

      {/* Question */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Animated.View 
          style={[
            styles.questionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.questionNumber}>
            ข้อที่ {currentQuestion + 1}
          </Text>
          <Text style={styles.questionText}>
            {quizData[currentQuestion].question}
          </Text>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {quizData[currentQuestion].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswer === index && styles.selectedOption
                ]}
                onPress={() => handleAnswerSelect(index)}
                activeOpacity={0.7}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.optionLetter}>
                    {String.fromCharCode(65 + index)}.
                  </Text>
                  <Text style={[
                    styles.optionText,
                    selectedAnswer === index && styles.selectedOptionText
                  ]}>
                    {option}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Next Button */}
          <TouchableOpacity
            style={[
              styles.nextButton,
              selectedAnswer === null && styles.nextButtonDisabled
            ]}
            onPress={handleNext}
            activeOpacity={0.8}
            disabled={selectedAnswer === null}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestion === quizData.length - 1 ? 'ส่งคำตอบ' : 'ข้อถัดไป'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fce4ec',
  },
  scrollView: {
    flex: 1,
  },
  
  // Header Styles
  header: {
    backgroundColor: '#e91e63',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#e91e63',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FCE4EC',
    textAlign: 'center',
    marginBottom: 20,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  timerIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  timerText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  progressContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 20,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  progressPercentage: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  progressBar: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },

  // Question Styles
  questionContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  questionNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e91e63',
    marginBottom: 15,
  },
  questionText: {
    fontSize: 20,
    color: '#333',
    lineHeight: 30,
    marginBottom: 30,
    fontWeight: '600',
  },
  optionsContainer: {
    marginBottom: 30,
  },
  optionButton: {
    backgroundColor: '#fce4ec',
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#f8bbd9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  selectedOption: {
    backgroundColor: '#e91e63',
    borderColor: '#e91e63',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  optionLetter: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e91e63',
    marginRight: 15,
    width: 25,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  nextButton: {
    backgroundColor: '#e91e63',
    paddingVertical: 18,
    borderRadius: 15,
    shadowColor: '#e91e63',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0.1,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },

  // Result Styles
  resultContainer: {
    padding: 20,
    paddingTop: 60,
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  resultSubtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  scoreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 40,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 15,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: '900',
    marginBottom: 10,
  },
  scorePercentage: {
    fontSize: 24,
    color: '#666',
    fontWeight: '700',
    marginBottom: 10,
  },
  scoreGrade: {
    fontSize: 32,
    fontWeight: '900',
  },
  resultStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: '#e91e63',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  retryButton: {
    backgroundColor: '#e91e63',
    paddingVertical: 20,
    borderRadius: 20,
    shadowColor: '#e91e63',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});