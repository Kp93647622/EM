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
  // 1-20: Defining Relative Clauses (no comma, who/that/which/where/whose)
  {
    id: 1,
    question: "A person __________ is always honest is trusted by everyone.",
    options: [
      "who",
      "which",
      "where",
      "whose"
    ],
    correctAnswer: 0,
    category: "Defining Relative Clause"
  },
  {
    id: 2,
    question: "I admire people __________ work hard and never give up.",
    options: [
      "who",
      "whom",
      "which",
      "where"
    ],
    correctAnswer: 0,
    category: "Defining Relative Clause"
  },
  {
    id: 3,
    question: "The friend __________ helped me is very generous.",
    options: [
      "who",
      "whose",
      "where",
      "what"
    ],
    correctAnswer: 0,
    category: "Defining Relative Clause"
  },
  {
    id: 4,
    question: "She has a style __________ makes her stand out.",
    options: [
      "that",
      "who",
      "where",
      "when"
    ],
    correctAnswer: 0,
    category: "Defining Relative Clause"
  },
  {
    id: 5,
    question: "The student __________ project won the prize is very creative.",
    options: [
      "whose",
      "who",
      "which",
      "where"
    ],
    correctAnswer: 0,
    category: "Defining Relative Clause"
  },
  {
    id: 6,
    question: "We need a leader __________ can inspire the team.",
    options: [
      "who",
      "whose",
      "which",
      "where"
    ],
    correctAnswer: 0,
    category: "Defining Relative Clause"
  },
  {
    id: 7,
    question: "The company __________ values honesty hires responsible employees.",
    options: [
      "that",
      "which",
      "where",
      "who"
    ],
    correctAnswer: 0,
    category: "Defining Relative Clause"
  },
  {
    id: 8,
    question: "That is the city __________ I was born.",
    options: [
      "where",
      "which",
      "whose",
      "when"
    ],
    correctAnswer: 0,
    category: "Defining Relative Clause"
  },
  {
    id: 9,
    question: "The woman __________ you spoke to is my aunt.",
    options: [
      "who",
      "whose",
      "which",
      "where"
    ],
    correctAnswer: 0,
    category: "Defining Relative Clause"
  },
  {
    id: 10,
    question: "I know someone __________ hobbies include painting and hiking.",
    options: [
      "whose",
      "who",
      "which",
      "whom"
    ],
    correctAnswer: 0,
    category: "Defining Relative Clause"
  },
  {
    id: 11,
    question: "She’s the person __________ always arrives on time.",
    options: [
      "who",
      "which",
      "where",
      "when"
    ],
    correctAnswer: 0,
    category: "Defining Relative Clause"
  },
  {
    id: 12,
    question: "We joined a club __________ members volunteer for charity work.",
    options: [
      "whose",
      "who",
      "that",
      "which"
    ],
    correctAnswer: 0,
    category: "Defining Relative Clause"
  },
  {
    id: 13,
    question: "I like the house __________ has a large garden.",
    options: [
      "that",
      "which",
      "who",
      "where"
    ],
    correctAnswer: 0,
    category: "Defining Relative Clause"
  },
  {
    id: 14,
    question: "The book __________ inspired me was written by a psychologist.",
    options: [
      "that",
      "who",
      "which",
      "where"
    ],
    correctAnswer: 0,
    category: "Defining Relative Clause"
  },
  {
    id: 15,
    question: "The school __________ I learned English is very famous.",
    options: [
      "where",
      "which",
      "who",
      "that"
    ],
    correctAnswer: 0,
    category: "Defining Relative Clause"
  },
  {
    id: 16,
    question: "The friend __________ advice I trust most is John.",
    options: [
      "whose",
      "who",
      "which",
      "that"
    ],
    correctAnswer: 0,
    category: "Defining Relative Clause"
  },
  {
    id: 17,
    question: "Do you know anyone __________ speaks five languages?",
    options: [
      "who",
      "whose",
      "which",
      "that"
    ],
    correctAnswer: 0,
    category: "Defining Relative Clause"
  },
  {
    id: 18,
    question: "That’s the reason __________ I respect her so much.",
    options: [
      "why",
      "which",
      "where",
      "that"
    ],
    correctAnswer: 0,
    category: "Defining Relative Clause"
  },
  {
    id: 19,
    question: "The group __________ I belong to organizes many activities.",
    options: [
      "that",
      "where",
      "who",
      "whose"
    ],
    correctAnswer: 0,
    category: "Defining Relative Clause"
  },
  {
    id: 20,
    question: "He’s the boy __________ father is a doctor.",
    options: [
      "whose",
      "who",
      "where",
      "which"
    ],
    correctAnswer: 0,
    category: "Defining Relative Clause"
  },

  // 21-40: Non-defining Relative Clauses (comma, who/which/where/whose)
  {
    id: 21,
    question: "My sister, __________ is very outgoing, makes friends easily.",
    options: [
      "who",
      "which",
      "where",
      "whose"
    ],
    correctAnswer: 0,
    category: "Non-defining Relative Clause"
  },
  {
    id: 22,
    question: "My father, __________ worked as a teacher, is very patient.",
    options: [
      "who",
      "which",
      "that",
      "whom"
    ],
    correctAnswer: 0,
    category: "Non-defining Relative Clause"
  },
  {
    id: 23,
    question: "The conference, __________ was held last month, focused on leadership.",
    options: [
      "which",
      "who",
      "where",
      "that"
    ],
    correctAnswer: 0,
    category: "Non-defining Relative Clause"
  },
  {
    id: 24,
    question: "Sarah, __________ brother is my friend, is a talented musician.",
    options: [
      "whose",
      "who",
      "which",
      "that"
    ],
    correctAnswer: 0,
    category: "Non-defining Relative Clause"
  },
  {
    id: 25,
    question: "This painting, __________ was created by my aunt, shows great creativity.",
    options: [
      "which",
      "that",
      "who",
      "where"
    ],
    correctAnswer: 0,
    category: "Non-defining Relative Clause"
  },
  {
    id: 26,
    question: "Mr. Smith, __________ office is next to mine, is very kind.",
    options: [
      "whose",
      "who",
      "which",
      "where"
    ],
    correctAnswer: 0,
    category: "Non-defining Relative Clause"
  },
  {
    id: 27,
    question: "This city, __________ I have visited many times, is famous for its culture.",
    options: [
      "which",
      "where",
      "whose",
      "that"
    ],
    correctAnswer: 0,
    category: "Non-defining Relative Clause"
  },
  {
    id: 28,
    question: "My friend Tom, __________ lives in Canada, is very adventurous.",
    options: [
      "who",
      "that",
      "which",
      "where"
    ],
    correctAnswer: 0,
    category: "Non-defining Relative Clause"
  },
  {
    id: 29,
    question: "The book, __________ I bought yesterday, is about self-development.",
    options: [
      "which",
      "where",
      "that",
      "who"
    ],
    correctAnswer: 0,
    category: "Non-defining Relative Clause"
  },
  {
    id: 30,
    question: "Our manager, __________ experience is well known, leads the team effectively.",
    options: [
      "whose",
      "who",
      "where",
      "which"
    ],
    correctAnswer: 0,
    category: "Non-defining Relative Clause"
  },
  {
    id: 31,
    question: "My grandmother, __________ grew up during difficult times, is very resilient.",
    options: [
      "who",
      "which",
      "that",
      "where"
    ],
    correctAnswer: 0,
    category: "Non-defining Relative Clause"
  },
  {
    id: 32,
    question: "The movie, __________ is based on a true story, teaches important values.",
    options: [
      "which",
      "who",
      "that",
      "where"
    ],
    correctAnswer: 0,
    category: "Non-defining Relative Clause"
  },
  {
    id: 33,
    question: "My cousin, __________ studies in London, is very creative.",
    options: [
      "who",
      "whose",
      "which",
      "that"
    ],
    correctAnswer: 0,
    category: "Non-defining Relative Clause"
  },
  {
    id: 34,
    question: "The concert, __________ was held in the city park, attracted thousands of people.",
    options: [
      "which",
      "that",
      "who",
      "where"
    ],
    correctAnswer: 0,
    category: "Non-defining Relative Clause"
  },
  {
    id: 35,
    question: "The restaurant, __________ we celebrated our anniversary, has excellent service.",
    options: [
      "where",
      "which",
      "who",
      "that"
    ],
    correctAnswer: 0,
    category: "Non-defining Relative Clause"
  },
  {
    id: 36,
    question: "Linda, __________ dog is very friendly, always helps her neighbors.",
    options: [
      "whose",
      "who",
      "which",
      "where"
    ],
    correctAnswer: 0,
    category: "Non-defining Relative Clause"
  },
  {
    id: 37,
    question: "The conference hall, __________ I gave my first speech, was very big.",
    options: [
      "where",
      "that",
      "which",
      "who"
    ],
    correctAnswer: 0,
    category: "Non-defining Relative Clause"
  },
  {
    id: 38,
    question: "My best friend, __________ I met in kindergarten, is always supportive.",
    options: [
      "whom",
      "who",
      "whose",
      "which"
    ],
    correctAnswer: 0,
    category: "Non-defining Relative Clause"
  },
  {
    id: 39,
    question: "This song, __________ lyrics are very meaningful, is my favorite.",
    options: [
      "whose",
      "which",
      "who",
      "that"
    ],
    correctAnswer: 0,
    category: "Non-defining Relative Clause"
  },
  {
    id: 40,
    question: "Bangkok, __________ is known for its street food, attracts many tourists.",
    options: [
      "which",
      "that",
      "where",
      "who"
    ],
    correctAnswer: 0,
    category: "Non-defining Relative Clause"
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