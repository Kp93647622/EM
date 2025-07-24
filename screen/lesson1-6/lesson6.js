import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as Speech from 'expo-speech';

export default function Lesson3() {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentSection, setCurrentSection] = useState('guidelines');

  // --- 1. GRAMMAR GUIDELINES ---
  const techGrammarGuidelines = [
    {
      title: 'Passive Voice Tenses',
      thai: 'รูปประโยค Passive Voice (ทุก tense)',
      content: [
        'Passive voice ใช้เมื่อตัวกระทำ (doer) ไม่สำคัญหรือไม่ระบุ',
        'Subject + be (is/am/are/was/were/been/being) + V3 + (by agent)',
        'เช่น: The code was written by a developer.',
        'Tenses: Present (is developed), Past (was developed), Future (will be developed), etc.',
      ]
    },
    {
      title: 'Causative Passive',
      thai: 'โครงสร้าง Causative Passive',
      content: [
        'ใช้ “have/get + object + V3” เพื่อบอกให้คนอื่นทำบางสิ่งให้เรา (แต่ไม่ได้ทำเอง)',
        'เช่น: The website was had designed by a freelancer. / I got my laptop repaired.',
        'ในเทคโนโลยี: Software is often gotten tested by QA engineers before release.'
      ]
    },
    {
      title: 'Adverbs in Tech Context',
      thai: 'การใช้ Adverb ในงานเทคโนโลยี',
      content: [
        'Adverbs ขยายกริยา/ขยายประโยค เช่น quickly, automatically, efficiently, remotely',
        'เช่น: The system is automatically updated every night.',
        'The problem was quickly solved by the IT team.',
      ]
    }
  ];

  // --- 2. EXAMPLES ---
  const examples = [
    {
      category: 'Passive Voice in Tech',
      thai: 'Passive Voice ในสายเทค',
      sentences: [
        { 
          en: 'The software is developed by engineers.',
          th: 'ซอฟต์แวร์ถูกพัฒนาโดยวิศวกร'
        },
        {
          en: 'Most cyber attacks are detected automatically.',
          th: 'การโจมตีไซเบอร์ส่วนใหญ่ถูกตรวจพบโดยอัตโนมัติ'
        },
        {
          en: 'Technical support will be provided by the IT team.',
          th: 'ฝ่าย IT จะเป็นผู้ให้การสนับสนุนทางเทคนิค'
        }
      ]
    },
    {
      category: 'Causative Passive in Tech Jobs',
      thai: 'Causative Passive ในสายเทค',
      sentences: [
        {
          en: 'I had my computer repaired yesterday.',
          th: 'ฉันให้ซ่อมคอมพิวเตอร์เมื่อวานนี้'
        },
        {
          en: 'The app gets its features updated regularly.',
          th: 'แอปมีการอัปเดตฟีเจอร์เป็นประจำ'
        },
        {
          en: 'We will have the project reviewed by our manager.',
          th: 'เราจะให้ผู้จัดการตรวจงานโปรเจกต์'
        }
      ]
    },
    {
      category: 'Adverbs in Tech',
      thai: 'Adverbs ในเทคโนโลยี',
      sentences: [
        {
          en: 'The new system was efficiently installed.',
          th: 'ระบบใหม่ถูกติดตั้งอย่างมีประสิทธิภาพ'
        },
        {
          en: 'Software updates are automatically downloaded.',
          th: 'การอัปเดตซอฟต์แวร์ถูกดาวน์โหลดโดยอัตโนมัติ'
        },
        {
          en: 'Online meetings can be joined remotely from anywhere.',
          th: 'สามารถเข้าร่วมประชุมออนไลน์จากระยะไกลได้จากทุกที่'
        }
      ]
    }
  ];

  // --- 3. PRACTICE EXERCISES (Writing/Speaking) ---
  const practiceExercises = [
    {
      title: 'Passive Voice Practice',
      thai: 'ฝึกแต่งประโยค Passive Voice',
      instruction: 'Write 2 sentences about technology using passive voice.',
      example: 'Example: "Cloud storage is used by many companies."',
      tips: [
        'Use "is/are/was/were + V3"',
        'Mention the agent with "by..." only if important'
      ]
    },
    {
      title: 'Causative Passive Practice',
      thai: 'ฝึกแต่งประโยค Causative Passive',
      instruction: 'Make a causative passive sentence about a tech service you have done for you.',
      example: 'Example: "I got my smartphone fixed at the service center."',
      tips: [
        'Use "have/get + object + V3"',
        'Show that someone did it for you'
      ]
    },
    {
      title: 'Adverbs in Tech Sentences',
      thai: 'ฝึกใส่ Adverb ในประโยค',
      instruction: 'Write a sentence about tech work using an adverb (e.g., quickly, automatically, efficiently, remotely).',
      example: 'Example: "Problems were quickly resolved by the support team."',
      tips: [
        'Place the adverb before/after the verb or at the end of the sentence',
        'Choose adverbs that match tech actions'
      ]
    },
    {
      title: 'Speaking: Describe a Tech Job',
      thai: 'พูด: อธิบายงานในสายเทค',
      instruction: 'Describe a tech job (e.g., data analyst, software developer, IT support) using at least one passive or causative passive structure and an adverb.',
      example: 'Example: "A software developer is required to work efficiently. Sometimes, they get their code reviewed by a senior engineer."',
      tips: [
        'Use at least one passive or causative passive sentence',
        'Add adverbs for clarity',
        'Mention responsibilities or daily tasks'
      ]
    }
  ];

  // --- 4. READING PASSAGE ---
  const readingText = `In today's world, technology is rapidly changing the way we live and work. Many tasks are now automatically performed by machines and software. In most tech companies, data is regularly analyzed by data scientists, and updates are frequently released to improve user experience. New systems are efficiently developed and tested before being launched. Recently, remote working solutions have been widely adopted. In some companies, technical support is often provided by AI chatbots.`;

  // --- 5. LISTENING EXERCISE (for completeness, for aural practice) ---
  const listeningExercise = {
    title: 'Tech Support Call',
    audio: `Customer: My device stopped working suddenly. 
Support: No problem! The issue will be checked and fixed as soon as possible. 
Customer: Can I get my files recovered?
Support: Yes, your files can be recovered quickly by our team. An update will be provided automatically once the repair is completed.`,
    questions: [
      {
        question: 'What will be done to the device?',
        options: ['It will be replaced', 'It will be checked and fixed', 'It will be sold', 'It will be ignored'],
        correct: 1,
        explanation: 'Support says the issue will be checked and fixed.'
      },
      {
        question: 'How will the files be recovered?',
        options: ['Manually', 'By another company', 'Quickly by the team', 'They cannot be recovered'],
        correct: 2,
        explanation: 'Support says the files can be recovered quickly by the team.'
      },
      {
        question: 'How will the update about the repair be given?',
        options: ['By phone call', 'Automatically', 'In person', 'It will not be given'],
        correct: 1,
        explanation: 'Support says an update will be provided automatically.'
      }
    ]
  };

  // --- 6. QUIZ (GRAMMAR & USAGE) ---
  const quizQuestions = [
    {
      question: 'Which sentence is passive voice?',
      options: [
        'Engineers develop new software.',
        'The software is developed by engineers.',
        'They will fix the bug.',
        'I use cloud storage daily.'
      ],
      correct: 1,
      explanation: '"is developed" is passive: the software receives the action.'
    },
    {
      question: 'What is the causative passive form?',
      options: [
        'I repair my laptop.',
        'My laptop was repaired by me.',
        'I had my laptop repaired.',
        'I was repairing my laptop.'
      ],
      correct: 2,
      explanation: '"I had my laptop repaired" = Someone else repaired it for me.'
    },
    {
      question: 'Choose the sentence with an adverb:',
      options: [
        'The project was finished.',
        'The system is tested.',
        'The update is automatically installed.',
        'The meeting was canceled.'
      ],
      correct: 2,
      explanation: '"automatically" is an adverb modifying "installed".'
    },
    {
      question: 'Which is a passive voice about tech jobs?',
      options: [
        'IT staff fix the server.',
        'The server is fixed by IT staff.',
        'We manage the project.',
        'They code the app.'
      ],
      correct: 1,
      explanation: 'Passive: "is fixed by IT staff".'
    },
    {
      question: 'Which sentence shows causative passive?',
      options: [
        'I was promoted last month.',
        'My software was installed.',
        'We got the problem solved quickly.',
        'They design websites.'
      ],
      correct: 2,
      explanation: '"We got the problem solved" (someone else solved it for us).'
    }
  ];

  // --- 7. AUDIO ---
  const playAudio = (text) => {
    try {
      Speech.speak(text, { 
        language: 'en-US', 
        rate: 0.75, 
        pitch: 1.0,
        quality: 'enhanced'
      });
    } catch (error) {
      Alert.alert('Audio Error', 'Unable to play audio. Please try again.');
    }
  };

  // --- 8. QUIZ HANDLING ---
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

  // --- 9. RENDERERS ---
  // ** ไม่มีหัวข้อ Guideline **
  const renderGuidelines = () => (
    <View>
      {techGrammarGuidelines.map((guide, idx) => (
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
      <Text style={styles.sectionTitle}>📝 Examples - ตัวอย่างประโยค</Text>
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
      <Text style={styles.sectionTitle}>✍️ Practice Exercises - แบบฝึกหัด</Text>
      {practiceExercises.map((exercise, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.exerciseTitle}>{exercise.title} - {exercise.thai}</Text>
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
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <Text style={styles.title}>💻 Adverbs & Tech Jobs: Passive Voice</Text>
      <Text style={styles.subtitle}>Adverbs • Technology • Passive Voice • Causative Passive</Text>

      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, currentSection === 'guidelines' && styles.activeTab]}
          onPress={() => setCurrentSection('guidelines')}
        >
          <Text style={[styles.tabText, currentSection === 'guidelines' && styles.activeTabText]}>
            Guidelines
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, currentSection === 'examples' && styles.activeTab]}
          onPress={() => setCurrentSection('examples')}
        >
          <Text style={[styles.tabText, currentSection === 'examples' && styles.activeTabText]}>
            Examples
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, currentSection === 'practice' && styles.activeTab]}
          onPress={() => setCurrentSection('practice')}
        >
          <Text style={[styles.tabText, currentSection === 'practice' && styles.activeTabText]}>
            Practice
          </Text>
        </TouchableOpacity>
      </View>

      {/* Reading Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📖 About Technology in Work</Text>
        <Text style={styles.reading}>{readingText}</Text>
        <TouchableOpacity onPress={() => playAudio(readingText)} style={styles.playAllButton}>
          <Text style={styles.playAllText}>🔊 Play Audio</Text>
        </TouchableOpacity>
      </View>

      {currentSection === 'guidelines' && renderGuidelines()}
      {currentSection === 'examples' && renderExamples()}
      {currentSection === 'practice' && renderPractice()}

      {/* Listening practice (optional for speaking/listening skill) */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🎧 Listening Practice: Tech Support Call</Text>
        <TouchableOpacity onPress={() => playAudio(listeningExercise.audio)} style={styles.playAllButton}>
          <Text style={styles.playAllText}>🔊 Play Listening Audio</Text>
        </TouchableOpacity>
        <Text style={styles.reading}>{listeningExercise.audio}</Text>
        {listeningExercise.questions.map((q, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.exerciseTitle}>{i + 1}. {q.question}</Text>
            {q.options.map((opt, idx) => (
              <Text key={idx} style={styles.tipItem}>{String.fromCharCode(65+idx)}. {opt}</Text>
            ))}
            <Text style={[styles.tipsLabel, {fontStyle:'italic',color:'#999'}]}>Answer: {String.fromCharCode(65+q.correct)} - {q.explanation}</Text>
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
              <Text style={styles.percentageText}>({Math.round((score/quizQuestions.length)*100)}%)</Text>
              {score >= 4 && <Text style={styles.excellentText}>🎉 Excellent! Great tech grammar!</Text>}
              {score === 3 && <Text style={styles.goodText}>👍 Good job! Review and practice more.</Text>}
              {score <= 2 && <Text style={styles.needsWork}>📚 Keep practicing! Review passive & causative passive.</Text>}
              
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
              <Text style={styles.progressText}>Progress: {currentQuiz + 1}/{quizQuestions.length}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${((currentQuiz + 1) / quizQuestions.length) * 100}%` }]} />
              </View>
              <Text style={styles.questionText}>Question {currentQuiz + 1}: {quizQuestions[currentQuiz].question}</Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9FF',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#BE185D',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#F472B6',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 15,
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
    marginTop: 20,
    backgroundColor: '#F59E0B',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quizContainer: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
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
  explanationBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
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
});
