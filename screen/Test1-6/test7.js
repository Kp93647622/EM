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
  // 1-20: Causative verbs (let/make/have/get/help) + environment/laws context
  {
    id: 1,
    question: "Strict laws __________ people reduce single-use plastics.",
    options: [
      "make",
      "let",
      "have",
      "get"
    ],
    correctAnswer: 0,
    category: "Causative Verbs"
  },
  {
    id: 2,
    question: "The government __________ citizens plant more trees every year.",
    options: [
      "makes",
      "lets",
      "gets",
      "has"
    ],
    correctAnswer: 2,
    category: "Causative Verbs"
  },
  {
    id: 3,
    question: "New recycling rules __________ us separate our trash at home.",
    options: [
      "make",
      "let",
      "have",
      "get"
    ],
    correctAnswer: 0,
    category: "Causative Verbs"
  },
  {
    id: 4,
    question: "The city __________ people use public transport on Clean Air Day.",
    options: [
      "lets",
      "gets",
      "has",
      "makes"
    ],
    correctAnswer: 0,
    category: "Causative Verbs"
  },
  {
    id: 5,
    question: "The teacher __________ the students clean up the school garden.",
    options: [
      "had",
      "let",
      "helped",
      "made"
    ],
    correctAnswer: 3,
    category: "Causative Verbs"
  },
  {
    id: 6,
    question: "The law __________ factories check their waste before releasing it.",
    options: [
      "makes",
      "lets",
      "gets",
      "helps"
    ],
    correctAnswer: 0,
    category: "Causative Verbs"
  },
  {
    id: 7,
    question: "Our parents __________ us help with recycling at home.",
    options: [
      "have",
      "make",
      "get",
      "let"
    ],
    correctAnswer: 0,
    category: "Causative Verbs"
  },
  {
    id: 8,
    question: "New rules __________ companies use eco-friendly packaging.",
    options: [
      "let",
      "make",
      "help",
      "get"
    ],
    correctAnswer: 1,
    category: "Causative Verbs"
  },
  {
    id: 9,
    question: "The campaign __________ people think about climate change.",
    options: [
      "helps",
      "lets",
      "gets",
      "makes"
    ],
    correctAnswer: 0,
    category: "Causative Verbs"
  },
  {
    id: 10,
    question: "The park ranger __________ visitors leave no trash behind.",
    options: [
      "lets",
      "has",
      "helps",
      "makes"
    ],
    correctAnswer: 3,
    category: "Causative Verbs"
  },
  {
    id: 11,
    question: "Our school __________ us take care of the environment.",
    options: [
      "lets",
      "gets",
      "helps",
      "makes"
    ],
    correctAnswer: 2,
    category: "Causative Verbs"
  },
  {
    id: 12,
    question: "The local council __________ the citizens plant trees in the park.",
    options: [
      "gets",
      "let",
      "has",
      "makes"
    ],
    correctAnswer: 0,
    category: "Causative Verbs"
  },
  {
    id: 13,
    question: "The principal __________ students participate in the cleanup day.",
    options: [
      "lets",
      "makes",
      "helps",
      "gets"
    ],
    correctAnswer: 0,
    category: "Causative Verbs"
  },
  {
    id: 14,
    question: "The organization __________ volunteers clean up the river.",
    options: [
      "lets",
      "makes",
      "has",
      "gets"
    ],
    correctAnswer: 2,
    category: "Causative Verbs"
  },
  {
    id: 15,
    question: "The government __________ companies report their emissions.",
    options: [
      "helps",
      "lets",
      "makes",
      "gets"
    ],
    correctAnswer: 2,
    category: "Causative Verbs"
  },
  {
    id: 16,
    question: "The campaign __________ people see the benefits of saving energy.",
    options: [
      "lets",
      "helps",
      "makes",
      "gets"
    ],
    correctAnswer: 1,
    category: "Causative Verbs"
  },
  {
    id: 17,
    question: "The law __________ factories reduce air pollution.",
    options: [
      "helps",
      "makes",
      "lets",
      "has"
    ],
    correctAnswer: 1,
    category: "Causative Verbs"
  },
  {
    id: 18,
    question: "My teacher __________ me research about global warming.",
    options: [
      "lets",
      "makes",
      "helps",
      "gets"
    ],
    correctAnswer: 0,
    category: "Causative Verbs"
  },
  {
    id: 19,
    question: "The new rule __________ companies pay a fine for polluting.",
    options: [
      "gets",
      "lets",
      "has",
      "makes"
    ],
    correctAnswer: 3,
    category: "Causative Verbs"
  },
  {
    id: 20,
    question: "Parents __________ their children participate in recycling programs.",
    options: [
      "get",
      "let",
      "make",
      "help"
    ],
    correctAnswer: 0,
    category: "Causative Verbs"
  },

  // 21-40: Phrasal verbs + Environment context
  {
    id: 21,
    question: "We must not __________ our old batteries with regular trash.",
    options: [
      "throw away",
      "pick up",
      "put on",
      "give away"
    ],
    correctAnswer: 0,
    category: "Phrasal Verbs"
  },
  {
    id: 22,
    question: "Let’s __________ the beach this Saturday morning.",
    options: [
      "clean up",
      "break down",
      "give up",
      "set up"
    ],
    correctAnswer: 0,
    category: "Phrasal Verbs"
  },
  {
    id: 23,
    question: "Factories need to __________ their waste safely.",
    options: [
      "dispose of",
      "set up",
      "break down",
      "bring about"
    ],
    correctAnswer: 0,
    category: "Phrasal Verbs"
  },
  {
    id: 24,
    question: "Some chemicals take years to __________ in nature.",
    options: [
      "break down",
      "get rid of",
      "put out",
      "give away"
    ],
    correctAnswer: 0,
    category: "Phrasal Verbs"
  },
  {
    id: 25,
    question: "Don’t forget to __________ the lights when you leave the room.",
    options: [
      "turn off",
      "take care of",
      "cut down",
      "look for"
    ],
    correctAnswer: 0,
    category: "Phrasal Verbs"
  },
  {
    id: 26,
    question: "We need to __________ on using plastic bags.",
    options: [
      "cut down",
      "throw away",
      "take out",
      "come up"
    ],
    correctAnswer: 0,
    category: "Phrasal Verbs"
  },
  {
    id: 27,
    question: "You should __________ after your pets in public parks.",
    options: [
      "clean up",
      "look after",
      "run out",
      "put away"
    ],
    correctAnswer: 1,
    category: "Phrasal Verbs"
  },
  {
    id: 28,
    question: "Recycling programs help us __________ less waste.",
    options: [
      "put out",
      "throw away",
      "cut off",
      "pick up"
    ],
    correctAnswer: 1,
    category: "Phrasal Verbs"
  },
  {
    id: 29,
    question: "It’s important to __________ the rules about littering.",
    options: [
      "stick to",
      "give up",
      "run out",
      "go off"
    ],
    correctAnswer: 0,
    category: "Phrasal Verbs"
  },
  {
    id: 30,
    question: "Let’s __________ a campaign to save endangered animals.",
    options: [
      "set up",
      "take off",
      "bring about",
      "come up"
    ],
    correctAnswer: 0,
    category: "Phrasal Verbs"
  },
  {
    id: 31,
    question: "Many people __________ trees in the city every year.",
    options: [
      "plant up",
      "put out",
      "take off",
      "cut down"
    ],
    correctAnswer: 0,
    category: "Phrasal Verbs"
  },
  {
    id: 32,
    question: "We should __________ new ideas for reducing pollution.",
    options: [
      "come up with",
      "bring up",
      "pick up",
      "run out of"
    ],
    correctAnswer: 0,
    category: "Phrasal Verbs"
  },
  {
    id: 33,
    question: "Forest fires can __________ a lot of damage to the environment.",
    options: [
      "bring about",
      "give away",
      "put off",
      "look after"
    ],
    correctAnswer: 0,
    category: "Phrasal Verbs"
  },
  {
    id: 34,
    question: "Many animals die because people __________ their habitats.",
    options: [
      "take over",
      "give up",
      "run out of",
      "get rid of"
    ],
    correctAnswer: 0,
    category: "Phrasal Verbs"
  },
  {
    id: 35,
    question: "We can __________ plastic bottles by reusing them.",
    options: [
      "cut down",
      "take over",
      "make up",
      "cut out"
    ],
    correctAnswer: 0,
    category: "Phrasal Verbs"
  },
  {
    id: 36,
    question: "Governments should __________ strict laws to protect nature.",
    options: [
      "bring in",
      "bring up",
      "pick up",
      "take off"
    ],
    correctAnswer: 0,
    category: "Phrasal Verbs"
  },
  {
    id: 37,
    question: "It’s important to __________ climate change in schools.",
    options: [
      "bring up",
      "bring about",
      "pick out",
      "set up"
    ],
    correctAnswer: 0,
    category: "Phrasal Verbs"
  },
  {
    id: 38,
    question: "If you __________ energy, you can save money and help the planet.",
    options: [
      "cut down on",
      "get rid of",
      "put out",
      "throw away"
    ],
    correctAnswer: 0,
    category: "Phrasal Verbs"
  },
  {
    id: 39,
    question: "People should __________ renewable sources of energy.",
    options: [
      "make use of",
      "make up for",
      "take care of",
      "give away"
    ],
    correctAnswer: 0,
    category: "Phrasal Verbs"
  },
  {
    id: 40,
    question: "We must __________ illegal hunting in national parks.",
    options: [
      "put an end to",
      "bring up",
      "come up with",
      "cut out"
    ],
    correctAnswer: 0,
    category: "Phrasal Verbs"
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