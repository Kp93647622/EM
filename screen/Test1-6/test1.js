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

const { width } = Dimensions.get('window');

// ชุดข้อสอบทั้งหมด 40 ข้อ
const quizData = [
  // Present Perfect Tense (20 ข้อ)
  {
    id: 1,
    question: "I ________ my homework already.",
    options: ["have finished", "has finished", "finished", "finishing"],
    correctAnswer: 0,
    category: "Present Perfect"
  },
  {
    id: 2,
    question: "She ________ to Paris three times this year.",
    options: ["went", "has gone", "have gone", "going"],
    correctAnswer: 1,
    category: "Present Perfect"
  },
  {
    id: 3,
    question: "They ________ never ________ sushi before.",
    options: ["has / eaten", "have / ate", "have / eaten", "had / eaten"],
    correctAnswer: 2,
    category: "Present Perfect"
  },
  {
    id: 4,
    question: "________ you ever ________ a famous person?",
    options: ["Did / meet", "Have / met", "Has / met", "Do / meet"],
    correctAnswer: 1,
    category: "Present Perfect"
  },
  {
    id: 5,
    question: "We ________ in this house for five years.",
    options: ["lived", "have lived", "has lived", "are living"],
    correctAnswer: 1,
    category: "Present Perfect"
  },
  {
    id: 6,
    question: "He ________ just ________ from work.",
    options: ["have / returned", "has / return", "has / returned", "had / returned"],
    correctAnswer: 2,
    category: "Present Perfect"
  },
  {
    id: 7,
    question: "The movie ________ already ________.",
    options: ["have / started", "has / started", "had / started", "was / started"],
    correctAnswer: 1,
    category: "Present Perfect"
  },
  {
    id: 8,
    question: "I ________ my keys. I can't find them anywhere.",
    options: ["lost", "have lost", "has lost", "am losing"],
    correctAnswer: 1,
    category: "Present Perfect"
  },
  {
    id: 9,
    question: "________ she ________ her breakfast yet?",
    options: ["Did / eat", "Has / eaten", "Have / eaten", "Does / eat"],
    correctAnswer: 1,
    category: "Present Perfect"
  },
  {
    id: 10,
    question: "My parents ________ never ________ to Japan.",
    options: ["has / been", "have / been", "had / been", "are / been"],
    correctAnswer: 1,
    category: "Present Perfect"
  },
  {
    id: 11,
    question: "The students ________ their project since last week.",
    options: ["worked on", "have worked on", "has worked on", "are working on"],
    correctAnswer: 1,
    category: "Present Perfect"
  },
  {
    id: 12,
    question: "It ________ raining for two hours.",
    options: ["has been", "have been", "was", "is"],
    correctAnswer: 0,
    category: "Present Perfect"
  },
  {
    id: 13,
    question: "________ you ________ the new restaurant downtown?",
    options: ["Did / try", "Have / tried", "Has / tried", "Do / try"],
    correctAnswer: 1,
    category: "Present Perfect"
  },
  {
    id: 14,
    question: "She ________ her phone three times today.",
    options: ["dropped", "has dropped", "have dropped", "is dropping"],
    correctAnswer: 1,
    category: "Present Perfect"
  },
  {
    id: 15,
    question: "We ________ not ________ our decision yet.",
    options: ["has / made", "have / make", "have / made", "had / made"],
    correctAnswer: 2,
    category: "Present Perfect"
  },
  {
    id: 16,
    question: "The company ________ many new employees this year.",
    options: ["hired", "has hired", "have hired", "hiring"],
    correctAnswer: 1,
    category: "Present Perfect"
  },
  {
    id: 17,
    question: "I ________ this book twice already.",
    options: ["read", "have read", "has read", "am reading"],
    correctAnswer: 1,
    category: "Present Perfect"
  },
  {
    id: 18,
    question: "________ the train ________ yet?",
    options: ["Did / arrive", "Has / arrived", "Have / arrived", "Does / arrive"],
    correctAnswer: 1,
    category: "Present Perfect"
  },
  {
    id: 19,
    question: "They ________ to the museum several times.",
    options: ["went", "have gone", "has gone", "going"],
    correctAnswer: 1,
    category: "Present Perfect"
  },
  {
    id: 20,
    question: "My sister ________ her driving test successfully.",
    options: ["passed", "has passed", "have passed", "passing"],
    correctAnswer: 1,
    category: "Present Perfect"
  },
  
  // Action Verbs (10 ข้อ)
  {
    id: 21,
    question: "Which of these is an ACTION VERB?",
    options: ["seem", "dance", "believe", "own"],
    correctAnswer: 1,
    category: "Action Verbs"
  },
  {
    id: 22,
    question: "The children ________ in the playground right now.",
    options: ["are playing", "are knowing", "are seeming", "are belonging"],
    correctAnswer: 0,
    category: "Action Verbs"
  },
  {
    id: 23,
    question: "She ________ her homework every evening.",
    options: ["does", "knows", "has", "is"],
    correctAnswer: 0,
    category: "Action Verbs"
  },
  {
    id: 24,
    question: "Which sentence uses an ACTION VERB correctly?",
    options: ["He is having brown eyes.", "She is running to school.", "They are knowing the answer.", "I am loving chocolate."],
    correctAnswer: 1,
    category: "Action Verbs"
  },
  {
    id: 25,
    question: "The students ________ their teacher's instructions carefully.",
    options: ["listen to", "belong to", "seem to", "own to"],
    correctAnswer: 0,
    category: "Action Verbs"
  },
  {
    id: 26,
    question: "Which of these is an ACTION VERB?",
    options: ["understand", "jump", "appear", "contain"],
    correctAnswer: 1,
    category: "Action Verbs"
  },
  {
    id: 27,
    question: "My brother ________ his bike to work every day.",
    options: ["rides", "owns", "needs", "wants"],
    correctAnswer: 0,
    category: "Action Verbs"
  },
  {
    id: 28,
    question: "The chef ________ a delicious meal for the guests.",
    options: ["prepares", "tastes", "smells", "sounds"],
    correctAnswer: 0,
    category: "Action Verbs"
  },
  {
    id: 29,
    question: "Which sentence shows an ACTION VERB?",
    options: ["The cake smells good.", "The birds are singing.", "This book belongs to me.", "She seems tired."],
    correctAnswer: 1,
    category: "Action Verbs"
  },
  {
    id: 30,
    question: "They ________ soccer in the park every weekend.",
    options: ["play", "like", "prefer", "remember"],
    correctAnswer: 0,
    category: "Action Verbs"
  },
  
  // Stative Verbs (10 ข้อ)
  {
    id: 31,
    question: "Which of these is a STATIVE VERB?",
    options: ["run", "jump", "believe", "dance"],
    correctAnswer: 2,
    category: "Stative Verbs"
  },
  {
    id: 32,
    question: "I ________ what you mean. (Use simple present, not continuous)",
    options: ["am understanding", "understand", "understanding", "understood"],
    correctAnswer: 1,
    category: "Stative Verbs"
  },
  {
    id: 33,
    question: "This car ________ to my father.",
    options: ["is belonging", "belongs", "belonging", "belong"],
    correctAnswer: 1,
    category: "Stative Verbs"
  },
  {
    id: 34,
    question: "Which sentence is INCORRECT?",
    options: ["She knows the answer.", "He is knowing the answer.", "They remember the story.", "I believe you."],
    correctAnswer: 1,
    category: "Stative Verbs"
  },
  {
    id: 35,
    question: "The soup ________ delicious.",
    options: ["is tasting", "tastes", "tasting", "taste"],
    correctAnswer: 1,
    category: "Stative Verbs"
  },
  {
    id: 36,
    question: "Which of these is a STATIVE VERB?",
    options: ["write", "contain", "swim", "walk"],
    correctAnswer: 1,
    category: "Stative Verbs"
  },
  {
    id: 37,
    question: "She ________ three languages fluently.",
    options: ["is speaking", "speaks", "speaking", "speak"],
    correctAnswer: 1,
    category: "Stative Verbs"
  },
  {
    id: 38,
    question: "Which sentence uses a STATIVE VERB correctly?",
    options: ["He is having a car.", "He has a car.", "He is owning a car.", "He is possessing a car."],
    correctAnswer: 1,
    category: "Stative Verbs"
  },
  {
    id: 39,
    question: "The flowers ________ beautiful in the garden.",
    options: ["are looking", "look", "looking", "looks"],
    correctAnswer: 1,
    category: "Stative Verbs"
  },
  {
    id: 40,
    question: "I ________ chocolate ice cream more than vanilla.",
    options: ["am preferring", "prefer", "preferring", "prefers"],
    correctAnswer: 1,
    category: "Stative Verbs"
  }
];

export default function PresentPerfectActionStativeVerbs() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(2700); // 45 นาที
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [progressAnim] = useState(new Animated.Value(0));

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
    ]).start();
  }, [quizStarted]);

  useEffect(() => {
    if (quizStarted && currentQuestion < quizData.length) {
      Animated.timing(progressAnim, {
        toValue: (currentQuestion + 1) / quizData.length,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [currentQuestion, quizStarted]);


  // Timer
  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (quizStarted && timeLeft === 0 && !showResult) {
      handleQuizComplete();
    }
  }, [quizStarted, timeLeft, showResult]);

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
    
    const isCorrect = selectedAnswer === quizData[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = { selected: selectedAnswer, correct: isCorrect };
    setAnswers(newAnswers);

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      // Reset animations for next question
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]).start();
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    setShowResult(true);
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  };

  const handleRetry = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
    setTimeLeft(2700);
    progressAnim.setValue(0);
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

  // --- หน้าเริ่มต้น ---
  if (!quizStarted) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#667eea" />
        <Animated.View style={[styles.startContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <View style={[styles.header, { borderBottomLeftRadius: 0, borderBottomRightRadius: 0, paddingTop: 80, paddingBottom: 60, width: '100%'}]}>
              <Text style={styles.headerTitle}>Present Perfect, Action & Stative Verbs Quiz</Text>
              <Text style={styles.headerSubtitle}>ข้อสอบ 40 ข้อ | เวลา 45 นาที</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8faff', width: '100%' }}>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => {
                  setQuizStarted(true);
                  // Reset animations for quiz start
                  fadeAnim.setValue(0);
                  slideAnim.setValue(50);
                }}
              >
                <Text style={styles.startButtonText}>ทำแบบทดสอบ</Text>
              </TouchableOpacity>
            </View>
        </Animated.View>
      </View>
    );
  }

  // --- แสดงผลลัพธ์หลังสอบเสร็จ ---
  if (showResult) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#667eea" />
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Animated.View
            style={[
              styles.resultContainer,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
            ]}
          >
            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>🎉 ผลการสอบ</Text>
              <Text style={styles.resultSubtitle}>Present Perfect, Action & Stative Verbs</Text>
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
                <Text style={styles.statNumber}>{formatTime(2700 - timeLeft)}</Text>
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

  // --- Quiz ---
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      {/* Header */}
      <View
        style={[
          styles.header
        ]}
      >
        <Text style={styles.headerTitle}>Present Perfect, Action & Stative Verbs Quiz</Text>
        <Text style={styles.headerSubtitle}>กรุณาเลือกข้อที่ถูกต้องเพียงข้อเดียว</Text>
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
      </View>
      {/* Question */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.questionContainer,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
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
      backgroundColor: '#f8faff',
    },
    scrollView: { flex: 1 },
    startContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Header Styles
    header: {
      backgroundColor: '#667eea',
      paddingTop: 60,
      paddingBottom: 30,
      paddingHorizontal: 20,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      shadowColor: '#667eea',
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
      color: '#E8EAFF',
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
    timerIcon: { fontSize: 18, marginRight: 8 },
    timerText: { fontSize: 18, color: '#FFFFFF', fontWeight: '700' },
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
    progressText: { fontSize: 16, color: '#FFFFFF', fontWeight: '600' },
    progressPercentage: { fontSize: 16, color: '#FFFFFF', fontWeight: '700' },
    progressBar: {
      height: 12,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 6,
      overflow: 'hidden',
    },
    progressFill: { height: '100%', backgroundColor: '#4CAF50', borderRadius: 6 },
  
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
    questionNumber: { fontSize: 18, fontWeight: '700', color: '#667eea', marginBottom: 15 },
    questionText: { fontSize: 20, color: '#333', lineHeight: 30, marginBottom: 30, fontWeight: '600' },
    optionsContainer: { marginBottom: 30 },
    optionButton: {
      backgroundColor: '#f8faff',
      borderRadius: 15,
      marginBottom: 15,
      borderWidth: 2,
      borderColor: '#e0e6ff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 3,
    },
    selectedOption: { backgroundColor: '#667eea', borderColor: '#667eea' },
    optionContent: { flexDirection: 'row', alignItems: 'center', padding: 20 },
    optionLetter: { fontSize: 18, fontWeight: '700', color: '#667eea', marginRight: 15, width: 25 },
    optionText: { fontSize: 16, color: '#333', flex: 1, fontWeight: '500' },
    selectedOptionText: { color: '#FFFFFF' },
    nextButton: {
      backgroundColor: '#667eea',
      paddingVertical: 18,
      borderRadius: 15,
      shadowColor: '#667eea',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 15,
      elevation: 10,
    },
    nextButtonDisabled: { backgroundColor: '#ccc', shadowOpacity: 0.1 },
    nextButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700', textAlign: 'center' },
  
    // Result Styles
    resultContainer: { padding: 20, paddingTop: 40, paddingBottom: 40 },
    resultHeader: { alignItems: 'center', marginBottom: 30 },
    resultTitle: { fontSize: 32, fontWeight: '900', color: '#333', textAlign: 'center', marginBottom: 10 },
    resultSubtitle: { fontSize: 18, color: '#666', textAlign: 'center' },
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
    scoreText: { fontSize: 48, fontWeight: '900', marginBottom: 10 },
    scorePercentage: { fontSize: 24, color: '#666', fontWeight: '700', marginBottom: 10 },
    scoreGrade: { fontSize: 32, fontWeight: '900' },
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
    statItem: { alignItems: 'center' },
    statNumber: { fontSize: 24, fontWeight: '900', color: '#667eea', marginBottom: 5 },
    statLabel: { fontSize: 14, color: '#666', fontWeight: '600' },
    retryButton: {
      backgroundColor: '#667eea',
      paddingVertical: 20,
      borderRadius: 20,
      shadowColor: '#667eea',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 15,
    },
    retryButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700', textAlign: 'center' },
  
    // Start Button Styles
    startButton: {
      backgroundColor: '#667eea',
      paddingVertical: 22,
      paddingHorizontal: 60,
      borderRadius: 25,
      shadowColor: '#667eea',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 15,
      elevation: 10,
    },
    startButtonText: {
      color: '#FFF',
      fontSize: 22,
      fontWeight: '800',
      textAlign: 'center',
    },
  });