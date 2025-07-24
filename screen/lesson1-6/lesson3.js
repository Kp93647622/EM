import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Modal,
  StatusBar,
  Share,
} from 'react-native';
import * as Speech from 'expo-speech';

const { width } = Dimensions.get('window');

export default function Lesson3() {
  // STATE
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showListeningModal, setShowListeningModal] = useState(false);
  const [showSpeakingModal, setShowSpeakingModal] = useState(false);
  const [showWritingModal, setShowWritingModal] = useState(false);
  const [showReadingModal, setShowReadingModal] = useState(false);
  const [currentListening, setCurrentListening] = useState(0);
  const [currentReading, setCurrentReading] = useState(0);
  const [writingText, setWritingText] = useState('');
  const [listeningAnswers, setListeningAnswers] = useState([]);
  const [readingAnswers, setReadingAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.8);
  const [listeningCompleted, setListeningCompleted] = useState(false);
  const [readingCompleted, setReadingCompleted] = useState(false);

  // Speaking sentence state
  const speakingSentences = [
    "I have joined a cultural festival.",
    "She has never visited a temple before.",
    "We have seen a traditional Thai performance.",
    "They have learned about classical music.",
    "My family has experienced Songkran together.",
  ];
  const [practiceSentence, setPracticeSentence] = useState(speakingSentences[0]);

  // DATA
  const examples = [
    {
      category: 'Present Perfect - Cultural Experiences',
      thai: 'ประสบการณ์ทางวัฒนธรรม',
      icon: '🎭',
      color: '#FF6B6B',
      sentences: [
        { en: 'I have attended numerous cultural festivals throughout my life.', th: 'ฉันเคยเข้าร่วมงานเทศกาลวัฒนธรรมมากมายตลอดชีวิต' },
        { en: 'She has never experienced such an elaborate ceremony before.', th: 'เธอไม่เคยประสบพิธีกรรมที่วิจิตรขนาดนี้มาก่อน' },
        { en: 'Have you ever witnessed a traditional Khon performance?', th: 'คุณเคยเห็นการแสดงโขนแบบดั้งเดิมหรือไม่?' },
        { en: 'We have participated in various cultural exchange programs.', th: 'เราเคยเข้าร่วมโครงการแลกเปลี่ยนวัฒนธรรมต่างๆ' },
        { en: 'Thai artists have preserved traditional techniques for centuries.', th: 'ศิลปินไทยได้อนุรักษ์เทคนิคดั้งเดิมมาหลายศตวรรษ' },
      ],
    },
    {
      category: 'Present Perfect - Ongoing Cultural Preservation',
      thai: 'การอนุรักษ์วัฒนธรรมที่ยังคงดำเนินอยู่',
      icon: '🏮',
      color: '#4ECDC4',
      sentences: [
        { en: 'This ancient festival has been preserved for over five centuries.', th: 'เทศกาลโบราณนี้ได้รับการอนุรักษ์มาแล้วกว่า 5 ศตวรรษ' },
        { en: 'Thai classical dancers have maintained their artistic heritage meticulously.', th: 'นักเต้นไทยคลาสสิกได้รักษามรดกศิลปะอย่างพิถีพิถัน' },
        { en: 'The Royal Palace has hosted this ceremony annually since the Ayutthaya period.', th: 'พระราชวังจัดพิธีนี้เป็นประจำทุกปีตั้งแต่สมัยอยุธยา' },
        { en: 'Local artisans have kept traditional craftsmanship alive through generations.', th: 'ช่างฝีมือท้องถิ่นรักษาฝีมือดั้งเดิมไว้ข้ามรุ่นสู่รุ่น' },
      ],
    },
    {
      category: 'Present Perfect - Modern Cultural Evolution',
      thai: 'วิวัฒนาการวัฒนธรรมสมัยใหม่',
      icon: '🎨',
      color: '#45B7D1',
      sentences: [
        { en: 'Technology has transformed how we experience traditional performances.', th: 'เทคโนโลยีได้เปลี่ยนแปลงวิธีที่เราสัมผัสการแสดงดั้งเดิม' },
        { en: 'Social media has helped promote cultural awareness globally.', th: 'โซเชียลมีเดียช่วยส่งเสริมการตระหนักรู้ทางวัฒนธรรมทั่วโลก' },
        { en: 'Young artists have successfully modernized ancient art forms.', th: 'ศิลปินรุ่นใหม่ประสบความสำเร็จในการทำให้ศิลปะโบราณทันสมัย' },
        { en: 'International collaborations have enriched our cultural exchanges.', th: 'ความร่วมมือระหว่างประเทศได้เสริมสร้างการแลกเปลี่ยนวัฒนธรรม' },
      ],
    },
  ];

  const readingTexts = [
    {
      title: 'Thai Classical Dance: A Living Heritage',
      content: `Thai classical dance represents one of the most sophisticated art forms in Southeast Asia. This elegant performance art has been meticulously preserved for over 700 years, evolving from ancient court traditions into a celebrated cultural treasure.

The intricate hand movements, called "mudra," tell stories without words. Each gesture has specific meanings, and dancers spend years perfecting these precise movements. The elaborate costumes, adorned with gold thread and precious stones, have been crafted using traditional techniques passed down through generations.

Since the Ayutthaya period, Thai classical dance has served multiple purposes: religious ceremonies, royal entertainment, and cultural education. Today, the National Theatre of Thailand continues this tradition, training new generations of dancers while adapting classical pieces for contemporary audiences.

Master choreographers have been working tirelessly to document and preserve these ancient dance forms. They have created comprehensive training programs that ensure the authenticity of each movement while making the art form accessible to modern students.

The government has recognized the importance of this cultural heritage by establishing the Department of Cultural Promotion, which has been supporting traditional arts since 1952. Through their efforts, Thai classical dance has gained international recognition and continues to inspire artists worldwide.`,
      questions: [
        {
          question: 'How long has Thai classical dance been preserved?',
          options: ['500 years', '600 years', '700 years', '800 years'],
          correct: 2,
          explanation: 'The text states that Thai classical dance has been preserved for over 700 years.'
        },
        {
          question: 'What are the hand movements in Thai classical dance called?',
          options: ['Mudra', 'Gestures', 'Symbols', 'Signs'],
          correct: 0,
          explanation: 'The text specifically mentions that intricate hand movements are called "mudra".'
        },
        {
          question: 'Since when has the Department of Cultural Promotion been supporting traditional arts?',
          options: ['1950', '1952', '1955', '1960'],
          correct: 1,
          explanation: 'The text states the Department has been supporting traditional arts since 1952.'
        },
        {
          question: 'What is the main purpose of documenting dance forms according to the text?',
          options: ['Tourism', 'Entertainment', 'Preservation of authenticity', 'Commercial success'],
          correct: 2,
          explanation: 'The text emphasizes that documentation ensures the authenticity of each movement.'
        }
      ]
    },
  ];

  const listeningExercises = [
    {
      title: 'University Cultural Exchange Program',
      audio: 'Professor: Good morning, students. Today we will discuss our cultural exchange program. Maria, you have been participating in Thai traditional dance classes for two years now. How has this experience influenced your understanding of Thai culture? Maria: Thank you, Professor. I have learned so much about Thai history and values through dance. The precision and grace required have taught me patience and respect for tradition. I have performed in three cultural festivals this year, and each experience has deepened my appreciation for this art form. The costumes, music, and movements all tell stories that have been passed down for centuries.',
      questions: [
        {
          question: 'How long has Maria been participating in Thai dance classes?',
          options: ['One year', 'Two years', 'Three years', 'Four years'],
          correct: 1,
          explanation: 'Maria has been participating for two years according to the professor.'
        },
        {
          question: 'How many cultural festivals has Maria performed in this year?',
          options: ['Two', 'Three', 'Four', 'Five'],
          correct: 1,
          explanation: 'Maria mentions she has performed in three cultural festivals this year.'
        },
        {
          question: 'What has dance taught Maria according to her response?',
          options: ['Confidence and leadership', 'Patience and respect for tradition', 'Creativity and innovation', 'Competition and ambition'],
          correct: 1,
          explanation: 'Maria specifically mentions that dance taught her patience and respect for tradition.'
        }
      ]
    },
  ];

  const readingGrammarText = `🎭 Advanced Grammar for Cultural Performances

Present Perfect (have/has + past participle) 💫
• ใช้พูดถึงประสบการณ์หรือเหตุการณ์ที่เคยเกิดขึ้นในชีวิต (แต่ไม่ได้ระบุเวลาชัดเจน)
• ใช้บอกผลลัพธ์ที่มีผลต่อปัจจุบัน หรือสิ่งที่ดำเนินต่อเนื่องมาถึงปัจจุบัน
• ตัวอย่าง: I have attended many festivals. (ฉันเคยเข้าร่วมเทศกาลหลายครั้งแล้ว)

Past Simple ⏰
• ใช้พูดถึงเหตุการณ์ที่เกิดขึ้นและจบลงในอดีต โดยระบุเวลาชัดเจน
• มักใช้กับคำระบุเวลา เช่น yesterday, last year, in 2010
• ตัวอย่าง: I attended the festival last year. (ฉันไปเทศกาลเมื่อปีที่แล้ว)

Present Perfect Continuous (have/has + been + V-ing) 🔄
• ใช้พูดถึงกิจกรรมที่เริ่มในอดีตและยังดำเนินต่อเนื่องถึงปัจจุบัน หรือเพิ่งหยุดไป
• เน้นความต่อเนื่องของการกระทำ
• ตัวอย่าง: She has been studying dance for three years. (เธอเรียนเต้นมาสามปีแล้ว)

Key Time Expressions:
• Since (ตั้งแต่): ใช้ระบุจุดเริ่มต้น เช่น since 2010, since the Ayutthaya period
• For (เป็นเวลา): ใช้ระบุระยะเวลา เช่น for three years
• Already, yet, just, recently, lately (บอกเวลาแบบไม่เจาะจง)
• Ever, never, always, still (คำบอกความถี่/ประสบการณ์)

Common Mistakes to Avoid:
❌ I have attended the festival yesterday.
✅ I attended the festival yesterday.

❌ I have experience many festivals.
✅ I have experienced many festivals.

❌ She has been go to the temple.
✅ She has been going to the temple.`;

  const conclusionPhrases = [
    { phrase: 'In conclusion', meaning: 'สรุปแล้ว', example: 'In conclusion, traditional festivals serve as vital cultural bridges.' },
    { phrase: 'To summarize', meaning: 'สรุปแล้ว', example: 'To summarize, the performance exceeded all expectations.' },
    { phrase: 'Furthermore', meaning: 'นอกจากนี้', example: 'Furthermore, cultural preservation requires community involvement.' },
    { phrase: 'Nevertheless', meaning: 'อย่างไรก็ตาม', example: 'Nevertheless, modernization poses challenges to traditional arts.' },
    { phrase: 'On the other hand', meaning: 'ในทางตรงข้าม', example: 'On the other hand, technology can help preserve traditions.' },
    { phrase: 'As a result', meaning: 'ผลที่ตามมา', example: 'As a result, many young people have lost interest in traditional arts.' },
  ];

  const quizQuestions = [
    {
      question: 'Choose the correct Present Perfect sentence about cultural experience:',
      options: [
        'I have attended the festival last year',
        'I have never experienced such elaborate traditional ceremony',
        'I have experience many cultural events yesterday',
        'I experienced have traditional dance performances'
      ],
      correct: 1,
      explanation: 'Present Perfect uses "have/has + past participle" for experiences without specific time. "Never" indicates no experience up to now.',
    },
    {
      question: 'Which sentence correctly uses Past Simple for a historical event?',
      options: [
        'Thai classical dance has originated in the Ayutthaya period',
        'Thai classical dance originated in the Ayutthaya period',
        'Thai classical dance has been originating in the Ayutthaya period',
        'Thai classical dance is originated in the Ayutthaya period'
      ],
      correct: 1,
      explanation: 'Past Simple is used for completed actions in specific historical periods. "Ayutthaya period" is a specific time in the past.',
    },
    {
      question: 'Complete: "The festival _____ for over 500 years."',
      options: [
        'has been celebrated',
        'was celebrated',
        'is celebrated',
        'will be celebrated'
      ],
      correct: 0,
      explanation: 'Present Perfect Passive is used for actions that started in the past and continue to the present. "For over 500 years" indicates duration.',
    },
    {
      question: 'Which time expression works with Present Perfect?',
      options: [
        'Yesterday',
        'Last week',
        'In 2010',
        'Since 2010'
      ],
      correct: 3,
      explanation: 'Present Perfect uses "since" to indicate the starting point of an action that continues to now. Other options require Past Simple.',
    },
    {
      question: 'Choose the correct sentence:',
      options: [
        'I have visited the temple when I was young',
        'I visited the temple when I was young',
        'I have been visiting the temple when I was young',
        'I was visiting the temple when I was young'
      ],
      correct: 1,
      explanation: 'Past Simple is used with "when I was young" because it specifies a time period in the past.',
    },
  ];

  // Utility functions
  const calculateQuizScore = () => {
    return Math.round((score / quizQuestions.length) * 100);
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 60) return '#FF9800';
    return '#F44336';
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setScore(0);
    setSelectedAnswer(null);
    setQuizCompleted(false);
    setShowQuiz(true);
  };

  const shareResults = async () => {
    const percentage = calculateQuizScore();
    const message = `I scored ${score}/${quizQuestions.length} (${percentage}%) on the M5 English Cultural Performance Quiz! 🎭📚`;
    try {
      await Share.share({
        message: message,
        title: 'M5 English Quiz Results'
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  // Option Renderer
  const renderOptions = (questionObj, questionIdx, skill) => {
    skill = typeof skill === 'undefined' ? 'quiz' : skill;
    return questionObj.options.map((option, idx) => {
      const isSelected = skill === 'quiz' ? selectedAnswer === idx :
        skill === 'listening' ? listeningAnswers[questionIdx] === idx :
          skill === 'reading' ? readingAnswers[questionIdx] === idx : false;
      const isCorrect = skill === 'quiz' && selectedAnswer !== null && idx === questionObj.correct;
      const isIncorrect = skill === 'quiz' && selectedAnswer !== null && selectedAnswer === idx && idx !== questionObj.correct;
      return (
        <TouchableOpacity
          key={idx}
          style={[
            styles.optionBtn,
            isSelected && styles.selectedOption,
            isCorrect && styles.correctOption,
            isIncorrect && styles.incorrectOption,
          ]}
          onPress={() => {
            if (skill === 'quiz') {
              if (selectedAnswer === null) setSelectedAnswer(idx);
            } else if (skill === 'listening') {
              handleListeningAnswer(idx, questionIdx);
            } else if (skill === 'reading') {
              handleReadingAnswer(idx, questionIdx);
            }
          }}
          disabled={skill === 'quiz' && selectedAnswer !== null}
        >
          <Text style={[
            styles.optionText,
            isCorrect && styles.correctText,
            isIncorrect && styles.incorrectText
          ]}>
            {option}
          </Text>
          {skill === 'quiz' && selectedAnswer !== null && (
            <Text style={styles.optionFeedback}>
              {idx === questionObj.correct ? '✅' : isSelected ? '❌' : ''}
            </Text>
          )}
        </TouchableOpacity>
      );
    });
  };

  // Handlers
  const handleNextQuiz = () => {
    const correct = quizQuestions[currentQuiz].correct;
    if (selectedAnswer === correct) setScore(score + 1);
    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
      setShowQuiz(false);
    }
  };

  const handleListeningAnswer = (ansIdx, qIdx) => {
    const answers = [...listeningAnswers];
    answers[qIdx] = ansIdx;
    setListeningAnswers(answers);
    if (answers.length === listeningExercises[currentListening].questions.length &&
      answers.every(answer => answer !== undefined)) {
      setListeningCompleted(true);
    }
  };

  const handleReadingAnswer = (ansIdx, qIdx) => {
    const answers = [...readingAnswers];
    answers[qIdx] = ansIdx;
    setReadingAnswers(answers);
    if (answers.length === readingTexts[currentReading].questions.length &&
      answers.every(answer => answer !== undefined)) {
      setReadingCompleted(true);
    }
  };

  const handleTextToSpeech = (text) => {
    setIsLoading(true);
    Speech.speak(text, {
      rate: speechRate,
      pitch: 1.0,
      language: 'en-US',
      onDone: () => setIsLoading(false),
      onError: () => setIsLoading(false),
    });
  };

  // MODALS

  // Listening Modal
  const ListeningModal = () => {
    const exercise = listeningExercises[currentListening];
    return (
      <Modal visible={showListeningModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>🎧 {exercise.title}</Text>
          <View style={styles.audioControls}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => handleTextToSpeech(exercise.audio)}
              disabled={isLoading}
            >
              <Text style={styles.playButtonText}>
                {isLoading ? '⏳ Loading...' : '🔊 Play Audio'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.stopButton}
              onPress={() => Speech.stop()}
            >
              <Text style={styles.stopButtonText}>⏹ Stop</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.speedControl}>
            <Text style={styles.speedLabel}>Speed: {speechRate.toFixed(1)}x</Text>
            <View style={styles.speedButtons}>
              <TouchableOpacity
                style={styles.speedBtn}
                onPress={() => setSpeechRate(Math.max(0.5, speechRate - 0.1))}
              >
                <Text style={styles.speedBtnText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.speedBtn}
                onPress={() => setSpeechRate(Math.min(1.5, speechRate + 0.1))}
              >
                <Text style={styles.speedBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.instructionText}>
              Listen to the audio and answer the questions below:
            </Text>
            <View style={styles.transcriptContainer}>
              <Text style={styles.transcriptLabel}>Transcript:</Text>
              <Text style={styles.audioText}>{exercise.audio}</Text>
            </View>
            {exercise.questions.map((q, i) => (
              <View key={i} style={styles.questionBlock}>
                <Text style={styles.questionText}>{i + 1}. {q.question}</Text>
                {renderOptions(q, i, 'listening')}
                {listeningAnswers[i] !== undefined && (
                  <Text style={styles.answerExplanation}>
                    {listeningAnswers[i] === q.correct ? '✅ Correct! ' : '❌ Incorrect. '}
                    {q.explanation}
                  </Text>
                )}
              </View>
            ))}
            {listeningCompleted && (
              <View style={styles.completionMessage}>
                <Text style={styles.completionText}>
                  🎉 Listening exercise completed!
                </Text>
              </View>
            )}
            <View style={{ height: 30 }} />
            <TouchableOpacity
              style={styles.backButtonBottom}
              onPress={() => {
                Speech.stop();
                setShowListeningModal(false);
                setListeningAnswers([]);
                setListeningCompleted(false);
              }}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  // Speaking Modal (New version)
  const SpeakingModal = () => {
    const getRandomSentence = () => {
      const idx = Math.floor(Math.random() * speakingSentences.length);
      setPracticeSentence(speakingSentences[idx]);
    };
    return (
      <Modal visible={showSpeakingModal} animationType="slide">
        <ScrollView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>🎤 Speaking Practice</Text>
          <Text style={styles.promptText}>
            Try to say the following sentence out loud. Tap "New Sentence" for more practice.
          </Text>
          <View style={styles.practiceSentenceBox}>
            <Text style={styles.practiceSentenceText}>{practiceSentence}</Text>
            <TouchableOpacity
              style={styles.speakButton}
              onPress={() => handleTextToSpeech(practiceSentence)}
              disabled={isLoading}
            >
              <Text style={styles.speakButtonText}>{isLoading ? 'Loading...' : '🔊 Listen'}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.skillButton, { marginBottom: 20, marginTop: 10 }]}
            onPress={getRandomSentence}
          >
            <Text style={styles.skillButtonText}>New Sentence</Text>
          </TouchableOpacity>
          <View style={{ height: 30 }} />
          <TouchableOpacity
            style={styles.backButtonBottom}
            onPress={() => setShowSpeakingModal(false)}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    );
  };

  // Writing Modal
  const WritingPracticeModal = () => {
    const writingSample = [
      "I have visited the Grand Palace.",
      "My family has joined the Songkran festival.",
      "I have seen a Khon performance.",
      "We have learned about Thai musical instruments.",
      "I have never danced on stage."
    ];
    // Function ตรวจนับประโยค และ feedback
    const sentences = writingText.trim().split(/[.!?]+/).filter(s => s.trim().length > 0);
    const presentPerfectRegex = /\b(has|have)\s+([a-z]+ed|been|gone|seen|had|made|taken|given|known|shown|taught|written|won|lost|found|met|left|become|felt|read|studied|visited|lived|worked|attended|performed|enjoyed|watched|experienced|participated|joined|learned|bought|told|taught|built|spoken|thought|forgotten|forgiven|driven|flown|sung|sat|swum|drawn|grown|caught|run|ridden|risen|shaken|shone|shot|shut|sung|sunk|torn|woken|worn|wept|won)\b/i;
    let ppCount = sentences.filter(s => presentPerfectRegex.test(s)).length;
    let writingFeedback = '';
    if (!writingText.trim()) writingFeedback = '';
    else if (sentences.length < 5) writingFeedback = '❗️Write at least 5 sentences.';
    else if (ppCount < 3) writingFeedback = '❗️Use Present Perfect tense in at least 3 sentences.';
    else writingFeedback = '✅ Good job!';
    return (
      <Modal visible={showWritingModal} animationType="slide">
        <ScrollView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>✍️ Writing Practice: Make Sentences</Text>
          <Text style={styles.promptText}>
            Write at least 5 sentences about your experiences or learning using Present Perfect tense.
          </Text>
          <TextInput
            style={styles.writingInput}
            multiline
            placeholder="Write here (minimum 5 sentences, use Present Perfect tense)..."
            onChangeText={setWritingText}
            value={writingText}
            autoCorrect
          />
          <Text style={styles.wordCountText}>
            Sentences: {sentences.length} | Present Perfect: {ppCount}
          </Text>
          {writingFeedback ? (
            <Text style={writingFeedback.startsWith('✅') ? styles.correctText : styles.incorrectText}>
              {writingFeedback}
            </Text>
          ) : null}
          <Text style={styles.sectionLabel}>Sample Sentences:</Text>
          {writingSample.map((ex, i) => (
            <Text style={styles.exampleText} key={i}>{ex}</Text>
          ))}
          <View style={{ height: 30 }} />
          <TouchableOpacity
            style={styles.backButtonBottom}
            onPress={() => setShowWritingModal(false)}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    );
  };

  // Reading Modal
  const ReadingModal = () => {
    const exercise = readingTexts[currentReading];
    return (
      <Modal visible={showReadingModal} animationType="slide">
        <ScrollView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>📚 {exercise.title}</Text>
          <View style={styles.readingContentContainer}>
            <Text style={styles.readingText}>{exercise.content}</Text>
          </View>
          <Text style={styles.sectionLabel}>Comprehension Questions:</Text>
          {exercise.questions.map((q, i) => (
            <View key={i} style={styles.questionBlock}>
              <Text style={styles.questionText}>{i + 1}. {q.question}</Text>
              {renderOptions(q, i, 'reading')}
              {readingAnswers[i] !== undefined && (
                <Text style={styles.answerExplanation}>
                  {readingAnswers[i] === q.correct ? '✅ Correct! ' : '❌ Incorrect. '}
                  {q.explanation}
                </Text>
              )}
            </View>
          ))}
          {readingCompleted && (
            <View style={styles.completionMessage}>
              <Text style={styles.completionText}>
                🎉 Reading exercise completed!
              </Text>
            </View>
          )}
          <View style={{ height: 30 }} />
          <TouchableOpacity
            style={styles.backButtonBottom}
            onPress={() => {
              setShowReadingModal(false);
              setReadingAnswers([]);
              setReadingCompleted(false);
            }}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    );
  };

  // Quiz Modal
  const QuizModal = () => {
    if (!showQuiz) return null;
    const questionObj = quizQuestions[currentQuiz];
    return (
      <Modal visible={showQuiz} animationType="fade" transparent={true}>
        <View style={styles.quizModalContainer}>
          <View style={styles.quizContent}>
            <Text style={styles.quizTitle}>Grammar Quiz</Text>
            <Text style={styles.quizProgress}>Question {currentQuiz + 1}/{quizQuestions.length}</Text>
            <Text style={styles.quizQuestion}>{questionObj.question}</Text>
            <View style={styles.optionsContainer}>
              {renderOptions(questionObj, currentQuiz, 'quiz')}
            </View>
            {selectedAnswer !== null && (
              <View style={styles.explanationBox}>
                <Text style={styles.explanationText}>{questionObj.explanation}</Text>
              </View>
            )}
            <TouchableOpacity
              style={[styles.nextButton, selectedAnswer === null && styles.disabledButton]}
              onPress={handleNextQuiz}
              disabled={selectedAnswer === null}
            >
              <Text style={styles.nextButtonText}>Next →</Text>
            </TouchableOpacity>
            <View style={{ height: 15 }} />
            <TouchableOpacity
              style={styles.backButtonBottom}
              onPress={() => setShowQuiz(false)}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  // MAIN RENDER
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <Text style={styles.mainTitle}>Lesson 3: Cultural Performances</Text>

        {/* Grammar Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎭 Grammar Examples</Text>
          {examples.map((item, index) => (
            <View key={index} style={[styles.card, { backgroundColor: item.color }]}>
              <Text style={styles.cardTitle}>{item.icon} {item.category}</Text>
              <Text style={styles.cardSubtitle}>{item.thai}</Text>
              {item.sentences.map((sentence, sIndex) => (
                <View key={sIndex} style={styles.sentencePair}>
                  <Text style={styles.englishText}>• {sentence.en}</Text>
                  <Text style={styles.thaiText}>{sentence.th}</Text>
                </View>
              ))}
              <TouchableOpacity
                style={styles.speakButton}
                onPress={() => {
                  const fullText = item.sentences.map(s => s.en).join('. ');
                  handleTextToSpeech(fullText);
                }}
                disabled={isLoading}
              >
                <Text style={styles.speakButtonText}>
                  {isLoading ? 'Loading...' : '🔊 Read All'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Grammar Explanation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Grammar Focus</Text>
          <View style={styles.grammarCard}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.grammarText}>{readingGrammarText}</Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.speakButton}
              onPress={() => handleTextToSpeech(readingGrammarText.replace(/•|❌|✅/g, ''))}
              disabled={isLoading}
            >
              <Text style={styles.speakButtonText}>
                {isLoading ? 'Loading...' : '🔊 Read Grammar Explanation'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Conclusion Phrases */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Useful Conclusion Phrases</Text>
          {conclusionPhrases.map((phrase, index) => (
            <View key={index} style={styles.phraseCard}>
              <Text style={styles.phraseEnglish}>{phrase.phrase}</Text>
              <Text style={styles.phraseMeaning}>{phrase.meaning}</Text>
              <Text style={styles.phraseExample}>Example: "{phrase.example}"</Text>
              <TouchableOpacity
                style={styles.speakButtonSmall}
                onPress={() => handleTextToSpeech(phrase.example)}
                disabled={isLoading}
              >
                <Text style={styles.speakButtonTextSmall}>🔊 Speak</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Skill Practice Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚀 Practice Your Skills</Text>
          <TouchableOpacity
            style={styles.skillButton}
            onPress={() => setShowListeningModal(true)}
          >
            <Text style={styles.skillButtonText}>🎧 Listening Practice</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.skillButton}
            onPress={() => setShowReadingModal(true)}
          >
            <Text style={styles.skillButtonText}>📚 Reading Comprehension</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.skillButton}
            onPress={() => setShowSpeakingModal(true)}
          >
            <Text style={styles.skillButtonText}>🎤 Speaking Practice</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.skillButton}
            onPress={() => setShowWritingModal(true)}
          >
            <Text style={styles.skillButtonText}>✍️ Writing Practice</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.skillButton}
            onPress={() => resetQuiz()}
          >
            <Text style={styles.skillButtonText}>🧠 Take the Quiz</Text>
          </TouchableOpacity>
        </View>

        {/* Quiz Results */}
        {quizCompleted && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🏆 Quiz Results</Text>
            <View style={[styles.resultsCard, { borderColor: getScoreColor(calculateQuizScore()) }]}>
              <Text style={styles.resultsText}>
                Your Score: {score} / {quizQuestions.length}
              </Text>
              <Text style={[styles.resultsPercentage, { color: getScoreColor(calculateQuizScore()) }]}>
                {calculateQuizScore()}%
              </Text>
              <TouchableOpacity style={styles.shareButton} onPress={shareResults}>
                <Text style={styles.shareButtonText}>Share Results 📣</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.retakeButton} onPress={resetQuiz}>
                <Text style={styles.retakeButtonText}>Retake Quiz</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

      </ScrollView>

      {/* Modals */}
      <ListeningModal />
      <SpeakingModal />
      <WritingPracticeModal />
      <ReadingModal />
      <QuizModal />
    </View>
  );
}

// ADDITIONAL STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    paddingTop: StatusBar.currentHeight,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  section: {
    marginBottom: 25,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#A9CCE3',
    paddingBottom: 8,
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#EEE',
    marginBottom: 10,
  },
  sentencePair: {
    marginBottom: 8,
  },
  englishText: {
    fontSize: 16,
    color: '#FFF',
    lineHeight: 24,
  },
  thaiText: {
    fontSize: 14,
    color: '#E0E0E0',
    fontStyle: 'italic',
  },
  speakButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  speakButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  grammarCard: {
    backgroundColor: '#EBF5FB',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
    maxHeight: 400,
  },
  grammarText: {
    fontSize: 16,
    color: '#34495E',
    lineHeight: 24,
  },
  phraseCard: {
    backgroundColor: '#D6EAF8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
  },
  phraseEnglish: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  phraseMeaning: {
    fontSize: 14,
    color: '#5D6D7E',
    marginBottom: 5,
  },
  phraseExample: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#7F8C8D',
  },
  speakButtonSmall: {
    backgroundColor: '#A9CCE3',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  speakButtonTextSmall: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  skillButton: {
    backgroundColor: '#3498DB',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  skillButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 20,
    backgroundColor: '#F0F4F8',
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalContent: {
    flex: 1,
  },
  audioControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 15,
  },
  playButton: {
    backgroundColor: '#28A745',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  playButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stopButton: {
    backgroundColor: '#DC3545',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  stopButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  speedControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  speedLabel: {
    fontSize: 16,
    color: '#34495E',
    marginRight: 10,
  },
  speedButtons: {
    flexDirection: 'row',
    backgroundColor: '#EBF5FB',
    borderRadius: 15,
    overflow: 'hidden',
  },
  speedBtn: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#A9CCE3',
  },
  speedBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498DB',
  },
  instructionText: {
    fontSize: 16,
    color: '#5D6D7E',
    marginBottom: 15,
    textAlign: 'center',
  },
  transcriptContainer: {
    backgroundColor: '#EBF5FB',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#3498DB',
  },
  transcriptLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 5,
  },
  audioText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495E',
  },
  questionBlock: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  questionText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  optionBtn: {
    backgroundColor: '#EBF5FB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#A9CCE3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    color: '#34495E',
    flexShrink: 1,
  },
  selectedOption: {
    borderColor: '#3498DB',
    backgroundColor: '#D6EAF8',
  },
  correctOption: {
    backgroundColor: '#D4EDDA',
    borderColor: '#28A745',
  },
  incorrectOption: {
    backgroundColor: '#F8D7DA',
    borderColor: '#DC3545',
  },
  correctText: {
    color: '#28A745',
    fontWeight: 'bold',
  },
  incorrectText: {
    color: '#DC3545',
    fontWeight: 'bold',
  },
  optionFeedback: {
    marginLeft: 10,
    fontSize: 18,
  },
  answerExplanation: {
    marginTop: 10,
    fontSize: 14,
    color: '#5D6D7E',
    fontStyle: 'italic',
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#ECF0F1',
  },
  completionMessage: {
    backgroundColor: '#D4EDDA',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  completionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28A745',
  },
  backButtonBottom: {
    backgroundColor: '#6C757D',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 40,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  writingInput: {
    minHeight: 160,
    borderColor: '#A9CCE3',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
    backgroundColor: '#FFF',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  wordCountText: {
    fontSize: 16,
    color: '#34495E',
    marginBottom: 5,
    textAlign: 'right',
  },
  practiceSentenceBox: {
    backgroundColor: '#D6EAF8',
    borderRadius: 10,
    padding: 20,
    marginVertical: 30,
    alignItems: 'center',
  },
  practiceSentenceText: {
    fontSize: 20,
    color: '#2C3E50',
    marginBottom: 15,
    textAlign: 'center',
  },
  readingContentContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#3498DB',
  },
  readingText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495E',
  },
  quizModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  quizContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 25,
    width: width * 0.9,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  quizTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  quizProgress: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 15,
  },
  quizQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495E',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 26,
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#3498DB',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 15,
    width: '80%',
    alignItems: 'center',
    elevation: 3,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#BDC3C7',
  },
  explanationBox: {
    backgroundColor: '#EBF5FB',
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#3498DB',
    width: '100%',
  },
  explanationText: {
    fontSize: 14,
    color: '#5D6D7E',
    fontStyle: 'italic',
  },
  resultsCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    borderWidth: 3,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },
  resultsText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 5,
  },
  resultsPercentage: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  shareButton: {
    backgroundColor: '#28A745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
    width: '70%',
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  retakeButton: {
    backgroundColor: '#F39C12',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
    width: '70%',
    alignItems: 'center',
  },
  retakeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
