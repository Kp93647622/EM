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
  // 1-20: Passive Voice (เกี่ยวกับเทคโนโลยี, IT jobs, adverbs)
  {
    id: 1,
    question: "The new software __________ (install) by the technician yesterday.",
    options: [
      "was installed",
      "installed",
      "is installing",
      "were installed"
    ],
    correctAnswer: 0,
    category: "Passive Voice"
  },
  {
    id: 2,
    question: "The project __________ (complete) by the team next week.",
    options: [
      "will be completed",
      "was completed",
      "is completed",
      "has completed"
    ],
    correctAnswer: 0,
    category: "Passive Voice"
  },
  {
    id: 3,
    question: "All the data __________ (back up) regularly.",
    options: [
      "are backed up",
      "is backing up",
      "was backed up",
      "has backed up"
    ],
    correctAnswer: 0,
    category: "Passive Voice"
  },
  {
    id: 4,
    question: "The new app __________ (develop) by skilled programmers.",
    options: [
      "is developed",
      "was developing",
      "are developed",
      "were developed"
    ],
    correctAnswer: 0,
    category: "Passive Voice"
  },
  {
    id: 5,
    question: "Passwords __________ (should / change) frequently.",
    options: [
      "should be changed",
      "should changed",
      "should changing",
      "should be changing"
    ],
    correctAnswer: 0,
    category: "Passive Voice"
  },
  {
    id: 6,
    question: "The conference __________ (attend) by many IT professionals last year.",
    options: [
      "was attended",
      "attend",
      "was attending",
      "is attended"
    ],
    correctAnswer: 0,
    category: "Passive Voice"
  },
  {
    id: 7,
    question: "These files __________ (not / access) easily by the public.",
    options: [
      "are not accessed",
      "were not accessed",
      "is not accessed",
      "not accessed"
    ],
    correctAnswer: 0,
    category: "Passive Voice"
  },
  {
    id: 8,
    question: "Important emails __________ (can / send) automatically.",
    options: [
      "can be sent",
      "can sent",
      "can be sending",
      "could be send"
    ],
    correctAnswer: 0,
    category: "Passive Voice"
  },
  {
    id: 9,
    question: "New features __________ (add) to the app every month.",
    options: [
      "are added",
      "is added",
      "was added",
      "add"
    ],
    correctAnswer: 0,
    category: "Passive Voice"
  },
  {
    id: 10,
    question: "The server __________ (fix) just in time by the engineer.",
    options: [
      "was fixed",
      "was fixing",
      "were fixed",
      "fixed"
    ],
    correctAnswer: 0,
    category: "Passive Voice"
  },
  {
    id: 11,
    question: "Tech news __________ (can / find) online quickly.",
    options: [
      "can be found",
      "can find",
      "could found",
      "could be finding"
    ],
    correctAnswer: 0,
    category: "Passive Voice"
  },
  {
    id: 12,
    question: "The results __________ (publish) last Friday.",
    options: [
      "were published",
      "was published",
      "are publishing",
      "publishing"
    ],
    correctAnswer: 0,
    category: "Passive Voice"
  },
  {
    id: 13,
    question: "The new laptop __________ (design) especially for developers.",
    options: [
      "was designed",
      "is design",
      "were designed",
      "is designing"
    ],
    correctAnswer: 0,
    category: "Passive Voice"
  },
  {
    id: 14,
    question: "The document __________ (already / send) to your email.",
    options: [
      "has already been sent",
      "have already been sent",
      "is already sent",
      "was already sending"
    ],
    correctAnswer: 0,
    category: "Passive Voice"
  },
  {
    id: 15,
    question: "The system __________ (test) carefully before release.",
    options: [
      "is tested",
      "was testing",
      "tested",
      "was tested"
    ],
    correctAnswer: 0,
    category: "Passive Voice"
  },
  {
    id: 16,
    question: "New instructions __________ (give) to the staff yesterday.",
    options: [
      "were given",
      "was given",
      "is given",
      "gave"
    ],
    correctAnswer: 0,
    category: "Passive Voice"
  },
  {
    id: 17,
    question: "All tech jobs __________ (advertise) on the company website.",
    options: [
      "are advertised",
      "advertise",
      "is advertised",
      "were advertised"
    ],
    correctAnswer: 0,
    category: "Passive Voice"
  },
  {
    id: 18,
    question: "The seminar __________ (broadcast) live on the internet.",
    options: [
      "is broadcast",
      "was broadcasted",
      "broadcasted",
      "are broadcasted"
    ],
    correctAnswer: 0,
    category: "Passive Voice"
  },
  {
    id: 19,
    question: "Applications __________ (must / submit) before the deadline.",
    options: [
      "must be submitted",
      "must submit",
      "must submitted",
      "must be submitting"
    ],
    correctAnswer: 0,
    category: "Passive Voice"
  },
  {
    id: 20,
    question: "The password __________ (not / share) with anyone.",
    options: [
      "should not be shared",
      "should not shared",
      "shouldn't sharing",
      "shouldn't share"
    ],
    correctAnswer: 0,
    category: "Passive Voice"
  },

  // 21-40: Causative Passive (have/get + object + past participle) + adverbs + tech context
  {
    id: 21,
    question: "She had her computer __________ (repair) by an expert quickly.",
    options: [
      "repaired",
      "repair",
      "repairs",
      "repairing"
    ],
    correctAnswer: 0,
    category: "Causative Passive"
  },
  {
    id: 22,
    question: "We usually get our website __________ (update) regularly.",
    options: [
      "updated",
      "update",
      "updating",
      "updates"
    ],
    correctAnswer: 0,
    category: "Causative Passive"
  },
  {
    id: 23,
    question: "I will have my phone __________ (fix) tomorrow.",
    options: [
      "fixed",
      "fix",
      "fixing",
      "to fix"
    ],
    correctAnswer: 0,
    category: "Causative Passive"
  },
  {
    id: 24,
    question: "They got the software __________ (install) on all devices last week.",
    options: [
      "installed",
      "install",
      "installing",
      "installs"
    ],
    correctAnswer: 0,
    category: "Causative Passive"
  },
  {
    id: 25,
    question: "He had his emails __________ (check) every morning.",
    options: [
      "checked",
      "checking",
      "checks",
      "check"
    ],
    correctAnswer: 0,
    category: "Causative Passive"
  },
  {
    id: 26,
    question: "The manager got the new app __________ (test) thoroughly.",
    options: [
      "tested",
      "test",
      "testing",
      "tests"
    ],
    correctAnswer: 0,
    category: "Causative Passive"
  },
  {
    id: 27,
    question: "You should have your password __________ (change) frequently.",
    options: [
      "changed",
      "changing",
      "change",
      "to change"
    ],
    correctAnswer: 0,
    category: "Causative Passive"
  },
  {
    id: 28,
    question: "We always get our computers __________ (clean) by professionals.",
    options: [
      "cleaned",
      "clean",
      "cleaning",
      "cleans"
    ],
    correctAnswer: 0,
    category: "Causative Passive"
  },
  {
    id: 29,
    question: "The CEO had the announcement __________ (send) to all staff immediately.",
    options: [
      "sent",
      "sending",
      "send",
      "sends"
    ],
    correctAnswer: 0,
    category: "Causative Passive"
  },
  {
    id: 30,
    question: "They get their devices __________ (monitor) for security issues.",
    options: [
      "monitored",
      "monitor",
      "monitoring",
      "monitors"
    ],
    correctAnswer: 0,
    category: "Causative Passive"
  },
  {
    id: 31,
    question: "She got her documents __________ (print) by the IT department.",
    options: [
      "printed",
      "prints",
      "printing",
      "print"
    ],
    correctAnswer: 0,
    category: "Causative Passive"
  },
  {
    id: 32,
    question: "He has his reports __________ (review) by his manager carefully.",
    options: [
      "reviewed",
      "reviews",
      "review",
      "reviewing"
    ],
    correctAnswer: 0,
    category: "Causative Passive"
  },
  {
    id: 33,
    question: "We had our website __________ (design) professionally last year.",
    options: [
      "designed",
      "design",
      "designing",
      "designs"
    ],
    correctAnswer: 0,
    category: "Causative Passive"
  },
  {
    id: 34,
    question: "They always get the results __________ (analyze) by experts quickly.",
    options: [
      "analyzed",
      "analyzing",
      "analyze",
      "analyzes"
    ],
    correctAnswer: 0,
    category: "Causative Passive"
  },
  {
    id: 35,
    question: "I have my emails __________ (forward) to my new address automatically.",
    options: [
      "forwarded",
      "forward",
      "forwarding",
      "forwards"
    ],
    correctAnswer: 0,
    category: "Causative Passive"
  },
  {
    id: 36,
    question: "She will get her photo __________ (edit) by a designer.",
    options: [
      "edited",
      "editing",
      "edit",
      "edits"
    ],
    correctAnswer: 0,
    category: "Causative Passive"
  },
  {
    id: 37,
    question: "We had the instructions __________ (translate) into several languages.",
    options: [
      "translated",
      "translating",
      "translate",
      "translates"
    ],
    correctAnswer: 0,
    category: "Causative Passive"
  },
  {
    id: 38,
    question: "He usually gets his laptop __________ (upgrade) once a year.",
    options: [
      "upgraded",
      "upgrade",
      "upgrading",
      "upgrades"
    ],
    correctAnswer: 0,
    category: "Causative Passive"
  },
  {
    id: 39,
    question: "We got our system __________ (check) after the outage.",
    options: [
      "checked",
      "checks",
      "checking",
      "check"
    ],
    correctAnswer: 0,
    category: "Causative Passive"
  },
  {
    id: 40,
    question: "They have their data __________ (store) securely in the cloud.",
    options: [
      "stored",
      "stores",
      "storing",
      "store"
    ],
    correctAnswer: 0,
    category: "Causative Passive"
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