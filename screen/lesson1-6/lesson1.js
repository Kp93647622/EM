import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Custom Alert Component
const CustomAlert = ({ visible, onClose, type, title, message, buttonText }) => {
  const isCorrect = type === 'correct';
  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={isCorrect ? ['#4CAF50', '#45A049'] : ['#f44336', '#d32f2f']}
            style={styles.modalHeader}
          >
            <Text style={styles.modalIcon}>{isCorrect ? '🎉' : '❌'}</Text>
            <Text style={styles.modalTitle}>{title}</Text>
          </LinearGradient>
          <View style={styles.modalBody}>
            <Text style={styles.modalMessage}>{message}</Text>
          </View>
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: isCorrect ? '#4CAF50' : '#f44336' }]}
              onPress={onClose}
            >
              <Text style={styles.modalButtonText}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function Lesson1() {
  const navigation = useNavigation();
  const [sound, setSound] = useState();
  const [currentScore, setCurrentScore] = useState(0);
  const [totalQuestions] = useState(8);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [selectedChoices, setSelectedChoices] = useState({}); // key: questionId, value: choiceIndex
  const [isPlaying, setIsPlaying] = useState(false);

  // Custom Alert States
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({
    type: 'correct',
    title: '',
    message: '',
    buttonText: 'ตกลง'
  });

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
  }, []);

  useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  // Custom Alert Function
  const showCustomAlert = (type, title, message, buttonText = 'ตกลง') => {
    setAlertData({ type, title, message, buttonText });
    setAlertVisible(true);
  };

  // ฟังก์ชันเล่นเสียง
  const playSound = async (text, rate = 0.8) => {
    if (isPlaying) {
      showCustomAlert('error', 'กำลังเล่นเสียง', 'กรุณารอให้เสียงเดิมเล่นจบก่อน', 'เข้าใจแล้ว');
      return;
    }
    try {
      setIsPlaying(true);
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }
      const cleanText = text.replace(/[^\w\s.,!?]/g, '');
      const encodedText = encodeURIComponent(cleanText);
      const ttsUrls = [
        `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=en&client=tw-ob&ttsspeed=${rate}`,
        `https://api.voicerss.org/?key=demo&hl=en-us&src=${encodedText}&r=${rate}&c=mp3&f=44khz_16bit_stereo`
      ];

      let soundCreated = false;
      for (let i = 0; i < ttsUrls.length; i++) {
        try {
          const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: ttsUrls[i] },
            { shouldPlay: true, volume: 1.0 }
          );
          setSound(newSound);
          newSound.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
              setIsPlaying(false);
            }
          });
          soundCreated = true;
          break;
        } catch {
          continue;
        }
      }
      if (!soundCreated) throw new Error('All TTS services failed');
    } catch (error) {
      setIsPlaying(false);
      showCustomAlert(
        'error',
        'ไม่สามารถเล่นเสียงได้',
        `ข้อความที่จะอ่าน: "${text}"\n\nกรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต`,
        'ตกลง'
      );
    }
  };

  const playSimpleSound = async (text) => {
    try {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 1;
        window.speechSynthesis.speak(utterance);
        return;
      }
      await playSound(text);
    } catch {
      await playSound(text);
    }
  };

  const stopSound = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
      }
      setIsPlaying(false);
    } catch { }
  };

  const handleQuizSubmit = (questionId, answer, correctAnswer, choiceIndex) => {
    if (answeredQuestions.has(questionId)) {
      showCustomAlert('error', 'แจ้งเตือน', 'คุณตอบคำถามนี้แล้ว', 'เข้าใจแล้ว');
      return;
    }
    const newAnsweredQuestions = new Set(answeredQuestions);
    newAnsweredQuestions.add(questionId);
    setAnsweredQuestions(newAnsweredQuestions);

    setSelectedChoices((prev) => ({ ...prev, [questionId]: choiceIndex }));

    if (answer === correctAnswer) {
      setCurrentScore(currentScore + 1);
      showCustomAlert(
        'correct',
        'ยอดเยี่ยม! 🎉',
        '🌟 คุณเลือกคำตอบที่ถูกต้อง!\n\nดีมาก! คุณกำลังเรียนรู้ได้อย่างยอดเยี่ยม ก้าวต่อไปเลย!',
        'ต่อไป'
      );
      setTimeout(() => playSimpleSound('Excellent! Well done!'), 500);
    } else {
      showCustomAlert(
        'error',
        'ไม่เป็นไร ลองใหม่! 💪',
        `🤔 คำตอบที่ถูกต้องคือ: ${correctAnswer}\n\nอย่าท้อแท้! การเรียนรู้ต้องผ่านความผิดพลาดมาก่อน คุณทำได้แน่นอน!`,
        'เข้าใจแล้ว'
      );
      setTimeout(() => playSimpleSound('Try again! You can do it!'), 500);
    }
  };

  // ตัวอย่าง, vocab, verbCategories, readingText, quizQuestions เหมือนเดิม
  // (เหมือนในโค้ดของคุณ ไม่แก้ไขซ้ำเพื่อประหยัดพื้นที่)
  // .....
  // *** เริ่มใส่ DATA เหมือนเดิม ***
  const examples = [
    { thai: "ฉันได้ไปญี่ปุ่นแล้ว", english: "I have been to Japan.", type: "Present Perfect - Experience", usage: "แสดงประสบการณ์ที่เคยมี" },
    { thai: "เธอทำงานที่นี่มา 5 ปีแล้ว", english: "She has worked here for 5 years.", type: "Present Perfect - Duration", usage: "แสดงระยะเวลาต่อเนื่อง" },
    { thai: "ฉันรู้จักเขามาตั้งแต่เด็ก", english: "I have known him since childhood.", type: "Stative Verb - Present Perfect", usage: "Stative verb ใช้กับ Present Perfect" },
    { thai: "พวกเขากำลังเดินทางไปเชียงใหม่", english: "They are traveling to Chiang Mai.", type: "Action Verb - Present Continuous", usage: "Action verb ใช้กับ Continuous tense ได้" },
    { thai: "ฉันยังไม่เคยกินอาหารอินเดีย", english: "I have never eaten Indian food.", type: "Present Perfect - Never", usage: "ใช้ never กับ Present Perfect" },
    { thai: "เขาเพิ่งมาถึงสนามบิน", english: "He has just arrived at the airport.", type: "Present Perfect - Just", usage: "ใช้ just กับ Present Perfect" },
    { thai: "ฉันเชื่อในตัวคุณ", english: "I believe in you.", type: "Stative Verb - Simple Present", usage: "Stative verb ไม่ใช้ Continuous" },
    { thai: "เขาได้อ่านหนังสือเล่มนี้ไปแล้ว", english: "He has already read this book.", type: "Present Perfect - Already", usage: "ใช้ already กับ Present Perfect" }
  ];

  const vocabulary = [
    { word: "experience", meaning: "ประสบการณ์", pronunciation: "/ɪkˈspɪriəns/", example: "I have a lot of experience in teaching." },
    { word: "journey", meaning: "การเดินทาง", pronunciation: "/ˈdʒɜːrni/", example: "The journey has been amazing." },
    { word: "adventure", meaning: "การผจญภัย", pronunciation: "/ədˈventʃər/", example: "We have had many adventures together." },
    { word: "culture", meaning: "วัฒนธรรม", pronunciation: "/ˈkʌltʃər/", example: "I love learning about different cultures." },
    { word: "hobby", meaning: "งานอดิเรก", pronunciation: "/ˈhɑːbi/", example: "Photography has been my hobby for years." },
    { word: "pastime", meaning: "กิจกรรมยามว่าง", pronunciation: "/ˈpæstaɪm/", example: "Reading is my favorite pastime." },
    { word: "explore", meaning: "สำรวจ", pronunciation: "/ɪkˈsplɔːr/", example: "We have explored many countries." },
    { word: "discover", meaning: "ค้นพบ", pronunciation: "/dɪˈskʌvər/", example: "Scientists have discovered a new species." },
    { word: "achieve", meaning: "บรรลุ", pronunciation: "/əˈtʃiːv/", example: "She has achieved her goals." },
    { word: "improve", meaning: "ปรับปรุง", pronunciation: "/ɪmˈpruːv/", example: "My English has improved a lot." },
    { word: "believe", meaning: "เชื่อ", pronunciation: "/bɪˈliːv/", example: "I believe in hard work." },
    { word: "understand", meaning: "เข้าใจ", pronunciation: "/ˌʌndərˈstænd/", example: "Do you understand the lesson?" }
  ];

  const verbCategories = {
    action: [
      { verb: "run", meaning: "วิ่ง", example: "I am running in the park." },
      { verb: "eat", meaning: "กิน", example: "She is eating lunch now." },
      { verb: "write", meaning: "เขียน", example: "He is writing a letter." },
      { verb: "dance", meaning: "เต้น", example: "They are dancing beautifully." },
      { verb: "swim", meaning: "ว่ายน้ำ", example: "We are swimming in the pool." },
      { verb: "study", meaning: "เรียน", example: "I am studying English." }
    ],
    stative: [
      { verb: "know", meaning: "รู้", example: "I know the answer." },
      { verb: "believe", meaning: "เชื่อ", example: "She believes in God." },
      { verb: "love", meaning: "รัก", example: "I love chocolate." },
      { verb: "hate", meaning: "เกลียด", example: "He hates spicy food." },
      { verb: "understand", meaning: "เข้าใจ", example: "Do you understand me?" },
      { verb: "own", meaning: "เป็นเจ้าของ", example: "They own a big house." }
    ]
  };

  const readingText = `
My Journey with Hobbies and Interests

I have always been passionate about learning new things. Over the years, I have developed many hobbies that have enriched my life in different ways.

Photography has been my main hobby for the past ten years. I have taken thousands of photos during my travels around Southeast Asia. I have captured beautiful sunsets in Bali, ancient temples in Cambodia, and bustling markets in Vietnam. Photography has taught me to see the world differently and has helped me appreciate small details in everyday life.

Recently, I have started learning to play the guitar. I have been practicing for three months now, and I can already play some simple songs. Music has become an important part of my daily routine. I believe that learning a musical instrument keeps your mind sharp and helps you express emotions in a unique way.

Reading has always been one of my favorite pastimes. This year alone, I have read over fifty books from various genres. I have discovered new authors, explored different cultures through literature, and have gained knowledge about subjects I never knew interested me. Reading has broadened my perspective and has made me more empathetic towards others.

I also love outdoor activities. I have been hiking regularly for five years, and I have climbed several mountains in northern Thailand. Exercise has always been essential for my physical and mental well-being. I have noticed that regular physical activity has improved my concentration and has given me more energy throughout the day.

Cooking is another skill I have developed recently. I have learned to prepare dishes from different countries, and I have experimented with various spices and cooking techniques. I have discovered that cooking is not just about feeding yourself; it's a creative process that brings people together.

All these hobbies have one thing in common - they have made me a more well-rounded person. I believe that having diverse interests keeps life interesting and helps you grow as an individual.
  `;

  const quizQuestions = [
    {
      id: 1,
      question: "I _____ never _____ sushi before.",
      choices: ["A. did not eat", "B. have not eaten", "C. am not eating", "D. will not eat"],
      correct: "B"
    },
    {
      id: 2,
      question: "She _____ him since 2010. (know)",
      choices: ["A. knows", "B. knew", "C. has known", "D. is knowing"],
      correct: "C"
    },
    {
      id: 3,
      question: "They _____ in London for five years.",
      choices: ["A. live", "B. lived", "C. have lived", "D. are living"],
      correct: "C"
    },
    {
      id: 4,
      question: "Which is a stative verb?",
      choices: ["A. run", "B. dance", "C. believe", "D. swim"],
      correct: "C"
    },
    {
      id: 5,
      question: "I _____ my homework already.",
      choices: ["A. finish", "B. finished", "C. have finished", "D. am finishing"],
      correct: "C"
    },
    {
      id: 6,
      question: "She _____ chocolate. (love - stative verb)",
      choices: ["A. loves", "B. is loving", "C. has loved", "D. loved"],
      correct: "A"
    },
    {
      id: 7,
      question: "We _____ this movie three times.",
      choices: ["A. watch", "B. watched", "C. have watched", "D. are watching"],
      correct: "C"
    },
    {
      id: 8,
      question: "He _____ just _____ from work.",
      choices: ["A. is returning", "B. returned", "C. has returned", "D. returns"],
      correct: "C"
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
        <Text style={styles.headerTitle}>📚 บทที่ 1 My Self</Text>
        <Text style={styles.headerSubtitle}>Present Perfect & Action vs Stative Verbs</Text>
        <Text style={styles.scoreText}>คะแนน: {currentScore}/{totalQuestions}</Text>
        {isPlaying && (
          <TouchableOpacity style={styles.stopButton} onPress={stopSound}>
            <Text style={styles.stopButtonText}>⏹️ หยุดเสียง</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>
      {/* Grammar Section (unchanged) */}
      {/* ... (เหมือนเดิม) ... */}
      <View style={styles.section}>
        <View style={styles.sectionDivider}>
          <Text style={styles.sectionTitle}>📖 หลักไวยากรณ์</Text>
        </View>
        <View style={styles.grammarCard}>
          <View style={styles.cardBorder}>
            <Text style={styles.grammarTitle}>🎯 Present Perfect - การใช้งาน</Text>
            <Text style={styles.grammarDescription}>
              Present Perfect ใช้เมื่อ:
              {'\n'}• แสดงประสบการณ์ที่เคยมี
              {'\n'}• แสดงการกระทำที่เริ่มในอดีตและยังคงดำเนินต่อ
              {'\n'}• แสดงการกระทำที่เกิดขึ้นในอดีตแต่มีผลต่อปัจจุบัน
            </Text>
            <View style={styles.formulaContainer}>
              <Text style={styles.grammarFormula}>
                <Text style={styles.formulaLabel}>สูตร:</Text> Subject + have/has + V3 (past participle)
              </Text>
            </View>
            <View style={styles.exampleContainer}>
              <Text style={styles.grammarExample}>
                ✓ I <Text style={styles.highlight}>have visited</Text> Japan twice. (ประสบการณ์)
              </Text>
              <Text style={styles.grammarExample}>
                ✓ She <Text style={styles.highlight}>has lived</Text> here for 5 years. (ระยะเวลา)
              </Text>
              <Text style={styles.grammarExample}>
                ✓ I <Text style={styles.highlight}>have just finished</Text> my work. (เพิ่งเสร็จ)
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.grammarCard}>
          <View style={styles.cardBorder}>
            <Text style={styles.grammarTitle}>⚡ Action vs Stative Verbs - ความแตกต่าง</Text>
            <Text style={styles.grammarDescription}>
              <Text style={styles.boldText}>Action Verbs:</Text> แสดงการกระทำที่มองเห็นได้
              {'\n'}• ใช้ได้ทั้ง Simple และ Continuous tense
              {'\n'}• ตัวอย่าง: run, eat, write, dance, swim
              {'\n\n'}<Text style={styles.boldText}>Stative Verbs:</Text> แสดงสภาวะ ความรู้สึก ความคิด
              {'\n'}• ส่วนใหญ่ไม่ใช้ Continuous tense
              {'\n'}• ตัวอย่าง: know, believe, love, hate, understand
            </Text>
            <View style={styles.formulaContainer}>
              <Text style={styles.grammarFormula}>
                <Text style={styles.formulaLabel}>Action:</Text> I am running now. ✓
              </Text>
              <Text style={styles.grammarFormula}>
                <Text style={styles.formulaLabel}>Stative:</Text> I know the answer. ✓ (ไม่ใช้ I am knowing ❌)
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.grammarCard}>
          <View style={styles.cardBorder}>
            <Text style={styles.grammarTitle}>📋 หมวดหมู่ของ Verbs</Text>
            <View style={styles.verbSection}>
              <Text style={styles.verbCategoryTitle}>🏃‍♂️ Action Verbs</Text>
              {verbCategories.action.map((item, index) => (
                <View key={index} style={styles.verbItem}>
                  <Text style={styles.verbText}>
                    <Text style={styles.verbWord}>{item.verb}</Text> - {item.meaning}
                  </Text>
                  <Text style={styles.verbExample}>{item.example}</Text>
                  <TouchableOpacity
                    style={[styles.miniSoundButton, isPlaying && styles.disabledButton]}
                    onPress={() => playSimpleSound(item.example)}
                    disabled={isPlaying}
                  >
                    <Text style={styles.miniSoundText}>🔊</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <View style={styles.verbSection}>
              <Text style={styles.verbCategoryTitle}>🧠 Stative Verbs</Text>
              {verbCategories.stative.map((item, index) => (
                <View key={index} style={styles.verbItem}>
                  <Text style={styles.verbText}>
                    <Text style={styles.verbWord}>{item.verb}</Text> - {item.meaning}
                  </Text>
                  <Text style={styles.verbExample}>{item.example}</Text>
                  <TouchableOpacity
                    style={[styles.miniSoundButton, isPlaying && styles.disabledButton]}
                    onPress={() => playSimpleSound(item.example)}
                    disabled={isPlaying}
                  >
                    <Text style={styles.miniSoundText}>🔊</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Examples Section */}
      <View style={styles.section}>
        <View style={styles.sectionDivider}>
          <Text style={styles.sectionTitle}>💡 ตัวอย่างประโยค</Text>
        </View>
        {examples.map((example, index) => (
          <View key={index} style={styles.exampleCard}>
            <View style={styles.cardBorder}>
              <View style={styles.exampleHeader}>
                <Text style={styles.exampleType}>{example.type}</Text>
              </View>
              <View style={styles.exampleContent}>
                <Text style={styles.englishText}>{example.english}</Text>
                <Text style={styles.thaiText}>{example.thai}</Text>
                <Text style={styles.usageText}>💡 {example.usage}</Text>
              </View>
              <TouchableOpacity
                style={[styles.playButton, isPlaying && styles.disabledButton]}
                onPress={() => playSound(example.english, 0.7)}
                disabled={isPlaying}
              >
                <Text style={styles.playButtonText}>
                  {isPlaying ? '⏳ กำลังเล่น...' : '▶️ เล่นเสียง'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Vocabulary Section */}
      <View style={styles.section}>
        <View style={styles.sectionDivider}>
          <Text style={styles.sectionTitle}>📝 คำศัพท์สำคัญ</Text>
        </View>
        <View style={styles.vocabContainer}>
          {vocabulary.map((vocab, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.vocabCard, isPlaying && styles.disabledButton]}
              onPress={() => playSound(`${vocab.word}. ${vocab.example}`)}
              disabled={isPlaying}
            >
              <View style={styles.cardBorder}>
                <Text style={styles.vocabWord}>{vocab.word}</Text>
                <Text style={styles.vocabPronunciation}>{vocab.pronunciation}</Text>
                <Text style={styles.vocabMeaning}>{vocab.meaning}</Text>
                <Text style={styles.vocabExample}>{vocab.example}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Reading Exercise */}
      <View style={styles.section}>
        <View style={styles.sectionDivider}>
          <Text style={styles.sectionTitle}>📘 Reading: My Journey with Hobbies</Text>
        </View>
        <View style={styles.readingCard}>
          <View style={styles.cardBorder}>
            <Text style={styles.readingText}>{readingText.trim()}</Text>
          </View>
        </View>
      </View>

      {/* Quiz */}
      <View style={styles.section}>
        <View style={styles.sectionDivider}>
          <Text style={styles.sectionTitle}>🧠 แบบฝึกหัด: Present Perfect</Text>
        </View>
        {quizQuestions.map((q, qIndex) => (
          <View key={q.id} style={styles.quizCard}>
            <View style={styles.cardBorder}>
              <Text style={styles.quizQuestion}>{qIndex + 1}. {q.question}</Text>
              <View style={styles.choicesContainer}>
                {q.choices.map((choice, cIndex) => {
                  const alreadyAnswered = answeredQuestions.has(q.id);
                  const isSelected = selectedChoices[q.id] === cIndex;
                  return (
                    <TouchableOpacity
                      key={cIndex}
                      style={[
                        styles.choiceButton,
                        isSelected && styles.choiceButtonSelected,
                        alreadyAnswered && !isSelected && styles.disabledButton
                      ]}
                      disabled={alreadyAnswered}
                      onPress={() => handleQuizSubmit(q.id, choice.charAt(0), q.correct, cIndex)}
                    >
                      <Text style={[
                        styles.choiceText,
                        isSelected && styles.choiceTextSelected
                      ]}>{choice}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* ปุ่มกลับหน้าเมนู */}
      <View style={styles.section}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>🏠 กลับหน้าหลัก</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Custom Alert */}
      <CustomAlert
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        type={alertData.type}
        title={alertData.title}
        message={alertData.message}
        buttonText={alertData.buttonText}
      />
    </ScrollView>
  );
}

// Enhanced Styles
const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#f5f7fb', 
    flex: 1 
  },
  header: { 
    padding: 20, 
    borderRadius: 15, 
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: { 
    fontSize: 28, 
    color: '#fff', 
    fontWeight: 'bold',
    textAlign: 'center'
  },
  headerSubtitle: { 
    fontSize: 16, 
    color: '#f0f0f0', 
    marginTop: 5,
    textAlign: 'center'
  },
  scoreText: { 
    marginTop: 15, 
    fontSize: 18, 
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  stopButton: { 
    marginTop: 15, 
    padding: 12, 
    backgroundColor: '#ff5252', 
    borderRadius: 10,
    alignSelf: 'center'
  },
  stopButtonText: { 
    color: '#fff', 
    textAlign: 'center',
    fontWeight: 'bold'
  },
  section: { 
    marginBottom: 25, 
    paddingHorizontal: 15 
  },
  sectionDivider: {
    borderBottomWidth: 3,
    borderBottomColor: '#667eea',
    marginBottom: 20,
    paddingBottom: 10
  },
    sectionDivider: {
    borderBottomWidth: 3,
    borderBottomColor: '#667eea',
    marginBottom: 20,
    paddingBottom: 5,
  },
  grammarCard: { 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 16, 
    elevation: 2 
  },
  grammarTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 8, 
    color: '#4b4b4b' 
  },
  grammarDescription: { 
    fontSize: 15, 
    color: '#333' 
  },
  formulaContainer: { 
    marginTop: 12 
  },
  grammarFormula: { 
    fontSize: 15, 
    fontStyle: 'italic' 
  },
  exampleContainer: { 
    marginTop: 10 
  },
  grammarExample: { 
    fontSize: 15, 
    color: '#444', 
    marginTop: 4 
  },
  formulaLabel: { 
    fontWeight: 'bold' 
  },
  highlight: { 
    color: '#764ba2', 
    fontWeight: 'bold' 
  },
  boldText: { 
    fontWeight: 'bold' 
  },
  cardBorder: {
    borderWidth: 1.5,
    borderColor: '#e0e7ff',
    borderRadius: 10,
    padding: 8,
    backgroundColor: '#f9f9ff'
  },
  verbSection: {
    marginTop: 6
  },
  verbCategoryTitle: { 
    marginTop: 8, 
    fontWeight: 'bold', 
    fontSize: 16, 
    color: '#5c5c8a' 
  },
  verbItem: { 
    marginVertical: 6, 
    padding: 8, 
    backgroundColor: '#eef', 
    borderRadius: 8, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between'
  },
  verbText: { 
    fontSize: 15, 
    flex: 1 
  },
  verbWord: { 
    fontWeight: 'bold' 
  },
  verbExample: { 
    fontStyle: 'italic', 
    marginTop: 2, 
    fontSize: 14, 
    color: '#666' 
  },
  miniSoundButton: { 
    alignSelf: 'flex-start', 
    marginLeft: 8, 
    backgroundColor: '#ccc', 
    padding: 4, 
    borderRadius: 6 
  },
  miniSoundText: { 
    fontSize: 15 
  },
  disabledButton: { 
    opacity: 0.45 
  },
  // Example Sentence Card
  exampleCard: { 
    backgroundColor: '#fff', 
    padding: 13, 
    marginBottom: 10, 
    borderRadius: 12, 
    elevation: 1
  },
  exampleHeader: { 
    marginBottom: 2 
  },
  exampleType: { 
    fontWeight: 'bold', 
    fontSize: 16, 
    color: '#6366f1' 
  },
  exampleContent: { 
    marginTop: 5 
  },
  englishText: { 
    fontSize: 16, 
    marginBottom: 3, 
    color: '#1e293b' 
  },
  thaiText: { 
    fontSize: 15, 
    color: '#555' 
  },
  usageText: { 
    fontSize: 14, 
    marginTop: 4, 
    fontStyle: 'italic', 
    color: '#7950f2' 
  },
  playButton: { 
    marginTop: 8, 
    backgroundColor: '#667eea', 
    padding: 8, 
    borderRadius: 8,
    alignItems: 'center'
  },
  playButtonText: { 
    color: '#fff', 
    textAlign: 'center' 
  },
  // Vocabulary
  vocabContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },
  vocabCard: { 
    width: width / 2 - 20, 
    backgroundColor: '#fff', 
    padding: 12, 
    borderRadius: 11, 
    marginBottom: 12 
  },
  vocabWord: { 
    fontWeight: 'bold', 
    fontSize: 16, 
    color: '#333' 
  },
  vocabPronunciation: { 
    fontStyle: 'italic', 
    fontSize: 14, 
    color: '#4f4f4f' 
  },
  vocabMeaning: { 
    fontSize: 15, 
    color: '#444' 
  },
  vocabExample: { 
    fontSize: 14, 
    color: '#666', 
    marginTop: 4 
  },
  // Reading Card
  readingCard: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 12 
  },
  readingText: { 
    fontSize: 15, 
    lineHeight: 22, 
    color: '#333' 
  },
  // Quiz Section
  quizCard: { 
    backgroundColor: '#fff', 
    padding: 13, 
    borderRadius: 12, 
    marginBottom: 14, 
    elevation: 1
  },
  quizQuestion: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    color: '#22223b' 
  },
  choicesContainer: { 
    flexDirection: 'column', 
    marginTop: 3 
  },
  choiceButton: { 
    backgroundColor: '#f1f1f1', 
    padding: 10, 
    borderRadius: 8, 
    marginVertical: 4 
  },
  choiceText: { 
    fontSize: 15, 
    color: '#222' 
  },
  // Back Button
  backButtonContainer: {
    alignItems: 'center',
    marginTop: 10
  },
  backButton: {
    backgroundColor: '#764ba2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 26
  },
  backButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold'
  },
  // Custom Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(50,50,60,0.35)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden'
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  modalIcon: {
    fontSize: 28,
    marginRight: 10
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff'
  },
  modalBody: {
    padding: 16
  },
  modalMessage: {
    fontSize: 16,
    color: '#333'
  },
  modalFooter: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 13,
    alignItems: 'center'
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 8
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});

// เพิ่ม styles ที่เกี่ยวกับปุ่มเลือกและสถานะ selected
// (นำ style ด้านล่างนี้ไปรวมไว้ใน object styles ด้านบน แทนการสร้างใหม่)
Object.assign(styles, {
  choiceButton: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#f1f1f1'
  },
  choiceButtonSelected: {
    backgroundColor: '#a18ff5',
    borderColor: '#6c47e4'
  },
  choiceText: {
    fontSize: 15,
    color: '#222'
  },
  choiceTextSelected: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
// (ส่วนอื่นๆ ใช้เหมือน styles เดิม)

