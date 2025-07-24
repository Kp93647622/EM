import React, { useState, useEffect } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Dimensions, StatusBar, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// ---------- 1. คำศัพท์และวลี 8 บท ----------
const SCRAMBLE_WORDS = [
  // 1. Present Perfect
  [
    { word: 'HAVE GONE', hint: 'present perfect: They _____ to London.' },
    { word: 'ACTION', hint: 'verb showing physical movement' },
    { word: 'STATIVE', hint: 'verb showing state of mind/being' },
    { word: 'EXPERIENCE', hint: 'I have never had this _____ before.' },
    { word: 'PRESENT PERFECT', hint: 'verb tense: I have eaten.' },
    { word: 'EATEN', hint: 'past participle of "eat"' },
    { word: 'HAS BEEN', hint: 'present perfect: She _____ here for years.' },
    { word: 'PAST TENSE', hint: 'verb tense: I walked.' },
    { word: 'NEVER', hint: 'adverb: I have _____ seen it.' },
    { word: 'FOR', hint: 'used for periods of time' },
    { word: 'SINCE', hint: 'used for starting points' },
    { word: 'HAVE SEEN', hint: 'present perfect: I _____ that movie.' },
    { word: 'ALREADY', hint: 'adverb: I have _____ finished.' },
    { word: 'JUST', hint: 'present perfect: I have _____ arrived.' },
    { word: 'BEEN', hint: 'present perfect: She has _____ my friend.' },
  ],
  // 2. Past Perfect & Cont.
  [
    { word: 'HAD STUDIED', hint: 'past perfect: She _____ before the exam.' },
    { word: 'ALREADY', hint: 'adverb: I have _____ finished.' },
    { word: 'SINCE', hint: 'used with present perfect/present perfect continuous' },
    { word: 'BEEN WORKING', hint: 'present perfect continuous: I have _____ here for years.' },
    { word: 'JUST', hint: 'present perfect: I have _____ arrived.' },
    { word: 'IN CONCLUSION', hint: 'phrase to conclude an essay' },
    { word: 'FOR', hint: 'present perfect: used for periods of time' },
    { word: 'HAD LEFT', hint: 'past perfect: He _____ when I arrived.' },
    { word: 'HAS FINISHED', hint: 'present perfect: He _____ his homework.' },
    { word: 'ALREADY', hint: 'adverb for finished actions' },
    { word: 'HAVE BEEN', hint: 'present perfect: I _____ there before.' },
    { word: 'PAST PERFECT', hint: 'verb tense: I had gone.' },
    { word: 'HAVE HAD', hint: 'present perfect: I _____ enough.' },
    { word: 'JUST', hint: 'present perfect: I have _____ met her.' },
    { word: 'NEVER', hint: 'adverb: I have _____ done this.' },
  ],
  // 3. Time & Sequence
  [
    { word: 'JUST', hint: 'present perfect: I have _____ finished.' },
    { word: 'ALREADY', hint: 'adverb: I have _____ completed.' },
    { word: 'HAD BEEN', hint: 'past perfect continuous: I _____ working.' },
    { word: 'TIME EXPRESSION', hint: 'phrase: "for years", "since 2020" etc.' },
    { word: 'IN CONCLUSION', hint: 'essay: to sum up' },
    { word: 'SEQUENCE', hint: 'First, next, finally are _____ words.' },
    { word: 'PRESENT PERFECT', hint: 'verb tense: I have played.' },
    { word: 'EVER', hint: 'adverb: Have you _____ seen it?' },
    { word: 'YET', hint: 'adverb: Have you finished _____?' },
    { word: 'HAVE BEEN', hint: 'present perfect: I _____ tired recently.' },
    { word: 'ALREADY', hint: 'adverb for finished actions' },
    { word: 'NEVER', hint: 'adverb: I have _____ done that.' },
    { word: 'RECENTLY', hint: 'adverb: Have you met him _____?' },
    { word: 'SIMPLE PAST', hint: 'verb tense: I went.' },
    { word: 'SUBJECT VERB', hint: 'grammar: She eats, We play (___ ___ agreement).' },
  ],
  // 4. Conditional, Finance
  [
    { word: 'CONDITIONAL', hint: 'If I were you, I would... (type of sentence)' },
    { word: 'EXPENSES', hint: 'money you spend' },
    { word: 'MODAL', hint: 'must, should, would, could are...' },
    { word: 'WILL HAVE PAID', hint: 'future perfect: I _____ by next Friday.' },
    { word: 'WOULD GO', hint: 'second conditional: I _____ if I had money.' },
    { word: 'ZERO CONDITIONAL', hint: 'If you heat ice, it melts.' },
    { word: 'MUST', hint: 'modal verb for necessity' },
    { word: 'COULD', hint: 'modal verb for possibility' },
    { word: 'SHOULD', hint: 'modal verb for advice' },
    { word: 'BUDGET', hint: 'plan how to spend money' },
    { word: 'SAVINGS', hint: 'money you keep for future' },
    { word: 'PROFIT', hint: 'money earned minus cost' },
    { word: 'CREDIT CARD', hint: 'a card to buy things now, pay later' },
    { word: 'INTEREST', hint: 'money earned from savings or paid for loans' },
    { word: 'INCOME', hint: 'money received (usually regularly)' },
  ],
  // 5. Relative & Essay
  [
    { word: 'DEFINING', hint: 'type of relative clause: "The boy who called..."' },
    { word: 'OPINION', hint: 'In my _____, ...' },
    { word: 'CONCLUSION', hint: 'last paragraph of an essay' },
    { word: 'CHARACTERISTIC', hint: 'another word for personality trait' },
    { word: 'WHO', hint: 'relative pronoun for people' },
    { word: 'WHICH', hint: 'relative pronoun for things/animals' },
    { word: 'WHERE', hint: 'relative pronoun for places' },
    { word: 'TOPIC SENTENCE', hint: 'main idea of a paragraph' },
    { word: 'SUPPORTING SENTENCE', hint: 'sentence that gives details/facts' },
    { word: 'TRANSITION', hint: 'words like "however", "also", "therefore"' },
    { word: 'HOOK', hint: 'attention grabber at beginning of essay' },
    { word: 'THESIS STATEMENT', hint: 'main argument of an essay' },
    { word: 'NONDEFINING', hint: 'My mother, who is a nurse, ... (type of clause)' },
    { word: 'RELATIVE PRONOUN', hint: 'who, which, that, where, whose' },
    { word: 'COHERENCE', hint: 'logical flow of ideas' },
  ],
  // 6. Passive & Tech
  [
    { word: 'PASSIVE VOICE', hint: 'The book was written by Mark.' },
    { word: 'INVENTION', hint: 'a newly created device or process' },
    { word: 'CAUSE', hint: 'to make something happen (verb form)' },
    { word: 'HAD MY BAG STOLEN', hint: 'causative passive: I _____ yesterday.' },
    { word: 'BEEN BUILT', hint: 'The bridge has _____ recently.' },
    { word: 'IS MADE', hint: 'passive: The cake _____ by Jane.' },
    { word: 'WAS TAKEN', hint: 'passive: My photo _____ by Tom.' },
    { word: 'WILL BE OPENED', hint: 'passive: The shop _____ at 9 AM.' },
    { word: 'IS CALLED', hint: 'passive: It _____ English.' },
    { word: 'BY', hint: 'passive agent word: The letter was written ___ Sam.' },
    { word: 'ARE USED', hint: 'passive: Robots _____ in hospitals.' },
    { word: 'MACHINE LEARNING', hint: 'AI technology for pattern recognition' },
    { word: 'VIRTUAL REALITY', hint: 'technology: VR' },
    { word: 'CLOUD COMPUTING', hint: 'online data storage & computing' },
    { word: 'CYBERSECURITY', hint: 'technology: protection of computer systems' },
  ],
  // 7. Phrasal, Environment
  [
    { word: 'REUSE', hint: 'environmental policy: reduce, _____, recycle' },
    { word: 'MAKES', hint: 'causative verb: The teacher _____ me study.' },
    { word: 'TURN ON', hint: 'phrasal verb: to switch on a device' },
    { word: 'LET', hint: 'causative: to allow someone to do something' },
    { word: 'PHRASAL VERB', hint: 'look after, turn off, take care of, etc.' },
    { word: 'SUSTAINABILITY', hint: 'using resources carefully for future' },
    { word: 'GLOBAL WARMING', hint: 'increase in Earth\'s temperature' },
    { word: 'BIODEGRADABLE', hint: 'able to be broken down naturally' },
    { word: 'ECO FRIENDLY', hint: 'good for the environment' },
    { word: 'SOLAR ENERGY', hint: 'renewable energy from the sun' },
    { word: 'WASTE REDUCTION', hint: 'less garbage production' },
    { word: 'WATER CONSERVATION', hint: 'using less water' },
    { word: 'ENERGY EFFICIENCY', hint: 'using less power for the same work' },
    { word: 'PUBLIC TRANSPORT', hint: 'buses, trains, not private cars' },
    { word: 'RECYCLE', hint: 'use materials again (like glass, plastic)' },
  ],
  // 8. Gerund, Food
  [
    { word: 'GERUND', hint: '-ing form used as a noun' },
    { word: 'ORDERING', hint: 'I am _____ food at the restaurant.' },
    { word: 'TO EAT', hint: 'infinitive: I want _____.' },
    { word: 'INTERESTING', hint: 'That movie is very _____.' },
    { word: 'TO DRINK', hint: 'Would you like something _____?' },
    { word: 'RESERVATION', hint: 'booking a table at a restaurant' },
    { word: 'MENU', hint: 'list of food in restaurant' },
    { word: 'APPETIZER', hint: 'starter dish before main meal' },
    { word: 'MAIN COURSE', hint: 'the main dish of a meal' },
    { word: 'DESSERT', hint: 'sweet dish at the end of a meal' },
    { word: 'POLITE REQUEST', hint: '"Could I have the bill, please?" is a ___ ___.' },
    { word: 'TAKE AWAY', hint: 'order food to eat elsewhere' },
    { word: 'DELICIOUS', hint: 'The food is very _____.' },
    { word: 'RECOMMEND', hint: 'to suggest a dish or restaurant' },
    { word: 'ENJOY', hint: 'to like eating or doing something' },
  ],
];
const lessonTitles = [
  "Present Perfect", "Past Perfect & Cont.", "Time & Sequence",
  "Conditional, Finance", "Relative & Essay", "Passive & Tech",
  "Phrasal, Environment", "Gerund, Food",
];
const lessonIcons = ['⏳', '🕰️', '📅', '💸', '📝', '🤖', '🌱', '🍽️'];

// ---------- 2. Shuffle ฟังก์ชัน ----------
function shuffleWordArray(word) {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
// ---------- 3. ตัวหลัก WordScramble ----------
export default function WordScramble() {
  const [screen, setScreen] = useState(-3);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);
  const [letters, setLetters] = useState([]);
  const [flash, setFlash] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [ended, setEnded] = useState(false);
  const [allScores, setAllScores] = useState(Array(8).fill(null)); // null = ยังไม่เล่น, number = คะแนน

  useEffect(() => {
    if (screen >= 0 && SCRAMBLE_WORDS[lessonIndex][page]) {
      setSelected([]);
      setLetters(shuffleWordArray(SCRAMBLE_WORDS[lessonIndex][page].word));
      setFlash(null);
      setShowAnswer(false);
    }
  }, [screen, lessonIndex, page]);

  // แตะตัวอักษร
  const selectedIndices = selected.map(s => s.letterIdx);
  const onLetter = (l, letterIdx) => {
    if (
      screen >= 0 &&
      selected.length < SCRAMBLE_WORDS[lessonIndex][page].word.length &&
      !selectedIndices.includes(letterIdx)
    ) {
      setSelected([...selected, { l, letterIdx }]);
      setFlash(null);
    }
  };

  // แตะ Space
  const onSpace = () => {
    const answer = SCRAMBLE_WORDS[lessonIndex][page].word;
    const indices = selected.map(s => s.letterIdx);
    const allSpaces = [];
    answer.split('').forEach((c, idx) => { if (c === ' ') allSpaces.push(idx); });
    const unused = allSpaces.filter(idx => !indices.includes(idx));
    if (unused.length > 0) {
      setSelected([...selected, { l: ' ', letterIdx: unused[0] }]);
      setFlash(null);
    }
  };

  function check() {
    const word = selected.map(s => s.l).join('');
    const answer = SCRAMBLE_WORDS[lessonIndex][page].word;
    if (word === answer) {
      setScore(s => s + 1);
      setFlash("correct");
      setTimeout(() => {
        setPage(p => p + 1);
        setSelected([]);
        setShowAnswer(false);
      }, 600);
    } else {
      setFlash("wrong");
      setShowAnswer(true);
    }
  }

  function clear() {
    setSelected([]);
    setFlash(null);
    setShowAnswer(false);
  }

  // ----------- หน้าเลือกบท + สรุปคะแนนรวม -----------
  if (screen === -3)
    return (
      <LinearGradient colors={['#d0e1fa', '#a6b6e9', '#e3e8f8']} style={wsstyles.bg}>
        <SafeAreaView style={[wsstyles.container, { justifyContent: 'flex-start' }]}>
          <View style={wsstyles.lessonHeaderBar}>
            <Text style={wsstyles.lessonHeaderText}>เลือกบทเรียน</Text>
          </View>
          <View style={wsstyles.lessonGridBox}>
            {/* 2 columns: left (1-4), right (5-8) */}
            <View style={wsstyles.lessonColumn}>
              {[0, 1, 2, 3].map(i => (
                <TouchableOpacity
                  key={i}
                  style={[wsstyles.lessonCard, wsstyles.lessonCardColors[i]]}
                  onPress={() => {
                    setLessonIndex(i);
                    setScreen(-2);
                    setPage(0);
                    setScore(0);
                    setEnded(false);
                  }}
                  activeOpacity={0.85}
                >
                  <Text style={wsstyles.lessonCardText}>
                    {lessonIcons[i]}  {i + 1}. {lessonTitles[i]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={wsstyles.lessonColumn}>
              {[4, 5, 6, 7].map(i => (
                <TouchableOpacity
                  key={i}
                  style={[wsstyles.lessonCard, wsstyles.lessonCardColors[i]]}
                  onPress={() => {
                    setLessonIndex(i);
                    setScreen(-2);
                    setPage(0);
                    setScore(0);
                    setEnded(false);
                  }}
                  activeOpacity={0.85}
                >
                  <Text style={wsstyles.lessonCardText}>
                    {lessonIcons[i]}  {i + 1}. {lessonTitles[i]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <ScrollView style={wsstyles.reportScroll} contentContainerStyle={{ paddingVertical: 8 }}>
            <Text style={wsstyles.reportTitle}>📊 สรุปคะแนนทุกบท</Text>
            {lessonTitles.map((t, i) => (
              <View key={i} style={wsstyles.reportRow}>
                <Text style={[wsstyles.reportLesson, { color: '#4f46e5' }]}>{i + 1}. {t}</Text>
                <Text style={[wsstyles.reportScore, { color: allScores[i] === null ? '#bdbdbd' : '#10b981' }]}>
                  {allScores[i] === null ? '-' : `${allScores[i]}/${SCRAMBLE_WORDS[i].length}`}
                </Text>
              </View>
            ))}
            <View style={{ height: 18 }} />
            <Text style={wsstyles.reportTotal}>
              รวมทั้งหมด: <Text style={{ color: '#e252c6', fontWeight: 'bold' }}>
                {allScores.reduce((sum, sc, i) => sum + (typeof sc === 'number' ? sc : 0), 0)}
              </Text> / {SCRAMBLE_WORDS.reduce((sum, arr) => sum + arr.length, 0)}
            </Text>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  
if (screen === -2)
  return (
    <LinearGradient colors={['#e3e8f8', '#d4e7f5', '#f6f7fb']} style={wsstyles.bg}>
      <SafeAreaView style={[wsstyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={wsstyles.welcomeTitle}>🌈 Word Scramble 🌈</Text>

        {/* กรอบบทเรียน */}
        <View style={wsstyles.lessonInfoBox}>
          <Text style={wsstyles.welcomeSubtitle}>
            ฝึกจับคู่คำศัพท์/วลีอังกฤษ สนุก + สีสันสดใส!
          </Text>
          <Text style={wsstyles.lessonInfoText}>
            <Text style={{ color: '#6c84f7', fontWeight: 'bold', fontSize: 22 }}>
              บทเรียน: {lessonTitles[lessonIndex]}
            </Text>
          </Text>
        </View>

        {/* ปุ่มเริ่มเกม */}
        <TouchableOpacity style={wsstyles.startBtn} onPress={() => setScreen(-1)}>
          <LinearGradient colors={['#e0e7ff', '#c7d2fe']} style={wsstyles.startBtnGrad}>
            <Text style={wsstyles.startText}>เริ่มเกม</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* ปุ่มกลับไปเลือกบท */}
        <TouchableOpacity style={wsstyles.menuBtn2} onPress={() => setScreen(-3)}>
          <Text style={wsstyles.menuText2}>⬅️ กลับเลือกบท</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );

if (screen === -1)
  return (
    <LinearGradient colors={['#e3e8f8', '#f1f5fa', '#e3e8f8']} style={wsstyles.bg}>
      <SafeAreaView style={[wsstyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={wsstyles.howtoTitle}>วิธีการเล่น</Text>

        {/* กรอบข้อความคำแนะนำ */}
        <View style={wsstyles.guideBox}>
          <Text style={wsstyles.howtoText}>• แตะตัวอักษรทีละตัวตามลำดับเพื่อเรียงเป็นคำศัพท์/วลี</Text>
          <Text style={wsstyles.howtoText}>• หากคำตอบมี 2 คำขึ้นไป ให้แตะปุ่ม "⎵" เพื่อเพิ่มช่องว่าง</Text>
          <Text style={wsstyles.howtoText}>• แตะ Clear เพื่อล้างคำที่เลือก</Text>
          <Text style={wsstyles.howtoText}>• กด "จบเกม" ได้ทุกเมื่อเพื่อสรุปคะแนน</Text>
        </View>

        {/* ปุ่มถัดไป */}
        <TouchableOpacity style={wsstyles.startBtn} onPress={() => setScreen(0)}>
          <LinearGradient colors={['#e0e7ff', '#c7d2fe']} style={wsstyles.startBtnGrad}>
            <Text style={wsstyles.startText}>ถัดไป</Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );

  
if (screen === -1)
  return (
    <LinearGradient colors={['#e3e8f8', '#f1f5fa', '#e3e8f8']} style={wsstyles.bg}>
      <SafeAreaView style={wsstyles.container}>
        <Text style={wsstyles.howtoTitle}>วิธีการเล่น</Text>

        {/* กรอบข้อความคำแนะนำ */}
        <View style={wsstyles.guideBox}>
          <Text style={wsstyles.howtoText}>• แตะตัวอักษรทีละตัวตามลำดับเพื่อเรียงเป็นคำศัพท์/วลี</Text>
          <Text style={wsstyles.howtoText}>• หากคำตอบมี 2 คำขึ้นไป ให้แตะปุ่ม "⎵" เพื่อเพิ่มช่องว่าง</Text>
          <Text style={wsstyles.howtoText}>• แตะ Clear เพื่อล้างคำที่เลือก</Text>
          <Text style={wsstyles.howtoText}>• กด "จบเกม" ได้ทุกเมื่อเพื่อสรุปคะแนน</Text>
        </View>

        {/* ปุ่มถัดไป */}
        <TouchableOpacity style={wsstyles.startBtn} onPress={() => setScreen(0)}>
          <LinearGradient colors={['#e0e7ff', '#c7d2fe']} style={wsstyles.startBtnGrad}>
            <Text style={wsstyles.startText}>ถัดไป</Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );


  // ----------- RESULT PAGE -----------
  if (screen >= 0 && (ended || page >= SCRAMBLE_WORDS[lessonIndex].length)) {
    // update คะแนนลง allScores
    if (allScores[lessonIndex] !== score) {
      setTimeout(() => {
        setAllScores(prev => {
          const updated = [...prev];
          updated[lessonIndex] = score;
          return updated;
        });
      }, 350);
    }
    return (
      <LinearGradient colors={['#e3e8f8', '#d4e7f5', '#f6f7fb']} style={wsstyles.bg}>

        <SafeAreaView style={wsstyles.container}>
          <View style={wsstyles.resultCard}>
            <Text style={wsstyles.resultScore}>คะแนนบทนี้ {score}/{SCRAMBLE_WORDS[lessonIndex].length}</Text>
            <Text style={wsstyles.resultEmoji}>{score === SCRAMBLE_WORDS[lessonIndex].length ? '🏆' : score >= SCRAMBLE_WORDS[lessonIndex].length - 2 ? '🎉' : score > 0 ? '👍' : '🙈'}</Text>
            <TouchableOpacity style={wsstyles.playAgainBtn} onPress={() => { setScreen(-3); }}>
              <Text style={wsstyles.playAgainText}>🔁 กลับหน้าเลือกบท</Text>
            </TouchableOpacity>
          </View>
          {/* รายงานคะแนนรวม */}
          <View style={wsstyles.resultReportBox}>
            <Text style={wsstyles.resultReportTitle}>📊 สรุปคะแนนทุกบท</Text>
            {lessonTitles.map((t, i) => (
              <View key={i} style={wsstyles.reportRow}>
                <Text style={[wsstyles.reportLesson, { color: '#4f46e5' }]}>{i + 1}. {t}</Text>
                <Text style={[wsstyles.reportScore, { color: allScores[i] === null ? '#bdbdbd' : '#10b981' }]}>
                  {allScores[i] === null ? '-' : `${allScores[i]}/${SCRAMBLE_WORDS[i].length}`}
                </Text>
              </View>
            ))}
            <Text style={wsstyles.reportTotal}>
              รวมทั้งหมด: <Text style={{ color: '#e252c6', fontWeight: 'bold' }}>
                {allScores.reduce((sum, sc, i) => sum + (typeof sc === 'number' ? sc : 0), 0)}
              </Text> / {SCRAMBLE_WORDS.reduce((sum, arr) => sum + arr.length, 0)}
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
let flashStyle = {};
if (flash === "correct") flashStyle = { backgroundColor: "#10b981" };
if (flash === "wrong") flashStyle = { backgroundColor: "#f07979ff" };

return (
  <LinearGradient colors={['#cbe6ff', '#e3f2fd', '#f6f9fe']} style={wsstyles.bg}>
    <StatusBar barStyle="dark-content" />
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <SafeAreaView style={wsstyles.container}>
        {/* แถบน้ำเงินสำหรับชื่อบทเรียน และกรอบที่เต็มพื้นที่ด้านบน */}
        <View style={wsstyles.lessonHeaderBar}>
          <Text style={wsstyles.lessonHeaderText}>บทเรียน {lessonIndex + 1}: {lessonTitles[lessonIndex]}</Text>
        </View>

        {/* Progress Bar */}
        <View style={wsstyles.progressBarBox}>
          <View style={wsstyles.progressBar}>
            <View style={[wsstyles.progressFill, { width: `${((page + 1) / SCRAMBLE_WORDS[lessonIndex].length) * 100}%` }]} />
          </View>
          <Text style={wsstyles.progressText}>{page + 1} / {SCRAMBLE_WORDS[lessonIndex].length}</Text>
        </View>

        {/* การ์ดคำศัพท์ */}
        <View style={[wsstyles.card, flashStyle]}>
          <Text style={wsstyles.hint}>💡 {SCRAMBLE_WORDS[lessonIndex][page].hint}</Text>
          <View style={wsstyles.lettersBox}>
            {letters.map((l, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  wsstyles.letter,
                  selectedIndices.includes(i) && wsstyles.letterUsed,
                  l === ' ' && wsstyles.letterSpace
                ]}
                onPress={() => !selectedIndices.includes(i) && onLetter(l, i)}
                disabled={selectedIndices.includes(i)}
                activeOpacity={0.7}
              >
                <Text style={{
                  fontSize: 24,
                  color: selectedIndices.includes(i)
                    ? '#bdbdbd'
                    : l === ' ' ? '#777' : '#312e81',
                  fontWeight: 'bold',
                }}>
                  {l === ' ' ? <Text style={{ color: '#777', fontWeight: 'bold' }}>⎵</Text> : l}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 6 }}>
            {selected.map((s, idx) => (
              <View key={idx} style={{
                minWidth: 24, alignItems: 'center', marginHorizontal: 2, borderBottomWidth: 2, borderColor: '#a5b4fc'
              }}>
                <Text style={{
                  fontSize: 23,
                  color: '#e252c6',
                  fontWeight: 'bold',
                }}>
                  {s.l === ' ' ? <Text style={{ color: '#777' }}>⎵</Text> : s.l}
                </Text>
              </View>
            ))}
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
            <TouchableOpacity style={wsstyles.sideBtn} onPress={onSpace}>
              <Text style={wsstyles.sideBtnText}>⎵ Space</Text>
            </TouchableOpacity>
            <TouchableOpacity style={wsstyles.sideBtn} onPress={clear}>
              <Text style={wsstyles.sideBtnText}>Clear</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[wsstyles.checkBtn, selected.length !== SCRAMBLE_WORDS[lessonIndex][page].word.length && { opacity: 0.5 }]}
            onPress={check}
            disabled={selected.length !== SCRAMBLE_WORDS[lessonIndex][page].word.length || flash === 'correct'}
          >
            <LinearGradient colors={['#457b9d', '#a8dadc']} style={wsstyles.checkGrad}>
              <Text style={wsstyles.checkText}>Check</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={wsstyles.endBtn} onPress={() => setEnded(true)}>
            <LinearGradient colors={['#c2e0f9', '#f5e9fc']} style={wsstyles.endBtnGrad}>
              <Text style={wsstyles.endText}>จบเกม</Text>
            </LinearGradient>
          </TouchableOpacity>

          {showAnswer &&
            <View style={wsstyles.answerBox}>
              <Text style={wsstyles.answerLabel}>คำตอบที่ถูกต้องคือ</Text>
              <Text style={wsstyles.answer}>{SCRAMBLE_WORDS[lessonIndex][page].word}</Text>
              <TouchableOpacity style={wsstyles.nextBtn} onPress={() => { setPage(page + 1); setSelected([]); setShowAnswer(false); }}>
                <LinearGradient colors={['#6ee7b7', '#ffff']} style={wsstyles.nextBtnGrad}>
                  <Text style={wsstyles.nextText}>ข้อต่อไป</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          }
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  </LinearGradient>
);

}

// ---------- 4. Style ----------
const wsstyles = StyleSheet.create({
  bg: { 
    flex: 1, 
    backgroundColor: '#e3f2fd'  // ฟ้าอ่อน
},
card: {
  width: width > 430 ? 410 : width * 0.96,
  marginTop: 12,
  backgroundColor: '#fff',
  borderRadius: 26,
  paddingVertical: 24,
  paddingHorizontal: 19,
  alignItems: 'center',
  shadowColor: '#cbd5e1',
  shadowOpacity: 0.13,
  shadowRadius: 13,
  shadowOffset: { width: 0, height: 4 },
  elevation: 2,
  marginBottom: 10,
  borderWidth: 1,
  borderColor: '#87cefa',  // กรอบน้ำเงินฟ้า
},

lessonHeaderBar: {
  backgroundColor: '#1e3a8a',  // สีฟ้าคลาสสิก
  paddingVertical: 20,          // เพิ่มพื้นที่
  marginBottom: 20,
  alignItems: 'center',
  justifyContent: 'center',
  borderBottomLeftRadius: 24,
  borderBottomRightRadius: 24,
  shadowColor: '#2563eb55',
  shadowOpacity: 0.2,
  shadowRadius: 8,
  elevation: 4,
},
lessonHeaderText: {
  fontSize: 28,               // ขนาดตัวอักษรใหญ่ขึ้น
  color: '#fff',              // ตัวอักษรสีขาว
  fontWeight: 'bold',
  textAlign: 'center',
  paddingHorizontal: 10,      // เพิ่มระยะห่างด้านข้าง
},

sideBtn: {
  borderRadius: 13,
  borderWidth: 1.5,
  borderColor: '#457b9d',  // สีขอบปุ่มเป็นน้ำเงิน
  backgroundColor: '#f1f5f9',  // พื้นหลังสีอ่อน
  paddingVertical: 8,
  paddingHorizontal: 25,
  marginHorizontal: 6,
  marginVertical: 2,
  shadowColor: '#c7d2fe',
  shadowOpacity: 0.10,
  shadowRadius: 1,
  elevation: 0,
},
sideBtnText: {
  color: '#457b9d',  // ตัวอักษรน้ำเงิน
  fontWeight: 'bold',
  fontSize: 18,
  letterSpacing: 0.12,
  textShadowColor: '#fff9',
  textShadowRadius: 1,
},

checkGrad: {
  paddingVertical: 12,
  paddingHorizontal: 55,
  borderRadius: 13,
  alignItems: 'center',
  backgroundColor: '#457b9d',  // ปุ่มน้ำเงิน
},

checkText: {
  color: '#fff',  // ตัวอักษรขาว
  fontWeight: 'bold',
  fontSize: 18,
  letterSpacing: 0.12,
},
// กรอบสำหรับแสดงบทเรียน
lessonInfoBox: {
  backgroundColor: 'rgba(255,255,255,0.88)', // พื้นหลังโปร่งใส
  borderRadius: 18, // มุมมน
  paddingVertical: 22,
  paddingHorizontal: 25,
  marginBottom: 26,
  alignItems: 'center',
  shadowColor: '#e3e8f8', // เงา
  shadowOpacity: 0.17,
  shadowRadius: 10,
  elevation: 2,
  borderWidth: 1,
  borderColor: '#e3e8f8' // ขอบสีฟ้าอ่อน
},

// ข้อความบทเรียน
lessonInfoText: {
  fontSize: 22,               // ขนาดตัวอักษร
  color: '#6c84f7',           // สีฟ้าน้ำเงินอ่อน
  marginTop: 7,
  fontWeight: '600',          // ตัวหนา
  textAlign: 'center',
},

// ข้อความชื่อเกม
welcomeTitle: { 
  fontSize: 30, 
  fontWeight: 'bold', 
  color: '#6165d7', 
  marginBottom: 11, 
  letterSpacing: 0.8, 
  textAlign: 'center' 
},

// ปุ่มเริ่มเกม
startBtnGrad: {
  paddingVertical: 13,
  paddingHorizontal: 55,
  borderRadius: 13,
  alignItems: 'center',
  backgroundColor: '#e0e7ff', // ฟ้าพาสเทลอ่อน
},

startText: {
  color: '#4f46e5',
  fontWeight: 'bold',
  fontSize: 20,
  letterSpacing: 0.19,
},

// ปุ่มกลับไปเลือกบท
menuBtn2: {
  marginTop: 20,
  alignSelf: 'center',
  borderRadius: 11,
  overflow: 'hidden',
},
// กรอบคำแนะนำ
guideBox: {
  backgroundColor: 'rgba(255,255,255,0.88)', // พื้นหลังโปร่งใส
  borderRadius: 18, // มุมมน
  paddingVertical: 22,
  paddingHorizontal: 25,
  marginBottom: 26,
  alignItems: 'center',
  shadowColor: '#e3e8f8', // เงา
  shadowOpacity: 0.17,
  shadowRadius: 10,
  elevation: 2,
  borderWidth: 1,
  borderColor: '#e3e8f8', // ขอบฟ้าอ่อน
},

// ข้อความคำแนะนำ
howtoText: {
  fontSize: 16,            // ขนาดตัวอักษรเพิ่ม
  color: '#6366f1',        // น้ำเงินอ่อน
  marginTop: 8,            // ระยะห่างระหว่างบรรทัด
  fontWeight: '500',       // เน้นหนาน้อยกว่า
  textAlign: 'center',     // จัดกึ่งกลาง
},

// ชื่อหัวข้อ "วิธีการเล่น"
howtoTitle: {
  fontSize: 24,            // ขนาดใหญ่ขึ้น
  fontWeight: 'bold',
  color: '#6366f1',        // น้ำเงินอ่อน
  marginBottom: 18,
  textAlign: 'center',
  letterSpacing: 0.1,
},

// ปุ่มถัดไป
startBtnGrad: {
  paddingVertical: 13,
  paddingHorizontal: 55,
  borderRadius: 13,
  alignItems: 'center',
  backgroundColor: '#e0e7ff', // ฟ้าพาสเทลอ่อน
},

startText: {
  color: '#4f46e5',
  fontWeight: 'bold',
  fontSize: 20,
  letterSpacing: 0.19,
},



menuText2: { 
  color: '#626983', 
  fontWeight: '600', 
  fontSize: 16, 
  paddingVertical: 11, 
  paddingHorizontal: 36, 
  backgroundColor: '#f5f7fa', 
  borderRadius: 10, 
  borderWidth: 1, 
  borderColor: '#e4e6ed' 
},


endBtnGrad: {
  paddingVertical: 12,
  paddingHorizontal: 55,
  borderRadius: 13,
  alignItems: 'center',
  backgroundColor: '#457b9d',  // ปุ่มน้ำเงิน
},

nextBtnGrad: {
  paddingVertical: 12,
  paddingHorizontal: 55,
  borderRadius: 13,
  alignItems: 'center',
  backgroundColor: '#457b9d',  // ปุ่มน้ำเงิน
},

  lessonGridBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 18,
    marginTop: 10,
  },
  lessonColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: 6,
  },
  progressBarBox: {
  marginBottom: 18,
},
progressText: {
  fontSize: 16,
  color: '#374151',
  fontWeight: '500',
  textAlign: 'center',
},

  lessonCard: {
    borderRadius: 17,
    marginVertical: 7,
    paddingVertical: 19,
    paddingHorizontal: 12,
    minHeight: 66,
    marginHorizontal: 2,
    backgroundColor: '#2b5be7',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#2563eb33',
    shadowOpacity: 0.09,
    shadowRadius: 6,
    elevation: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  lessonCardText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17.5,
    letterSpacing: 0.15,
  },
  lessonCardColors: [
    { backgroundColor: '#2563eb' },      // 1 navy blue
    { backgroundColor: '#478be7' },      // 2 blue medium
    { backgroundColor: '#36a6cc' },      // 3 blue-green
    { backgroundColor: '#7b56e8' },      // 4 purple blue
    { backgroundColor: '#2563eb' },      // 5 pastel violet
    { backgroundColor: '#478be7' },      // 6 deep blue
    { backgroundColor: '#36a6cc' },      // 7 green-teal
    { backgroundColor: '#7b56e8' },     // 8 orange soft
  ],
  lessonBtn: {
    margin: 7,
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 22,
    minWidth: width/2.5,
    alignItems: 'center',
    backgroundColor: '#eef2fb',
    borderWidth: 1,
    borderColor: '#d9e2ec',
    shadowColor: '#cddafd',
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  answerBox: {
  marginTop: 13,
  alignItems: 'center',
},

answerLabel: {
  color: '#ffff',
  fontWeight: 'bold',
  fontSize: 15,
  marginBottom: 1,
},

answer: {
  color: '#fff',  // สีขาวสำหรับคำตอบที่ถูกต้อง
  fontWeight: 'bold',
  fontSize: 21,
  marginBottom: 7,
},

  lessonText: {
    color: '#454c5e',
    fontWeight: 'bold',
    fontSize: 19,
    letterSpacing: 0.2,
    textShadowColor: '#fff',
    textShadowRadius: 0,
  },
  welcomeTitle: { fontSize: 30, fontWeight: 'bold', color: '#6165d7', marginBottom: 11, letterSpacing: 0.8, textAlign: 'center' },
  welcomeSubtitle: { fontSize: 17, color: '#7f9cf5', marginBottom: 24, fontWeight: '500', textAlign: 'center' },
  howtoTitle: { fontSize: 23, fontWeight: 'bold', color: '#4e5ba6', marginBottom: 15, letterSpacing: 0.1 },
  guideBox: {
    backgroundColor: '#f5f7fa', borderRadius: 14, padding: 16, marginBottom: 27,
    width: 340, maxWidth: '93%', shadowColor: '#cbd5e1', shadowOpacity: 0.08,
    shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 0,
    borderWidth: 1, borderColor: '#ecefff',
  },
  howtoText: { fontSize: 16, color: '#474d59', marginBottom: 7, letterSpacing: 0.05 },
  startBtn: { marginTop: 10, borderRadius: 13, alignSelf: 'center', overflow: 'hidden' },
  startBtnGrad: { paddingVertical: 13, paddingHorizontal: 46, borderRadius: 13, alignItems: 'center', backgroundColor: '#ececff' },
  startText: { color: '#4e5ba6', fontWeight: 'bold', fontSize: 19, letterSpacing: 0.11 },
  menuBtn2: { marginTop: 20, alignSelf: 'center', borderRadius: 11, overflow: 'hidden' },
  menuText2: { color: '#626983', fontWeight: '600', fontSize: 16, paddingVertical: 11, paddingHorizontal: 36, backgroundColor: '#f5f7fa', borderRadius: 10, borderWidth: 1, borderColor: '#e4e6ed' },

  progressBarBox: { width: '93%', alignItems: 'center', marginBottom: 10 },
  progressBar: { width: '100%', height: 7, backgroundColor: '#e5e9f7', borderRadius: 8, marginBottom: 2, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#a5b4fc', borderRadius: 8 },
  progressText: { color: '#626983', fontSize: 15, fontWeight: '500' },

  hint: { fontSize: 18, marginBottom: 12, color: '#3e4568', fontWeight: '600', textAlign: 'center' },
  lettersBox: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 5, marginTop: 9 },
  letter: {
    backgroundColor: '#f4f6fb', paddingVertical: 14, paddingHorizontal: 13,
    borderRadius: 10, margin: 6, minWidth: 34, alignItems: 'center', borderWidth: 2, borderColor: '#e3e9f5',
    shadowColor: '#dbeafe', shadowOpacity: 0.08, shadowRadius: 2, elevation: 0,
  },
  letterUsed: { backgroundColor: '#e7e8ee', borderColor: '#d1d5db' },
  letterSpace: {
    backgroundColor: '#e5e9f7', borderColor: '#c3c8e4',
  },

  sideBtn: {
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: '#b4bdfc',
    backgroundColor: '#f4f6fb',
    paddingVertical: 8,
    paddingHorizontal: 25,
    marginHorizontal: 6,
    marginVertical: 2,
    shadowColor: '#c7d2fe',
    shadowOpacity: 0.10,
    shadowRadius: 1,
    elevation: 0,
  },
  sideBtnText: {
    color: '#787afc',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.12,
    textShadowColor: '#fff9',
    textShadowRadius: 1,
  },

  checkBtn: { marginTop: 11, borderRadius: 10, alignSelf: 'center', overflow: 'hidden' },
  checkGrad: { paddingVertical: 11, paddingHorizontal: 55, borderRadius: 10, alignItems: 'center', backgroundColor: '#d3eefd' },
  checkText: { color: '#247ba0', fontWeight: 'bold', fontSize: 18, letterSpacing: 0.12 },
  endBtn: { marginTop: 10, borderRadius: 11, alignSelf: 'center', overflow: 'hidden' },
  endBtnGrad: { paddingVertical: 9, paddingHorizontal: 42, borderRadius: 11, alignItems: 'center', backgroundColor: '#faf3dd' },
  endText: { color: '#6c757d', fontWeight: 'bold', fontSize: 17 },

  answerBox: { marginTop: 13, alignItems: 'center' },
  answerLabel: { color: '#fca5a5', fontWeight: 'bold', fontSize: 15, marginBottom: 1 },
  answer: { color: '#6366f1', fontWeight: 'bold', fontSize: 21, marginBottom: 7 },
  nextBtn: { marginTop: 6, borderRadius: 11, overflow: 'hidden' },
  nextBtnGrad: { paddingVertical: 9, paddingHorizontal: 40, borderRadius: 11, alignItems: 'center', backgroundColor: '#c0f0ea' },
  nextText: { color: '#089981', fontWeight: 'bold', fontSize: 16 },

  resultCard: { alignItems: 'center', justifyContent: 'center', padding: 25, borderRadius: 24, backgroundColor: '#fafbfc', shadowColor: '#e5e7eb', shadowOpacity: 0.08, shadowRadius: 9, elevation: 1, marginTop: 28, borderWidth: 1, borderColor: '#edefff' },
  resultScore: { fontSize: 27, fontWeight: 'bold', color: '#7c83db', marginBottom: 8 },
  resultEmoji: { fontSize: 57, marginVertical: 13, textAlign: 'center' },
  playAgainBtn: { marginTop: 12, backgroundColor: '#e0e7ff', borderRadius: 13, paddingVertical: 10, paddingHorizontal: 34 },
  playAgainText: { color: '#6366f1', fontWeight: 'bold', fontSize: 17 },

  reportScroll: { width: '97%', maxHeight: 320, alignSelf: 'center', marginTop: 10, borderRadius: 17, backgroundColor: '#f5f7fa', padding: 7, borderWidth: 1, borderColor: '#e9eaf4' },
  reportTitle: { fontSize: 20, fontWeight: 'bold', color: '#7286d3', marginBottom: 7, marginLeft: 3, letterSpacing: 0.12 },
  reportRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 2, paddingHorizontal: 4 },
  reportLesson: { fontSize: 16, fontWeight: '600', color: '#6b7280' },
  reportScore: { fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
  reportTotal: { fontSize: 16, color: '#eab3f8', fontWeight: 'bold', textAlign: 'right', marginTop: 8 },

  resultReportBox: { marginTop: 24, padding: 15, backgroundColor: '#f8fafc', borderRadius: 14, width: '98%', borderWidth: 1, borderColor: '#e5e9f7' },
  resultReportTitle: { fontSize: 17, fontWeight: 'bold', color: '#7286d3', marginBottom: 7 },
  
});
