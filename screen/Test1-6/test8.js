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
  // 1-20: Gerund verbs & Infinitives, -ing forms (dining, food, cooking)
  {
    id: 1,
    question: "I enjoy __________ dinner for my family.",
    options: [
      "cooking",
      "to cook",
      "cook",
      "cooked"
    ],
    correctAnswer: 0,
    category: "Gerund Verbs"
  },
  {
    id: 2,
    question: "He decided __________ a new restaurant this weekend.",
    options: [
      "to try",
      "trying",
      "try",
      "tried"
    ],
    correctAnswer: 0,
    category: "Infinitive Verbs"
  },
  {
    id: 3,
    question: "Would you like __________ some dessert?",
    options: [
      "to order",
      "ordering",
      "order",
      "ordered"
    ],
    correctAnswer: 0,
    category: "Infinitive Verbs"
  },
  {
    id: 4,
    question: "She can’t stand __________ spicy food.",
    options: [
      "eating",
      "to eat",
      "eat",
      "ate"
    ],
    correctAnswer: 0,
    category: "Gerund Verbs"
  },
  {
    id: 5,
    question: "My favorite thing about weekends is __________ breakfast late.",
    options: [
      "having",
      "to have",
      "have",
      "had"
    ],
    correctAnswer: 0,
    category: "Gerund Verbs"
  },
  {
    id: 6,
    question: "He refused __________ mushrooms on his pizza.",
    options: [
      "to put",
      "putting",
      "put",
      "puts"
    ],
    correctAnswer: 0,
    category: "Infinitive Verbs"
  },
  {
    id: 7,
    question: "Thank you for __________ me with the recipe.",
    options: [
      "helping",
      "to help",
      "help",
      "helped"
    ],
    correctAnswer: 0,
    category: "Gerund Verbs"
  },
  {
    id: 8,
    question: "We’re planning __________ sushi tonight.",
    options: [
      "to make",
      "making",
      "make",
      "made"
    ],
    correctAnswer: 0,
    category: "Infinitive Verbs"
  },
  {
    id: 9,
    question: "I’m not interested in __________ fast food.",
    options: [
      "eating",
      "eat",
      "to eat",
      "ate"
    ],
    correctAnswer: 0,
    category: "Gerund Verbs"
  },
  {
    id: 10,
    question: "She suggested __________ dinner at an Italian restaurant.",
    options: [
      "having",
      "have",
      "to have",
      "had"
    ],
    correctAnswer: 0,
    category: "Gerund Verbs"
  },
  {
    id: 11,
    question: "He promised __________ more vegetables in his diet.",
    options: [
      "to include",
      "including",
      "include",
      "included"
    ],
    correctAnswer: 0,
    category: "Infinitive Verbs"
  },
  {
    id: 12,
    question: "I look forward to __________ your new cake recipe.",
    options: [
      "tasting",
      "taste",
      "to taste",
      "tasted"
    ],
    correctAnswer: 0,
    category: "Gerund Verbs"
  },
  {
    id: 13,
    question: "She prefers __________ tea to coffee.",
    options: [
      "drinking",
      "drink",
      "to drink",
      "drank"
    ],
    correctAnswer: 2,
    category: "Infinitive Verbs"
  },
  {
    id: 14,
    question: "Do you mind __________ a table near the window?",
    options: [
      "getting",
      "get",
      "to get",
      "got"
    ],
    correctAnswer: 0,
    category: "Gerund Verbs"
  },
  {
    id: 15,
    question: "We decided __________ dinner at home instead of eating out.",
    options: [
      "to have",
      "having",
      "have",
      "had"
    ],
    correctAnswer: 0,
    category: "Infinitive Verbs"
  },
  {
    id: 16,
    question: "She enjoys __________ with fresh ingredients.",
    options: [
      "cooking",
      "to cook",
      "cook",
      "cooked"
    ],
    correctAnswer: 0,
    category: "Gerund Verbs"
  },
  {
    id: 17,
    question: "He forgot __________ the soup before serving it.",
    options: [
      "to taste",
      "tasting",
      "taste",
      "tasted"
    ],
    correctAnswer: 0,
    category: "Infinitive Verbs"
  },
  {
    id: 18,
    question: "Would you prefer __________ the menu again?",
    options: [
      "to see",
      "seeing",
      "see",
      "saw"
    ],
    correctAnswer: 0,
    category: "Infinitive Verbs"
  },
  {
    id: 19,
    question: "We finished __________ dinner just before the rain started.",
    options: [
      "eating",
      "eat",
      "to eat",
      "ate"
    ],
    correctAnswer: 0,
    category: "Gerund Verbs"
  },
  {
    id: 20,
    question: "The chef admitted __________ too much salt.",
    options: [
      "adding",
      "to add",
      "add",
      "added"
    ],
    correctAnswer: 0,
    category: "Gerund Verbs"
  },

  // 21-30: Making dining requests (polite forms, customer/waiter, preferences)
  {
    id: 21,
    question: "__________ I have the menu, please?",
    options: [
      "Could",
      "Would",
      "May",
      "Should"
    ],
    correctAnswer: 0,
    category: "Dining Requests"
  },
  {
    id: 22,
    question: "__________ you recommend a vegetarian dish?",
    options: [
      "Could",
      "Do",
      "Are",
      "May"
    ],
    correctAnswer: 0,
    category: "Dining Requests"
  },
  {
    id: 23,
    question: "I’d like __________ my steak medium rare.",
    options: [
      "to have",
      "having",
      "have",
      "had"
    ],
    correctAnswer: 0,
    category: "Dining Requests"
  },
  {
    id: 24,
    question: "Would you mind __________ the soup, please?",
    options: [
      "warming up",
      "to warm up",
      "warm up",
      "warmed up"
    ],
    correctAnswer: 0,
    category: "Dining Requests"
  },
  {
    id: 25,
    question: "Can I get some water __________ ice?",
    options: [
      "without",
      "with",
      "for",
      "to"
    ],
    correctAnswer: 0,
    category: "Dining Requests"
  },
  {
    id: 26,
    question: "Is it possible __________ this dish without nuts?",
    options: [
      "to make",
      "make",
      "making",
      "to making"
    ],
    correctAnswer: 0,
    category: "Dining Requests"
  },
  {
    id: 27,
    question: "I’m interested in __________ something spicy.",
    options: [
      "ordering",
      "to order",
      "order",
      "ordered"
    ],
    correctAnswer: 0,
    category: "Dining Requests"
  },
  {
    id: 28,
    question: "Would you like __________ any dessert?",
    options: [
      "to try",
      "trying",
      "try",
      "tried"
    ],
    correctAnswer: 0,
    category: "Dining Requests"
  },
  {
    id: 29,
    question: "Can you __________ my order, please?",
    options: [
      "take",
      "to take",
      "taking",
      "taken"
    ],
    correctAnswer: 0,
    category: "Dining Requests"
  },
  {
    id: 30,
    question: "Could I have my salad __________ the dressing on the side?",
    options: [
      "with",
      "by",
      "for",
      "on"
    ],
    correctAnswer: 0,
    category: "Dining Requests"
  },

  // 31-40: -ing forms: gerunds (noun), verbs, and adjectives (feeling, describing food)
  {
    id: 31,
    question: "__________ healthy food is important for a good life.",
    options: [
      "Eating",
      "Eat",
      "To eat",
      "Eats"
    ],
    correctAnswer: 0,
    category: "-ing Forms"
  },
  {
    id: 32,
    question: "The soup was so __________ that everyone wanted more.",
    options: [
      "delicious",
      "delight",
      "delighting",
      "delighted"
    ],
    correctAnswer: 0,
    category: "Adjectives (-ing/-ed)"
  },
  {
    id: 33,
    question: "We love __________ new recipes together.",
    options: [
      "trying",
      "to try",
      "try",
      "tried"
    ],
    correctAnswer: 0,
    category: "Gerund Verbs"
  },
  {
    id: 34,
    question: "__________ a new dish can be exciting.",
    options: [
      "Tasting",
      "Taste",
      "To taste",
      "Tasted"
    ],
    correctAnswer: 0,
    category: "Gerund Nouns"
  },
  {
    id: 35,
    question: "The chef is famous for __________ creative desserts.",
    options: [
      "making",
      "make",
      "to make",
      "made"
    ],
    correctAnswer: 0,
    category: "Gerund Verbs"
  },
  {
    id: 36,
    question: "Are you interested in __________ how to cook Thai food?",
    options: [
      "learning",
      "learn",
      "to learn",
      "learned"
    ],
    correctAnswer: 0,
    category: "Gerund Verbs"
  },
  {
    id: 37,
    question: "I find __________ vegetables every day a bit boring.",
    options: [
      "eating",
      "to eat",
      "eat",
      "eaten"
    ],
    correctAnswer: 0,
    category: "Gerund Verbs"
  },
  {
    id: 38,
    question: "The waiter was very __________ when explaining the specials.",
    options: [
      "helpful",
      "help",
      "helping",
      "helped"
    ],
    correctAnswer: 0,
    category: "Adjectives (-ing/-ed)"
  },
  {
    id: 39,
    question: "I love the __________ aroma of fresh bread in the morning.",
    options: [
      "inviting",
      "invite",
      "invited",
      "to invite"
    ],
    correctAnswer: 0,
    category: "Adjectives (-ing/-ed)"
  },
  {
    id: 40,
    question: "__________ food from around the world is my passion.",
    options: [
      "Tasting",
      "Taste",
      "To taste",
      "Tasted"
    ],
    correctAnswer: 0,
    category: "Gerund Nouns"
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