// Lesson3.js - Personality & Relative Clauses (Defining/Non-defining)

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import * as Speech from 'expo-speech';

const { width } = Dimensions.get('window');

export default function Lesson3() {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentSection, setCurrentSection] = useState('guidelines');
  const [showListening, setShowListening] = useState(false);
  const [showSpeaking, setShowSpeaking] = useState(false);
  const [showWriting, setShowWriting] = useState(false);
  const [writingText, setWritingText] = useState('');
  const [listeningAnswers, setListeningAnswers] = useState([]);
  const [listeningCompleted, setListeningCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Guidelines (Grammar Focus)
  const writingGuidelines = [
    {
      title: 'Defining Relative Clauses',
      thai: 'อนุประโยคขยายนามที่จำเป็น (ไม่ใส่ comma)',
      content: [
        'ให้ข้อมูลสำคัญที่ช่วยระบุว่าพูดถึงใคร/อะไร',
        'ใช้ who, that, which, whose, where, when',
        'ไม่มี comma คั่น',
        'เช่น: The student **who works hard** always succeeds.'
      ]
    },
    {
      title: 'Non-defining Relative Clauses',
      thai: 'อนุประโยคขยายนามที่ไม่จำเป็น (ใส่ comma)',
      content: [
        'ให้ข้อมูลเสริมเพิ่มเติม (ไม่สำคัญต่อการระบุ)',
        'ใช้ who, which, whose, where (แต่ไม่ใช้ that)',
        'ต้องมี comma คั่นหน้า-หลัง',
        'เช่น: My sister, **who is very optimistic**, always encourages me.'
      ]
    }
  ];

  // ตัวอย่าง personality (ครอบคลุม relative clauses)
  const examples = [
    {
      category: 'Defining Relative Clauses',
      thai: 'อนุประโยคขยายนามที่จำเป็น',
      sentences: [
        { 
          en: 'A person who is honest earns everyone’s trust.',
          th: 'คนที่ซื่อสัตย์จะได้รับความไว้วางใจจากทุกคน'
        },
        { 
          en: 'The friend that always listens to you is a true friend.',
          th: 'เพื่อนที่คอยรับฟังเสมอคือเพื่อนแท้'
        },
        {
          en: 'Employees who are responsible are valuable to their companies.',
          th: 'พนักงานที่มีความรับผิดชอบเป็นทรัพยากรสำคัญของบริษัท'
        }
      ]
    },
    {
      category: 'Non-defining Relative Clauses',
      thai: 'อนุประโยคขยายนามที่ไม่จำเป็น',
      sentences: [
        { 
          en: 'Mr. Park, who is extremely patient, never gets angry at his students.',
          th: 'คุณปาร์คซึ่งใจเย็นมาก ไม่เคยโกรธนักเรียนเลย'
        },
        { 
          en: 'Sarah, whose kindness inspires many people, volunteers every weekend.',
          th: 'ซาร่าซึ่งความใจดีของเธอสร้างแรงบันดาลใจให้หลายคน มักเป็นอาสาสมัครทุกสัปดาห์'
        },
        {
          en: 'My father, who loves reading, has a large book collection.',
          th: 'พ่อของฉันซึ่งรักการอ่านมาก มีหนังสือสะสมจำนวนมาก'
        }
      ]
    },
    {
      category: 'Useful Adjectives',
      thai: 'คำคุณศัพท์บรรยายบุคลิกภาพ',
      sentences: [
        { en: 'optimistic', th: 'มองโลกในแง่ดี' },
        { en: 'reliable', th: 'น่าเชื่อถือ' },
        { en: 'generous', th: 'ใจกว้าง' },
        { en: 'diligent', th: 'ขยัน' },
        { en: 'sociable', th: 'เข้ากับคนง่าย' },
        { en: 'creative', th: 'มีความคิดสร้างสรรค์' }
      ]
    }
  ];

  // Listening Exercise (แบบฝึกฟัง)
  const listeningExercise = {
    audio: `Listen:  
Sarah, who is always cheerful, greets everyone with a big smile. The teacher, who loves creative students, praised Mark, whose drawing was the most original in the class. Students who help their classmates are appreciated by the teacher.`,
    questions: [
      {
        question: 'What is Sarah\'s personality trait?',
        options: ['Shy', 'Cheerful', 'Serious', 'Lazy'],
        correct: 1,
        explanation: 'The passage says Sarah is always cheerful.'
      },
      {
        question: 'Why did the teacher praise Mark?',
        options: ['Because he was late', 'His drawing was original', 'He helped others', 'He was quiet'],
        correct: 1,
        explanation: 'Mark was praised for having the most original drawing.'
      },
      {
        question: 'Which students are appreciated by the teacher?',
        options: ['Those who help classmates', 'Those who are quiet', 'Those who arrive late', 'Those who forget homework'],
        correct: 0,
        explanation: 'Students who help their classmates are appreciated by the teacher.'
      }
    ]
  };

  // Speaking Practice
  const speakingSentences = [
    "My mother, who is very kind, helps anyone in need.",
    "People who never give up are admired by everyone.",
    "A diligent student, who always does homework, usually gets good grades.",
    "My best friend, whose patience is amazing, rarely gets angry.",
    "A leader who listens to others is respected by the team."
  ];
  const [practiceSentence, setPracticeSentence] = useState(speakingSentences[0]);

  // Writing Sample
  const writingSample = [
    "My classmate, who is honest, is trusted by everyone.",
    "People who are generous usually have many friends.",
    "Mr. Smith, whose lessons are interesting, makes English fun.",
    "Students who help others are praised by teachers.",
    "My aunt, who is very sociable, loves meeting new people."
  ];

  // Reading Section
  const readingText = `People's personalities, qualities, and characteristics shape how they interact with others. Defining and non-defining relative clauses are often used to describe people. For example, "A person who is generous always shares what they have." This sentence uses a defining relative clause to specify which person. On the other hand, "My uncle, who is optimistic, encourages everyone around him," uses a non-defining clause to add extra information about 'my uncle'. Understanding how to use these clauses will help you describe people more accurately and naturally.`;

  // Quiz (Grammar + Vocabulary)
  const quizQuestions = [
    {
      question: 'Which sentence is a defining relative clause?',
      options: [
        "My father, who likes sports, plays tennis every weekend.",
        "The student who studies hard will pass the exam.",
        "Sarah, who is generous, donated money.",
        "My friend, who is creative, drew a beautiful picture."
      ],
      correct: 1,
      explanation: 'Only option 2 (The student who studies hard...) is defining (no comma, specifies which student).'
    },
    {
      question: 'Which word CANNOT be used in a non-defining relative clause?',
      options: [
        'who',
        'whose',
        'that',
        'which'
      ],
      correct: 2,
      explanation: 'Non-defining clauses never use "that".'
    },
    {
      question: 'Choose the best adjective: "Someone who is _____ always tells the truth."',
      options: [
        'optimistic',
        'honest',
        'lazy',
        'impatient'
      ],
      correct: 1,
      explanation: '"Honest" means telling the truth.'
    },
    {
      question: 'Which sentence is correct?',
      options: [
        "The boy which won the prize is my cousin.",
        "The girl that is smiling is my sister.",
        "My teacher, that is strict, is very smart.",
        "The student who homework is late will be punished."
      ],
      correct: 1,
      explanation: 'Option 2 uses "that" for a defining clause. The others are incorrect for grammar or relative pronoun.'
    },
    {
      question: 'What is the function of non-defining relative clauses?',
      options: [
        'To give essential information',
        'To give extra (non-essential) information',
        'To show the main idea',
        'To start a new paragraph'
      ],
      correct: 1,
      explanation: 'Non-defining clauses give extra, not essential, info and use commas.'
    }
  ];

  // ฟัง/อ่าน/พูด/เขียน: 4 ทักษะ (Listening, Speaking, Reading, Writing)
  const [showListeningModal, setShowListeningModal] = useState(false);
  const [showSpeakingModal, setShowSpeakingModal] = useState(false);
  const [showWritingModal, setShowWritingModal] = useState(false);
  const [showReadingModal, setShowReadingModal] = useState(false);

  // TTS
  const playAudio = (text) => {
    setIsLoading(true);
    Speech.speak(text, {
      language: 'en-US',
      rate: 0.75,
      pitch: 1.0,
      onDone: () => setIsLoading(false),
      onError: () => setIsLoading(false),
    });
  };

  // Quiz Handling
  const handleQuizAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setTimeout(() => {
      if (answerIndex === quizQuestions[currentQuiz].correct) {
        setScore(score + 1);
      }
      if (currentQuiz < quizQuestions.length - 1) {
        setCurrentQuiz(currentQuiz + 1);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
      }
    }, 1200);
  };
  const resetQuiz = () => {
    setCurrentQuiz(0);
    setScore(0);
    setSelectedAnswer(null);
    setQuizCompleted(false);
  };

  // Listening Answer
  const handleListeningAnswer = (ansIdx, qIdx) => {
    const answers = [...listeningAnswers];
    answers[qIdx] = ansIdx;
    setListeningAnswers(answers);
    if (
      answers.length === listeningExercise.questions.length &&
      answers.every(a => a !== undefined)
    ) {
      setListeningCompleted(true);
    }
  };

  // Speaking: random sentence
  const getRandomSentence = () => {
    const idx = Math.floor(Math.random() * speakingSentences.length);
    setPracticeSentence(speakingSentences[idx]);
  };

  // Writing feedback
  const sentences = writingText.trim().split(/[.!?]+/).filter(s => s.trim().length > 0);
  const definingRegex = /\bwho|that|which\b/;
  const nonDefiningRegex = /\bwho|which|whose\b.*\,/;
  let feedback = '';
  if (!writingText.trim()) feedback = '';
  else if (sentences.length < 3) feedback = '❗️Write at least 3 sentences.';
  else feedback = '✅ Good job!';

  // Modal Components
  const ListeningModal = () => (
    <Modal visible={showListeningModal} animationType="slide">
      <ScrollView style={styles.modalContainer}>
        <Text style={styles.modalTitle}>🎧 Listening Practice</Text>
        <Text style={styles.instructionText}>
          Listen and answer the questions below.
        </Text>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => playAudio(listeningExercise.audio)}
          disabled={isLoading}
        >
          <Text style={styles.playButtonText}>{isLoading ? 'Loading...' : '🔊 Play Audio'}</Text>
        </TouchableOpacity>
        <Text style={styles.listeningText}>{listeningExercise.audio}</Text>
        {listeningExercise.questions.map((q, i) => (
          <View key={i} style={styles.questionBlock}>
            <Text style={styles.questionText}>{i + 1}. {q.question}</Text>
            {q.options.map((opt, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.optionBtn,
                  listeningAnswers[i] === idx && (idx === q.correct ? styles.correctOption : styles.incorrectOption)
                ]}
                onPress={() => handleListeningAnswer(idx, i)}
                disabled={listeningAnswers[i] !== undefined}
              >
                <Text style={[
                  styles.optionText,
                  listeningAnswers[i] === idx && styles.selectedOptionText
                ]}>
                  {String.fromCharCode(65 + idx)}. {opt}
                </Text>
              </TouchableOpacity>
            ))}
            {listeningAnswers[i] !== undefined && (
              <Text style={styles.explanationText}>
                {listeningAnswers[i] === q.correct ? '✅' : '❌'} {q.explanation}
              </Text>
            )}
          </View>
        ))}
        {listeningCompleted && (
          <Text style={styles.completionText}>🎉 Listening Complete!</Text>
        )}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            setShowListeningModal(false);
            setListeningAnswers([]);
            setListeningCompleted(false);
          }}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );

  const SpeakingModal = () => (
    <Modal visible={showSpeakingModal} animationType="slide">
      <ScrollView style={styles.modalContainer}>
        <Text style={styles.modalTitle}>🎤 Speaking Practice</Text>
        <Text style={styles.promptText}>
          Try to say the following sentence aloud. Tap "New Sentence" for more!
        </Text>
        <View style={styles.practiceSentenceBox}>
          <Text style={styles.practiceSentenceText}>{practiceSentence}</Text>
          <TouchableOpacity
            style={styles.speakButton}
            onPress={() => playAudio(practiceSentence)}
            disabled={isLoading}
          >
            <Text style={styles.speakButtonText}>{isLoading ? 'Loading...' : '🔊 Listen'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.skillButton}
          onPress={getRandomSentence}
        >
          <Text style={styles.skillButtonText}>New Sentence</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setShowSpeakingModal(false)}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );

  const WritingModal = () => (
    <Modal visible={showWritingModal} animationType="slide">
      <ScrollView style={styles.modalContainer}>
        <Text style={styles.modalTitle}>✍️ Writing Practice</Text>
        <Text style={styles.promptText}>
          Write at least 3 sentences describing people you know using relative clauses (defining or non-defining).
        </Text>
        <TextInput
          style={styles.writingInput}
          multiline
          placeholder="Write here..."
          onChangeText={setWritingText}
          value={writingText}
        />
        <Text style={styles.wordCountText}>Sentences: {sentences.length}</Text>
        <Text style={feedback.startsWith('✅') ? styles.correctText : styles.incorrectText}>{feedback}</Text>
        <Text style={styles.sectionLabel}>Sample Sentences:</Text>
        {writingSample.map((ex, i) => (
          <Text key={i} style={styles.exampleText}>{ex}</Text>
        ))}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setShowWritingModal(false)}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );

  const ReadingModal = () => (
    <Modal visible={showReadingModal} animationType="slide">
      <ScrollView style={styles.modalContainer}>
        <Text style={styles.modalTitle}>📖 Reading</Text>
        <Text style={styles.readingText}>{readingText}</Text>
        <TouchableOpacity
          style={styles.speakButton}
          onPress={() => playAudio(readingText)}
          disabled={isLoading}
        >
          <Text style={styles.speakButtonText}>{isLoading ? 'Loading...' : '🔊 Listen'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setShowReadingModal(false)}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );

  // Content Renderers
  const renderGuidelines = () => (
    <View>
      <Text style={styles.sectionTitle}>📋 Grammar Focus</Text>
      {writingGuidelines.map((guide, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.guideTitle}>{guide.title} - {guide.thai}</Text>
          {guide.content.map((item, i) => (
            <Text key={i} style={styles.guideItem}>• {item}</Text>
          ))}
        </View>
      ))}
    </View>
  );
  const renderExamples = () => (
    <View>
      <Text style={styles.sectionTitle}>📝 Examples & Adjectives</Text>
      {examples.map((ex, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.categoryTitle}>{ex.category} - {ex.thai}</Text>
          {ex.sentences.map((s, i) => (
            <View key={i} style={styles.sentenceRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.english}>{s.en}</Text>
                <Text style={styles.thai}>{s.th}</Text>
              </View>
              <TouchableOpacity onPress={() => playAudio(s.en)} style={styles.audioButton}>
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
      <Text style={styles.sectionTitle}>✍️ Practice Exercises</Text>
      <View style={styles.card}>
        <Text style={styles.exerciseTitle}>Writing Task</Text>
        <Text style={styles.instruction}>
          Write at least 3 sentences describing personalities using defining and non-defining relative clauses.
        </Text>
        <View style={styles.exampleBox}>
          <Text style={styles.exampleLabel}>Example:</Text>
          <Text style={styles.exampleText}>People who are optimistic always look on the bright side.</Text>
          <Text style={styles.exampleText}>My aunt, who is very generous, always shares her food.</Text>
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.exerciseTitle}>Speaking Practice</Text>
        <Text style={styles.instruction}>
          Say a sentence using a relative clause to describe a person you admire.
        </Text>
        <Text style={styles.exampleText}>E.g. "My best friend, who is reliable, always supports me."</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.exerciseTitle}>Listening Practice</Text>
        <Text style={styles.instruction}>
          Listen to descriptions and identify the personality trait or grammar structure.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.exerciseTitle}>Reading Practice</Text>
        <Text style={styles.instruction}>
          Read the passage about describing people and answer questions (see Quiz).
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
      <Text style={styles.title}>🧑‍🎓 Personality, Qualities, Characteristics</Text>
      <Text style={styles.subtitle}>Defining & Non-defining Relative Clauses</Text>

      {/* Skill Practice Buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab]} onPress={() => setShowListeningModal(true)}>
          <Text style={styles.tabText}>Listening</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab]} onPress={() => setShowReadingModal(true)}>
          <Text style={styles.tabText}>Reading</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab]} onPress={() => setShowSpeakingModal(true)}>
          <Text style={styles.tabText}>Speaking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab]} onPress={() => setShowWritingModal(true)}>
          <Text style={styles.tabText}>Writing</Text>
        </TouchableOpacity>
      </View>
      {/* Grammar & Example Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, currentSection === 'guidelines' && styles.activeTab]}
          onPress={() => setCurrentSection('guidelines')}
        >
          <Text style={[styles.tabText, currentSection === 'guidelines' && styles.activeTabText]}>Grammar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, currentSection === 'examples' && styles.activeTab]}
          onPress={() => setCurrentSection('examples')}
        >
          <Text style={[styles.tabText, currentSection === 'examples' && styles.activeTabText]}>Examples</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, currentSection === 'practice' && styles.activeTab]}
          onPress={() => setCurrentSection('practice')}
        >
          <Text style={[styles.tabText, currentSection === 'practice' && styles.activeTabText]}>Practice</Text>
        </TouchableOpacity>
      </View>

      {/* Reading Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📖 Reading</Text>
        <Text style={styles.reading}>{readingText}</Text>
        <TouchableOpacity onPress={() => playAudio(readingText)} style={styles.playAllButton}>
          <Text style={styles.playAllText}>🔊 Listen</Text>
        </TouchableOpacity>
      </View>

      {currentSection === 'guidelines' && renderGuidelines()}
      {currentSection === 'examples' && renderExamples()}
      {currentSection === 'practice' && renderPractice()}

      {/* Quiz Section */}
      <TouchableOpacity style={styles.quizButton} onPress={() => setShowQuiz(true)}>
        <Text style={styles.buttonText}>🎯 Take Quiz</Text>
      </TouchableOpacity>
      {showQuiz && (
        <View style={styles.quizContainer}>
          {quizCompleted ? (
            <View style={styles.resultsContainer}>
              <Text style={styles.resultText}>✅ Score: {score}/{quizQuestions.length}</Text>
              <Text style={styles.percentageText}>({Math.round((score/quizQuestions.length)*100)}%)</Text>
              <TouchableOpacity onPress={resetQuiz} style={styles.retakeButton}>
                <Text style={styles.buttonText}>🔄 Retake Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowQuiz(false)} style={styles.backButton}>
                <Text style={styles.buttonText}>📚 Back to Lesson</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text style={styles.progressText}>Progress: {currentQuiz + 1}/{quizQuestions.length}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${((currentQuiz + 1) / quizQuestions.length) * 100}%` }]} />
              </View>
              <Text style={styles.questionText}>Q{currentQuiz + 1}: {quizQuestions[currentQuiz].question}</Text>
              {quizQuestions[currentQuiz].options.map((opt, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => handleQuizAnswer(idx)}
                  style={[
                    styles.option,
                    selectedAnswer === idx && (idx === quizQuestions[currentQuiz].correct ? styles.correctOption : styles.incorrectOption)
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
              {selectedAnswer !== null && (
                <View style={styles.explanationBox}>
                  <Text style={styles.resultIcon}>
                    {selectedAnswer === quizQuestions[currentQuiz].correct ? "✅ Correct!" : "❌ Incorrect"}
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

      {/* Skill Modals */}
      <ListeningModal />
      <SpeakingModal />
      <WritingModal />
      <ReadingModal />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F9FF', padding: 20, },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#3B82F6', marginBottom: 2, },
  subtitle: { fontSize: 16, textAlign: 'center', color: '#6B7280', fontStyle: 'italic', marginBottom: 18, },
  tabContainer: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 10, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 5, elevation: 2, },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 10, },
  activeTab: { backgroundColor: '#3B82F6', },
  tabText: { fontSize: 14, fontWeight: '600', color: '#6B7280', },
  activeTabText: { color: '#FFFFFF', },
  card: { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 16, marginBottom: 13, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 3, elevation: 1, },
  sectionTitle: { fontSize: 19, fontWeight: 'bold', color: '#3B82F6', marginBottom: 11, textAlign: 'center', },
  reading: { fontSize: 15, color: '#374151', lineHeight: 22, textAlign: 'justify', },
  playAllButton: { backgroundColor: '#E0F2FE', padding: 8, borderRadius: 8, alignItems: 'center', marginTop: 8, },
  playAllText: { color: '#0369A1', fontWeight: '600', },
  guideTitle: { fontSize: 17, fontWeight: 'bold', color: '#BE185D', marginBottom: 8, },
  guideItem: { fontSize: 14, color: '#4B5563', marginBottom: 5, paddingLeft: 10, lineHeight: 18, },
  categoryTitle: { fontSize: 15, fontWeight: 'bold', color: '#3B82F6', marginBottom: 10, },
  sentenceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingBottom: 7, borderBottomWidth: 1, borderBottomColor: '#F3F4F6', },
  english: { fontSize: 14, fontWeight: '500', color: '#1F2937', lineHeight: 20, },
  thai: { fontSize: 13, color: '#6B7280', marginTop: 2, lineHeight: 16, },
  audioButton: { padding: 6, marginLeft: 10, },
  audioIcon: { fontSize: 18, },
  exerciseTitle: { fontSize: 15, fontWeight: 'bold', color: '#BE185D', marginBottom: 7, },
  instruction: { fontSize: 13, color: '#374151', marginBottom: 8, fontStyle: 'italic', },
  exampleBox: { backgroundColor: '#F9FAFB', padding: 10, borderRadius: 8, marginBottom: 8, borderLeftWidth: 3, borderLeftColor: '#3B82F6', },
  exampleLabel: { fontSize: 13, fontWeight: 'bold', color: '#3B82F6', marginBottom: 3, },
  exampleText: { fontSize: 12, color: '#4B5563', lineHeight: 16, },
  quizButton: { backgroundColor: '#3B82F6', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 17, shadowColor: '#000', shadowOpacity: 0.09, shadowRadius: 5, elevation: 2, },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15, },
  quizContainer: { marginTop: 14, backgroundColor: '#FFFFFF', padding: 16, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 5, elevation: 2, },
  progressText: { fontSize: 13, color: '#6B7280', textAlign: 'center', marginBottom: 7, },
  progressBar: { height: 6, backgroundColor: '#E5E7EB', borderRadius: 3, marginBottom: 12, },
  progressFill: { height: '100%', backgroundColor: '#3B82F6', borderRadius: 3, },
  questionText: { fontSize: 15, fontWeight: 'bold', marginBottom: 13, color: '#1F2937', lineHeight: 20, },
  option: { padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 9, backgroundColor: '#F9FAFB', },
  correctOption: { backgroundColor: '#10B981', borderColor: '#10B981', },
  incorrectOption: { backgroundColor: '#EF4444', borderColor: '#EF4444', },
  optionText: { fontSize: 13, color: '#374151', lineHeight: 18, },
  selectedOptionText: { color: '#FFFFFF', fontWeight: '600', },
  explanationBox: { marginTop: 10, padding: 10, backgroundColor: '#F3F4F6', borderRadius: 8, borderLeftWidth: 3, borderLeftColor: '#6B7280', },
  resultIcon: { fontSize: 14, fontWeight: 'bold', marginBottom: 3, color: '#374151', },
  explanationText: { fontSize: 12, color: '#6B7280', lineHeight: 15, },
  resultsContainer: { alignItems: 'center', },
  resultText: { fontSize: 21, fontWeight: 'bold', textAlign: 'center', marginBottom: 3, color: '#1F2937', },
  percentageText: { fontSize: 15, color: '#6B7280', marginBottom: 11, },
  retakeButton: { backgroundColor: '#3B82F6', padding: 10, borderRadius: 8, alignItems: 'center', marginBottom: 10, },
  backButton: { backgroundColor: '#6B7280', padding: 12, borderRadius: 24, alignItems: 'center', marginVertical: 20, },
  backButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', },
  // Modal styles
  modalContainer: { flex: 1, backgroundColor: '#F0F9FF', padding: 20, },
  modalTitle: { fontSize: 23, fontWeight: 'bold', color: '#3B82F6', marginBottom: 17, textAlign: 'center', },
  instructionText: { fontSize: 14, color: '#374151', marginBottom: 12, textAlign: 'center', },
  listeningText: { fontSize: 14, color: '#374151', marginVertical: 15, },
  questionBlock: { backgroundColor: '#FFF', borderRadius: 8, padding: 11, marginBottom: 9, },
  questionText: { fontSize: 14, fontWeight: 'bold', color: '#1F2937', marginBottom: 7, },
  optionBtn: { backgroundColor: '#EBF5FB', padding: 10, borderRadius: 8, marginBottom: 5, borderWidth: 1, borderColor: '#A9CCE3', },
  correctOption: { backgroundColor: '#A7F3D0', borderColor: '#059669', },
  incorrectOption: { backgroundColor: '#FCA5A5', borderColor: '#DC2626', },
  wordCountText: { fontSize: 13, color: '#34495E', marginBottom: 4, textAlign: 'right', },
  correctText: { color: '#059669', fontWeight: 'bold', fontSize: 13, },
  incorrectText: { color: '#DC2626', fontWeight: 'bold', fontSize: 13, },
  writingInput: { minHeight: 110, borderColor: '#A9CCE3', borderWidth: 1, borderRadius: 10, padding: 12, fontSize: 14, backgroundColor: '#FFF', marginBottom: 10, },
  sectionLabel: { fontSize: 14, fontWeight: 'bold', color: '#34495E', marginTop: 9, marginBottom: 6, },
  practiceSentenceBox: { backgroundColor: '#E0F2FE', borderRadius: 10, padding: 19, marginVertical: 18, alignItems: 'center', },
  practiceSentenceText: { fontSize: 17, color: '#2563EB', marginBottom: 12, textAlign: 'center', },
  speakButton: { backgroundColor: '#A9CCE3', paddingVertical: 8, paddingHorizontal: 22, borderRadius: 19, marginTop: 8, },
  speakButtonText: { color: '#FFF', fontSize: 15, fontWeight: 'bold', },
  skillButton: { backgroundColor: '#3B82F6', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10, alignItems: 'center', marginVertical: 12, },
  skillButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 15, },
  completionText: { fontSize: 16, color: '#059669', textAlign: 'center', marginTop: 13, fontWeight: '600', },
});

