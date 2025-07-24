import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function ConditionalSentencesLesson() {
  const navigation = useNavigation();
  const [sound, setSound] = useState();
  const [currentScore, setCurrentScore] = useState(0);
  const [totalQuestions] = useState(30);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [playingId, setPlayingId] = useState(null);

  // Cleanup sound when component unmounts
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const playSound = async (text, rate = 0.8, id = null) => {
    try {
      setIsLoading(true);
      setPlayingId(id);
      
      // หยุดเสียงก่อนหน้าถ้ามี
      if (sound) {
        await sound.unloadAsync();
      }
      
      // ใช้ Web Speech API สำหรับ Text-to-Speech
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate;
        utterance.lang = 'en-US';
        utterance.onend = () => {
          setIsLoading(false);
          setPlayingId(null);
        };
        utterance.onerror = () => {
          setIsLoading(false);
          setPlayingId(null);
          playWithAPI(text, rate);
        };
        window.speechSynthesis.speak(utterance);
        return;
      }
      
      await playWithAPI(text, rate);
      
    } catch (error) {
      console.log('TTS Error:', error);
      setIsLoading(false);
      setPlayingId(null);
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถเล่นเสียงได้ในขณะนี้');
    }
  };

  const playWithAPI = async (text, rate = 0.8) => {
    try {
      const response = await fetch(
        `https://api.streamelements.com/kappa/v2/speech?voice=Brian&text=${encodeURIComponent(text)}&speed=${rate}`
      );
      
      if (!response.ok) {
        throw new Error('API response not ok');
      }
      
      const responseText = await response.text();
      let data;
      
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.log('JSON Parse Error - Response:', responseText);
        throw new Error('Invalid JSON response');
      }
      
      if (data.url) {
        const { sound: newSound } = await Audio.Sound.createAsync({ uri: data.url });
        setSound(newSound);
        await newSound.playAsync();
        
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setIsLoading(false);
            setPlayingId(null);
          }
        });
      }
      
    } catch (error) {
      console.log('TTS Error:', error);
      Alert.alert('เสียง', text);
      setIsLoading(false);
      setPlayingId(null);
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsLoading(false);
      setPlayingId(null);
    }
    
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const handleQuizSubmit = (questionId, answer, correctAnswer) => {
    if (answeredQuestions.has(questionId)) {
      Alert.alert('แจ้งเตือน', 'คุณตอบคำถามนี้แล้ว');
      return;
    }

    const newAnsweredQuestions = new Set(answeredQuestions);
    newAnsweredQuestions.add(questionId);
    setAnsweredQuestions(newAnsweredQuestions);

    if (answer === correctAnswer) {
      setCurrentScore(currentScore + 1);
      Alert.alert('🎉 ถูกต้อง!', 'ดีมาก! คุณเลือกคำตอบที่ถูกต้อง', [
        { text: 'ต่อไป', onPress: () => playSound('Excellent! Well done!') }
      ]);
    } else {
      Alert.alert('❌ ไม่ถูกต้อง', 'ลองใหม่อีกครั้งนะ คำตอบที่ถูกคือ: ' + correctAnswer, [
        { text: 'เข้าใจแล้ว', onPress: () => playSound('Try again! You can do it!') }
      ]);
    }
  };

  const examples = [
    {
      id: 'ex1',
      thai: "ถ้าคุณอุ่นน้ำแข็ง มันจะละลาย",
      english: "If you heat ice, it melts.",
      type: "Type 0 (Zero Conditional)",
      situation: "ใช้กับข้อเท็จจริงทั่วไป กฎธรรมชาติ"
    },
    {
      id: 'ex2',
      thai: "ถ้าฝนตก เราจะอยู่บ้าน",
      english: "If it rains, we will stay at home.",
      type: "Type 1 (First Conditional)",
      situation: "ใช้กับเหตุการณ์ที่อาจเกิดขึ้นในอนาคต"
    },
    {
      id: 'ex3',
      thai: "ถ้าฉันรวย ฉันจะซื้อบ้านหลังใหญ่",
      english: "If I were rich, I would buy a big house.",
      type: "Type 2 (Second Conditional)",
      situation: "ใช้กับสถานการณ์จินตนาการหรือไม่เป็นจริงในปัจจุบัน"
    },
    {
      id: 'ex4',
      thai: "น้ำจะเดือดที่ 100 องศาเซลเซียส",
      english: "Water boils at 100 degrees Celsius.",
      type: "Type 0 (Zero Conditional)",
      situation: "ข้อเท็จจริงทางวิทยาศาสตร์"
    },
    {
      id: 'ex5',
      thai: "ถ้าเธอมาปาร์ตี้ เราจะสนุกมาก",
      english: "If she comes to the party, we will have a lot of fun.",
      type: "Type 1 (First Conditional)",
      situation: "เหตุการณ์ที่เป็นไปได้ในอนาคต"
    },
    {
      id: 'ex6',
      thai: "ถ้าฉันเป็นนก ฉันจะบินไปทั่วโลก",
      english: "If I were a bird, I would fly around the world.",
      type: "Type 2 (Second Conditional)",
      situation: "สถานการณ์จินตนาการที่เป็นไปไม่ได้"
    }
  ];

  const vocabulary = [
    { 
      id: 'v1',
      word: "condition", 
      meaning: "เงื่อนไข", 
      pronunciation: "/kənˈdɪʃən/",
      phonetic: "คึน-ดิ-ชั่น"
    },
    { 
      id: 'v2',
      word: "consequence", 
      meaning: "ผลที่ตามมา", 
      pronunciation: "/ˈkɒnsɪkwəns/",
      phonetic: "คอน-ซิ-ควึน-ซ์"
    },
    { 
      id: 'v3',
      word: "hypothetical", 
      meaning: "สมมติฐาน", 
      pronunciation: "/ˌhaɪpəˈθetɪkəl/",
      phonetic: "ไฮ-โป-เธ-ติ-เคิล"
    },
    { 
      id: 'v4',
      word: "possibility", 
      meaning: "ความเป็นไปได้", 
      pronunciation: "/ˌpɒsəˈbɪləti/",
      phonetic: "พอส-ซิ-บิ-ลิ-ที"
    },
    { 
      id: 'v5',
      word: "imagination", 
      meaning: "จินตนาการ", 
      pronunciation: "/ɪˌmædʒɪˈneɪʃən/",
      phonetic: "อิ-แมจ-จิ-เน-ชั่น"
    },
    { 
      id: 'v6',
      word: "reality", 
      meaning: "ความจริง", 
      pronunciation: "/riˈæləti/",
      phonetic: "รี-แอล-ลิ-ที"
    },
    { 
      id: 'v7',
      word: "unlikely", 
      meaning: "ไม่น่าจะเกิดขึ้น", 
      pronunciation: "/ʌnˈlaɪkli/",
      phonetic: "อัน-ไลค์-ลี"
    },
    { 
      id: 'v8',
      word: "probable", 
      meaning: "น่าจะเป็นไปได้", 
      pronunciation: "/ˈprɒbəbəl/",
      phonetic: "พรอบ-บะ-เบิล"
    },
    { 
      id: 'v9',
      word: "circumstances", 
      meaning: "สถานการณ์", 
      pronunciation: "/ˈsɜːkəmstənsɪz/",
      phonetic: "เซอร์-คัม-สแตน-ซิซ"
    },
    { 
      id: 'v10',
      word: "achieve", 
      meaning: "บรรลุ", 
      pronunciation: "/əˈtʃiːv/",
      phonetic: "อะ-ชีฟ"
    }
  ];

  const quizQuestions = [
    // Type 0 Questions (1-10)
    {
      id: 1,
      question: "If you _____ water to 100°C, it _____.",
      choices: ["A. heat / boils", "B. will heat / boil", "C. heated / would boil", "D. heat / will boil"],
      correct: "A",
      type: "Type 0",
      explanation: "ใช้ Type 0 เพราะเป็นข้อเท็จจริงทางธรรมชาติ ใช้ Present Simple ทั้งสองส่วน"
    },
    {
      id: 2,
      question: "When the sun _____, it _____ dark.",
      choices: ["A. will set / becomes", "B. sets / becomes", "C. set / will become", "D. sets / will become"],
      correct: "B",
      type: "Type 0",
      explanation: "ข้อเท็จจริงที่เกิดขึ้นเสมอ ใช้ Present Simple ทั้งคู่"
    },
    {
      id: 3,
      question: "If plants _____ water, they _____.",
      choices: ["A. don't get / die", "B. won't get / die", "C. didn't get / would die", "D. don't get / will die"],
      correct: "A",
      type: "Type 0",
      explanation: "กฎธรรมชาติ ใช้ Present Simple ในทั้งสองส่วน"
    },
    {
      id: 4,
      question: "When you _____ oil and water, they _____ mix.",
      choices: ["A. will combine / don't", "B. combine / don't", "C. combined / wouldn't", "D. combine / won't"],
      correct: "B",
      type: "Type 0",
      explanation: "ข้อเท็จจริงทางวิทยาศาสตร์ ใช้ Present Simple"
    },
    {
      id: 5,
      question: "If you _____ exercise regularly, you _____ healthier.",
      choices: ["A. will do / become", "B. did / would become", "C. do / become", "D. do / will become"],
      correct: "C",
      type: "Type 0",
      explanation: "ข้อเท็จจริงทั่วไปเกี่ยวกับสุขภาพ"
    },
    {
      id: 6,
      question: "When it _____, the ground _____ wet.",
      choices: ["A. will rain / gets", "B. rains / gets", "C. rained / would get", "D. rains / will get"],
      correct: "B",
      type: "Type 0",
      explanation: "ผลที่เกิดขึ้นเสมอเมื่อฝนตก"
    },
    {
      id: 7,
      question: "If you _____ iron in water, it _____.",
      choices: ["A. leave / rusts", "B. will leave / rust", "C. left / would rust", "D. leave / will rust"],
      correct: "A",
      type: "Type 0",
      explanation: "กระบวนการทางเคมีที่เกิดขึ้นเสมอ"
    },
    {
      id: 8,
      question: "When people _____ too much, they _____ weight.",
      choices: ["A. will eat / gain", "B. eat / gain", "C. ate / would gain", "D. eat / will gain"],
      correct: "B",
      type: "Type 0",
      explanation: "ข้อเท็จจริงเกี่ยวกับการรับประทานอาหาร"
    },
    {
      id: 9,
      question: "If you _____ sugar in coffee, it _____ sweet.",
      choices: ["A. add / tastes", "B. will add / taste", "C. added / would taste", "D. add / will taste"],
      correct: "A",
      type: "Type 0",
      explanation: "ผลที่เกิดขึ้นเสมอเมื่อใส่น้ำตาล"
    },
    {
      id: 10,
      question: "When the temperature _____ below 0°C, water _____.",
      choices: ["A. will drop / freezes", "B. drops / freezes", "C. dropped / would freeze", "D. drops / will freeze"],
      correct: "B",
      type: "Type 0",
      explanation: "กฎทางธรรมชาติของการแข็งตัวของน้ำ"
    },
    
    // Type 1 Questions (11-20)
    {
      id: 11,
      question: "If it _____ tomorrow, we _____ to the beach.",
      choices: ["A. rains / won't go", "B. will rain / don't go", "C. rained / wouldn't go", "D. rain / won't go"],
      correct: "A",
      type: "Type 1",
      explanation: "เหตุการณ์อนาคตที่เป็นไปได้ ใช้ Present Simple + will"
    },
    {
      id: 12,
      question: "If she _____ hard, she _____ the exam.",
      choices: ["A. will study / passes", "B. studies / will pass", "C. studied / would pass", "D. study / will pass"],
      correct: "B",
      type: "Type 1",
      explanation: "เงื่อนไขที่เป็นไปได้ในอนาคต"
    },
    {
      id: 13,
      question: "We _____ late if we _____ now.",
      choices: ["A. will be / don't leave", "B. are / won't leave", "C. would be / didn't leave", "D. will be / won't leave"],
      correct: "A",
      type: "Type 1",
      explanation: "ผลที่จะเกิดขึ้นในอนาคตหากไม่ทำตามเงื่อนไข"
    },
    {
      id: 14,
      question: "If you _____ me, I _____ you back.",
      choices: ["A. will call / call", "B. call / will call", "C. called / would call", "D. call / call"],
      correct: "B",
      type: "Type 1",
      explanation: "สัญญาหรือคำมั่นสำหรับอนาคต"
    },
    {
      id: 15,
      question: "If they _____ the project on time, they _____ a bonus.",
      choices: ["A. will finish / get", "B. finish / will get", "C. finished / would get", "D. finish / get"],
      correct: "B",
      type: "Type 1",
      explanation: "รางวัลที่จะได้รับในอนาคตหากทำตามเงื่อนไข"
    },
    {
      id: 16,
      question: "If I _____ enough money, I _____ a new car.",
      choices: ["A. will save / buy", "B. save / will buy", "C. saved / would buy", "D. save / buy"],
      correct: "B",
      type: "Type 1",
      explanation: "แผนในอนาคตที่เป็นไปได้"
    },
    {
      id: 17,
      question: "She _____ angry if you _____ her the truth.",
      choices: ["A. will be / don't tell", "B. is / won't tell", "C. would be / didn't tell", "D. will be / won't tell"],
      correct: "A",
      type: "Type 1",
      explanation: "ปฏิกิริยาที่อาจเกิดขึ้นในอนาคต"
    },
    {
      id: 18,
      question: "If we _____ early, we _____ traffic.",
      choices: ["A. will leave / avoid", "B. leave / will avoid", "C. left / would avoid", "D. leave / avoid"],
      correct: "B",
      type: "Type 1",
      explanation: "วิธีหลีกเลี่ยงปัญหาในอนาคต"
    },
    {
      id: 19,
      question: "If the weather _____ nice, we _____ a picnic.",
      choices: ["A. will be / have", "B. is / will have", "C. was / would have", "D. is / have"],
      correct: "B",
      type: "Type 1",
      explanation: "กิจกรรมที่วางแผนไว้ขึ้นอยู่กับสภาพอากาศ"
    },
    {
      id: 20,
      question: "If you ____ exercise, you _____ feel better.",
      choices: ["A. will do / feel", "B. do / will feel", "C. did / would feel", "D. do / feel"],
      correct: "B",
      type: "Type 1",
      explanation: "ผลที่จะเกิดขึ้นจากการออกกำลังกาย"
    },

    // Type 2 Questions (21-30)
    {
      id: 21,
      question: "If I _____ rich, I _____ travel around the world.",
      choices: ["A. am / will travel", "B. was / will travel", "C. were / would travel", "D. will be / travel"],
      correct: "C",
      type: "Type 2",
      explanation: "สถานการณ์จินตนาการที่ไม่เป็นจริงในปัจจุบัน ใช้ were + would"
    },
    {
      id: 22,
      question: "If she _____ more time, she _____ learn Spanish.",
      choices: ["A. has / will learn", "B. had / would learn", "C. will have / learns", "D. have / would learn"],
      correct: "B",
      type: "Type 2",
      explanation: "สถานการณ์ที่ไม่เป็นจริงในปัจจุบัน"
    },
    {
      id: 23,
      question: "If we _____ a bigger house, we _____ a party.",
      choices: ["A. have / will have", "B. had / would have", "C. will have / have", "D. had / will have"],
      correct: "B",
      type: "Type 2",
      explanation: "สถานการณ์จินตนาการ เพราะไม่มีบ้านใหญ่จริง"
    },
    {
      id: 24,
      question: "If I _____ you, I _____ that job.",
      choices: ["A. am / will take", "B. was / will take", "C. were / would take", "D. will be / take"],
      correct: "C",
      type: "Type 2",
      explanation: "การให้คำแนะนำ ใช้ If I were you (สำนวนคงที่)"
    },
    {
      id: 25,
      question: "If they _____ harder, they _____ more successful.",
      choices: ["A. work / will be", "B. worked / would be", "C. will work / are", "D. worked / will be"],
      correct: "B",
      type: "Type 2",
      explanation: "สถานการณ์ที่ไม่เป็นจริง เพราะพวกเขาไม่ทำงานหนัก"
    },
    {
      id: 26,
      question: "If it _____ so expensive, I _____ it.",
      choices: ["A. isn't / will buy", "B. wasn't / would buy", "C. won't be / buy", "D. weren't / would buy"],
      correct: "D",
      type: "Type 2",
      explanation: "สถานการณ์ตรงข้ามกับความจริง (มันแพงจริง)"
    },
    {
      id: 27,
      question: "If he _____ French, he _____ in Paris.",
      choices: ["A. speaks / will work", "B. spoke / would work", "C. will speak / works", "D. spoke / will work"],
      correct: "B",
      type: "Type 2",
      explanation: "ความสามารถที่ไม่มีจริงในปัจจุบัน"
    },
    {
      id: 28,
      question: "If we _____ wings, we _____ fly.",
      choices: ["A. have / will fly", "B. had / would fly", "C. will have / fly", "D. had / will fly"],
      correct: "B",
      type: "Type 2",
      explanation: "สถานการณ์ที่เป็นไปไม่ได้ (มนุษย์ไม่มีปีก)"
    },
    {
      id: 29,
      question: "If I _____ the lottery, I _____ my job.",
      choices: ["A. win / will quit", "B. won / would quit", "C. will win / quit", "D. won / will quit"],
      correct: "B",
      type: "Type 2",
      explanation: "สถานการณ์ที่ไม่น่าจะเกิดขึ้น (ถูกหวย)"
    },
    {
      id: 30,
      question: "If she _____ so busy, she _____ us more often.",
      choices: ["A. isn't / will visit", "B. wasn't / would visit", "C. won't be / visits", "D. weren't / would visit"],
      correct: "D",
      type: "Type 2",
      explanation: "สถานการณ์ตรงข้ามกับความจริง (เธอยุ่งจริง)"
    }
  ];

  const AudioButton = ({ text, id, style, textStyle, children, rate = 0.8 }) => {
    const isPlaying = playingId === id && isLoading;
    
    return (
      <TouchableOpacity 
        style={[style, isPlaying && styles.playingButton]}
        onPress={() => isPlaying ? stopSound() : playSound(text, rate, id)}
        disabled={isLoading && playingId !== id}
      >
        <Text style={[textStyle, isPlaying && styles.playingButtonText]}>
          {isPlaying ? '⏸️ หยุด' : children}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>🔗 Conditional Sentences</Text>
        <Text style={styles.headerSubtitle}>Type 0, 1, 2</Text>
        <Text style={styles.scoreText}>คะแนน: {currentScore}/{totalQuestions}</Text>
        
        {isLoading && (
          <TouchableOpacity 
            style={styles.stopAllButton}
            onPress={stopSound}
          >
            <Text style={styles.stopAllButtonText}>⏹️ หยุดเสียงทั้งหมด</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>

      {/* Grammar Rules */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📖 หลักไวยากรณ์</Text>
        
        <View style={styles.grammarCard}>
          <Text style={styles.grammarTitle}>🔄 Type 0 (Zero Conditional)</Text>
          <Text style={styles.grammarDescription}>
            ใช้กับข้อเท็จจริงทั่วไป กฎธรรมชาติ หรือสิ่งที่เกิดขึ้นเสมอ
          </Text>
          <Text style={styles.grammarFormula}>
            <Text style={styles.formulaLabel}>สูตร:</Text> If + Present Simple, Present Simple
          </Text>
          <Text style={styles.grammarExample}>
            ✓ If you <Text style={styles.highlight}>heat</Text> water, it <Text style={styles.highlight}>boils</Text>.
          </Text>
          <Text style={styles.usageNote}>
            💡 ใช้เมื่อ: ข้อเท็จจริง, กฎธรรมชาติ, สิ่งที่เกิดขึ้นเสมอ
          </Text>
          <AudioButton 
            text="Type zero conditional is used for general facts and natural laws. For example: If you heat water, it boils."
            id="type0-explanation"
            style={styles.soundButton}
            textStyle={styles.soundButtonText}
            rate={0.7}
          >
            🔊 ฟังคำอธิบาย
          </AudioButton>
        </View>

        <View style={styles.grammarCard}>
          <Text style={styles.grammarTitle}>🎯 Type 1 (First Conditional)</Text>
          <Text style={styles.grammarDescription}>
            ใช้กับเหตุการณ์ที่เป็นไปได้ในอนาคต มีโอกาสเกิดขึ้นจริง
          </Text>
          <Text style={styles.grammarFormula}>
            <Text style={styles.formulaLabel}>สูตร:</Text> If + Present Simple, will + V1
          </Text>
          <Text style={styles.grammarExample}>
            ✓ If it <Text style={styles.highlight}>rains</Text>, we <Text style={styles.highlight}>will stay</Text> home.
          </Text>
          <Text style={styles.usageNote}>
            💡 ใช้เมื่อ: แผนอนาคต, สัญญา, คำเตือน, คำทำนาย
          </Text>
          <AudioButton 
            text="First conditional is used for real possibilities in the future. For example: If it rains, we will stay home."
            id="type1-explanation"
            style={styles.soundButton}
            textStyle={styles.soundButtonText}
            rate={0.7}
          >
            🔊 ฟังคำอธิบาย
          </AudioButton>
        </View>

        <View style={styles.grammarCard}>
          <Text style={styles.grammarTitle}>💭 Type 2 (Second Conditional)</Text>
          <Text style={styles.grammarDescription}>
            ใช้กับสถานการณ์จินตนาการ หรือไม่เป็นจริงในปัจจุบัน
          </Text>
          <Text style={styles.grammarFormula}>
            <Text style={styles.formulaLabel}>สูตร:</Text> If + Past Simple, would + V1
          </Text>
          <Text style={styles.grammarExample}>
            ✓ If I <Text style={styles.highlight}>were</Text> you, I <Text style={styles.highlight}>would study</Text> more.
          </Text>
          <Text style={styles.usageNote}>
            💡 ใช้เมื่อ: การให้คำแนะนำ, สมมติ, ความฝัน, ความเป็นไปไม่ได้
          </Text>
          <AudioButton 
            text="Second conditional is used for imaginary or unreal situations in the present. For example: If I were you, I would study more."
            id="type2-explanation"
            style={styles.soundButton}
            textStyle={styles.soundButtonText}
            rate={0.7}
          >
            🔊 ฟังคำอธิบาย
          </AudioButton>
        </View>
      </View>

      {/* Examples Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📖 ตัวอย่างประโยค</Text>
        {examples.map((ex, i) => (
          <View key={i} style={styles.exampleCard}>
            <Text style={styles.grammarTitle}>{ex.type}</Text>
            <Text style={styles.grammarExample}>{ex.english}</Text>
            <Text style={styles.thaiText}>({ex.thai})</Text>
            <Text style={styles.usageNote}>สถานการณ์: {ex.situation}</Text>
            <AudioButton 
              text={ex.english} 
              id={`example-${i}`} 
              style={styles.soundButton} 
              textStyle={styles.soundButtonText}
            >
              🔊 ฝึกฟัง
            </AudioButton>
          </View>
        ))}
      </View>

      {/* Vocabulary Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎧 ศัพท์สำคัญ</Text>
        {vocabulary.map((v, idx) => (
          <View key={v.id} style={styles.vocabCard}>
            <Text style={styles.vocabWord}>{v.word} ({v.pronunciation})</Text>
            <Text style={styles.thaiText}>ความหมาย: {v.meaning} | อ่านว่า: {v.phonetic}</Text>
            <AudioButton 
              text={v.word} 
              id={`vocab-${idx}`} 
              style={styles.soundButtonMini} 
              textStyle={styles.soundButtonMiniText}
            >
              🔊 ฟัง
            </AudioButton>
          </View>
        ))}
      </View>

      {/* แบบฝึกหัด Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✨ แบบฝึกหัด 30 ข้อ</Text>
        {quizQuestions.map((q) => (
          <View key={q.id} style={styles.quizCard}>
            <Text style={styles.quizQuestion}>({q.type}) ข้อ {q.id}: {q.question}</Text>
            {q.choices.map((choice, i) => (
              <TouchableOpacity 
                key={i} 
                onPress={() => handleQuizSubmit(q.id, choice[0], q.correct)}
                style={styles.choiceButton}
              >
                <Text>{choice}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.scoreText}>คะแนนรวม: {currentScore}/{totalQuestions}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4FF' },
  header: { padding: 20, paddingTop: 50, alignItems: 'center' },
  headerTitle: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
  headerSubtitle: { fontSize: 18, color: '#E0E7FF' },
  scoreText: { marginTop: 10, fontSize: 16, color: '#fff' },
  stopAllButton: { marginTop: 10, backgroundColor: '#EF4444', padding: 10, borderRadius: 8 },
  stopAllButtonText: { color: '#fff', fontWeight: 'bold' },
  section: { padding: 15 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#374151' },
  grammarCard: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15 },
  grammarTitle: { fontSize: 16, fontWeight: 'bold', color: '#2563EB' },
  grammarDescription: { fontSize: 14, marginVertical: 5 },
  grammarFormula: { fontSize: 14, fontWeight: '500', color: '#444' },
  formulaLabel: { fontWeight: 'bold', color: '#F43F5E' },
  grammarExample: { fontSize: 14, color: '#10B981', marginVertical: 4 },
  highlight: { fontWeight: 'bold', color: '#EC4899' },
  usageNote: { fontSize: 13, color: '#6B7280', marginVertical: 3 },
  soundButton: { marginTop: 8, backgroundColor: '#F472B6', padding: 10, borderRadius: 8 },
  soundButtonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  exampleCard: { backgroundColor: '#E0F2FE', padding: 10, borderRadius: 10, marginBottom: 10 },
  thaiText: { fontSize: 13, color: '#4B5563' },
  vocabCard: { backgroundColor: '#FFF0F6', padding: 10, borderRadius: 10, marginBottom: 8 },
  vocabWord: { fontWeight: 'bold', fontSize: 15, color: '#DB2777' },
  soundButtonMini: { marginTop: 5, backgroundColor: '#FBCFE8', padding: 6, borderRadius: 6 },
  soundButtonMiniText: { color: '#9D174D', textAlign: 'center', fontSize: 12 },
  quizCard: { backgroundColor: '#fff', padding: 10, marginBottom: 15, borderRadius: 8 },
  quizQuestion: { fontWeight: 'bold', marginBottom: 5 },
  choiceButton: { backgroundColor: '#E0E7FF', padding: 8, borderRadius: 6, marginVertical: 3 },
  footer: { alignItems: 'center', paddingBottom: 40 },
  playingButton: { backgroundColor: '#93C5FD' },
  playingButtonText: { color: '#1E3A8A' }
});
