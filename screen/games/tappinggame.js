import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// 8 Lesson (แต่ละชุด 4 ข้อเป็นตัวอย่าง)
const QUIZ_CONTENT = [
  [
    { q: 'Which is the correct present perfect sentence?', a: [
      'I have eat breakfast.',
      'I have eaten breakfast.',
      'I eats breakfast.',
      'I am eating breakfast.'
    ], c: 1 },
    { q: 'What is the past participle of "see"?', a: [
      'see', 'saw', 'seen', 'seeing'
    ], c: 2 },
    { q: 'Which adverb is often used with present perfect?', a: [
      'always', 'never', 'sometimes', 'yesterday'
    ], c: 1 },
    { q: 'Choose the stative verb:', a: [
      'run', 'believe', 'swim', 'drive'
    ], c: 1 }
  ],
  [
    { q: 'What is the correct past perfect sentence?', a: [
      'She has finished her work.',
      'She had finished her work.',
      'She finishing her work.',
      'She was finished her work.'
    ], c: 1 },
    { q: 'Past perfect continuous tense form:', a: [
      'had been working', 'has been work', 'have working', 'was work'
    ], c: 0 },
    { q: 'Which is NOT an action verb?', a: [
      'play', 'think', 'eat', 'run'
    ], c: 1 },
    { q: 'What does "already" mean in "She had already left"?', a: [
      'still', 'before now', 'after', 'never'
    ], c: 1 }
  ],
  [
    { q: 'Which is a time expression?', a: [
      'before', 'cat', 'blue', 'tree'
    ], c: 0 },
    { q: 'Choose the sequence word:', a: [
      'run', 'finally', 'swim', 'big'
    ], c: 1 },
    { q: 'Which is the simple past?', a: [
      'I go', 'I going', 'I went', 'I have gone'
    ], c: 2 },
    { q: 'What is the subject-verb agreement for "he"?', a: [
      'play', 'plays', 'playing', 'played'
    ], c: 1 }
  ],
  [
    { q: 'Which is a zero conditional?', a: [
      'If it rains, I stay inside.', 'If I were you, I would run.', 'If he studies, he passed.', 'If I had known, I go.'
    ], c: 0 },
    { q: 'Which is a modal verb?', a: [
      'have', 'should', 'did', 'has'
    ], c: 1 },
    { q: 'Which is NOT a type of income?', a: [
      'salary', 'wage', 'debt', 'profit'
    ], c: 2 },
    { q: 'Which is a financial term?', a: [
      'swim', 'profit', 'drive', 'cat'
    ], c: 1 }
  ],
  [
    { q: 'Which is a relative pronoun?', a: [
      'who', 'jump', 'book', 'quick'
    ], c: 0 },
    { q: 'What is a topic sentence?', a: [
      'A sentence about a topic', 'Main idea of a paragraph', 'A question', 'A conclusion'
    ], c: 1 },
    { q: 'Choose the correct essay part:', a: [
      'hook', 'dog', 'green', 'run'
    ], c: 0 },
    { q: 'Which means "opinion"?', a: [
      'fact', 'swim', 'belief', 'car'
    ], c: 2 }
  ],
  [
    { q: 'Which is passive voice?', a: [
      'Mark wrote the book.', 'The book was written by Mark.', 'Mark write the book.', 'The book writes Mark.'
    ], c: 1 },
    { q: 'Which is an invention?', a: [
      'car', 'run', 'sing', 'blue'
    ], c: 0 },
    { q: 'Which is a tech word?', a: [
      'cloud computing', 'run', 'tree', 'love'
    ], c: 0 },
    { q: 'Choose a passive verb:', a: [
      'is made', 'make', 'making', 'makes'
    ], c: 0 }
  ],
  [
    { q: 'Which is a phrasal verb?', a: [
      'turn on', 'jump', 'blue', 'eat'
    ], c: 0 },
    { q: 'Which is eco-friendly?', a: [
      'recycle', 'drive fast', 'litter', 'waste water'
    ], c: 0 },
    { q: 'What is global warming?', a: [
      'Earth is cooling', 'Increase in Earth\'s temperature', 'Swim in sea', 'Eat food'
    ], c: 1 },
    { q: 'Choose a sustainability term:', a: [
      'energy efficiency', 'cat', 'swim', 'play'
    ], c: 0 }
  ],
  [
    { q: 'What is a gerund?', a: [
      '-ing form used as noun', 'Past verb', 'A tense', 'A food'
    ], c: 0 },
    { q: 'Which is an infinitive?', a: [
      'to eat', 'eat', 'eating', 'ate'
    ], c: 0 },
    { q: 'Which is a polite request?', a: [
      '"Give me!"', '"Could I have the bill, please?"', '"Where is it?"', '"Eat now!"'
    ], c: 1 },
    { q: 'Choose a dessert:', a: [
      'main course', 'appetizer', 'cake', 'salad'
    ], c: 2 }
  ]
];

const lessonTitles = [
  "Present Perfect", "Past Perfect & Cont.", "Time & Sequence",
  "Conditional, Finance", "Relative & Essay", "Passive & Tech",
  "Phrasal, Environment", "Gerund, Food",
];

export default function QuizGame({ navigation }) {
  const [stage, setStage] = useState('lesson'); // 'lesson', 'welcome', 'howto', 'quiz', 'result'
  const [lessonIndex, setLessonIndex] = useState(null);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  const [answerState, setAnswerState] = useState(null);

  // -- หน้าเลือกบท --
  if (stage === 'lesson') {
    return (
      <LinearGradient colors={['#e0e7ff', '#a5b4fc', '#818cf8']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 18 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#4338ca', marginBottom: 22 }}>
            เลือกบทเรียน
          </Text>
          <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 60 }}>
            {lessonTitles.map((title, i) => (
              <TouchableOpacity
                key={i}
                style={[qstyles.lessonBtn, { borderLeftColor: '#6366f1' }]}
                onPress={() => {
                  setLessonIndex(i);
                  setStage('welcome');
                  setIdx(0);
                  setScore(0);
                }}
              >
                <Text style={{ fontSize: 18, color: '#4338ca', fontWeight: 'bold' }}>
                  {`บทที่ ${i + 1}`} <Text style={{ color: '#2563eb', fontWeight: 'normal' }}>{title}</Text>
                </Text>
                <Text style={{ color: '#64748b', fontSize: 15, marginTop: 4 }}>
                  {QUIZ_CONTENT[i].length} ข้อ
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // -- หน้า Welcome --
  if (stage === 'welcome') {
    return (
      <LinearGradient colors={['#e0e7ff', '#a5b4fc', '#818cf8']} style={{ flex: 1 }}>
        <SafeAreaView style={qstyles.container}>
          <Text style={qstyles.welcomeTitle}>Quiz Game</Text>
          <Text style={qstyles.welcomeSubtitle}>แบบทดสอบภาษาอังกฤษ ม.5</Text>
          <Text style={{color:'#4f46e5',fontWeight:'bold',marginBottom:18,fontSize:16}}>
            Lesson: {lessonTitles[lessonIndex]}
          </Text>
          <TouchableOpacity style={qstyles.startBtn} onPress={() => setStage('howto')}>
            <Text style={qstyles.startText}>เริ่มเกม</Text>
          </TouchableOpacity>
          <TouchableOpacity style={qstyles.menuBtn} onPress={() => setStage('lesson')}>
            <Text style={qstyles.menuText}>⬅️ กลับเลือกบท</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // -- หน้า How To --
  if (stage === 'howto') {
    return (
      <LinearGradient colors={['#e0e7ff', '#a5b4fc', '#818cf8']} style={{ flex: 1 }}>
        <SafeAreaView style={qstyles.container}>
          <Text style={qstyles.howtoTitle}>วิธีการเล่น</Text>
          <View style={qstyles.guideBox}>
            <Text style={qstyles.howtoText}>• มีคำถาม {QUIZ_CONTENT[lessonIndex].length} ข้อ (1 คำตอบต่อข้อ)</Text>
            <Text style={qstyles.howtoText}>• แตะเลือกคำตอบที่คิดว่าถูกต้อง</Text>
            <Text style={qstyles.howtoText}>• ตอบแล้วจะรู้ผลทันที และมีคะแนนรวมตอนจบ</Text>
          </View>
          <TouchableOpacity style={qstyles.startBtn} onPress={() => setStage('quiz')}>
            <Text style={qstyles.startText}>ถัดไป</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // -- หน้า Quiz (core) --
  const questions = QUIZ_CONTENT[lessonIndex];
  if (stage === 'quiz' && idx >= questions.length) {
    setStage('result');
    return null;
  }

  // -- หน้า Result --
  if (stage === 'result') {
    return (
      <LinearGradient colors={['#e0e7ff', '#a5b4fc', '#818cf8']} style={{ flex: 1 }}>
        <SafeAreaView style={qstyles.container}>
          <Text style={qstyles.result}>Your Score: <Text style={{color:'#10b981'}}>{score}</Text> / {questions.length}</Text>
          <TouchableOpacity style={qstyles.resetBtn} onPress={() => { setStage('lesson'); setScore(0); }}>
            <Text style={qstyles.resetText}>🔄 กลับเลือกบท</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // --- Quiz Question ---
  const onAnswer = i => {
    setSelected(i);
    if (i === questions[idx].c) {
      setScore(s => s + 1);
      setAnswerState('correct');
    } else {
      setAnswerState('wrong');
    }
    setShow(true);
    setTimeout(() => {
      setShow(false);
      setSelected(null);
      setAnswerState(null);
      setIdx(idx + 1);
    }, 900);
  };

  const progress = (idx + 1) / questions.length;

  return (
    <LinearGradient colors={['#e0e7ff', '#a5b4fc', '#818cf8']} style={{ flex: 1 }}>
      <SafeAreaView style={qstyles.container}>
        <View style={qstyles.progressBarBox}>
          <View style={qstyles.progressBar}>
            <View style={[qstyles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={qstyles.progressText}>{idx + 1} / {questions.length}</Text>
        </View>
        <Text style={qstyles.question}>{idx + 1}. {questions[idx].q}</Text>
        {questions[idx].a.map((choice, i) => {
          let btnStyle = [qstyles.choiceBtn];
          let txtStyle = [qstyles.choiceText];

          if (show && selected === i) {
            if (answerState === 'correct') {
              btnStyle.push(qstyles.choiceBtnCorrect);
              txtStyle.push(qstyles.choiceTextCorrect);
            } else {
              btnStyle.push(qstyles.choiceBtnWrong);
              txtStyle.push(qstyles.choiceTextWrong);
            }
          } else if (show && questions[idx].c === i) {
            btnStyle.push(qstyles.choiceBtnCorrectDim);
            txtStyle.push(qstyles.choiceTextCorrectDim);
          }

          return (
            <TouchableOpacity
              key={i}
              style={btnStyle}
              onPress={() => !show && onAnswer(i)}
              disabled={show}
              activeOpacity={show ? 1 : 0.8}
            >
              <Text style={txtStyle}>{choice}</Text>
            </TouchableOpacity>
          );
        })}
        {show && (
          <Text style={[
            qstyles.feedback,
            answerState === 'correct'
              ? qstyles.feedbackCorrect
              : qstyles.feedbackWrong
          ]}>
            {answerState === 'correct' ? '✅ ถูกต้อง!' : '❌ ผิด'}
          </Text>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const qstyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
    backgroundColor: 'transparent',
  },
  progressBarBox: { width: '92%', alignItems: 'center', marginBottom: 20 },
  progressBar: { width: '100%', height: 9, backgroundColor: '#e0e7ff', borderRadius: 10, marginBottom: 2, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#6366f1', borderRadius: 8 },
  progressText: { color: '#4f46e5', fontSize: 14, fontWeight: '500', marginBottom: 8 },
  welcomeTitle: { fontSize: 30, fontWeight: 'bold', color: '#4338ca', marginBottom: 8, letterSpacing: 1.1 },
  welcomeSubtitle: { fontSize: 20, color: '#2563eb', marginBottom: 22, fontWeight: '500' },
  howtoTitle: { fontSize: 23, fontWeight: 'bold', color: '#2563eb', marginBottom: 16, letterSpacing: 0.2 },
  guideBox: {
    backgroundColor: '#f1f5f9', borderRadius: 13, padding: 17, marginBottom: 26, width: 320,
    maxWidth: '90%', shadowColor: '#6366f1', shadowOpacity: 0.10, shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 }, elevation: 1,
  },
  howtoText: { fontSize: 17, color: '#374151', marginBottom: 7, letterSpacing: 0.1 },
  startBtn: {
    backgroundColor: '#6366f1', paddingVertical: 14, paddingHorizontal: 46, borderRadius: 13,
    marginTop: 12, alignSelf: 'center', shadowColor: '#6366f1', shadowOpacity: 0.15,
    shadowRadius: 4, elevation: 2,
  },
  startText: { color: '#fff', fontWeight: 'bold', fontSize: 19, letterSpacing: 0.18 },
  lessonBtn: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 15,
    width: 320, maxWidth: '95%', borderLeftWidth: 6, borderColor: 'transparent',
    shadowColor: '#a5b4fc', shadowOpacity: 0.10, shadowRadius: 6, elevation: 2,
  },
  question: { fontSize: 22, fontWeight: 'bold', marginBottom: 27, color: '#2563eb', textAlign: 'center', letterSpacing: 0.16 },
  choiceBtn: {
    backgroundColor: '#fff', padding: 17, borderRadius: 19, marginVertical: 8, minWidth: 260,
    alignItems: 'center', borderWidth: 2, borderColor: 'transparent', elevation: 4,
    shadowColor: '#a5b4fc', shadowOpacity: 0.13, shadowRadius: 7, shadowOffset: { width: 0, height: 3 },
  },
  choiceBtnCorrect: { backgroundColor: '#bbf7d0', borderColor: '#22c55e' },
  choiceBtnWrong: { backgroundColor: '#fecaca', borderColor: '#ef4444' },
  choiceBtnCorrectDim: { backgroundColor: '#a7f3d0', borderColor: '#10b981' },
  choiceText: { fontSize: 18.5, color: '#1e293b', fontWeight: '500', textAlign: 'center' },
  choiceTextCorrect: { color: '#15803d', fontWeight: 'bold' },
  choiceTextWrong: { color: '#b91c1c', fontWeight: 'bold' },
  choiceTextCorrectDim: { color: '#047857' },
  feedback: {
    marginTop: 24, fontSize: 18, fontWeight: 'bold', padding: 6,
    paddingHorizontal: 20, borderRadius: 10, textAlign: 'center',
  },
  feedbackCorrect: { color: '#22c55e', backgroundColor: '#f0fdf4', borderColor: '#bbf7d0', borderWidth: 2 },
  feedbackWrong: { color: '#ef4444', backgroundColor: '#fef2f2', borderColor: '#fecaca', borderWidth: 2 },
  result: { fontSize: 26, fontWeight: 'bold', color: '#4f46e5', marginBottom: 16, textAlign: 'center' },
  resetBtn: {
    backgroundColor: '#6366f1', padding: 15, borderRadius: 13, marginTop: 22, minWidth: 200,
    alignItems: 'center', alignSelf: 'center', shadowColor: '#6366f1', shadowOpacity: 0.15,
    shadowRadius: 4, elevation: 2,
  },
  resetText: { color: '#fff', fontWeight: 'bold', fontSize: 17.5, letterSpacing: 0.16 },
  menuBtn: {
    marginTop: 18, paddingVertical: 11, paddingHorizontal: 40,
    backgroundColor: '#f1f5f9', borderRadius: 11, borderWidth: 1, borderColor: '#a5b4fc', alignSelf: 'center',
  },
  menuText: { color: '#2563eb', fontWeight: '700', fontSize: 16 },
});
