import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// LESSONS data remains the same
const LESSONS = [
  // 1. Present Perfect, Action, Stative, Past Simple, Future Simple
  [
    {
      term: "Present Perfect",
      desc: "I have visited Chiang Mai twice.",
      explain: "ใช้แสดงประสบการณ์หรือเหตุการณ์ที่เกิดขึ้นในอดีตจนถึงปัจจุบัน"
    },
    {
      term: "Action Verb",
      desc: "run, write, swim, eat",
      explain: "กริยาที่แสดงการกระทำ (ใช้กับ Continuous tense ได้)"
    },
    {
      term: "Stative Verb",
      desc: "know, like, believe, own",
      explain: "กริยาที่แสดงสภาวะ/ความรู้สึก (มักไม่ใช้กับ Continuous tense)"
    },
    {
      term: "Past Simple",
      desc: "I went to Bangkok yesterday.",
      explain: "ใช้แสดงเหตุการณ์ที่เกิดขึ้นและสิ้นสุดในอดีต"
    },
    {
      term: "Future Simple",
      desc: "I will study English tomorrow.",
      explain: "ใช้แสดงเหตุการณ์ที่จะเกิดขึ้นในอนาคต"
    },
  ],
  // 2. Past Perfect, Adverbs Sentence Starter, Present Perfect Continuous, Past Continuous, Present Simple
  [
    {
      term: "Past Perfect Tense",
      desc: "She had left before I arrived.",
      explain: "ใช้กับเหตุการณ์ที่เกิดขึ้นก่อนหน้าเหตุการณ์ในอดีต"
    },
    {
      term: "Adverbs Sentence Starter",
      desc: "Suddenly, the phone rang.",
      explain: "คำวิเศษณ์ที่นำหน้าประโยคเพื่อเน้นย้ำหรือบอกลำดับเหตุการณ์"
    },
    {
      term: "Present Perfect Continuous",
      desc: "I have been reading for two hours.",
      explain: "ใช้กับเหตุการณ์ที่เริ่มในอดีตและยังคงดำเนินอยู่ต่อเนื่องในปัจจุบัน"
    },
    {
      term: "Past Continuous",
      desc: "I was watching TV when you called.",
      explain: "ใช้แสดงเหตุการณ์ที่กำลังดำเนินอยู่ในอดีต"
    },
    {
      term: "Present Simple",
      desc: "She works in a bank.",
      explain: "ใช้แสดงความจริงทั่วไป นิสัย หรือเหตุการณ์ที่เกิดขึ้นเป็นประจำ"
    },
  ],
  // 3. Present Perfect vs Past Perfect, Present Perfect Continuous, Phrases to conclude, Comparative, Superlative
  [
    {
      term: "Present Perfect vs Past Perfect",
      desc: "I have finished my work. / I had finished my work before lunch.",
      explain: "Present Perfect ใช้กับเหตุการณ์ที่เพิ่งเกิด/มีผลถึงปัจจุบัน, Past Perfect ใช้กับเหตุการณ์ที่เกิดขึ้นก่อนอีกเหตุการณ์ในอดีต"
    },
    {
      term: "Present Perfect Continuous",
      desc: "She has been studying since morning.",
      explain: "ใช้แสดงการกระทำที่เริ่มในอดีตและดำเนินต่อเนื่องถึงปัจจุบัน (เน้นระยะเวลา)"
    },
    {
      term: "Phrases to Conclude",
      desc: "In conclusion, we should recycle more.",
      explain: "วลีที่ใช้สรุปเนื้อหาหรือข้อคิดเห็นตอนท้าย"
    },
    {
      term: "Comparative",
      desc: "This book is more interesting than that one.",
      explain: "ใช้เปรียบเทียบระหว่าง 2 สิ่ง (more...than, -er than)"
    },
    {
      term: "Superlative",
      desc: "She is the smartest student in class.",
      explain: "ใช้แสดงสิ่งที่เป็นที่สุดในกลุ่ม (the most..., the -est)"
    },
  ],
  // 4. คำศัพท์การเงิน, Conditional Sentences, Modal Verbs, Future Perfect, Zero Conditional
  [
    {
      term: "Financial Vocabulary",
      desc: "expense, saving, income, debt",
      explain: "คำศัพท์ที่ใช้ในบริบทการเงิน"
    },
    {
      term: "Conditional Sentences",
      desc: "If I had money, I would buy a car.",
      explain: "โครงสร้าง if-clause แสดงเงื่อนไขในอดีต ปัจจุบัน หรืออนาคต"
    },
    {
      term: "Modal Verbs of Necessity",
      desc: "You must finish your homework.",
      explain: "must, have to, need to ใช้แสดงความจำเป็น"
    },
    {
      term: "Future Perfect & Future Perfect Continuous",
      desc: "By 2025, I will have graduated. / Next year, I will have been studying for 10 years.",
      explain: "ใช้แสดงเหตุการณ์ที่คาดว่าจะเสร็จในอนาคต หรือดำเนินต่อเนื่องถึงอนาคต"
    },
    {
      term: "Zero Conditional",
      desc: "If you heat water, it boils.",
      explain: "ใช้แสดงความจริงทั่วไปหรือข้อเท็จจริงที่เป็นไปได้เสมอ"
    },
  ],
  // 5. บุคลิกภาพ เรียงความ Defining/Non-defining Relative Clauses, Prepositions
  [
    {
      term: "Defining Relative Clause",
      desc: "The man who is wearing glasses is my teacher.",
      explain: "ใช้ระบุข้อมูลที่จำเป็นของคำนามในประโยค"
    },
    {
      term: "Non-defining Relative Clause",
      desc: "My mother, who is a nurse, loves to help people.",
      explain: "ให้ข้อมูลเสริมที่ไม่จำเป็นต่อคำนาม (มี comma คั่น)"
    },
    {
      term: "Writing an Essay",
      desc: "Start with an introduction, develop main points, and end with a conclusion.",
      explain: "โครงสร้างเรียงความ: บทนำ, เนื้อหา, สรุป"
    },
    {
      term: "Expressing Opinions",
      desc: "In my opinion, learning English is important.",
      explain: "การแสดงความคิดเห็นโดยใช้วลีเช่น In my opinion, I think, Personally,"
    },
    {
      term: "Prepositions of Time",
      desc: "at 3 o'clock, on Monday, in January",
      explain: "บุพบทที่ใช้กับเวลา: at (เวลาจุด), on (วัน), in (เดือน/ปี)"
    },
  ],
  // 6. เทคโนโลยี อนาคต Passive, Causative Passive, Articles
  [
    {
      term: "Passive Voice",
      desc: "The cake was eaten by Tom.",
      explain: "ใช้เมื่อไม่เน้นผู้กระทำหรือไม่ทราบผู้กระทำ"
    },
    {
      term: "Causative Passive",
      desc: "I had my hair cut yesterday.",
      explain: "การให้ผู้อื่นทำบางสิ่งให้เราในรูป Passive"
    },
    {
      term: "Future Technology",
      desc: "Robots will be used in hospitals.",
      explain: "แนวโน้ม/การคาดการณ์เกี่ยวกับเทคโนโลยีในอนาคต"
    },
    {
      term: "Articles (a, an, the)",
      desc: "a book, an apple, the sun",
      explain: "คำนำหน้านาม: a/an (ไม่เจาะจง), the (เจาะจง)"
    },
    {
      term: "Modal Verbs of Possibility",
      desc: "It might rain tomorrow.",
      explain: "may, might, could ใช้แสดงความเป็นไปได้"
    },
  ],
  // 7. สิ่งแวดล้อม Causative Verbs, Phrasal Verbs, Quantifiers
  [
    {
      term: "Causative Verbs: let, make, have",
      desc: "The teacher made us do our homework.",
      explain: "กริยาบังคับ/ให้ผู้อื่นทำ: let(ยอมให้), make(บังคับ), have(ให้ทำ)"
    },
    {
      term: "Causative Verbs: get, help",
      desc: "She got her brother to help her.",
      explain: "get (ให้ผู้อื่นทำบางอย่างโดยโน้มน้าว), help (ช่วยเหลือ)"
    },
    {
      term: "Phrasal Verbs",
      desc: "take care of, look after, run out of",
      explain: "กริยาวลีที่ประกอบด้วย verb+preposition/adverb"
    },
    {
      term: "Environmental Policies",
      desc: "Reduce, Reuse, Recycle",
      explain: "นโยบาย/หลักการเพื่อการอนุรักษ์สิ่งแวดล้อม"
    },
    {
      term: "Quantifiers",
      desc: "many books, much water, a few apples",
      explain: "คำบอกปริมาณ: many/much (มาก), a few/a little (นิดหน่อย)"
    },
  ],
  // 8. สั่งอาหาร Dining Gerund, Infinitive, Dining Request, -ing forms, Question Tags
  [
    {
      term: "Gerund Verbs",
      desc: "Swimming is good for your health.",
      explain: "V-ing ใช้เป็นคำนามหรือเป็นประธานของประโยค"
    },
    {
      term: "Infinitive Verbs",
      desc: "I want to eat pizza.",
      explain: "to + V1 ใช้แสดงวัตถุประสงค์หรือความต้องการ"
    },
    {
      term: "Making Dining Requests",
      desc: "Could I have the menu, please?",
      explain: "วลีสุภาพที่ใช้สั่งอาหาร/ขอความช่วยเหลือในร้านอาหาร"
    },
    {
      term: "-ing forms: gerunds, verbs, adjectives",
      desc: "The movie was interesting.",
      explain: "-ing ใช้เป็นกริยา หรือคุณศัพท์เพื่ออธิบายลักษณะ"
    },
    {
      term: "Question Tags",
      desc: "You like coffee, don't you?",
      explain: "คำถามท้ายประโยคเพื่อขอการยืนยันหรือความเห็นชอบ"
    },
  ]
];

// ช่วยสลับ desc ทุกครั้งที่เปิด (แบบง่าย)
function shuffleArray(arr) {
  let a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function DragAndDropLesson({ navigation, route }) {
  const lessonIndex = route?.params?.lessonIndex ?? 0;
  const PAIRS = LESSONS[lessonIndex];
  const [page, setPage] = useState(-2); // -2: welcome, -1: howto, 0: game
  const [answers, setAnswers] = useState({});
  const [descOrder, setDescOrder] = useState(shuffleArray(PAIRS.map(p => p.desc)));

  // reset คำตอบเมื่อกดกลับไปหน้าแรก
  const resetAll = () => {
    setAnswers({});
    setDescOrder(shuffleArray(PAIRS.map(p => p.desc)));
  };

  function handleDrop(term, desc) {
    setAnswers({ ...answers, [term]: desc });
  }
  
  const correctCount = PAIRS.filter(pair => answers[pair.term] === pair.desc).length;
  const isCompleted = correctCount === PAIRS.length;

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2', '#f093fb']}
      style={{ flex: 1 }}
      start={[0, 0]}
      end={[1, 1]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          {/* Modern Header */}
          <View style={styles.headerContainer}>
            <LinearGradient
              colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.7)']}
              style={styles.headerGradient}
              start={[0, 0]}
              end={[1, 1]}
            >
              <View style={styles.headerContent}>
                <Text style={styles.headerIcon}>🎯</Text>
                <View style={styles.headerTextContainer}>
                  <Text style={styles.title}>จับคู่คำศัพท์และตัวอย่าง</Text>
                  <Text style={styles.subtitle}>
                    บทเรียนที่ {lessonIndex + 1} • {PAIRS.length} คำถาม
                  </Text>
                </View>
              </View>
              
              {/* Progress Bar */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <LinearGradient
                    colors={['#10b981', '#34d399']}
                    style={[styles.progressFill, { width: `${(correctCount / PAIRS.length) * 100}%` }]}
                    start={[0, 0]}
                    end={[1, 0]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {correctCount}/{PAIRS.length} ถูกต้อง
                </Text>
              </View>
            </LinearGradient>
          </View>

          {/* Main Content */}
          <View style={styles.contentContainer}>
            <View style={styles.row}>
              
              {/* Left Column - Terms */}
              <View style={styles.col}>
                <Text style={styles.columnTitle}>📚 คำศัพท์</Text>
                {PAIRS.map((p, i) => (
                  <View key={i} style={styles.cardContainer}>
                    <LinearGradient
                      colors={answers[p.term] === p.desc ? ['#d1fae5', '#a7f3d0'] : ['#f8fafc', '#e2e8f0']}
                      style={styles.cardBox}
                      start={[0, 0]}
                      end={[1, 1]}
                    >
                      <View style={styles.cardHeader}>
                        <Text style={styles.term}>{p.term}</Text>
                        {answers[p.term] === p.desc && (
                          <View style={styles.correctBadge}>
                            <Text style={styles.correctBadgeText}>✓</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.explain}>{p.explain}</Text>
                      {answers[p.term] && (
                        <View style={styles.answerContainer}>
                          <Text style={styles.selectedDesc}>
                            💡 {answers[p.term]}
                          </Text>
                        </View>
                      )}
                    </LinearGradient>
                  </View>
                ))}
              </View>
              
              {/* Right Column - Descriptions */}
              <View style={styles.col}>
                <Text style={styles.columnTitle}>💭 ตัวอย่างประโยค</Text>
                {descOrder.map((desc, i) => {
                  const isSelected = Object.values(answers).includes(desc);
                  const isCorrect = PAIRS.some(p => answers[p.term] === desc && answers[p.term] === p.desc);
                  
                  return (
                    <TouchableOpacity
                      key={i}
                      style={[
                        styles.descBox,
                        isSelected ? styles.descBoxSelected : null,
                      ]}
                      onPress={() => {
                        const availableTerms = PAIRS.filter(p => !answers[p.term]);
                        if (availableTerms.length && !isSelected) {
                          handleDrop(availableTerms[0].term, desc);
                        }
                      }}
                      disabled={isSelected}
                      activeOpacity={isSelected ? 1 : 0.7}
                    >
                      <LinearGradient
                        colors={
                          isCorrect 
                            ? ['#10b981', '#059669'] 
                            : isSelected 
                              ? ['#94a3b8', '#64748b'] 
                              : ['#ffffff', '#f1f5f9']
                        }
                        style={styles.descGradient}
                        start={[0, 0]}
                        end={[1, 1]}
                      >
                        <Text style={[
                          styles.descText,
                          isSelected && styles.descTextSelected,
                          isCorrect && styles.descTextCorrect
                        ]}>
                          {desc}
                        </Text>
                        {isCorrect && (
                          <View style={styles.checkmark}>
                            <Text style={styles.checkmarkText}>✓</Text>
                          </View>
                        )}
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>

          {/* Bottom Actions */}
          <View style={styles.bottomContainer}>
            <LinearGradient
              colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.8)']}
              style={styles.bottomCard}
              start={[0, 0]}
              end={[1, 1]}
            >
              {isCompleted && (
                <View style={styles.completedContainer}>
                  <Text style={styles.completedIcon}>🎉</Text>
                  <Text style={styles.completedText}>ยินดีด้วย! คุณทำถูกหมดแล้ว</Text>
                </View>
              )}
              
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.resetBtn}
                  onPress={resetAll}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#8b5cf6', '#7c3aed']}
                    style={styles.btnGradient}
                    start={[0, 0]}
                    end={[1, 1]}
                  >
                    <Text style={styles.resetText}>🔄 รีเซ็ต</Text>
                  </LinearGradient>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.menuBtn}
                  onPress={() => navigation && navigation.goBack && navigation.goBack()}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#64748b', '#475569']}
                    style={styles.btnGradient}
                    start={[0, 0]}
                    end={[1, 1]}
                  >
                    <Text style={styles.menuText}>⬅️ กลับเมนู</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
    paddingTop: 10,
    minHeight: 800,
  },
  headerContainer: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  headerGradient: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  col: {
    flex: 1,
  },
  columnTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardContainer: {
    marginBottom: 12,
  },
  cardBox: {
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  term: {
    fontWeight: '800',
    fontSize: 16,
    color: '#1e293b',
    flex: 1,
  },
  correctBadge: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  correctBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  explain: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 8,
    lineHeight: 18,
  },
  answerContainer: {
    marginTop: 8,
  },
  selectedDesc: {
    color: '#059669',
    fontSize: 13,
    fontWeight: '600',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 8,
    padding: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#10b981',
  },
  descBox: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  descGradient: {
    padding: 16,
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  descBoxSelected: { 
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  descText: {
    fontSize: 14,
    color: '#1e293b',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 18,
  },
  descTextSelected: {
    color: '#fff',
  },
  descTextCorrect: {
    color: '#fff',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bottomContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  bottomCard: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  completedContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  completedIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  completedText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#059669',
    textAlign: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  resetBtn: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#8b5cf6',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  menuBtn: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#64748b',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  btnGradient: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  menuText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});