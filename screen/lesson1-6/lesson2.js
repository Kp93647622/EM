import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Dimensions, StatusBar } from 'react-native';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native';

const { width } = Dimensions.get('window');

export default function AdventureLesson() {
  const navigation = useNavigation();
  const [sound, setSound] = useState();
  const [currentScore, setCurrentScore] = useState(0);
  const [totalQuestions] = useState(6);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(false);

  // Utility: split array to rows of 2
  const chunkArray = (arr, chunkSize) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  useEffect(() => {
    configureAudioMode();
    return () => {
      if (sound) sound.unloadAsync();
      Speech.stop();
    };
  }, [sound]);

  const configureAudioMode = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.log('Error configuring audio mode:', error);
    }
  };

  const playSound = async (text, rate = 0.8) => {
    try {
      if (isPlaying) return;
      setIsPlaying(true);
      await Speech.stop();

      const speechOptions = {
        language: 'en-US',
        pitch: 1.0,
        rate,
        voice: null,
        onDone: () => setIsPlaying(false),
        onStopped: () => setIsPlaying(false),
        onError: () => setIsPlaying(false),
      };

      await Speech.speak(text, speechOptions);
    } catch (error) {
      setIsPlaying(false);
    }
  };

  const stopAudio = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
      }
      await Speech.stop();
      setIsPlaying(false);
    } catch {
      setIsPlaying(false);
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

  const grammarRules = [
    {
      title: "Past Perfect Tense",
      rule: "Subject + had + past participle",
      examples: [
        "By the time the explorer arrived, the team had already left.",
        "She had dreamed of this adventure for years.",
        "They had prepared for months before the expedition."
      ],
      explanation: "ใช้เพื่อแสดงเหตุการณ์ที่เกิดขึ้นและสิ้นสุดก่อนเหตุการณ์อื่นในอดีต",
      icon: "⏰"
    },
    {
      title: "Past Perfect Continuous",
      rule: "Subject + had been + verb-ing",
      examples: [
        "He had been training for the marathon for six months.",
        "The scientists had been studying the area since 2010.",
        "She had been following her role model's journey for years."
      ],
      explanation: "ใช้เพื่อแสดงกิจกรรมที่ดำเนินต่อเนื่องในอดีตจนถึงจุดหนึ่งในอดีต",
      icon: "🔄"
    },
    {
      title: "Adverb Sentence Starters",
      rule: "Adverb/Adverbial phrase, + main clause",
      examples: [
        "Surprisingly, the mountain was easier to climb than expected.",
        "Unfortunately, the weather turned bad during their journey.",
        "Fortunately, they had brought enough supplies for the trip."
      ],
      explanation: "ใช้คำกริยาวิเศษณ์หรือวลีกริยาวิเศษณ์ขึ้นต้นประโยคเพื่อเพิ่มความชัดเจน",
      icon: "⚡"
    }
  ];

  const adventureVocabulary = [
    {
      category: "Role Models (แบบอย่าง)",
      icon: "👥",
      items: [
        { word: "explorer", meaning: "นักสำรวจ", pronunciation: "/ɪkˈsplɔːrər/", example: "The explorer had discovered many new lands." },
        { word: "mountaineer", meaning: "นักปีนเขา", pronunciation: "/ˌmaʊntɪˈnɪər/", example: "The mountaineer had been climbing since childhood." },
        { word: "adventurer", meaning: "นักผจญภัย", pronunciation: "/ədˈventʃərər/", example: "She had always admired famous adventurers." },
        { word: "pioneer", meaning: "ผู้บุกเบิก", pronunciation: "/ˌpaɪəˈnɪər/", example: "The pioneer had opened new trading routes." },
        { word: "scientist", meaning: "นักวิทยาศาสตร์", pronunciation: "/ˈsaɪəntɪst/", example: "The scientist had been researching for decades." },
        { word: "innovator", meaning: "นักคิดค้น", pronunciation: "/ˈɪnəveɪtər/", example: "The innovator had revolutionized travel equipment." }
      ]
    },
    {
      category: "Adventure Activities (กิจกรรมผจญภัย)",
      icon: "🎯",
      items: [
        { word: "expedition", meaning: "การสำรวจ", pronunciation: "/ˌekspɪˈdɪʃən/", example: "The expedition had taken three months to complete." },
        { word: "journey", meaning: "การเดินทาง", pronunciation: "/ˈdʒɜːrni/", example: "Their journey had been full of unexpected discoveries." },
        { word: "trek", meaning: "การเดินป่า", pronunciation: "/trek/", example: "They had been trekking through the jungle for weeks." },
        { word: "voyage", meaning: "การเดินทางทางน้ำ", pronunciation: "/ˈvɔɪɪdʒ/", example: "The voyage had taken them across three oceans." },
        { word: "quest", meaning: "การแสวงหา", pronunciation: "/kwest/", example: "His quest for knowledge had led him to remote places." },
        { word: "mission", meaning: "ภารกิจ", pronunciation: "/ˈmɪʃən/", example: "The rescue mission had been successfully completed." }
      ]
    },
    {
      category: "Exploration Equipment (อุปกรณ์สำรวจ)",
      icon: "🧭",
      items: [
        { word: "compass", meaning: "เข็มทิศ", pronunciation: "/ˈkʌmpəs/", example: "He had always carried a compass on his adventures." },
        { word: "map", meaning: "แผนที่", pronunciation: "/mæp/", example: "The ancient map had guided them to the treasure." },
        { word: "backpack", meaning: "เป้สะพายหลัง", pronunciation: "/ˈbækpæk/", example: "Her backpack had been packed with essential supplies." },
        { word: "tent", meaning: "เต็นท์", pronunciation: "/tent/", example: "They had set up their tent before the storm arrived." },
        { word: "rope", meaning: "เชือก", pronunciation: "/roʊp/", example: "The climbing rope had saved their lives." },
        { word: "flashlight", meaning: "ไฟฉาย", pronunciation: "/ˈflæʃlaɪt/", example: "The flashlight had been their only source of light." }
      ]
    }
  ];

  const inspirationalStories = [
    {
      title: "Marie Curie - The Scientific Pioneer",
      story: "Remarkably, Marie Curie had overcome numerous obstacles to become the first woman to win a Nobel Prize. Unfortunately, she had faced discrimination throughout her career. However, she had been working tirelessly in her laboratory, discovering radium and polonium. Before her groundbreaking discoveries, scientists had not understood radioactivity. Amazingly, she had won two Nobel Prizes in different fields - physics and chemistry.",
      thai: "อย่างน่าทึ่ง มารี คูรี ได้เอาชนะอุปสรรคมากมายเพื่อเป็นผู้หญิงคนแรกที่ได้รับรางวัลโนเบล แม้ว่าเธอจะต้องเผชิญกับการเลือกปฏิบัติตลอดอาชีพการงาน แต่เธอก็ทำงานอย่างไม่เหน็ดเหนื่อยในห้องทดลองของเธอ ค้นพบเรเดียมและโพโลเนียม ก่อนการค้นพบสำคัญของเธอ นักวิทยาศาสตร์ยังไม่เข้าใจเรื่องกัมมันตภาพรังสี อย่างน่าอัศจรรย์ เธอได้รับรางวัลโนเบลสองรางวัลในสาขาที่แตกต่างกัน - ฟิสิกส์และเคมี",
      icon: "🧪"
    },
    {
      title: "Ernest Shackleton - The Antarctic Explorer",
      story: "Incredibly, Ernest Shackleton had been preparing for his Antarctic expedition for over two years. Unfortunately, his ship Endurance had become trapped in ice. Fortunately, he had been training his crew for such emergencies. Before the rescue, they had been surviving on the ice for nearly two years. Heroically, Shackleton had led his entire crew to safety without losing a single man.",
      thai: "อย่างไม่น่าเชื่อ เออร์เนสต์ แชคเคิลตัน ได้เตรียมการสำหรับการสำรวจแอนตาร์กติกาเป็นเวลากว่าสองปี แต่น่าเสียดายที่เรือ Endurance ของเขาติดอยู่ในน้ำแข็ง โชคดีที่เขาได้ฝึกลูกเรือของเขาสำหรับเหตุฉุกเฉินเช่นนี้ ก่อนการช่วยเหลือ พวกเขาได้อยู่รอดบนน้ำแข็งเป็นเวลาเกือบสองปี อย่างกล้าหาญ แชคเคิลตันได้นำลูกเรือทั้งหมดของเขาไปสู่ความปลอดภัยโดยไม่เสียคนใดเลย",
      icon: "🧊"
    }
  ];

  const adverbStarters = [
    { word: "Surprisingly", meaning: "อย่างน่าประหลาดใจ", example: "Surprisingly, the cave was deeper than expected.", icon: "😲" },
    { word: "Unfortunately", meaning: "น่าเสียดาย", example: "Unfortunately, the storm delayed their journey.", icon: "😔" },
    { word: "Fortunately", meaning: "โชคดี", example: "Fortunately, they had brought extra supplies.", icon: "🍀" },
    { word: "Amazingly", meaning: "อย่างน่าทึ่ง", example: "Amazingly, she completed the trek in record time.", icon: "🤩" },
    { word: "Incredibly", meaning: "อย่างไม่น่าเชื่อ", example: "Incredibly, he had never been afraid of heights.", icon: "😱" },
    { word: "Remarkably", meaning: "อย่างน่าสังเกต", example: "Remarkably, the ancient map was still accurate.", icon: "🤔" }
  ];

  const commonPhrases = [
    {
      english: "Surprisingly, the journey was more challenging than expected.",
      thai: "อย่างน่าประหลาดใจ การเดินทางท้าทายกว่าที่คาดไว้",
      usage: "ใช้เพื่อแสดงความประหลาดใจ",
      icon: "😮"
    },
    {
      english: "By the time we reached the summit, we had been climbing for 12 hours.",
      thai: "เมื่อเราไปถึงยอดเขา เราได้ปีนมาเป็นเวลา 12 ชั่วโมงแล้ว",
      usage: "ใช้ Past Perfect Continuous เพื่อแสดงระยะเวลาของกิจกรรม",
      icon: "⏱️"
    },
    {
      english: "Unfortunately, the weather had turned bad before we could continue.",
      thai: "น่าเสียดายที่สภาพอากาศแย่ลงก่อนที่เราจะสามารถดำเนินต่อได้",
      usage: "ใช้เพื่อแสดงเหตุการณ์ที่เกิดขึ้นก่อนหน้า",
      icon: "⛈️"
    },
    {
      english: "Fortunately, she had prepared for this situation.",
      thai: "โชคดีที่เธอได้เตรียมตัวสำหรับสถานการณ์นี้",
      usage: "ใช้เพื่อแสดงความโชคดี",
      icon: "🍀"
    },
    {
      english: "The explorer had been studying the map for hours.",
      thai: "นักสำรวจได้ศึกษาแผนที่มาเป็นชั่วโมง",
      usage: "ใช้เพื่อแสดงกิจกรรมต่อเนื่องในอดีต",
      icon: "🗺️"
    },
    {
      english: "Before the expedition, they had gathered all necessary equipment.",
      thai: "ก่อนการสำรวจ พวกเขาได้รวบรวมอุปกรณ์ที่จำเป็นทั้งหมด",
      usage: "ใช้เพื่อแสดงการเตรียมการล่วงหน้า",
      icon: "🎒"
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "_____, the mountain climber reached the summit safely.",
      choices: ["A. Fortunately", "B. Fortunate", "C. Fortune", "D. Unfortunate"],
      correct: "A",
      explanation: "ใช้ 'Fortunately' เป็น adverb ขึ้นต้นประโยคเพื่อแสดงความโชคดี"
    },
    {
      id: 2,
      question: "By the time we arrived, the expedition team _____ already left.",
      choices: ["A. has", "B. have", "C. had", "D. having"],
      correct: "C",
      explanation: "ใช้ 'had' ใน Past Perfect เพื่อแสดงเหตุการณ์ที่เกิดขึ้นก่อนเหตุการณ์อื่นในอดีต"
    },
    {
      id: 3,
      question: "She _____ been training for the marathon for six months.",
      choices: ["A. has", "B. have", "C. had", "D. having"],
      correct: "C",
      explanation: "ใช้ 'had been' ใน Past Perfect Continuous เพื่อแสดงกิจกรรมต่อเนื่องในอดีต"
    },
    {
      id: 4,
      question: "_____, the weather turned bad during their journey.",
      choices: ["A. Unlucky", "B. Unfortunately", "C. Unfortunate", "D. Luck"],
      correct: "B",
      explanation: "ใช้ 'Unfortunately' เป็น adverb ขึ้นต้นประโยคเพื่อแสดงความโชคร้าย"
    },
    {
      id: 5,
      question: "The explorer _____ many countries before settling down.",
      choices: ["A. visit", "B. visited", "C. has visited", "D. had visited"],
      correct: "D",
      explanation: "ใช้ 'had visited' ใน Past Perfect เพื่อแสดงเหตุการณ์ที่เกิดขึ้นก่อนการตั้งถิ่นฐาน"
    },
    {
      id: 6,
      question: "_____, they found the lost city after months of searching.",
      choices: ["A. Amazing", "B. Amazingly", "C. Amazed", "D. Amaze"],
      correct: "B",
      explanation: "ใช้ 'Amazingly' เป็น adverb ขึ้นต้นประโยคเพื่อแสดงความน่าทึ่ง"
    }
  ];

  const getProgressColor = () => {
    const percentage = (currentScore / totalQuestions) * 100;
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 60) return '#FF9800';
    return '#F44336';
  };

  const VocabularyCard = ({ vocab }) => (
    <View style={styles.vocabCard}>
      <View style={styles.vocabHeader}>
        <Text style={styles.vocabWord}>{vocab.word}</Text>
        <TouchableOpacity 
          style={[styles.playButtonSmall, isPlaying && styles.disabledButton]}
          onPress={() => playSound(vocab.example)}
          disabled={isPlaying}
        >
          <Text style={styles.playButtonText}>🔊</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.vocabPronunciation}>{vocab.pronunciation}</Text>
      <Text style={styles.vocabMeaning}>{vocab.meaning}</Text>
      <View style={styles.exampleContainer}>
        <Text style={styles.vocabExample}>{vocab.example}</Text>
      </View>
    </View>
  );

  const AdverbCard = ({ adverb }) => (
    <View style={styles.adverbCard}>
      <View style={styles.adverbHeader}>
        <Text style={styles.adverbIcon}>{adverb.icon}</Text>
        <Text style={styles.adverbWord}>{adverb.word}</Text>
      </View>
      <Text style={styles.adverbMeaning}>{adverb.meaning}</Text>
      <Text style={styles.adverbExample}>{adverb.example}</Text>
      <TouchableOpacity 
        style={[styles.modernButton, styles.secondaryButton, isPlaying && styles.disabledButton]}
        onPress={() => playSound(adverb.example)}
        disabled={isPlaying}
      >
        <Text style={styles.modernButtonText}>
          {isPlaying ? '⏳' : '▶️ เล่น'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1976D2" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#1976D2', '#42A5F5', '#64B5F6']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>🏔️ Adventure & Exploration</Text>
            <Text style={styles.headerSubtitle}>Role Models & Past Perfect Tenses & Adverb Sentence </Text>
           
            {isPlaying && (
              <TouchableOpacity style={styles.stopButton} onPress={stopAudio}>
                <Text style={styles.stopButtonText}>⏹️ หยุดเสียง</Text>
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>

        {/* Grammar Rules Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📚 หลักไวยากรณ์</Text>
            <View style={styles.sectionDivider} />
          </View>
          {grammarRules.map((rule, index) => (
            <View key={index} style={styles.grammarCard}>
              <View style={styles.grammarHeader}>
                <Text style={styles.grammarIcon}>{rule.icon}</Text>
                <Text style={styles.grammarTitle}>{rule.title}</Text>
              </View>
              <View style={styles.formulaContainer}>
                <Text style={styles.formulaLabel}>สูตร:</Text>
                <Text style={styles.grammarFormula}>{rule.rule}</Text>
              </View>
              <View style={styles.explanationContainer}>
                <Text style={styles.grammarExplanation}>💡 {rule.explanation}</Text>
              </View>
              <View style={styles.examplesContainer}>
                <Text style={styles.examplesTitle}>ตัวอย่าง:</Text>
                {rule.examples.map((example, idx) => (
                  <View key={idx} style={styles.exampleItem}>
                    <Text style={styles.exampleBullet}>•</Text>
                    <Text style={styles.grammarExample}>{example}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity 
                style={[styles.modernButton, styles.primaryButton, isPlaying && styles.disabledButton]}
                onPress={() => playSound(rule.examples.join('. '))}
                disabled={isPlaying}
              >
                <Text style={styles.modernButtonText}>
                  {isPlaying ? '⏳ กำลังเล่น...' : '🔊 ฟังตัวอย่าง'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Vocabulary Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📝 คำศัพท์ผจญภัย</Text>
            <View style={styles.sectionDivider} />
          </View>
          {adventureVocabulary.map((category, categoryIndex) => (
            <View key={categoryIndex} style={styles.categoryCard}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryTitle}>{category.category}</Text>
              </View>
              <View style={styles.vocabContainer}>
                {chunkArray(category.items, 2).map((row, rowIdx) => (
                  <View key={rowIdx} style={{ flexDirection: 'row', marginBottom: 8 }}>
                    {row.map((vocab, idx) => (
                      <View style={{ flex: 1, marginRight: idx === 0 ? 8 : 0 }} key={vocab.word}>
                        <VocabularyCard vocab={vocab} />
                      </View>
                    ))}
                    {row.length < 2 && <View style={{ flex: 1 }} />}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Adverb Starters Section */}
<View style={styles.section}>
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>⚡ Adverb Sentence Starters</Text>
    <View style={styles.sectionDivider} />
  </View>
  {/* เพิ่มคำอธิบายตรงนี้ */}
  <Text style={styles.adverbDesc}>
    Adverb Sentence Starters คือการใช้คำกริยาวิเศษณ์หรือวลีกริยาวิเศษณ์ขึ้นต้นประโยค 
    เพื่อเน้นอารมณ์หรือเหตุการณ์ในประโยค ช่วยให้ประโยคดูน่าสนใจและชัดเจนขึ้น 
    เช่น Surprisingly, Unfortunately, Fortunately เป็นต้น
  </Text>
  <View style={styles.adverbList}>
    {chunkArray(adverbStarters, 2).map((row, rowIdx) => (
      <View key={rowIdx} style={{ flexDirection: 'row', marginBottom: 8 }}>
        {row.map((adverb, idx) => (
          <View style={{ flex: 1, marginRight: idx === 0 ? 8 : 0 }} key={adverb.word}>
            <AdverbCard adverb={adverb} />
          </View>
        ))}
        {row.length < 2 && <View style={{ flex: 1 }} />}
      </View>
    ))}
  </View>
</View>


        {/* Inspirational Stories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🌟 เรื่องราวสร้างแรงบันดาลใจ</Text>
            <View style={styles.sectionDivider} />
          </View>
          {inspirationalStories.map((story, idx) => (
            <View key={idx} style={styles.storyCard}>
              <View style={styles.storyHeader}>
                <Text style={styles.storyIcon}>{story.icon}</Text>
                <Text style={styles.storyTitle}>{story.title}</Text>
              </View>
              <Text style={styles.storyText}>{story.story}</Text>
              <Text style={styles.storyThai}>{story.thai}</Text>
              <TouchableOpacity
                style={[styles.modernButton, styles.secondaryButton, isPlaying && styles.disabledButton]}
                onPress={() => playSound(story.story)}
                disabled={isPlaying}
              >
                <Text style={styles.modernButtonText}>{isPlaying ? '⏳' : '🔊 ฟังภาษาอังกฤษ'}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Common Phrases Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>💬 ประโยคที่ใช้บ่อย</Text>
            <View style={styles.sectionDivider} />
          </View>
          {commonPhrases.map((phrase, idx) => (
            <View key={idx} style={styles.phraseCard}>
              <View style={styles.phraseHeader}>
                <Text style={styles.phraseIcon}>{phrase.icon}</Text>
                <Text style={styles.phraseText}>{phrase.english}</Text>
              </View>
              <Text style={styles.phraseThai}>{phrase.thai}</Text>
              <Text style={styles.phraseUsage}>{phrase.usage}</Text>
              <TouchableOpacity
                style={[styles.modernButton, styles.secondaryButton, isPlaying && styles.disabledButton]}
                onPress={() => playSound(phrase.english)}
                disabled={isPlaying}
              >
                <Text style={styles.modernButtonText}>{isPlaying ? '⏳' : '🔊 ฟังประโยค'}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        

        {/* Quiz Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🧠 แบบทดสอบ</Text>
            <View style={styles.sectionDivider} />
          </View>
          
          {quizQuestions.map((q, idx) => (
            <View key={q.id} style={styles.quizCard}>
              <Text style={styles.quizQuestion}>{idx + 1}. {q.question}</Text>
              {q.choices.map((choice, cidx) => (
                <TouchableOpacity
                  key={cidx}
                  style={[
                    styles.choiceButton,
                    answeredQuestions.has(q.id) &&
                    choice.charAt(0) === q.correct && styles.correctChoice,
                  ]}
                  onPress={() => handleQuizSubmit(q.id, choice.charAt(0), q.correct)}
                  disabled={answeredQuestions.has(q.id)}
                >
                  <Text style={styles.choiceText}>{choice}</Text>
                </TouchableOpacity>
              ))}
              {answeredQuestions.has(q.id) && (
                <Text style={styles.explanationText}>{q.explanation}</Text>
              )}
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
        
      </ScrollView>
    </View>
  );
}

// ----------- STYLES -----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8FB'
  },
  adverbDesc: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    padding: 10
  },
  header: {
    paddingTop: 46,
    paddingBottom: 30,
    paddingHorizontal: 22,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    marginBottom: 8
  },
  headerContent: {
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 6
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#e3f2fd',
    marginBottom: 16
  },
  progressContainer: {
    width: '100%',
    marginVertical: 8,
    alignItems: 'center'
  },
  progressBar: {
    width: '90%',
    height: 12,
    backgroundColor: '#E3E3E3',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 4
  },
  progressFill: {
    height: 12,
    borderRadius: 12
  },
  scoreText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  stopButton: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignSelf: 'center'
  },
  stopButtonText: {
    color: '#1976D2',
    fontWeight: 'bold',
    fontSize: 15
  },
  section: {
    marginTop: 20,
    marginHorizontal: 18,
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 }
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginRight: 10
  },
  sectionDivider: {
    flex: 1,
    height: 2,
    backgroundColor: '#B3E5FC',
    borderRadius: 1
  },
  grammarCard: {
    marginBottom: 18,
    padding: 10,
    backgroundColor: '#E3F2FD',
    borderRadius: 14
  },
  grammarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  grammarIcon: {
    fontSize: 22,
    marginRight: 7
  },
  grammarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1565C0'
  },
  formulaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4
  },
  formulaLabel: {
    fontSize: 14,
    color: '#333',
    marginRight: 4
  },
  grammarFormula: {
    fontSize: 14,
    color: '#0D47A1',
    fontWeight: '600'
  },
  explanationContainer: {
    marginVertical: 2
  },
  grammarExplanation: {
    fontSize: 14,
    color: '#444'
  },
  examplesContainer: {
    marginTop: 6,
    marginBottom: 2
  },
  examplesTitle: {
    fontWeight: 'bold',
    color: '#1976D2',
    fontSize: 14
  },
  exampleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  exampleBullet: {
    fontSize: 16,
    marginRight: 4
  },
  grammarExample: {
    fontSize: 13,
    color: '#333',
    marginBottom: 2
  },
  modernButton: {
    marginTop: 10,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start'
  },
  primaryButton: {
    backgroundColor: '#1976D2'
  },
  secondaryButton: {
    backgroundColor: '#B3E5FC'
  },
  modernButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15
  },
  disabledButton: {
    opacity: 0.5
  },
  vocabContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  vocabCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 10,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: '#E3F2FD'
  },
  vocabHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  vocabWord: {
    fontWeight: 'bold',
    color: '#1976D2',
    fontSize: 15
  },
  playButtonSmall: {
    padding: 3,
    borderRadius: 14,
    backgroundColor: '#E3F2FD'
  },
  playButtonText: {
    fontSize: 16
  },
  vocabPronunciation: {
    fontSize: 13,
    color: '#888'
  },
  vocabMeaning: {
    fontSize: 13,
    color: '#333'
  },
  exampleContainer: {
    marginTop: 4
  },
  vocabExample: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#1565C0'
  },
  categoryCard: {
    marginBottom: 10
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2
  },
  categoryIcon: {
    fontSize: 18,
    marginRight: 6
  },
  categoryTitle: {
    fontWeight: 'bold',
    color: '#1976D2',
    fontSize: 15
  },
  adverbList: {
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  adverbCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E3F2FD'
  },
  adverbHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  adverbIcon: {
    fontSize: 20,
    marginRight: 5
  },
  adverbWord: {
    fontWeight: 'bold',
    color: '#1976D2',
    fontSize: 15
  },
  adverbMeaning: {
    fontSize: 13,
    color: '#333'
  },
  adverbExample: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#1565C0'
  },
  storyCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 14,
    marginBottom: 12,
    padding: 10
  },
  storyHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  storyIcon: {
    fontSize: 18,
    marginRight: 7
  },
  storyTitle: {
    fontWeight: 'bold',
    color: '#1976D2',
    fontSize: 15
  },
  storyText: {
    marginTop: 2,
    color: '#333'
  },
  storyThai: {
    marginTop: 2,
    color: '#388E3C',
    fontStyle: 'italic'
  },
  phraseCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E3F2FD'
  },
  phraseHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  phraseIcon: {
    fontSize: 18,
    marginRight: 6
  },
  phraseText: {
    fontWeight: 'bold',
    color: '#1976D2',
    fontSize: 15
  },
  phraseThai: {
    color: '#333',
    marginTop: 2
  },
  phraseUsage: {
    color: '#607D8B',
    fontSize: 13,
    marginTop: 1
  },
  quizCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 14,
    marginBottom: 15,
    padding: 10
  },
  quizQuestion: {
    fontWeight: 'bold',
    color: '#0D47A1',
    fontSize: 15,
    marginBottom: 6
  },
  choiceButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginVertical: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B3E5FC'
  },
  correctChoice: {
    backgroundColor: '#C8E6C9',
    borderColor: '#43A047'
  },
  choiceText: {
    color: '#1565C0',
    fontSize: 15
  },
  explanationText: {
    color: '#1976D2',
    marginTop: 4,
    fontSize: 13,
    fontStyle: 'italic'
  }
});
