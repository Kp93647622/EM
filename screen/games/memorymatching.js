import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CARD_MARGIN = 9;
const CARD_SIZE = Dimensions.get('window').width / 3 - CARD_MARGIN * 2.3;

const GRADIENTS = [
  ['#fdf6ff', '#d1e3ff', '#c7d2fe'],
  ['#ffe0f0', '#f8fafc', '#c4b5fd'],
  ['#fdf6ff', '#e0f2fe', '#c7d2fe'],
  ['#e0e7ff', '#a7f3d0', '#818cf8'],
  ['#fdf2f8', '#dbeafe', '#c4b5fd'],
  ['#e0e7ff', '#f0fdf4', '#c7d2fe'],
  ['#e0f7fa', '#fce7f3', '#bae6fd'],
  ['#ffe0f0', '#dbeafe', '#c4b5fd'],
];

const LESSON_CARDS = [
  [
    { id: 1, left: 'Present Perfect', right: 'I have visited Japan.' },
    { id: 2, left: 'Action Verb', right: 'run, write, eat' },
    { id: 3, left: 'Stative Verb', right: 'believe, know, own' },
  ],
  [
    { id: 1, left: 'Past Perfect', right: 'She had left before I arrived.' },
    { id: 2, left: 'Adverb Starter', right: 'Suddenly, the phone rang.' },
    { id: 3, left: 'Present Perfect Continuous', right: 'I have been reading for an hour.' },
  ],
  [
    { id: 1, left: 'Present Perfect vs Past Perfect', right: 'I have finished. / I had finished before noon.' },
    { id: 2, left: 'Present Perfect Continuous', right: 'She has been studying since morning.' },
    { id: 3, left: 'Phrases to Conclude', right: 'In conclusion, ...' },
  ],
  [
    { id: 1, left: 'Financial Vocabulary', right: 'income, expense, debt' },
    { id: 2, left: 'Conditional Sentence', right: 'If I had money, I would buy a car.' },
    { id: 3, left: 'Modal of Necessity', right: 'You must finish your homework.' },
    { id: 4, left: 'Future Perfect', right: 'I will have graduated by 2025.' },
  ],
  [
    { id: 1, left: 'Defining Relative Clause', right: 'The boy who is running is my brother.' },
    { id: 2, left: 'Non-defining Relative Clause', right: 'My father, who is a teacher, ...' },
    { id: 3, left: 'Essay', right: 'Introduction, body, conclusion' },
    { id: 4, left: 'Expressing Opinions', right: 'In my opinion, ...' },
  ],
  [
    { id: 1, left: 'Passive Voice', right: 'The cake was eaten by Tom.' },
    { id: 2, left: 'Causative Passive', right: 'I had my car washed.' },
    { id: 3, left: 'Future Technology', right: 'Robots will be used in hospitals.' },
  ],
  [
    { id: 1, left: 'Causative Verbs (let, make, have)', right: 'The teacher made us do homework.' },
    { id: 2, left: 'Causative Verbs (get, help)', right: 'She got her brother to help.' },
    { id: 3, left: 'Phrasal Verbs', right: 'look after, run out of, take care of' },
    { id: 4, left: 'Environmental Policy', right: 'Reduce, Reuse, Recycle' },
  ],
  [
    { id: 1, left: 'Gerund', right: 'Swimming is good for your health.' },
    { id: 2, left: 'Infinitive', right: 'I want to eat pizza.' },
    { id: 3, left: 'Dining Request', right: 'Could I have the menu, please?' },
    { id: 4, left: '-ing forms', right: 'The movie was interesting.' },
  ],
];

const lessonTitles = [
  "Present Perfect", "Past Perfect & Cont.", "Time & Sequence",
  "Conditional, Finance", "Relative & Essay", "Passive & Tech",
  "Phrasal, Environment", "Gerund, Food",
];

function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function MemoryMatching({ navigation }) {
  const [stage, setStage] = useState('lesson');
  const [lessonIndex, setLessonIndex] = useState(null);

  if (stage === 'lesson') {
    return (
      <LinearGradient colors={['#dbeafe', '#e0e7ff', '#818cf8']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 18 }}>
          <Text style={styles.titleMain}>🎲 เลือกบทเล่นเกมจับคู่</Text>
          <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 50 }}>
            {lessonTitles.map((title, i) => (
              <TouchableOpacity
                key={i}
                style={styles.lessonBtnWrap}
                onPress={() => { setLessonIndex(i); setStage('game'); }}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={GRADIENTS[i % GRADIENTS.length]}
                  style={styles.lessonBtn}
                  start={{x:0, y:0.4}} end={{x:1, y:0.6}}
                >
                  <View style={{ flexDirection:'row', alignItems:'center' }}>
                    <Text style={styles.lessonIcon}>{['📘','📗','📙','💰','📄','🤖','🌳','🍝'][i]}</Text>
                    <Text style={styles.lessonTitleText}>{`บทที่ ${i + 1} `}</Text>
                    <Text style={[styles.lessonTitleDesc, {color: '#52525b'}]}>{title}</Text>
                  </View>
                  <Text style={styles.lessonPairText}>{LESSON_CARDS[i].length} คู่</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // --- หน้าเกม ---
  return <MatchingGame
    lessonIndex={lessonIndex}
    navigation={navigation}
    lessonTitle={lessonTitles[lessonIndex]}
    onBackToLesson={() => setStage('lesson')}
  />;
}

function MatchingGame({ lessonIndex, navigation, lessonTitle, onBackToLesson }) {
  const PAIRS = LESSON_CARDS[lessonIndex];
  const allCardsRaw = PAIRS.flatMap(pair => [
    { id: pair.id, side: 'left', label: pair.left },
    { id: pair.id, side: 'right', label: pair.right },
  ]);
  const [cards, setCards] = useState(shuffle(allCardsRaw));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  function resetGame() {
    setCards(shuffle(allCardsRaw));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  }

  function handleCardPress(index) {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [i, j] = newFlipped;
      if (cards[i].id === cards[j].id && cards[i].side !== cards[j].side) {
        setTimeout(() => {
          setMatched([...matched, i, j]);
          setFlipped([]);
          if (matched.length + 2 === cards.length) {
            Alert.alert(
              '🎉 สำเร็จ!',
              `คุณจับคู่ถูกหมดใน ${moves + 1} ครั้ง`,
              [
                { text: 'เล่นใหม่', onPress: resetGame },
                { text: 'กลับเมนู', onPress: onBackToLesson }
              ]
            );
          }
        }, 700);
      } else {
        setTimeout(() => setFlipped([]), 900);
      }
    }
  }

  return (
    <LinearGradient colors={['#f8fafc', '#e0e7ff', '#dbeafe']} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>🧠 Memory Match</Text>
        <Text style={styles.subtitle}>บทที่ {lessonIndex + 1}: <Text style={{color:'#6366f1', fontWeight:'bold'}}>{lessonTitle}</Text></Text>
        <View style={styles.grid}>
          {cards.map((card, idx) => {
            const isFlipped = flipped.includes(idx) || matched.includes(idx);
            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.card,
                  isFlipped && styles.cardFlip,
                  matched.includes(idx) && styles.cardMatched
                ]}
                onPress={() => handleCardPress(idx)}
                activeOpacity={isFlipped ? 1 : 0.8}
              >
                {isFlipped ? (
                  <LinearGradient
                    colors={matched.includes(idx) ? ['#a7f3d0', '#38bdf8'] : ['#818cf8', '#f1f5f9']}
                    style={styles.cardInner}
                  >
                    <Text style={styles.cardText}>{card.label}</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.cardBack}>
                    <Text style={styles.cardBackText}>❔</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.bottomSection}>
          <Text style={styles.moves}>จำนวนครั้ง: <Text style={{color:'#3b82f6'}}>{moves}</Text></Text>
          <TouchableOpacity style={styles.resetBtn} onPress={resetGame}>
            <Text style={styles.resetText}>🔄 เริ่มใหม่</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBtn} onPress={onBackToLesson}>
            <Text style={styles.menuText}>⬅️ กลับเมนู</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 26 },
  titleMain: {
    fontSize: 30, fontWeight: 'bold', color: '#6d28d9', marginBottom: 20, letterSpacing: 1.2,
    textShadowColor:'#a5b4fc', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 7,
  },
  title: {
    fontSize: 26, fontWeight: 'bold', color: '#4338ca', marginBottom: 7, letterSpacing: 1.1, textShadowColor:'#c7d2fe',
    textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2,
  },
  subtitle: { fontSize: 16.5, color: '#2563eb', marginBottom: 14, fontWeight:'500', textAlign:'center' },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
    marginBottom: 12, marginTop: 5, width: Dimensions.get('window').width - 8
  },
  card: {
    width: CARD_SIZE, height: CARD_SIZE, margin: CARD_MARGIN,
    borderRadius: 19, overflow: 'hidden',
    backgroundColor: '#e0e7ff',
    shadowColor: '#6366f1', shadowOpacity: 0.17, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8, elevation: 5,
    justifyContent: 'center', alignItems: 'center',
  },
  cardFlip: {
    backgroundColor: 'transparent',
  },
  cardInner: {
    flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%',
    padding: 7,
  },
  cardText: {
    fontSize: 17.2, color: '#2d3748', textAlign: 'center', fontWeight:'600', letterSpacing:0.12,
    textShadowColor:'#fff', textShadowOffset: {width: 0.5, height: 1}, textShadowRadius: 1,
  },
  cardBack: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'transparent', width: '100%', height: '100%'
  },
  cardBackText: { fontSize: 30, color: '#818cf8', fontWeight: 'bold' },
  cardMatched: {
    borderColor: '#38bdf8',
    borderWidth: 2.5,
    backgroundColor: '#a7f3d0',
  },
  moves: { fontSize: 18, color: '#374151', marginTop: 8, marginBottom: 10, fontWeight: 'bold', letterSpacing:0.1 },
  resetBtn: {
    marginTop: 7, paddingVertical: 10, paddingHorizontal: 35, backgroundColor: '#818cf8', borderRadius: 13,
    shadowColor: '#818cf8', shadowOpacity: 0.12, shadowRadius: 3, shadowOffset: { width: 0, height: 2 }, elevation: 2,
    alignSelf: 'center',
  },
  resetText: { color: '#fff', fontWeight: 'bold', fontSize: 17.5, letterSpacing:0.18 },
  bottomSection: { width: '92%', alignSelf:'center', alignItems: 'center', marginTop: 10 },
  menuBtn: {
    marginTop: 10,
    backgroundColor: '#f1f5f9',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#a5b4fc',
    paddingVertical: 9,
    paddingHorizontal: 34,
    alignSelf: 'center',
  },
  menuText: { color: '#2563eb', fontWeight: '700', fontSize: 16 },
  lessonBtnWrap: { width: '100%', alignItems:'center', marginBottom: 15 },
  lessonBtn: {
    borderRadius: 16,
    paddingVertical: 19,
    paddingHorizontal: 20,
    width: 340,
    maxWidth: '98%',
    shadowColor: '#a5b4fc', shadowOpacity: 0.15, shadowRadius: 8, elevation: 3,
    flexDirection:'row', alignItems:'center', justifyContent:'space-between',
  },
  lessonIcon: {
    fontSize: 25,
    marginRight: 10,
  },
  lessonTitleText: {
    fontSize: 18.5, color: '#312e81', fontWeight: 'bold',
    marginRight: 6, letterSpacing:0.4,
  },
  lessonTitleDesc: {
    fontSize: 17, color: '#6366f1', fontWeight: '600',
    marginLeft: 2,
  },
  lessonPairText: {
    fontSize: 14.7, color: '#64748b', fontWeight:'500',
    backgroundColor:'#e0e7ff', paddingVertical:4, paddingHorizontal:9, borderRadius: 7,
  },
});
