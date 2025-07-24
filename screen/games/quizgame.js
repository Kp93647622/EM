import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Animated, Dimensions, StatusBar, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

const QUESTION_SETS = [
    [
        { q: 'What is the present perfect form of "eat"?', a: ['eats', 'ate', 'has eaten', 'eaten'], c: 2 },
        { q: 'Which is an action verb?', a: ['believe', 'run', 'love', 'know'], c: 1 },
        { q: 'Which is a stative verb?', a: ['write', 'swim', 'own', 'sing'], c: 2 },
        { q: 'What is the past tense of "bring"?', a: ['bringed', 'brought', 'brung', 'brings'], c: 1 },
        { q: 'Which sentence uses present continuous?', a: ['I read books.', 'I am reading a book.', 'I have read a book.', 'I will read a book.'], c: 1 },
        { q: 'What is the third person singular of "try"?', a: ['trys', 'tries', 'tried', 'trying'], c: 1 },
        { q: 'Which is the correct negative form?', a: ['I no like pizza.', "I don't like pizza.", 'I not like pizza.', "I doesn't like pizza."], c: 1 },
        { q: 'What is the past participle of "see"?', a: ['saw', 'seen', 'seeing', 'sees'], c: 1 },
        { q: 'Which sentence is in simple past?', a: ['I was walking.', 'I have walked.', 'I walked.', 'I will walk.'], c: 2 },
        { q: 'What is the base form of "children"?', a: ['child', 'childs', 'childrens', 'children'], c: 0 },
        { q: 'Which is a modal verb?', a: ['want', 'need', 'can', 'like'], c: 2 },
        { q: 'What is the plural of "mouse"?', a: ['mouses', 'mice', 'mouse', 'mousies'], c: 1 },
        { q: 'Which sentence uses "be going to"?', a: ['I will go.', 'I am going to go.', 'I went.', 'I go.'], c: 1 },
        { q: 'What is the comparative form of "good"?', a: ['gooder', 'more good', 'better', 'best'], c: 2 },
        { q: 'Which is a question word?', a: ['because', 'when', 'but', 'and'], c: 1 }
    ],
    // Set 2: Advanced Grammar & Tenses
    [
        { q: 'What is the past perfect of "go"?', a: ['has gone', 'had gone', 'have gone', 'gone'], c: 1 },
        { q: 'Which is a sentence starter adverb?', a: ['beautiful', 'quickly', 'Suddenly', 'run'], c: 2 },
        { q: 'Choose present perfect continuous:', a: ['I was reading.', 'I have read.', 'I have been reading.', 'I will read.'], c: 2 },
        { q: 'Which shows future perfect?', a: ['I will finish.', 'I will have finished.', 'I have finished.', 'I am finishing.'], c: 1 },
        { q: 'What is the past continuous form?', a: ['I walked.', 'I was walking.', 'I have walked.', 'I walk.'], c: 1 },
        { q: 'Which is the correct reported speech?', a: ['He said he is happy.', 'He said he was happy.', 'He said he will be happy.', 'He said he happy.'], c: 1 },
        { q: 'What is the superlative of "far"?', a: ['farer', 'farther', 'farthest', 'most far'], c: 2 },
        { q: 'Which sentence uses subjunctive mood?', a: ['If I were you...', 'If I was you...', 'If I am you...', 'If I will be you...'], c: 0 },
        { q: 'What is the correct tag question?', a: ['You are happy, aren\'t you?', 'You are happy, are you?', 'You are happy, don\'t you?', 'You are happy, isn\'t you?'], c: 0 },
        { q: 'Which is an adverb of frequency?', a: ['quickly', 'always', 'beautiful', 'there'], c: 1 },
        { q: 'What is the past perfect continuous?', a: ['I had been working.', 'I have been working.', 'I was working.', 'I will have been working.'], c: 0 },
        { q: 'Which is a preposition of time?', a: ['under', 'during', 'behind', 'above'], c: 1 },
        { q: 'What is the correct inversion?', a: ['Never I have seen.', 'Never have I seen.', 'Never I seen.', 'Never seen I have.'], c: 1 },
        { q: 'Which is an emphatic structure?', a: ['I do like pizza.', 'I like pizza.', 'I liked pizza.', 'I will like pizza.'], c: 0 },
        { q: 'What is the correct cleft sentence?', a: ['It was John who called.', 'It is John who called.', 'John who called it was.', 'Who called was John.'], c: 0 }
    ],
    
    // Set 3: Complex Tenses & Conclusions
    [
        { q: 'Which uses the past perfect?', a: ['I had finished before noon.', 'I have finished my work.', 'I finish my work.', 'I will finish my work.'], c: 0 },
        { q: 'Which is a phrase to conclude?', a: ['First of all,', 'In conclusion,', 'However,', 'Suddenly,'], c: 1 },
        { q: 'Which is present perfect continuous?', a: ['She studies.', 'She is studying.', 'She has studied.', 'She has been studying.'], c: 3 },
        { q: 'What is the future perfect continuous?', a: ['I will be working.', 'I will have been working.', 'I have been working.', 'I was working.'], c: 1 },
        { q: 'Which is a linking word for contrast?', a: ['Moreover,', 'However,', 'Therefore,', 'Furthermore,'], c: 1 },
        { q: 'What is the mixed conditional?', a: ['If I had studied, I would pass.', 'If I study, I will pass.', 'If I studied, I would pass.', 'If I had studied, I would have passed.'], c: 0 },
        { q: 'Which is a discourse marker?', a: ['beautiful', 'Actually,', 'green', 'quickly'], c: 1 },
        { q: 'What indicates sequence?', a: ['In contrast,', 'Similarly,', 'Subsequently,', 'Nevertheless,'], c: 2 },
        { q: 'Which is a summary phrase?', a: ['In addition,', 'To sum up,', 'For instance,', 'On the other hand,'], c: 1 },
        { q: 'What is the correct emphasis?', a: ['What I need is help.', 'I need help is what.', 'Help is what I need.', 'Need help I what.'], c: 0 },
        { q: 'Which shows cause and effect?', a: ['Despite this,', 'As a result,', 'In contrast,', 'For example,'], c: 1 },
        { q: 'What is the correct inversion after "Only"?', a: ['Only then I realized.', 'Only then realized I.', 'Only then did I realize.', 'Only then I did realize.'], c: 2 },
        { q: 'Which is an example phrase?', a: ['In conclusion,', 'For instance,', 'However,', 'Therefore,'], c: 1 },
        { q: 'What shows addition?', a: ['Nevertheless,', 'Furthermore,', 'Instead,', 'Otherwise,'], c: 1 },
        { q: 'Which is a time expression?', a: ['Meanwhile,', 'Although,', 'Unless,', 'Despite,'], c: 0 }
    ],
    
    // Set 4: Conditionals & Finance
    [
        { q: 'Which is NOT a financial word?', a: ['income', 'expense', 'debt', 'refrigerator'], c: 3 },
        { q: 'Choose a conditional sentence.', a: ['If I have money, I will buy a car.', 'I had money.', 'I will buy a car.', 'Money is important.'], c: 0 },
        { q: 'What is the future perfect form?', a: ['I will have finished.', 'I finish.', 'I have finished.', 'I will finish.'], c: 0 },
        { q: 'Which is a second conditional?', a: ['If I win, I will celebrate.', 'If I won, I would celebrate.', 'If I had won, I would have celebrated.', 'If I am winning, I celebrate.'], c: 1 },
        { q: 'What is a financial institution?', a: ['hospital', 'bank', 'school', 'restaurant'], c: 1 },
        { q: 'Which is a third conditional?', a: ['If I had studied, I would have passed.', 'If I study, I will pass.', 'If I studied, I would pass.', 'If I am studying, I pass.'], c: 0 },
        { q: 'What does "mortgage" mean?', a: ['salary', 'loan for house', 'tax', 'profit'], c: 1 },
        { q: 'Which is a zero conditional?', a: ['If you heat water, it boils.', 'If you heated water, it would boil.', 'If you had heated water, it would have boiled.', 'If you will heat water, it will boil.'], c: 0 },
        { q: 'What is "interest rate"?', a: ['hobby level', 'cost of borrowing', 'fun activity', 'attention span'], c: 1 },
        { q: 'Which is a mixed conditional?', a: ['If I were rich, I would help you.', 'If I had been rich, I would help you.', 'If I am rich, I will help you.', 'If I was rich, I helped you.'], c: 1 },
        { q: 'What is "inflation"?', a: ['tire repair', 'price increases', 'balloon party', 'weight gain'], c: 1 },
        { q: 'Which shows hypothetical situation?', a: ['I wish I were taller.', 'I am tall.', 'I was tall.', 'I will be tall.'], c: 0 },
        { q: 'What is "budget"?', a: ['expensive item', 'financial plan', 'credit card', 'bank account'], c: 1 },
        { q: 'Which is "unless" meaning?', a: ['if not', 'if yes', 'when', 'because'], c: 0 },
        { q: 'What is "dividend"?', a: ['tax payment', 'investment return', 'loan fee', 'salary bonus'], c: 1 }
    ],
    
    // Set 5: Relative Clauses & Essays
    [
        { q: 'Which is a defining relative clause?', a: ['The boy who is running is my brother.', 'My mother, who is a nurse, loves to cook.', 'Learning English is fun.', 'This is, in my opinion, easy.'], c: 0 },
        { q: 'Which phrase shows opinion?', a: ['In my opinion,', 'After that,', 'At the same time,', 'Because'], c: 0 },
        { q: 'A basic essay has:', a: ['Only a title', 'Introduction, body, conclusion', 'Just a paragraph', 'A list'], c: 1 },
        { q: 'Which is a non-defining relative clause?', a: ['The book that I read was good.', 'The book, which I read yesterday, was good.', 'The book I read was good.', 'I read a good book.'], c: 1 },
        { q: 'What is a thesis statement?', a: ['conclusion sentence', 'main argument', 'question', 'example'], c: 1 },
        { q: 'Which relative pronoun is for people?', a: ['which', 'that', 'who', 'where'], c: 2 },
        { q: 'What is a topic sentence?', a: ['last sentence', 'main idea of paragraph', 'question', 'conclusion'], c: 1 },
        { q: 'Which is "whose" usage?', a: ['The man whose car is red.', 'The man which car is red.', 'The man that car is red.', 'The man who car is red.'], c: 0 },
        { q: 'What is supporting evidence?', a: ['main idea', 'examples and facts', 'conclusion', 'introduction'], c: 1 },
        { q: 'Which is a relative adverb?', a: ['who', 'which', 'where', 'that'], c: 2 },
        { q: 'What is coherence in writing?', a: ['long sentences', 'logical flow', 'big words', 'many paragraphs'], c: 1 },
        { q: 'Which is reduced relative clause?', a: ['The man standing there is my father.', 'The man who is standing there is my father.', 'The man stands there is my father.', 'The man is standing there is my father.'], c: 0 },
        { q: 'What is a hook in introduction?', a: ['conclusion', 'attention grabber', 'body paragraph', 'reference'], c: 1 },
        { q: 'Which is correct relative clause?', a: ['The reason why I came.', 'The reason that I came.', 'The reason which I came.', 'The reason who I came.'], c: 0 },
        { q: 'What is transition in essay?', a: ['title', 'connecting words', 'conclusion', 'introduction'], c: 1 }
    ],
    
    // Set 6: Passive Voice & Technology
    [
        { q: 'Which is passive voice?', a: ['Tom eats the cake.', 'The cake was eaten by Tom.', 'Tom is eating the cake.', 'Eat the cake.'], c: 1 },
        { q: 'Which is a causative passive?', a: ['I had my car washed.', 'I washed my car.', 'I have a car.', 'My car is dirty.'], c: 0 },
        { q: 'Which is about future technology?', a: ['Robots are old.', 'Robots are dangerous.', 'Robots will be used in hospitals.', 'Robots eat pizza.'], c: 2 },
        { q: 'What is present passive?', a: ['The letter is written.', 'The letter was written.', 'The letter will be written.', 'The letter has been written.'], c: 0 },
        { q: 'Which is AI technology?', a: ['Machine Learning', 'Cooking', 'Dancing', 'Sleeping'], c: 0 },
        { q: 'What is past passive?', a: ['The house is built.', 'The house was built.', 'The house will be built.', 'The house has been built.'], c: 1 },
        { q: 'Which is virtual reality?', a: ['VR headset experience', 'Reading books', 'Watching TV', 'Playing cards'], c: 0 },
        { q: 'What is future passive?', a: ['The project is completed.', 'The project was completed.', 'The project will be completed.', 'The project has been completed.'], c: 2 },
        { q: 'Which is cloud computing?', a: ['Weather study', 'Online data storage', 'Sky watching', 'Rain prediction'], c: 1 },
        { q: 'What is present perfect passive?', a: ['The work is done.', 'The work was done.', 'The work will be done.', 'The work has been done.'], c: 3 },
        { q: 'Which is blockchain technology?', a: ['Chain making', 'Secure digital records', 'Block building', 'Chain repair'], c: 1 },
        { q: 'What is modal passive?', a: ['The door can be opened.', 'The door is opened.', 'The door was opened.', 'The door has been opened.'], c: 0 },
        { q: 'Which is Internet of Things?', a: ['Online shopping', 'Connected smart devices', 'Internet speed', 'Web browsing'], c: 1 },
        { q: 'What is continuous passive?', a: ['The house is being built.', 'The house is built.', 'The house was built.', 'The house will be built.'], c: 0 },
        { q: 'Which is cybersecurity?', a: ['Computer games', 'Digital protection', 'Internet speed', 'Website design'], c: 1 }
    ],
    
    // Set 7: Phrasal Verbs & Environment
    [
        { q: 'Which is a phrasal verb?', a: ['run quickly', 'look after', 'eat food', 'write well'], c: 1 },
        { q: 'Which is causative (let, make, have)?', a: ['The teacher made us do homework.', 'I did my homework.', 'My homework is easy.', 'Do your homework.'], c: 0 },
        { q: 'Which is an environmental policy?', a: ['Reduce, Reuse, Recycle', 'Play games', 'Eat out', 'Buy a car'], c: 0 },
        { q: 'What does "give up" mean?', a: ['surrender', 'give present', 'stand up', 'wake up'], c: 0 },
        { q: 'Which is renewable energy?', a: ['coal', 'solar power', 'oil', 'gas'], c: 1 },
        { q: 'What does "put off" mean?', a: ['wear clothes', 'postpone', 'turn on', 'take away'], c: 1 },
        { q: 'Which causes global warming?', a: ['greenhouse gases', 'trees', 'water', 'wind'], c: 0 },
        { q: 'What does "turn down" mean?', a: ['accept', 'refuse', 'turn around', 'look down'], c: 1 },
        { q: 'Which is sustainable practice?', a: ['waste reduction', 'overconsumption', 'pollution', 'deforestation'], c: 0 },
        { q: 'What does "break down" mean?', a: ['build up', 'stop working', 'speed up', 'clean up'], c: 1 },
        { q: 'Which is biodegradable?', a: ['plastic bags', 'food waste', 'metal cans', 'glass bottles'], c: 1 },
        { q: 'What does "cut down" mean?', a: ['increase', 'reduce', 'build up', 'speed up'], c: 1 },
        { q: 'Which is eco-friendly transport?', a: ['private car', 'bicycle', 'motorcycle', 'truck'], c: 1 },
        { q: 'What does "come across" mean?', a: ['cross road', 'find by chance', 'arrive', 'leave'], c: 1 },
        { q: 'Which helps conservation?', a: ['water saving', 'waste increase', 'energy waste', 'pollution'], c: 0 }
    ],
    
    // Set 8: Gerunds & Dining
    [
        { q: 'Which is a gerund sentence?', a: ['Swimming is fun.', 'To swim is fun.', 'I swim every day.', 'Swim now!'], c: 0 },
        { q: 'Which is an infinitive?', a: ['I eating pizza.', 'I to eat pizza.', 'I want to eat pizza.', 'I have eaten pizza.'], c: 2 },
        { q: 'Choose a dining request.', a: ['Could I have the menu, please?', 'Turn on the menu.', 'Look after the menu.', 'Have menu quickly!'], c: 0 },
        { q: 'Which is gerund as subject?', a: ['I enjoy reading.', 'Reading is enjoyable.', 'I read books.', 'Read this book.'], c: 1 },
        { q: 'What is a dining etiquette?', a: ['eat with hands', 'chew with mouth open', 'say please and thank you', 'talk loudly'], c: 2 },
        { q: 'Which is gerund as object?', a: ['I like swimming.', 'Swimming is fun.', 'I swim daily.', 'Swim fast!'], c: 0 },
        { q: 'How do you order politely?', a: ['Give me pizza!', 'I want pizza now!', 'I\'d like to order pizza, please.', 'Pizza here!'], c: 2 },
        { q: 'Which is infinitive of purpose?', a: ['I came to help.', 'Coming to help.', 'I help come.', 'Help me come.'], c: 0 },
        { q: 'What is an appetizer?', a: ['main course', 'starter', 'dessert', 'drink'], c: 1 },
        { q: 'Which is gerund after preposition?', a: ['I\'m good at swimming.', 'I\'m good to swim.', 'I swim good.', 'Good swimming I.'], c: 0 },
        { q: 'How do you ask for the bill?', a: ['Money please!', 'Pay now!', 'Could I have the check, please?', 'Bill me!'], c: 2 },
        { q: 'Which is infinitive without "to"?', a: ['I want go.', 'I must go.', 'I going.', 'I to go.'], c: 1 },
        { q: 'What is a course in dining?', a: ['lesson', 'direction', 'part of meal', 'plate'], c: 2 },
        { q: 'Which is gerund or infinitive?', a: ['I enjoy to read.', 'I enjoy reading.', 'I enjoy read.', 'I enjoying read.'], c: 1 },
        { q: 'How do you compliment food?', a: ['This is terrible!', 'This is delicious!', 'This is expensive!', 'This is small!'], c: 1 }
    ]
];
const BOX_COLORS = [
  { bg: '#134385', border: '#1560bd' }, // blue
  { bg: '#4db5f6', border: '#1793c7' }, // sky
  { bg: '#ee70aa', border: '#c53d82' }, // pink
];

export default function QuizGame({ navigation }) {
  const [lessonIdx, setLessonIdx] = useState(0);
  const questions = QUESTION_SETS[lessonIdx];
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  const [answerState, setAnswerState] = useState(null);
  const [showExplain, setShowExplain] = useState(false);

  // Anim
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const scaleAnim = useRef(new Animated.Value(0.97)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const questionShakeAnim = useRef(new Animated.Value(0)).current;

  // เปลี่ยน effect ทุกข้อ
  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(40);
    scaleAnim.setValue(0.97);

    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 480, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 70, friction: 6, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 100, friction: 8, useNativeDriver: true }),
    ]).start();

    Animated.timing(progressAnim, {
      toValue: (idx + 1) / questions.length,
      duration: 400,
      useNativeDriver: false,
    }).start();
    setShowExplain(false);
  }, [idx, lessonIdx]);

  const onAnswer = i => {
    setSelected(i);
    const isCorrect = i === questions[idx].c;
    setAnswerState(isCorrect ? 'correct' : 'wrong');
    setShow(true);
    setShowExplain(true);

    if (!isCorrect) {
      Animated.sequence([
        Animated.timing(questionShakeAnim, { toValue: 12, duration: 80, useNativeDriver: true }),
        Animated.timing(questionShakeAnim, { toValue: -12, duration: 80, useNativeDriver: true }),
        Animated.timing(questionShakeAnim, { toValue: 12, duration: 80, useNativeDriver: true }),
        Animated.timing(questionShakeAnim, { toValue: 0, duration: 80, useNativeDriver: true }),
      ]).start();
    } else {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      setShow(false);
      setSelected(null);
      setAnswerState(null);
      setShowExplain(false);
      setIdx(idx + 1);
    }, 1550);
  };

  // คะแนน
  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return '#10b981';
    if (percentage >= 60) return '#f59e0b';
    return '#ef4444';
  };
  const getScoreEmoji = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return '🏆';
    if (percentage >= 80) return '🎉';
    if (percentage >= 70) return '👏';
    if (percentage >= 60) return '😊';
    return '💪';
  };
  const getEncouragementText = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return 'เยี่ยมมาก! คุณเป็นอัจฉริยะ!';
    if (percentage >= 80) return 'ดีมาก! คุณเก่งจริงๆ!';
    if (percentage >= 70) return 'ดีแล้ว! คุณทำได้ดี!';
    if (percentage >= 60) return 'ผ่านแล้ว! ลองอีกครั้งจะดีขึ้น!';
    return 'ไม่เป็นไร ลองใหม่อีกครั้ง!';
  };

  // ----- เปลี่ยนบท -----
  const LessonSelector = () => (
    <View style={styles.lessonRow}>
      {QUESTION_SETS.map((set, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.lessonBtn, lessonIdx === i && styles.lessonBtnActive]}
          onPress={() => {
            setLessonIdx(i);
            setIdx(0); setScore(0); setSelected(null); setShow(false);
          }}
        >
          <Text style={styles.lessonBtnText}>
            {`บทที่ ${i + 1}`}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // ---- แสดงผลคะแนน ----
  if (idx >= questions.length) {
    return (
      <SafeAreaView style={styles.container}>
        <LessonSelector />
        <View style={styles.resultCard}>
          <Text style={styles.resultEmoji}>{getScoreEmoji()}</Text>
          <Text style={styles.resultTitle}>สำเร็จแล้ว!</Text>
          <Text style={styles.encouragementText}>{getEncouragementText()}</Text>
          <View style={styles.scoreContainerResult}>
            <Text style={[styles.resultScore, { color: getScoreColor() }]}>
              {score} <Text style={styles.totalScore}>/ {questions.length}</Text>
            </Text>
            <Text style={styles.percentageText}>
              {Math.round((score / questions.length) * 100)}%
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => { setIdx(0); setScore(0); }}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>🔄 เริ่มใหม่</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBtn} onPress={() => navigation && navigation.goBack && navigation.goBack()}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>🏠 กลับเมนูหลัก</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // ---- Main Quiz ----
  const boxColor = BOX_COLORS[idx % BOX_COLORS.length];
  return (
    <SafeAreaView style={styles.container}>
      <LessonSelector />
      <Animated.View
  style={[
    styles.questionBox,
    {
      opacity: fadeAnim,
      transform: [
        { translateY: slideAnim },
        { scale: scaleAnim },
        { translateX: questionShakeAnim },
      ],
    }
  ]}
>
  <Text style={styles.questionNumber}>ข้อ {idx + 1}</Text>
  <Text style={styles.question}>{questions[idx].q}</Text>
</Animated.View>


      {/* Progress bar */}
      <View style={styles.progressRow}>
        <View style={styles.progressBarBg}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              }
            ]}
          />
        </View>
        <Text style={styles.progressText}>{idx + 1} / {questions.length}</Text>
      </View>

      {/* ตัวเลือก */}
      <View style={styles.choicesColumn}>
        {questions[idx].a.map((choice, i) => {
          let btnStyle = [styles.choiceBtn];
          let txtStyle = [styles.choiceText];
          const isCorrect = i === questions[idx].c;
          const isSelected = selected === i;
          if (show) {
            if (isSelected && answerState === 'correct') {
              btnStyle.push(styles.choiceBtnCorrect);
              txtStyle.push(styles.choiceTextCorrect);
            } else if (isSelected && answerState === 'wrong') {
              btnStyle.push(styles.choiceBtnWrong);
              txtStyle.push(styles.choiceTextWrong);
            } else if (isCorrect) {
              btnStyle.push(styles.choiceBtnReveal);
              txtStyle.push(styles.choiceTextCorrect);
            }
          }
          return (
            <TouchableOpacity
              key={i}
              style={btnStyle}
              onPress={() => !show && onAnswer(i)}
              disabled={show}
              activeOpacity={0.85}
            >
              <Text style={styles.choiceLetter}>{String.fromCharCode(65 + i)}</Text>
              <Text style={txtStyle}>{choice}</Text>
              {show && isSelected && answerState === 'correct' && <Text style={styles.correctIcon}>✓</Text>}
              {show && isSelected && answerState === 'wrong' && <Text style={styles.wrongIcon}>✗</Text>}
              {show && !isSelected && isCorrect && <Text style={styles.correctIcon}>✓</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

// ----- Style -----
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#e8f0fe',
    alignItems: 'center',
  },
  lessonRow: {
    flexDirection: 'row',
    marginTop: 18,
    marginBottom: 5,
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  lessonBtn: {
    backgroundColor: '#cbd6ee',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 9,
    marginRight: 6,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: '#e8f0fe',
  },
  lessonBtnActive: {
    backgroundColor: '#ffff',
    borderColor: '#1853a0',
  },
  lessonBtnText: {
    fontWeight: 'bold',
    color: '#283f6b',
    fontSize: 16,
  },
  questionBox: {
  width: '100%',
  backgroundColor: '#184CA6', // น้ำเงินเข้ม หรือเลือกสีที่ต้องการ
  borderRadius: 24,
  paddingVertical: 32,
  paddingHorizontal: 20,
  marginTop: 28,
  marginBottom: 16,
  shadowColor: '#8bb9fa',
  shadowOpacity: 0.13,
  shadowRadius: 18,
  shadowOffset: { width: 0, height: 7 },
  borderWidth: 1.5,
  borderColor: '#184CA6', // น้ำเงินเข้ม หรือเลือกสีที่เหมาะสม
  alignItems: 'center',
  position: 'relative',
  elevation: 2,
  zIndex: 1,
},
question: {
  fontSize: 23,
  fontWeight: '600',
  color: '#fff', // ให้เป็นสีขาวตลอด
  textAlign: 'center',
  lineHeight: 33,
},
questionNumber: {
  fontSize: 34, // ขนาดใหญ่ขึ้น
  fontWeight: '700',
  color: '#fff', // สีขาวตลอด
  marginBottom: 12,
  opacity: 0.97,
},

  questionText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 30,
    marginTop: 4,
    marginBottom: 2,
  },
  explainBox: {
    backgroundColor: '#fff9ef',
    marginTop: 18,
    borderRadius: 12,
    padding: 10,
    width: '99%',
    borderWidth: 1,
    borderColor: '#efd9c4'
  },
  explainText: {
    color: '#924600',
    fontSize: 15,
    fontWeight: '500',
  },
  progressRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 13,
    marginTop: 4,
  },
  progressBarBg: {
    flex: 1,
    height: 10,
    backgroundColor: '#dbeafe',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#38bdf8',
    borderRadius: 10,
  },
  progressText: {
    color: '#475569',
    fontSize: 15,
    fontWeight: '600',
    width: 50,
    textAlign: 'right',
  },
  choicesColumn: {
    width: '100%',
    gap: 13,
    marginTop: 5,
    flex: 1,
    marginBottom: 10,
  },
  choiceBtn: {
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 13,
    marginBottom: 2,
    marginTop: 2,
    backgroundColor: '#fff',
    borderWidth: 1.7,
    borderColor: '#dbeafe',
    shadowColor: '#b5c9ff',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
  },
  choiceLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#7aa4f8',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 32,
    marginRight: 9,
  },
  choiceText: {
    fontSize: 17,
    color: '#232b41',
    fontWeight: '500',
    flexShrink: 1,
    flexGrow: 1,
    lineHeight: 23,
  },
  correctIcon: {
    color: '#22c55e',
    fontSize: 19,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  wrongIcon: {
    color: '#ef4444',
    fontSize: 19,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  choiceBtnCorrect: {
    borderColor: '#22c55e',
    backgroundColor: '#e6fff5',
  },
  choiceTextCorrect: {
    color: '#148463',
    fontWeight: '700',
  },
  choiceBtnWrong: {
    borderColor: '#ef4444',
    backgroundColor: '#fff2f2',
  },
  choiceTextWrong: {
    color: '#991b1b',
    fontWeight: '700',
  },
  choiceBtnReveal: {
    borderColor: '#a7f3d0',
    backgroundColor: '#e3fcec',
  },
  // Result styles
  resultCard: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 25,
    padding: 35,
    alignItems: 'center',
    width: '100%',
    borderColor: 'rgba(141,182,246,0.13)',
    borderWidth: 1,
    marginTop: 34,
  },
  resultEmoji: {
    fontSize: 65,
    marginBottom: 18,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1b1e35',
    marginBottom: 8,
  },
  encouragementText: {
    fontSize: 18,
    color: '#41507a',
    marginBottom: 18,
    textAlign: 'center',
  },
  scoreContainerResult: {
    alignItems: 'center',
    marginBottom: 12,
  },
  resultScore: {
    fontSize: 44,
    fontWeight: 'bold',
  },
  totalScore: {
    fontSize: 23,
    color: '#3e5067',
  },
  percentageText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#184d71',
  },
  buttonContainer: {
    width: '100%',
    gap: 13,
    marginTop: 13,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 28,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#dde7fa',
    shadowColor: '#000',
    shadowOpacity: 0.09,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginBottom: 7,
  },
  buttonText: {
    color: '#2e3566',
    fontWeight: 'bold',
    fontSize: 17,
  },
  menuBtn: {
    marginTop: 3,
  },
});