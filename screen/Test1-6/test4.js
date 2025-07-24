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
  // 1-15: Modal Verbs of Necessity (Money, Finance, Spending)
  {
    id: 1,
    question: "You __________ save more money if you want to buy a new phone.",
    options: [
      "must",
      "should",
      "can",
      "might"
    ],
    correctAnswer: 0,
    category: "Modal Verbs of Necessity"
  },
  {
    id: 2,
    question: "If you want to avoid debt, you __________ spend less than you earn.",
    options: [
      "can",
      "must",
      "could",
      "would"
    ],
    correctAnswer: 1,
    category: "Modal Verbs of Necessity"
  },
  {
    id: 3,
    question: "You __________ pay your bills on time to avoid late fees.",
    options: [
      "should",
      "must",
      "would",
      "may"
    ],
    correctAnswer: 1,
    category: "Modal Verbs of Necessity"
  },
  {
    id: 4,
    question: "We __________ make a budget every month to control our spending.",
    options: [
      "have to",
      "can",
      "will",
      "may"
    ],
    correctAnswer: 0,
    category: "Modal Verbs of Necessity"
  },
  {
    id: 5,
    question: "You __________ use a credit card for every purchase.",
    options: [
      "should",
      "shouldn't",
      "must",
      "ought"
    ],
    correctAnswer: 1,
    category: "Modal Verbs of Necessity"
  },
  {
    id: 6,
    question: "People __________ review their finances regularly.",
    options: [
      "must to",
      "should",
      "will",
      "might"
    ],
    correctAnswer: 1,
    category: "Modal Verbs of Necessity"
  },
  {
    id: 7,
    question: "I __________ buy this laptop unless I really need it.",
    options: [
      "must",
      "shouldn't",
      "ought to",
      "can't"
    ],
    correctAnswer: 1,
    category: "Modal Verbs of Necessity"
  },
  {
    id: 8,
    question: "To achieve your financial goals, you __________ stick to your savings plan.",
    options: [
      "have to",
      "will",
      "should to",
      "would"
    ],
    correctAnswer: 0,
    category: "Modal Verbs of Necessity"
  },
  {
    id: 9,
    question: "You __________ invest in stocks if you don't understand the risks.",
    options: [
      "mustn't",
      "may",
      "can",
      "should"
    ],
    correctAnswer: 0,
    category: "Modal Verbs of Necessity"
  },
  {
    id: 10,
    question: "If you want to retire early, you __________ save a significant portion of your income.",
    options: [
      "have to",
      "can",
      "might",
      "will"
    ],
    correctAnswer: 0,
    category: "Modal Verbs of Necessity"
  },
  {
    id: 11,
    question: "We __________ consult a financial advisor before making large investments.",
    options: [
      "should",
      "will",
      "must to",
      "may"
    ],
    correctAnswer: 0,
    category: "Modal Verbs of Necessity"
  },
  {
    id: 12,
    question: "You __________ keep receipts for all your expenses.",
    options: [
      "ought",
      "ought to",
      "can",
      "will"
    ],
    correctAnswer: 1,
    category: "Modal Verbs of Necessity"
  },
  {
    id: 13,
    question: "She __________ save money for emergencies.",
    options: [
      "need to",
      "may to",
      "will",
      "can"
    ],
    correctAnswer: 0,
    category: "Modal Verbs of Necessity"
  },
  {
    id: 14,
    question: "People __________ overspend during sales.",
    options: [
      "shouldn't",
      "can",
      "would",
      "will"
    ],
    correctAnswer: 0,
    category: "Modal Verbs of Necessity"
  },
  {
    id: 15,
    question: "You __________ borrow money unless absolutely necessary.",
    options: [
      "should",
      "shouldn't",
      "may",
      "will"
    ],
    correctAnswer: 1,
    category: "Modal Verbs of Necessity"
  },

  // 16-28: Future Perfect (Finance, Goals, Achievements)
  {
    id: 16,
    question: "By the end of this year, I __________ (save) enough for a new car.",
    options: [
      "will have saved",
      "have saved",
      "will save",
      "would have saved"
    ],
    correctAnswer: 0,
    category: "Future Perfect"
  },
  {
    id: 17,
    question: "She __________ (pay off) her student loan by 2026.",
    options: [
      "will have paid off",
      "will pay off",
      "has paid off",
      "will paid off"
    ],
    correctAnswer: 0,
    category: "Future Perfect"
  },
  {
    id: 18,
    question: "By next month, we __________ (complete) the annual budget plan.",
    options: [
      "will have completed",
      "will complete",
      "have completed",
      "will be completed"
    ],
    correctAnswer: 0,
    category: "Future Perfect"
  },
  {
    id: 19,
    question: "They __________ (earn) enough points for a free trip by summer.",
    options: [
      "will have earned",
      "have earned",
      "will earn",
      "would have earned"
    ],
    correctAnswer: 0,
    category: "Future Perfect"
  },
  {
    id: 20,
    question: "By the time you arrive, I __________ (withdraw) cash from the ATM.",
    options: [
      "will have withdrawn",
      "withdraw",
      "will withdraw",
      "have withdrawn"
    ],
    correctAnswer: 0,
    category: "Future Perfect"
  },
  {
    id: 21,
    question: "Next year, the company __________ (double) its investment.",
    options: [
      "will have doubled",
      "will double",
      "doubled",
      "has doubled"
    ],
    correctAnswer: 0,
    category: "Future Perfect"
  },
  {
    id: 22,
    question: "By 2030, most people __________ (move) to digital banking.",
    options: [
      "will have moved",
      "move",
      "will move",
      "moved"
    ],
    correctAnswer: 0,
    category: "Future Perfect"
  },
  {
    id: 23,
    question: "By this time next year, I __________ (save up) for a new computer.",
    options: [
      "will have saved up",
      "have saved up",
      "will save up",
      "save up"
    ],
    correctAnswer: 0,
    category: "Future Perfect"
  },
  {
    id: 24,
    question: "The government __________ (reduce) the budget deficit by 2027.",
    options: [
      "will have reduced",
      "has reduced",
      "reduces",
      "will reduce"
    ],
    correctAnswer: 0,
    category: "Future Perfect"
  },
  {
    id: 25,
    question: "They __________ (reach) their savings goal by the end of the year.",
    options: [
      "will have reached",
      "will reach",
      "have reached",
      "reached"
    ],
    correctAnswer: 0,
    category: "Future Perfect"
  },
  {
    id: 26,
    question: "By tomorrow, she __________ (transfer) all the funds to the new account.",
    options: [
      "will have transferred",
      "transfers",
      "will transfer",
      "has transferred"
    ],
    correctAnswer: 0,
    category: "Future Perfect"
  },
  {
    id: 27,
    question: "By the end of the semester, students __________ (complete) the personal finance course.",
    options: [
      "will have completed",
      "will complete",
      "have completed",
      "completed"
    ],
    correctAnswer: 0,
    category: "Future Perfect"
  },
  {
    id: 28,
    question: "By December, our team __________ (finish) the budget proposal.",
    options: [
      "will have finished",
      "will finish",
      "have finished",
      "finished"
    ],
    correctAnswer: 0,
    category: "Future Perfect"
  },

  // 29-40: Future Perfect Continuous (Budgeting, Earning, Saving)
  {
    id: 29,
    question: "By next July, I __________ (work) at this bank for ten years.",
    options: [
      "will have been working",
      "will have worked",
      "have worked",
      "will work"
    ],
    correctAnswer: 0,
    category: "Future Perfect Continuous"
  },
  {
    id: 30,
    question: "By the time you finish university, you __________ (save) for five years.",
    options: [
      "will have been saving",
      "will have saved",
      "will save",
      "have saved"
    ],
    correctAnswer: 0,
    category: "Future Perfect Continuous"
  },
  {
    id: 31,
    question: "By the end of this month, she __________ (manage) the budget for six months.",
    options: [
      "will have been managing",
      "will have managed",
      "has managed",
      "will manage"
    ],
    correctAnswer: 0,
    category: "Future Perfect Continuous"
  },
  {
    id: 32,
    question: "By next year, the company __________ (invest) in new technology for a decade.",
    options: [
      "will have been investing",
      "will have invested",
      "will invest",
      "has invested"
    ],
    correctAnswer: 0,
    category: "Future Perfect Continuous"
  },
  {
    id: 33,
    question: "By 2025, I __________ (pay) my mortgage for fifteen years.",
    options: [
      "will have been paying",
      "will have paid",
      "will pay",
      "have paid"
    ],
    correctAnswer: 0,
    category: "Future Perfect Continuous"
  },
  {
    id: 34,
    question: "They __________ (run) the small business for three years by then.",
    options: [
      "will have been running",
      "will have run",
      "have run",
      "will run"
    ],
    correctAnswer: 0,
    category: "Future Perfect Continuous"
  },
  {
    id: 35,
    question: "By the end of this week, you __________ (track) your spending for a month.",
    options: [
      "will have been tracking",
      "will have tracked",
      "will track",
      "have tracked"
    ],
    correctAnswer: 0,
    category: "Future Perfect Continuous"
  },
  {
    id: 36,
    question: "He __________ (save) for his vacation for two years by the time he travels.",
    options: [
      "will have been saving",
      "will have saved",
      "will save",
      "has saved"
    ],
    correctAnswer: 0,
    category: "Future Perfect Continuous"
  },
  {
    id: 37,
    question: "By the time we open the new branch, we __________ (plan) for several months.",
    options: [
      "will have been planning",
      "will have planned",
      "will plan",
      "have planned"
    ],
    correctAnswer: 0,
    category: "Future Perfect Continuous"
  },
  {
    id: 38,
    question: "By next summer, they __________ (collect) financial data for five years.",
    options: [
      "will have been collecting",
      "will have collected",
      "will collect",
      "have collected"
    ],
    correctAnswer: 0,
    category: "Future Perfect Continuous"
  },
  {
    id: 39,
    question: "By the end of this quarter, she __________ (analyze) market trends for six months.",
    options: [
      "will have been analyzing",
      "will have analyzed",
      "will analyze",
      "has analyzed"
    ],
    correctAnswer: 0,
    category: "Future Perfect Continuous"
  },
  {
    id: 40,
    question: "By the end of this year, we __________ (budget) for our project for twelve months.",
    options: [
      "will have been budgeting",
      "will have budgeted",
      "will budget",
      "have budgeted"
    ],
    correctAnswer: 0,
    category: "Future Perfect Continuous"
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