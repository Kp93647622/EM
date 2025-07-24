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

const quizData = [
  // 1-10: Present Perfect VS. Past Simple (Performance/Festival context)
  {
    id: 1,
    question: "I __________ (never / see) a live ballet performance before.",
    options: [
      "never saw",
      "have never seen",
      "had never seen",
      "am never seeing"
    ],
    correctAnswer: 1,
    category: "Present Perfect vs. Past Simple"
  },
  {
    id: 2,
    question: "The festival __________ (start) last night at 7 o’clock.",
    options: [
      "has started",
      "have started",
      "started",
      "starts"
    ],
    correctAnswer: 2,
    category: "Present Perfect vs. Past Simple"
  },
  {
    id: 3,
    question: "They __________ (already / finish) the performance when we arrived.",
    options: [
      "already finished",
      "has already finished",
      "had already finished",
      "have already finished"
    ],
    correctAnswer: 2,
    category: "Present Perfect vs. Past Simple"
  },
  {
    id: 4,
    question: "The singer __________ (win) three awards so far.",
    options: [
      "won",
      "has won",
      "have won",
      "wins"
    ],
    correctAnswer: 1,
    category: "Present Perfect vs. Past Simple"
  },
  {
    id: 5,
    question: "We __________ (attend) the Lantern Festival last year.",
    options: [
      "have attended",
      "attend",
      "attended",
      "has attended"
    ],
    correctAnswer: 2,
    category: "Present Perfect vs. Past Simple"
  },
  {
    id: 6,
    question: "How many times __________ (you / see) the fireworks show?",
    options: [
      "have you seen",
      "did you see",
      "had you seen",
      "do you see"
    ],
    correctAnswer: 0,
    category: "Present Perfect vs. Past Simple"
  },
  {
    id: 7,
    question: "They __________ (not perform) on this stage before.",
    options: [
      "haven't performed",
      "didn't perform",
      "doesn't perform",
      "wasn't performing"
    ],
    correctAnswer: 0,
    category: "Present Perfect vs. Past Simple"
  },
  {
    id: 8,
    question: "Last month, she __________ (dance) in a traditional show.",
    options: [
      "has danced",
      "danced",
      "have danced",
      "was danced"
    ],
    correctAnswer: 1,
    category: "Present Perfect vs. Past Simple"
  },
  {
    id: 9,
    question: "We __________ (visit) the local temple during Songkran since 2010.",
    options: [
      "visited",
      "have visited",
      "visiting",
      "has visited"
    ],
    correctAnswer: 1,
    category: "Present Perfect vs. Past Simple"
  },
  {
    id: 10,
    question: "When __________ (the festival / begin) last year?",
    options: [
      "has the festival begun",
      "does the festival begin",
      "did the festival begin",
      "have the festival begun"
    ],
    correctAnswer: 2,
    category: "Present Perfect vs. Past Simple"
  },

  // 11-20: Present Perfect Continuous (Experience/Preparation/Performance)
  {
    id: 11,
    question: "The performers __________ (practice) for weeks for the celebration.",
    options: [
      "has practiced",
      "were practicing",
      "have been practicing",
      "are practicing"
    ],
    correctAnswer: 2,
    category: "Present Perfect Continuous"
  },
  {
    id: 12,
    question: "She __________ (prepare) her costume all morning.",
    options: [
      "has prepared",
      "has been preparing",
      "is preparing",
      "was preparing"
    ],
    correctAnswer: 1,
    category: "Present Perfect Continuous"
  },
  {
    id: 13,
    question: "We __________ (wait) for the show to start since 6 p.m.",
    options: [
      "waited",
      "were waiting",
      "have been waiting",
      "are waiting"
    ],
    correctAnswer: 2,
    category: "Present Perfect Continuous"
  },
  {
    id: 14,
    question: "The band __________ (perform) on the main stage every night this week.",
    options: [
      "has performed",
      "has been performing",
      "performs",
      "was performed"
    ],
    correctAnswer: 1,
    category: "Present Perfect Continuous"
  },
  {
    id: 15,
    question: "How long __________ (the drummers / play) together?",
    options: [
      "have the drummers played",
      "did the drummers play",
      "have the drummers been playing",
      "do the drummers play"
    ],
    correctAnswer: 2,
    category: "Present Perfect Continuous"
  },
  {
    id: 16,
    question: "They __________ (decorate) the stage since this morning.",
    options: [
      "has decorated",
      "were decorating",
      "have been decorating",
      "are decorating"
    ],
    correctAnswer: 2,
    category: "Present Perfect Continuous"
  },
  {
    id: 17,
    question: "People __________ (celebrate) this festival for centuries.",
    options: [
      "have been celebrating",
      "are celebrating",
      "were celebrating",
      "has celebrated"
    ],
    correctAnswer: 0,
    category: "Present Perfect Continuous"
  },
  {
    id: 18,
    question: "I __________ (try) to buy tickets for the concert for days.",
    options: [
      "was trying",
      "have been trying",
      "am trying",
      "has tried"
    ],
    correctAnswer: 1,
    category: "Present Perfect Continuous"
  },
  {
    id: 19,
    question: "The musicians __________ (rehearse) since early morning.",
    options: [
      "has rehearsed",
      "have rehearsed",
      "have been rehearsing",
      "are rehearsing"
    ],
    correctAnswer: 2,
    category: "Present Perfect Continuous"
  },
  {
    id: 20,
    question: "She __________ (learn) the traditional dance for three months.",
    options: [
      "has learned",
      "has been learning",
      "was learning",
      "have learned"
    ],
    correctAnswer: 1,
    category: "Present Perfect Continuous"
  },

  // 21-30: Present Perfect VS Past Simple (Festivals, Tradition, Experience)
  {
    id: 21,
    question: "I __________ (go) to the music festival last year.",
    options: [
      "have gone",
      "went",
      "have been going",
      "was going"
    ],
    correctAnswer: 1,
    category: "Present Perfect vs. Past Simple"
  },
  {
    id: 22,
    question: "He __________ (not try) Thai food before the festival.",
    options: [
      "didn't try",
      "hasn't tried",
      "doesn't try",
      "not tried"
    ],
    correctAnswer: 0,
    category: "Present Perfect vs. Past Simple"
  },
  {
    id: 23,
    question: "We __________ (just / finish) preparing for the celebration.",
    options: [
      "just finished",
      "have just finished",
      "were just finishing",
      "are just finishing"
    ],
    correctAnswer: 1,
    category: "Present Perfect vs. Past Simple"
  },
  {
    id: 24,
    question: "__________ (you / ever / perform) in a traditional ceremony?",
    options: [
      "Did you ever perform",
      "Were you ever performing",
      "Have you ever performed",
      "Are you ever performing"
    ],
    correctAnswer: 2,
    category: "Present Perfect vs. Past Simple"
  },
  {
    id: 25,
    question: "The parade __________ (begin) at 9 a.m. yesterday.",
    options: [
      "began",
      "has begun",
      "have begun",
      "was beginning"
    ],
    correctAnswer: 0,
    category: "Present Perfect vs. Past Simple"
  },
  {
    id: 26,
    question: "They __________ (never / miss) a single performance.",
    options: [
      "never missed",
      "have never missed",
      "has never missed",
      "are never missing"
    ],
    correctAnswer: 1,
    category: "Present Perfect vs. Past Simple"
  },
  {
    id: 27,
    question: "My family __________ (celebrate) Loy Krathong every year since I was young.",
    options: [
      "celebrated",
      "have celebrated",
      "has celebrated",
      "celebrates"
    ],
    correctAnswer: 2,
    category: "Present Perfect vs. Past Simple"
  },
  {
    id: 28,
    question: "We __________ (see) a lot of performances at the festival yesterday.",
    options: [
      "have seen",
      "see",
      "saw",
      "had seen"
    ],
    correctAnswer: 2,
    category: "Present Perfect vs. Past Simple"
  },
  {
    id: 29,
    question: "She __________ (not attend) the last celebration because she was sick.",
    options: [
      "has not attended",
      "did not attend",
      "not attended",
      "was not attending"
    ],
    correctAnswer: 1,
    category: "Present Perfect vs. Past Simple"
  },
  {
    id: 30,
    question: "How long __________ (they / organize) this festival?",
    options: [
      "have they been organizing",
      "are they organizing",
      "did they organize",
      "do they organize"
    ],
    correctAnswer: 0,
    category: "Present Perfect Continuous"
  },

  // 31-40: Phrases to Conclude & Tradition/Experience
  {
    id: 31,
    question: "__________, traditional festivals help keep our culture alive.",
    options: [
      "On the other hand",
      "To sum up",
      "For example",
      "However"
    ],
    correctAnswer: 1,
    category: "Phrases to Conclude"
  },
  {
    id: 32,
    question: "__________, the celebration was a great success.",
    options: [
      "In conclusion",
      "For instance",
      "At first",
      "Meanwhile"
    ],
    correctAnswer: 0,
    category: "Phrases to Conclude"
  },
  {
    id: 33,
    question: "__________, everyone enjoyed the music performance.",
    options: [
      "Finally",
      "But",
      "So",
      "Otherwise"
    ],
    correctAnswer: 0,
    category: "Phrases to Conclude"
  },
  {
    id: 34,
    question: "__________, the festival brings people together every year.",
    options: [
      "Next",
      "All in all",
      "Instead",
      "Afterwards"
    ],
    correctAnswer: 1,
    category: "Phrases to Conclude"
  },
  {
    id: 35,
    question: "__________, the traditions remain strong in our community.",
    options: [
      "All in all",
      "For instance",
      "Therefore",
      "Nevertheless"
    ],
    correctAnswer: 0,
    category: "Phrases to Conclude"
  },
  {
    id: 36,
    question: "__________, I learned a lot about Thai culture from this festival.",
    options: [
      "As a result",
      "In conclusion",
      "First of all",
      "Such as"
    ],
    correctAnswer: 1,
    category: "Phrases to Conclude"
  },
  {
    id: 37,
    question: "__________, the performance ended with a beautiful firework show.",
    options: [
      "All in all",
      "In addition",
      "Finally",
      "For example"
    ],
    correctAnswer: 2,
    category: "Phrases to Conclude"
  },
  {
    id: 38,
    question: "__________, these events teach us to appreciate our traditions.",
    options: [
      "To sum up",
      "On the other hand",
      "However",
      "Therefore"
    ],
    correctAnswer: 0,
    category: "Phrases to Conclude"
  },
  {
    id: 39,
    question: "__________, we have celebrated Songkran for hundreds of years.",
    options: [
      "To sum up",
      "Meanwhile",
      "In conclusion",
      "For instance"
    ],
    correctAnswer: 2,
    category: "Phrases to Conclude"
  },
  {
    id: 40,
    question: "__________, celebrating together creates strong community bonds.",
    options: [
      "All in all",
      "For example",
      "Meanwhile",
      "First of all"
    ],
    correctAnswer: 0,
    category: "Phrases to Conclude"
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
              <Text style={styles.resultSubtitle}>Traditional, Cultural events and celebration</Text>
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
        <Text style={styles.headerSubtitle}>Traditional, Cultural events and celebration</Text>
        
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