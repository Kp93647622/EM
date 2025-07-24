import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';
import * as Speech from 'expo-speech';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// --- 1. GRAMMAR GUIDELINES ---
const diningGrammarGuidelines = [
  {
    title: 'Gerunds & Infinitives',
    thai: 'Gerunds (V-ing) และ Infinitives (to + V)',
    content: [
      'Gerund (V-ing) ทำหน้าที่เป็นคำนาม: Cooking is fun. I enjoy eating out.',
      'Infinitive (to + V) ใช้ตามหลังกริยาบางตัว: I want to eat. We decided to order.',
      'Verbs + Gerund: enjoy, avoid, finish, suggest (e.g., I suggest trying the pasta.)',
      'Verbs + Infinitive: want, need, decide, hope, plan (e.g., We plan to visit again.)',
    ]
  },
  {
    title: 'Making Dining Requests',
    thai: 'การขอร้องในร้านอาหาร',
    content: [
      'ใช้โครงสร้างสุภาพเพื่อสั่งอาหารหรือขอสิ่งต่างๆ',
      'I would like to order the steak, please.',
      'Could we have the bill, please?',
      'Is it possible to get a table by the window?',
    ]
  },
  {
    title: '-ing Forms: Gerunds, Verbs, and Adjectives',
    thai: 'หน้าที่ต่างๆ ของ V-ing',
    content: [
      'Gerund (คำนาม): Cooking is my hobby.',
      'Continuous Verb (กริยา): He is cooking dinner.',
      'Adjective (คำคุณศัพท์): The food was amazing. The steak is sizzling.',
    ]
  }
];

// --- 2. EXAMPLES ---
const examples = [
  {
    category: 'Gerunds & Infinitives in Sentences',
    thai: 'Gerunds และ Infinitives ในประโยค',
    sentences: [
      { en: 'She enjoys trying new dishes.', th: 'เธอสนุกกับการลองชิมอาหารใหม่ๆ' },
      { en: 'We need to book a table for tonight.', th: 'เราต้องจองโต๊ะสำหรับคืนนี้' },
      { en: 'I avoid eating too much fast food.', th: 'ฉันหลีกเลี่ยงการกินฟาสต์ฟู้ดมากเกินไป' }
    ]
  },
  {
    category: 'Making Dining Requests',
    thai: 'ตัวอย่างการขอร้องในร้านอาหาร',
    sentences: [
      { en: 'Could I have a glass of water, please?', th: 'ขอน้ำเปล่าแก้วนึงได้ไหมครับ/คะ' },
      { en: 'We are ready to order now.', th: 'พวกเราพร้อมที่จะสั่งอาหารแล้ว' },
      { en: 'I would like to pay by credit card.', th: 'ฉันต้องการจ่ายเงินด้วยบัตรเครดิต' }
    ]
  },
  {
    category: '-ing as Adjectives',
    thai: 'V-ing ที่ทำหน้าที่เป็นคำคุณศัพท์',
    sentences: [
      { en: 'The sizzling bacon smells wonderful.', th: 'เบคอนที่กำลังร้อนฉ่ามีกลิ่นหอมน่ากิน' },
      { en: 'This is a very satisfying meal.', th: 'นี่เป็นมื้ออาหารที่น่าพอใจมาก' },
      { en: 'The boring menu needs more options.', th: 'เมนูที่น่าเบื่อนี้ต้องการตัวเลือกเพิ่มเติม' }
    ]
  }
];

// --- 3. PRACTICE EXERCISES (Writing/Speaking) ---
const practiceExercises = [
  {
    title: 'Gerunds & Infinitives Practice',
    thai: 'ฝึกใช้ Gerunds และ Infinitives',
    instruction: 'Write 2 sentences about your food preferences. Use one gerund and one infinitive.',
    example: 'Example: "I love eating dessert. I want to try the chocolate cake."',
    tips: [
      'Use verbs like "love, enjoy, hate" + V-ing',
      'Use verbs like "want, need, plan" + to-infinitive'
    ]
  },
  {
    title: 'Making a Request Practice',
    thai: 'ฝึกการขอร้องในร้านอาหาร',
    instruction: 'Write a polite request you would make at a restaurant.',
    example: 'Example: "Could we have some more bread, please?"',
    tips: [
      'Use "I would like to..." or "Could I have..."',
      'Always add "please" to be polite'
    ]
  },
  {
    title: 'Speaking: Describe Your Favorite Meal',
    thai: 'พูด: อธิบายมื้ออาหารที่คุณชอบ',
    instruction: 'Describe your favorite meal to cook or eat. Use at least one gerund, one infinitive, and one -ing adjective.',
    example: "Example: \"I enjoy cooking pasta. The boiling water means it's almost ready. I hope to make it for my friends soon.\"",
    tips: [
      'Start with "I like cooking/eating..."',
      'Describe the food with an -ing adjective (sizzling, amazing, satisfying)',
      'Mention something you want to do (infinitive)'
    ]
  }
];

// --- 4. READING PASSAGE ---
const readingText = `Last night, my friends and I decided to try the new Italian restaurant downtown. I love eating Italian food, so I was excited. The restaurant had a charming atmosphere. We started with some amazing garlic bread. For the main course, I chose to order the lasagna, and it was delicious. My friends enjoyed trying the seafood pasta. The service was excellent, and we plan to go back again soon.`;

// --- 5. LISTENING EXERCISE ---
const listeningExercise = {
  title: 'Ordering at a Restaurant',
  audio: `Waiter: Welcome! Are you ready to order? 
Customer: Yes, I would like to have the chicken soup to start. 
Waiter: Excellent choice. And for your main course? 
Customer: I can't decide between the steak and the fish. I usually avoid eating red meat.
Waiter: The grilled fish is a very satisfying dish. I suggest trying it.
Customer: Okay, I will have the fish. Thank you.`,
  questions: [
    {
      question: 'What does the customer want to have first?',
      options: ['Steak', 'Fish', 'Chicken soup', 'Salad'],
      correct: 2,
      explanation: 'The customer says "I would like to have the chicken soup to start."'
    },
    {
      question: 'What food does the customer usually avoid?',
      options: ['Chicken', 'Fish', 'Soup', 'Red meat'],
      correct: 3,
      explanation: 'The customer says "I usually avoid eating red meat."'
    },
    {
      question: 'What does the waiter suggest?',
      options: ['Trying the steak', 'Trying the fish', 'Ordering a dessert', 'Drinking some wine'],
      correct: 1,
      explanation: 'The waiter says "I suggest trying it (the fish)."'
    }
  ]
};

// --- 6. QUIZ (GRAMMAR & USAGE) ---
const quizQuestions = [
  {
    question: 'Which sentence uses a gerund as the subject?',
    options: [
      'I am cooking.',
      'Cooking is a useful skill.',
      'I want to cook.',
      'A cooking show.'
    ],
    correct: 1,
    explanation: '"Cooking" is the subject of the sentence, acting as a noun.'
  },
  {
    question: 'Choose the correct form: "I hope ___ you at the party."',
    options: [
      'seeing',
      'to see',
      'see',
      'to seeing'
    ],
    correct: 1,
    explanation: 'The verb "hope" is followed by an infinitive (to + verb).'
  },
  {
    question: 'Which sentence is a polite dining request?',
    options: [
      'Give me the menu.',
      'I want food now.',
      'Where is the waiter?',
      'Could I have some water, please?'
    ],
    correct: 3,
    explanation: '"Could I have..." is a polite structure for making requests.'
  },
  {
    question: 'In "The dessert was disappointing," what is "disappointing"?',
    options: [
      'A gerund',
      'A continuous verb',
      'An adjective',
      'A noun'
    ],
    correct: 2,
    explanation: '"Disappointing" is an -ing adjective describing the noun "dessert".'
  },
  {
    question: 'Choose the correct verb: "He avoids ___ unhealthy snacks."',
    options: [
      'to eat',
      'eats',
      'eating',
      'is eating'
    ],
    correct: 2,
    explanation: 'The verb "avoid" is followed by a gerund (verb + -ing).'
  }
];

export default function Lesson3() {
  // --- States ---
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentSection, setCurrentSection] = useState('guidelines');
  const [showListeningAnswer, setShowListeningAnswer] = useState(Array(listeningExercise.questions.length).fill(false));
  const [showQuizAnswer, setShowQuizAnswer] = useState(false);

  // --- AUDIO ---
  const playAudio = (text) => {
    try {
      Speech.speak(text, {
        language: 'en-US',
        rate: 0.75,
        pitch: 1.0,
      });
    } catch (error) {
      Alert.alert('Audio Error', 'Unable to play audio. Please try again.');
    }
  };

  // --- QUIZ HANDLING ---
  const handleQuizAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowQuizAnswer(true);
    setTimeout(() => {
      if (answerIndex === quizQuestions[currentQuiz].correct) {
        setScore((s) => s + 1);
      }
      if (currentQuiz < quizQuestions.length - 1) {
        setTimeout(() => {
          setCurrentQuiz((prev) => prev + 1);
          setSelectedAnswer(null);
          setShowQuizAnswer(false);
        }, 800);
      } else {
        setTimeout(() => {
          setQuizCompleted(true);
        }, 800);
      }
    }, 900);
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setScore(0);
    setSelectedAnswer(null);
    setQuizCompleted(false);
    setShowQuizAnswer(false);
  };

  // --- RENDERERs ---
  const renderGuidelines = () => (
    <View>
      <Text style={styles.sectionTitle}>✨ Grammar Guidelines - หลักไวยากรณ์</Text>
      {diningGrammarGuidelines.map((guide, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.guideTitle}>{guide.title} <Text style={{ color: '#F472B6' }}>({guide.thai})</Text></Text>
          {guide.content.map((item, i) => (
            <Text key={i} style={styles.guideItem}>• {item}</Text>
          ))}
        </View>
      ))}
    </View>
  );

  const renderExamples = () => (
    <View>
      <Text style={styles.sectionTitle}>📝 Examples - ตัวอย่างประโยค</Text>
      {examples.map((ex, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.categoryTitle}>{ex.category} <Text style={{ color: '#F472B6' }}>({ex.thai})</Text></Text>
          {ex.sentences.map((s, i) => (
            <View key={i} style={styles.sentenceRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.english}>{s.en}</Text>
                <Text style={styles.thai}>{s.th}</Text>
              </View>
              <TouchableOpacity
                onPress={() => playAudio(s.en)}
                style={styles.audioButton}>
                <Text style={styles.audioIcon}>🔊</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}
    </View>
  );

  const renderPractice = () => (
    <View>
      <Text style={styles.sectionTitle}>✍️ Practice Exercises - แบบฝึกหัด</Text>
      {practiceExercises.map((exercise, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.exerciseTitle}>{exercise.title} <Text style={{ color: '#F472B6' }}>({exercise.thai})</Text></Text>
          <Text style={styles.instruction}>{exercise.instruction}</Text>
          <View style={styles.exampleBox}>
            <Text style={styles.exampleLabel}>Example:</Text>
            <Text style={styles.exampleText}>{exercise.example}</Text>
          </View>
          <Text style={styles.tipsLabel}>Tips:</Text>
          {exercise.tips.map((tip, i) => (
            <Text key={i} style={styles.tipItem}>• {tip}</Text>
          ))}
        </View>
      ))}
      <View style={styles.motivationBox}>
        <Text style={styles.motivation}>🌟 Tip: Practice speaking out loud or write your answers in your notebook!</Text>
      </View>
    </View>
  );

  // --- Main Return ---
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* HEADER */}
      <View style={styles.headerGradient}>
        <Text style={styles.title}>🍳 Dining & Cooking</Text>
        <Text style={styles.subtitle}>Gerunds • Infinitives • Dining Requests • Cooking</Text>
      </View>
      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        {[
          { key: 'guidelines', label: 'Guidelines', icon: '📚' },
          { key: 'examples', label: 'Examples', icon: '📝' },
          { key: 'practice', label: 'Practice', icon: '✍️' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, currentSection === tab.key && styles.activeTab]}
            onPress={() => setCurrentSection(tab.key)}
          >
            <Text style={[styles.tabText, currentSection === tab.key && styles.activeTabText]}>
              {tab.icon} {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Reading Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📖 Restaurant Review</Text>
        <Text style={styles.reading}>{readingText}</Text>
        <TouchableOpacity onPress={() => playAudio(readingText)} style={styles.playAllButton}>
          <Text style={styles.playAllText}>🔊 Play Audio</Text>
        </TouchableOpacity>
      </View>

      {/* Section Switcher */}
      {currentSection === 'guidelines' && renderGuidelines()}
      {currentSection === 'examples' && renderExamples()}
      {currentSection === 'practice' && renderPractice()}

      {/* Listening Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🎧 Listening: Ordering at a Restaurant</Text>
        <TouchableOpacity onPress={() => playAudio(listeningExercise.audio)} style={styles.playAllButton}>
          <Text style={styles.playAllText}>🔊 Play Listening Audio</Text>
        </TouchableOpacity>
        <Text style={styles.reading}>{listeningExercise.audio}</Text>
        {listeningExercise.questions.map((q, i) => (
          <View key={i} style={styles.listeningBox}>
            <Text style={styles.exerciseTitle}>{i + 1}. {q.question}</Text>
            {q.options.map((opt, idx) => (
              <Text key={idx} style={styles.tipItem}>{String.fromCharCode(65 + idx)}. {opt}</Text>
            ))}
            <TouchableOpacity
              style={styles.showAnswerBtn}
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setShowListeningAnswer((old) => {
                  const n = [...old];
                  n[i] = !n[i];
                  return n;
                });
              }}>
              <Text style={styles.showAnswerText}>
                {showListeningAnswer[i] ? 'Hide' : 'Show'} Answer
              </Text>
            </TouchableOpacity>
            {showListeningAnswer[i] && (
              <View style={styles.answerBox}>
                <Text style={styles.answerText}>
                  <Text style={{ fontWeight: 'bold', color: '#22C55E' }}>
                    {String.fromCharCode(65 + q.correct)}
                  </Text> - {q.explanation}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Quiz Section */}
      <TouchableOpacity style={styles.quizButton} onPress={() => setShowQuiz(true)}>
        <Text style={styles.buttonText}>🎯 Take Quiz - ทำแบบทดสอบ</Text>
      </TouchableOpacity>

      {showQuiz && (
        <View style={styles.quizContainer}>
          {quizCompleted ? (
            <View style={styles.resultsContainer}>
              <Text style={styles.resultText}>✅ Score: {score}/{quizQuestions.length}</Text>
              <Text style={styles.percentageText}>
                ({Math.round((score / quizQuestions.length) * 100)}%)
              </Text>
              {score >= 4 && <Text style={styles.excellentText}>🎉 Excellent! You're a grammar chef!</Text>}
              {score === 3 && <Text style={styles.goodText}>👍 Good job! Review and practice more.</Text>}
              {score <= 2 && <Text style={styles.needsWork}>📚 Keep practicing! You can do it!</Text>}

              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={resetQuiz} style={styles.retakeButton}>
                  <Text style={styles.buttonText}>🔄 Retake Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowQuiz(false)} style={styles.backButton}>
                  <Text style={styles.buttonText}>📚 Back to Lesson</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <Text style={styles.progressText}>
                Progress: {currentQuiz + 1}/{quizQuestions.length}
              </Text>
              <View style={styles.progressBar}>
                <View style={[
                  styles.progressFill,
                  { width: `${((currentQuiz + 1) / quizQuestions.length) * 100}%` }
                ]} />
              </View>
              <Text style={styles.questionText}>Question {currentQuiz + 1}: {quizQuestions[currentQuiz].question}</Text>
              {quizQuestions[currentQuiz].options.map((opt, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => handleQuizAnswer(idx)}
                  style={[
                    styles.option,
                    selectedAnswer === idx && (
                      idx === quizQuestions[currentQuiz].correct
                        ? styles.correctOption
                        : styles.incorrectOption
                    )
                  ]}
                  disabled={selectedAnswer !== null}
                >
                  <Text style={[
                    styles.optionText,
                    selectedAnswer === idx && styles.selectedOptionText
                  ]}>
                    {String.fromCharCode(65 + idx)}. {opt}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.showAnswerBtn}
                onPress={() => setShowQuizAnswer((v) => !v)}
                disabled={selectedAnswer === null}
              >
                <Text style={[
                  styles.showAnswerText,
                  { opacity: selectedAnswer === null ? 0.5 : 1 }
                ]}>
                  {showQuizAnswer ? 'Hide' : 'Show'} Explanation
                </Text>
              </TouchableOpacity>
              {showQuizAnswer && selectedAnswer !== null && (
                <View style={styles.answerBox}>
                  <Text style={styles.resultIcon}>
                    {selectedAnswer === quizQuestions[currentQuiz].correct
                      ? "✅ Correct!"
                      : "❌ Incorrect"}
                  </Text>
                  <Text style={styles.explanationText}>
                    {quizQuestions[currentQuiz].explanation}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

// --- STYLE (modern pastel & shadow) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9FF',
    padding: 16,
  },
  headerGradient: {
    backgroundColor: '#FDF2F8',
    borderRadius: 16,
    paddingVertical: 22,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#F472B6',
    shadowOpacity: 0.13,
    shadowRadius: 16,
    elevation: 4,
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#BE185D',
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6B7280',
    fontStyle: 'italic',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#F472B6',
    shadowOpacity: 0.09,
    shadowRadius: 7,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 13,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#F472B6',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 17,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 13,
    textAlign: 'center',
  },
  reading: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 24,
    textAlign: 'justify',
  },
  playAllButton: {
    backgroundColor: '#E0F2FE',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  playAllText: {
    color: '#0369A1',
    fontWeight: '600',
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#BE185D',
    marginBottom: 10,
  },
  guideItem: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 6,
    paddingLeft: 10,
    lineHeight: 20,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 12,
  },
  sentenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  english: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '500',
  },
  thai: {
    fontSize: 14,
    color: '#6B7280',
  },
  audioButton: {
    marginLeft: 10,
    padding: 6,
    backgroundColor: '#F0F9FF',
    borderRadius: 8,
  },
  audioIcon: {
    fontSize: 20,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 6,
  },
  instruction: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 6,
  },
  exampleBox: {
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
  },
  exampleLabel: {
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 4,
  },
  exampleText: {
    fontSize: 14,
    color: '#374151',
  },
  tipsLabel: {
    marginTop: 8,
    fontWeight: 'bold',
    color: '#1E40AF',
  },
  tipItem: {
    fontSize: 13,
    color: '#4B5563',
    marginLeft: 8,
    marginTop: 2,
  },
  quizButton: {
    marginTop: 17,
    backgroundColor: '#F59E0B',
    padding: 13,
    borderRadius: 11,
    alignItems: 'center',
    shadowColor: '#F59E0B',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quizContainer: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  option: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginBottom: 10,
  },
  correctOption: {
    backgroundColor: '#D1FAE5',
    borderColor: '#10B981',
  },
  incorrectOption: {
    backgroundColor: '#FECACA',
    borderColor: '#DC2626',
  },
  optionText: {
    fontSize: 15,
    color: '#111827',
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
  showAnswerBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E7FF',
    borderRadius: 7,
    marginTop: 4,
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  showAnswerText: {
    color: '#3730A3',
    fontWeight: 'bold',
    fontSize: 15,
  },
  answerBox: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
  },
  answerText: {
    color: '#334155',
    fontSize: 15,
  },
  resultIcon: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1D4ED8',
    marginBottom: 4,
  },
  explanationText: {
    fontSize: 14,
    color: '#374151',
  },
  listeningBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 9,
    marginVertical: 7,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 1,
  },
  resultsContainer: {
    alignItems: 'center',
    padding: 20,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E40AF',
  },
  percentageText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#4B5563',
  },
  excellentText: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: 'bold',
  },
  goodText: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: 'bold',
  },
  needsWork: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
  },
  retakeButton: {
    backgroundColor: '#4ADE80',
    padding: 10,
    borderRadius: 10,
  },
  backButton: {
    backgroundColor: '#60A5FA',
    padding: 10,
    borderRadius: 10,
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  progressBar: {
    height: 10,
    width: '100%',
    backgroundColor: '#E5E7EB',
    borderRadius: 5,
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 5,
  },
  motivationBox: {
    marginTop: 8,
    backgroundColor: '#FDF6B2',
    borderRadius: 9,
    padding: 10,
    borderColor: '#FBBF24',
    borderWidth: 1,
  },
  motivation: {
    color: '#B45309',
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
  },
});
