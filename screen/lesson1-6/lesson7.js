import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  StatusBar,
  Platform, // For platform-specific styling if needed
} from 'react-native';
import * as Speech from 'expo-speech';
import { LinearGradient } from 'expo-linear-gradient'; // For modern gradients

export default function Lesson3() {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentSection, setCurrentSection] = useState('grammar');
  const [showListeningModal, setShowListeningModal] = useState(false);
  const [showSpeakingModal, setShowSpeakingModal] = useState(false);
  const [showWritingModal, setShowWritingModal] = useState(false);
  const [writingText, setWritingText] = useState('');
  const [speechRate, setSpeechRate] = useState(0.8);
  const [isLoadingSpeech, setIsLoadingSpeech] = useState(false);

  // States to control showing answers for Reading and Listening
  const [showReadingAnswers, setShowReadingAnswers] = useState({});
  const [showListeningAnswers, setShowListeningAnswers] = useState({});

  // Function to toggle answer visibility
  const toggleAnswer = (section, index) => {
    if (section === 'reading') {
      setShowReadingAnswers(prevState => ({
        ...prevState,
        [index]: !prevState[index],
      }));
    } else if (section === 'listening') {
      setShowListeningAnswers(prevState => ({
        ...prevState,
        [index]: !prevState[index],
      }));
    }
  };

  // --- 1. GRAMMAR GUIDELINES ---
  const grammarGuidelines = [
    {
      title: 'Causative Verbs (Let, Make, Have, Get, Help)',
      thai: 'Causative Verbs (Let, Make, Have, Get, Help)',
      content: [
        { en: 'Let: To allow someone to do something.', th: 'Let: ใช้เมื่อ "อนุญาตให้" ใครทำบางสิ่ง (โครงสร้าง: let + กรรม + กริยาช่อง 1 (ไม่ผัน))' },
        { en: 'Make: To force or cause someone to do something.', th: 'Make: ใช้เมื่อ "บังคับ" หรือ "ทำให้" ใครทำบางสิ่ง (โครงสร้าง: make + กรรม + กริยาช่อง 1 (ไม่ผัน))' },
        { en: 'Have: To ask or arrange for someone to do something.', th: 'Have: ใช้เมื่อ "ให้" ใครทำบางสิ่งให้เรา โดยที่เราจัดหาคนมาทำ (โครงสร้าง: have + กรรม + กริยาช่อง 1 หรือ have + กรรม + กริยาช่อง 3)' },
        { en: 'Get: To persuade or arrange for someone to do something (similar to have, but more informal, or emphasizes effort).', th: 'Get: ใช้เมื่อ "โน้มน้าว" หรือ "จัดการให้" ใครทำบางสิ่งให้เรา (คล้าย have แต่ไม่เป็นทางการกว่า หรือเน้นที่ความพยายาม) (โครงสร้าง: get + กรรม + to + กริยาช่อง 1 หรือ get + กรรม + กริยาช่อง 3)' },
        { en: 'Help: To assist someone in doing something.', th: 'Help: ใช้เมื่อ "ช่วย" ใครทำบางสิ่ง (โครงสร้าง: help + กรรม + กริยาช่อง 1 หรือ help + กรรม + to + กริยาช่อง 1)' },
      ]
    },
    {
      title: 'Common Phrasal Verbs about Environment',
      thai: 'Phrasal Verbs ทั่วไปเกี่ยวกับสิ่งแวดล้อม',
      content: [
        { en: 'Cut down (trees): To fell trees.', th: 'Cut down (trees): ตัดโค่น (ต้นไม้)' },
        { en: 'Die out: To become extinct.', th: 'Die out: สูญพันธุ์' },
        { en: 'Clean up: To make a place tidy and free of pollution.', th: 'Clean up: ทำความสะอาด, กำจัดมลพิษ' },
        { en: 'Run out (of): To use up a supply of something.', th: 'Run out (of): หมด, ใช้หมด' },
        { en: 'Dispose of: To get rid of something.', th: 'Dispose of: กำจัด (ทิ้ง)' },
        { en: 'Come up with: To suggest or think of an idea or plan.', th: 'Come up with: คิด (ไอเดีย/แผน) ขึ้นมาได้' },
        { en: 'Look into: To investigate.', th: 'Look into: ตรวจสอบ, สืบสวน' },
      ]
    }
  ];

  // --- 2. EXAMPLES ---
  const examples = [
    {
      category: 'Causative Verbs in Environmental Context',
      thai: 'Causative Verbs ในบริบทสิ่งแวดล้อม',
      sentences: [
        { en: 'The new law will **make** companies **reduce** their carbon emissions.', th: 'กฎหมายใหม่จะ **ทำให้** บริษัทต่าง ๆ **ลด** การปล่อยคาร์บอน' },
        { en: 'Activists **let** the public **know** about illegal logging.', th: 'นักเคลื่อนไหว **ให้** ประชาชน **รับรู้** เกี่ยวกับการตัดไม้ทำลายป่าผิดกฎหมาย' },
        { en: 'We need to **have** our old batteries **recycled** properly.', th: 'เราต้อง **ให้** แบตเตอรี่เก่าของเรา **ถูกรีไซเคิล** อย่างถูกต้อง' },
        { en: 'The government **got** local communities **to participate** in the reforestation project.', th: 'รัฐบาล **ชักจูงให้** ชุมชนท้องถิ่น **เข้าร่วม** โครงการปลูกป่า' },
        { en: 'Green technology can **help** us **conserve** energy.', th: 'เทคโนโลยีสีเขียวสามารถ **ช่วย** เรา **อนุรักษ์** พลังงานได้' },
      ]
    },
    {
      category: 'Phrasal Verbs in Environmental Actions',
      thai: 'Phrasal Verbs ในการดำเนินการด้านสิ่งแวดล้อม',
      sentences: [
        { en: 'Many rare species are slowly **dying out** due to habitat loss.', th: 'สัตว์หายากหลายชนิดกำลังค่อยๆ **สูญพันธุ์** เนื่องจากการสูญเสียที่อยู่อาศัย' },
        { en: 'Volunteers **cleaned up** the beach after the storm.', th: 'อาสาสมัคร **ทำความสะอาด** ชายหาดหลังพายุ' },
        { en: 'We must not **run out of** fresh water in the future.', th: 'เราต้องไม่ **ขาดแคลน** น้ำจืดในอนาคต' },
        { en: 'Local authorities are **looking into** the cause of the river pollution.', th: 'ทางการท้องถิ่นกำลัง **ตรวจสอบ** สาเหตุของมลพิษในแม่น้ำ' },
        { en: 'It is important to **dispose of** electronic waste responsibly.', th: 'สิ่งสำคัญคือการ **กำจัด** ขยะอิเล็กทรอนิกส์อย่างมีความรับผิดชอบ' },
      ]
    },
  ];

  // --- 3. PRACTICE EXERCISES ---
  const practiceExercises = {
    writing: {
      title: 'Writing Practice: Environmental Challenges',
      thai: 'ฝึกเขียน: ปัญหาและแนวทางแก้ไขด้านสิ่งแวดล้อม',
      instruction: 'Write a short paragraph (50-80 words) about an environmental issue and suggest how we can **help** or **get** people to take action. Use at least one causative verb and one phrasal verb.',
      thaiInstruction: 'เขียนย่อหน้าสั้นๆ (50-80 คำ) เกี่ยวกับปัญหาสิ่งแวดล้อมและเสนอแนวทางที่เราสามารถ **ช่วย** หรือ **ชักจูงให้** ผู้คนดำเนินการได้ ใช้ Causative Verb อย่างน้อยหนึ่งตัวและ Phrasal Verb อย่างน้อยหนึ่งตัว',
      example: 'Example: "Plastic pollution is a big problem. Governments can **make** companies **reduce** plastic packaging. We also need to **clean up** our local areas and **get** people **to recycle** more. Education will **help** everyone **understand** the importance of this."',
      thaiExample: 'ตัวอย่าง: "มลพิษจากพลาสติกเป็นปัญหาใหญ่ รัฐบาลสามารถ **บังคับให้** บริษัทต่างๆ **ลด** บรรจุภัณฑ์พลาสติกได้ นอกจากนี้ เรายังต้อง **ทำความสะอาด** พื้นที่ในท้องถิ่นของเราและ **ชักจูงให้** ผู้คน **รีไซเคิล** มากขึ้น การศึกษาจะ **ช่วยให้** ทุกคน **เข้าใจ** ความสำคัญของเรื่องนี้ได้"',
      wordCountTarget: 70,
      tips: [
        'Focus on one environmental issue (e.g., plastic, deforestation, air pollution).',
        'Use **causative verbs** (make, get, help) to talk about solutions.',
        'Include at least one **phrasal verb** (e.g., clean up, cut down, run out of).',
        'Write clearly and concisely.'
      ],
      thaiTips: [
        'เน้นไปที่ปัญหาสิ่งแวดล้อมเพียงประเด็นเดียว (เช่น พลาสติก, การตัดไม้ทำลายป่า, มลพิษทางอากาศ)',
        'ใช้ **causative verbs** (make, get, help) ในการพูดถึงวิธีแก้ปัญหา',
        'ใส่ **phrasal verb** อย่างน้อยหนึ่งคำ (เช่น clean up, cut down, run out of)',
        'เขียนให้ชัดเจนและกระชับ'
      ]
    },
    speaking: {
      title: 'Speaking Practice: Advocating for Change',
      thai: 'ฝึกพูด: การรณรงค์เพื่อการเปลี่ยนแปลง',
      prompt: 'Imagine you are giving a short speech to your community about an environmental law or initiative. Explain what the law/initiative will **make** people do, what it will **let** them do, and how it will **help** the environment. Also, mention any phrasal verbs that describe actions related to it.',
      thaiPrompt: 'ลองจินตนาการว่าคุณกำลังกล่าวสุนทรพจน์สั้นๆ ต่อชุมชนของคุณเกี่ยวกับกฎหมายหรือโครงการด้านสิ่งแวดล้อม อธิบายว่ากฎหมาย/โครงการนี้จะ **บังคับให้** ผู้คนทำอะไร, จะ **อนุญาตให้** พวกเขาทำอะไร และจะ **ช่วย** สิ่งแวดล้อมได้อย่างไร รวมถึงกล่าวถึง Phrasal Verbs ที่เกี่ยวข้องกับการดำเนินการนั้นๆ',
      keyPoints: [
        'Name a specific environmental law or initiative (real or imaginary).',
        'Use **"make"** to explain obligations/requirements.',
        'Use **"let"** to explain permissions/allowances.',
        'Use **"help"** to explain benefits.',
        'Incorporate relevant **phrasal verbs** (e.g., cut down, clean up, look into).',
        'Speak clearly and confidently for 1-2 minutes.'
      ],
      thaiKeyPoints: [
        'ตั้งชื่อกฎหมายหรือโครงการด้านสิ่งแวดล้อมเฉพาะเจาะจง (จริงหรือสมมติก็ได้)',
        'ใช้ **"make"** เพื่ออธิบายข้อผูกมัด/ข้อกำหนด',
        'ใช้ **"let"** เพื่ออธิบายการอนุญาต/ข้อตกลง',
        'ใช้ **"help"** เพื่ออธิบายประโยชน์',
        'ใช้ **phrasal verbs** ที่เกี่ยวข้อง (เช่น cut down, clean up, look into)',
        'พูดให้ชัดเจนและมั่นใจเป็นเวลา 1-2 นาที'
      ],
      example: 'Example: "Good morning, everyone. Today, I want to talk about the new \'Waste Reduction Act\'. This law will **make** businesses **reduce** their single-use plastic. It will also **let** citizens **participate** in community recycling programs easily. This act will significantly **help** us **clean up** our cities and ensure we don\'t **run out of** landfill space. We need to **look into** better disposal methods."',
      thaiExample: 'ตัวอย่าง: "สวัสดีตอนเช้าทุกท่าน วันนี้ผมขอพูดถึง \'พระราชบัญญัติลดขยะ\' ฉบับใหม่ กฎหมายนี้จะ **บังคับให้** ธุรกิจต่างๆ **ลด** การใช้พลาสติกแบบใช้ครั้งเดียวทิ้ง นอกจากนี้ยังจะ **อนุญาตให้** ประชาชน **เข้าร่วม** โครงการรีไซเคิลของชุมชนได้อย่างง่ายดาย กฎหมายนี้จะ **ช่วยให้** เรา **ทำความสะอาด** เมืองได้อย่างมาก และช่วยให้แน่ใจว่าเราจะไม่ **ขาดแคลน** พื้นที่ฝังกลบ เราจำเป็นต้อง **ตรวจสอบ** วิธีการกำจัดขยะที่ดีขึ้น"',
    }
  };

  // --- 4. READING PASSAGE ---
  const readingPassage = {
    title: 'The Role of Legislation in Environmental Protection',
    thaiTitle: 'บทบาทของกฎหมายในการปกป้องสิ่งแวดล้อม',
    content: `Governments worldwide are increasingly recognizing the urgent need to protect our planet. New **environmental laws** have been **put in place** to **make** industries **adopt** sustainable practices. For example, some regulations **make** factories **filter** their wastewater before discharging it, which **helps** to **clean up** our rivers. Companies are also often **made** **to report** their carbon footprints annually.

These laws **let** environmental agencies **investigate** pollution cases more effectively and **bring about** positive changes. Citizens are also **let** **to report** violations. Furthermore, many countries **have** companies **install** renewable energy systems. This **gets** them **to invest** in cleaner power sources. However, the success of these laws ultimately depends on whether we **can get** everyone **to take** responsibility. We cannot **let** our natural resources **die out**. We must **cut down** on consumption and **look into** innovative solutions to prevent us from **running out of** vital resources.`,
    questions: [
      {
        question: 'What is one way new environmental laws make industries adopt sustainable practices?',
        options: ['By letting them increase emissions', 'By making factories filter wastewater', 'By making them cut down more trees', 'By letting them ignore regulations'],
        correct: 1,
        explanation: 'The text states that regulations make factories filter their wastewater.',
        thaiExplanation: 'ข้อความระบุว่ากฎระเบียบต่างๆ "บังคับให้" โรงงานกรองน้ำเสีย'
      },
      {
        question: 'How do environmental laws help agencies?',
        options: ['They let them ignore pollution', 'They make them stop all industrial activity', 'They let them investigate pollution cases more effectively', 'They help them reduce their staff'],
        correct: 2,
        explanation: 'Environmental laws let environmental agencies investigate pollution cases more effectively.',
        thaiExplanation: 'กฎหมายสิ่งแวดล้อม "อนุญาตให้" หน่วยงานด้านสิ่งแวดล้อมตรวจสอบคดีมลพิษได้อย่างมีประสิทธิภาพมากขึ้น'
      },
      {
        question: 'What does the passage say citizens are let to do?',
        options: ['Cut down trees', 'Report violations', 'Pollute freely', 'Run out of resources'],
        correct: 1,
        explanation: 'Citizens are also let to report violations.',
        thaiExplanation: 'ประชาชนยัง "ได้รับอนุญาตให้" รายงานการละเมิดได้ด้วย'
      },
      {
        question: 'Which phrasal verb means to investigate?',
        options: ['Clean up', 'Cut down', 'Look into', 'Run out of'],
        correct: 2,
        explanation: 'The text uses "look into" in the context of investigating causes of pollution.',
        thaiExplanation: 'ข้อความใช้ "look into" ในบริบทของการตรวจสอบสาเหตุของมลพิษ'
      }
    ]
  };

  // --- 5. LISTENING EXERCISE ---
  const listeningExercise = {
    title: 'Community Meeting on Conservation',
    thaiTitle: 'การประชุมชุมชนว่าด้วยการอนุรักษ์',
    audio: `Speaker: "Good evening, everyone. We are here tonight to discuss our new conservation initiative. This program aims to **make** our town **reduce** its waste by 30%. We will **have** recycling bins **placed** in every neighborhood, and volunteers will **help** us **clean up** the local park next month. We can't **let** this opportunity **slip away**. We also need to **get** more people **to turn off** lights when they leave a room to save energy. We are trying to avoid a situation where we **run out of** clean water. Your participation will significantly **help** us **preserve** our environment."`,
    questions: [
      {
        question: 'What is the main goal of the new initiative?',
        options: ['To increase waste', 'To reduce waste by 30%', 'To build new parks', 'To plant more trees'],
        correct: 1,
        explanation: 'The speaker states the program aims to make the town reduce its waste by 30%.',
        thaiExplanation: 'ผู้พูดกล่าวว่าโครงการมีเป้าหมายที่จะ "ทำให้" เมืองลดขยะลง 30%'
      },
      {
        question: 'Who will help clean up the local park?',
        options: ['The mayor', 'Volunteers', 'Children', 'Tourists'],
        correct: 0,
        explanation: 'The speaker mentions volunteers will help clean up the local park.',
        thaiExplanation: 'ผู้พูดกล่าวถึงอาสาสมัครที่จะ "ช่วย" ทำความสะอาดสวนสาธารณะในท้องถิ่น'
      },
      {
        question: 'What do they want people to do to save energy?',
        options: ['Turn on more lights', 'Turn off lights', 'Buy new appliances', 'Leave doors open'],
        correct: 1,
        explanation: 'They need to get more people to turn off lights when they leave a room.',
        thaiExplanation: 'พวกเขาต้องการ "ชักจูงให้" ผู้คนปิดไฟเมื่อออกจากห้องเพื่อประหยัดพลังงาน'
      },
      {
        question: 'Which phrasal verb implies using up all of something?',
        options: ['Clean up', 'Slip away', 'Turn off', 'Run out of'],
        correct: 3,
        explanation: 'The speaker says "run out of clean water," meaning to use it all up.',
        thaiExplanation: 'ผู้พูดกล่าวว่า "run out of clean water" ซึ่งหมายถึงการใช้น้ำสะอาดจนหมด'
      }
    ]
  };

  // --- 6. QUIZ (GRAMMAR & USAGE) ---
  const quizQuestions = [
    {
      question: 'Which sentence correctly uses a causative verb to mean "to force"?',
      options: [
        'The law lets polluters pay fines.',
        'The law makes polluters pay fines.',
        'The law helps polluters pay fines.',
        'The law has polluters pay fines.'
      ],
      correct: 1,
      explanation: '"Makes" implies force or obligation, which is typical for laws.',
      thaiExplanation: '"Makes" หมายถึงการบังคับหรือข้อผูกมัด ซึ่งเป็นปกติสำหรับกฎหมาย'
    },
    {
      question: 'Choose the sentence that means "someone else will recycle the plastic for us."',
      options: [
        'We will recycle the plastic.',
        'We will let the plastic be recycled.',
        'We will have the plastic recycled.',
        'We will make the plastic recycle.'
      ],
      correct: 2,
      explanation: '"Have + object + V3" (had recycled) means arranging for someone else to do it.',
      thaiExplanation: '"Have + กรรม + กริยาช่อง 3" (had recycled) หมายถึงการจัดให้คนอื่นทำสิ่งนั้นให้เรา'
    },
    {
      question: 'Which phrasal verb means "to become extinct"?',
      options: [
        'Clean up',
        'Cut down',
        'Die out',
        'Run out'
      ],
      correct: 2,
      explanation: '"Die out" specifically refers to species becoming extinct.',
      thaiExplanation: '"Die out" หมายถึงการที่สิ่งมีชีวิตชนิดหนึ่งสูญพันธุ์โดยเฉพาะ'
    },
    {
      question: 'Complete the sentence: "We need to ______ new ways to save energy."',
      options: [
        'cut down',
        'die out',
        'come up with',
        'dispose of'
      ],
      correct: 2,
      explanation: '"Come up with" means to think of or suggest an idea or plan.',
      thaiExplanation: '"Come up with" หมายถึงการคิดหรือเสนอความคิดหรือแผน'
    },
    {
      question: 'Which sentence uses "help" correctly in a causative sense?',
      options: [
        'The government helped citizens to pollute less.',
        'The government helped citizens pollute less.',
        'Both A and B are correct.',
        'Neither A nor B is correct.'
      ],
      correct: 2,
      explanation: '"Help + object + base verb" or "help + object + to-infinitive" are both correct for causative "help".',
      thaiExplanation: 'ทั้ง "Help + กรรม + กริยาช่อง 1" และ "help + กรรม + to-infinitive" ล้วนถูกต้องสำหรับการใช้ "help" ในเชิง causative'
    }
  ];

  // --- AUDIO ---
  const playAudio = (text) => {
    setIsLoadingSpeech(true);
    Speech.speak(text, {
      language: 'en-US',
      rate: speechRate,
      pitch: 1.0,
      onStart: () => setIsLoadingSpeech(true),
      onDone: () => setIsLoadingSpeech(false),
      onError: () => setIsLoadingSpeech(false),
    });
  };

  const stopAudio = () => {
    Speech.stop();
    setIsLoadingSpeech(false);
  };

  // --- QUIZ HANDLING ---
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

  // Utility for word count
  const getWordCount = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  // --- MODAL COMPONENTS ---

  const ListeningModal = () => (
    <Modal visible={showListeningModal} animationType="slide">
      <LinearGradient
        colors={['#E0F7FA', '#B2EBF2']}
        style={styles.modalContainer}
      >
        <Text style={styles.modalTitle}>🎧 {listeningExercise.title}</Text>
        <Text style={styles.modalSubtitle}>{listeningExercise.thaiTitle}</Text>

        <View style={styles.audioControls}>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => playAudio(listeningExercise.audio)}
            disabled={isLoadingSpeech}
          >
            <Text style={styles.playButtonText}>
              {isLoadingSpeech ? 'กำลังโหลด...' : '🔊 เล่นเสียง'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.stopButton}
            onPress={stopAudio}
            disabled={!isLoadingSpeech}
          >
            <Text style={styles.stopButtonText}>⏹ หยุด</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.speedControl}>
            <Text style={styles.speedLabel}>ความเร็ว: {speechRate.toFixed(1)}x</Text>
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
          <Text style={styles.sectionLabel}>บทสนทนา (Transcript):</Text>
          <View style={styles.transcriptContainer}>
            <Text style={styles.transcriptText}>{listeningExercise.audio}</Text>
          </View>

          <Text style={styles.sectionLabel}>คำถามเพื่อความเข้าใจ (Comprehension Questions):</Text>
          {listeningExercise.questions.map((q, i) => (
            <View key={i} style={styles.questionBlock}>
              <Text style={styles.questionText}>{i + 1}. {q.question}</Text>
              {q.options.map((opt, idx) => (
                <Text key={idx} style={styles.tipItem}>{String.fromCharCode(65 + idx)}. {opt}</Text>
              ))}
              <TouchableOpacity
                style={styles.showAnswerButton}
                onPress={() => toggleAnswer('listening', i)}
              >
                <Text style={styles.showAnswerButtonText}>
                  {showListeningAnswers[i] ? 'ซ่อนเฉลย ▲' : 'แสดงเฉลย ▼'}
                </Text>
              </TouchableOpacity>
              {showListeningAnswers[i] && (
                <View style={styles.answerBox}>
                  <Text style={styles.answerText}>
                    เฉลย: {String.fromCharCode(65 + q.correct)} - {q.explanation} ({q.thaiExplanation})
                  </Text>
                </View>
              )}
            </View>
          ))}
          <TouchableOpacity
            style={styles.modalBackButton}
            onPress={() => {
              stopAudio();
              setShowListeningModal(false);
              setShowListeningAnswers({}); // Reset answers
            }}
          >
            <Text style={styles.buttonText}>← กลับสู่บทเรียน</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </Modal>
  );

  const SpeakingModal = () => {
    return (
      <Modal visible={showSpeakingModal} animationType="slide">
        <LinearGradient
          colors={['#E0F7FA', '#B2EBF2']}
          style={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>🎤 {practiceExercises.speaking.title}</Text>
          <Text style={styles.modalSubtitle}>{practiceExercises.speaking.thai}</Text>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.sectionLabel}>หัวข้อ (Prompt):</Text>
            <View style={styles.promptBox}>
              <Text style={styles.promptText}>{practiceExercises.speaking.prompt}</Text>
              <Text style={styles.promptTextThai}>{practiceExercises.speaking.thaiPrompt}</Text>
            </View>

            <Text style={styles.sectionLabel}>จุดสำคัญที่ควรใส่ (Key Points to Include):</Text>
            <View style={styles.keyPointsBox}>
              {practiceExercises.speaking.keyPoints.map((point, i) => (
                <Text key={i} style={styles.keyPointItem}>• {point}</Text>
              ))}
              {practiceExercises.speaking.thaiKeyPoints.map((point, i) => (
                <Text key={i} style={styles.keyPointItemThai}>• {point}</Text>
              ))}
            </View>

            <Text style={styles.sectionLabel}>ตัวอย่าง (Example):</Text>
            <View style={styles.exampleBox}>
              <Text style={styles.exampleText}>{practiceExercises.speaking.example}</Text>
              <Text style={styles.exampleTextThai}>{practiceExercises.speaking.thaiExample}</Text>
            </View>

            <TouchableOpacity
              style={styles.modalBackButton}
              onPress={() => setShowSpeakingModal(false)}
            >
              <Text style={styles.buttonText}>← กลับสู่บทเรียน</Text>
            </TouchableOpacity>
          </ScrollView>
        </LinearGradient>
      </Modal>
    );
  };

  const WritingModal = () => {
    const targetWordCount = practiceExercises.writing.wordCountTarget;
    const currentWordCount = getWordCount(writingText);
    const progressPercentage = Math.min((currentWordCount / targetWordCount) * 100, 100);

    return (
      <Modal visible={showWritingModal} animationType="slide">
        <LinearGradient
          colors={['#E0F7FA', '#B2EBF2']}
          style={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>✍️ {practiceExercises.writing.title}</Text>
          <Text style={styles.modalSubtitle}>{practiceExercises.writing.thai}</Text>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.sectionLabel}>คำแนะนำ (Instructions):</Text>
            <View style={styles.instructionBox}>
              <Text style={styles.promptText}>{practiceExercises.writing.instruction}</Text>
              <Text style={styles.promptTextThai}>{practiceExercises.writing.thaiInstruction}</Text>
            </View>

            <View style={styles.wordCountContainer}>
              <Text style={styles.wordCountText}>จำนวนคำ: {currentWordCount} / {targetWordCount}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
              </View>
            </View>

            <TextInput
              style={styles.writingInput}
              multiline
              placeholder="เริ่มเขียนย่อหน้าของคุณที่นี่..."
              placeholderTextColor="#A0AEC0"
              value={writingText}
              onChangeText={setWritingText}
              scrollEnabled={true}
              textAlignVertical="top"
            />

            <Text style={styles.sectionLabel}>ตัวอย่าง (Example):</Text>
            <View style={styles.exampleBox}>
              <Text style={styles.exampleText}>{practiceExercises.writing.example}</Text>
              <Text style={styles.exampleTextThai}>{practiceExercises.writing.thaiExample}</Text>
            </View>

            <Text style={styles.sectionLabel}>เคล็ดลับ (Tips):</Text>
            <View style={styles.tipsContainer}>
              {practiceExercises.writing.tips.map((tip, i) => (
                <Text key={i} style={styles.tipItem}>• {tip}</Text>
              ))}
              {practiceExercises.writing.thaiTips.map((tip, i) => (
                <Text key={i} style={styles.tipItemThai}>• {tip}</Text>
              ))}
            </View>

            <TouchableOpacity
              style={styles.modalBackButton}
              onPress={() => setShowWritingModal(false)}
            >
              <Text style={styles.buttonText}>← กลับสู่บทเรียน</Text>
            </TouchableOpacity>
          </ScrollView>
        </LinearGradient>
      </Modal>
    );
  };


  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F9FF" />
      <Text style={styles.mainTitle}>🌿 บทเรียนที่ 3: Causative Verbs & Phrasal Verbs ในบริบทสิ่งแวดล้อม</Text>
      <Text style={styles.mainSubtitle}>Environmental Issues • Laws • Conservation</Text>

      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, currentSection === 'grammar' && styles.activeTab]}
          onPress={() => setCurrentSection('grammar')}
        >
          <Text style={[styles.tabText, currentSection === 'grammar' && styles.activeTabText]}>
            ไวยากรณ์ (Grammar)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, currentSection === 'examples' && styles.activeTab]}
          onPress={() => setCurrentSection('examples')}
        >
          <Text style={[styles.tabText, currentSection === 'examples' && styles.activeTabText]}>
            ตัวอย่าง (Examples)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, currentSection === 'reading' && styles.activeTab]}
          onPress={() => setCurrentSection('reading')}
        >
          <Text style={[styles.tabText, currentSection === 'reading' && styles.activeTabText]}>
            การอ่าน (Reading)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, currentSection === 'practice' && styles.activeTab]}
          onPress={() => setCurrentSection('practice')}
        >
          <Text style={[styles.tabText, currentSection === 'practice' && styles.activeTabText]}>
            ฝึกฝน (Practice)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content based on selected tab */}
      {currentSection === 'grammar' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ หลักไวยากรณ์ (Grammar Guidelines)</Text>
          {grammarGuidelines.map((guide, idx) => (
            <View key={idx} style={styles.card}>
              <Text style={styles.guideTitle}>{guide.title} ({guide.thai})</Text>
              {guide.content.map((item, i) => (
                <View key={i} style={styles.guideItemContainer}>
                  <Text style={styles.guideItem}>• {item.en}</Text>
                  <Text style={styles.guideItemThai}>{item.th}</Text>
                  <TouchableOpacity
                    onPress={() => playAudio(item.en)}
                    style={styles.audioButtonSmall}
                    disabled={isLoadingSpeech}
                  >
                    <Text style={styles.audioIconSmall}>🔊</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {currentSection === 'examples' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 ตัวอย่างประโยค (Examples)</Text>
          {examples.map((ex, idx) => (
            <View key={idx} style={styles.card}>
              <Text style={styles.categoryTitle}>{ex.category} ({ex.thai})</Text>
              {ex.sentences.map((s, i) => (
                <View key={i} style={styles.sentenceRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.english}>{s.en}</Text>
                    <Text style={styles.thai}>{s.th}</Text>
                  </View>
                  <TouchableOpacity onPress={() => playAudio(s.en)} style={styles.audioButton} disabled={isLoadingSpeech}>
                    <Text style={styles.audioIcon}>🔊</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {currentSection === 'reading' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📖 การอ่านเพื่อความเข้าใจ (Reading Comprehension)</Text>
          <View style={styles.card}>
            <Text style={styles.readingTitle}>{readingPassage.title}</Text>
            <Text style={styles.readingTitleThai}>{readingPassage.thaiTitle}</Text>
            <ScrollView style={styles.readingContentScroll}>
              <Text style={styles.readingText}>{readingPassage.content}</Text>
            </ScrollView>
            <TouchableOpacity onPress={() => playAudio(readingPassage.content)} style={styles.playAllButton} disabled={isLoadingSpeech}>
              <Text style={styles.playAllText}>🔊 เล่นเสียงข้อความทั้งหมด</Text>
            </TouchableOpacity>

            <Text style={styles.sectionLabel}>คำถามเพื่อความเข้าใจ (Comprehension Questions):</Text>
            {readingPassage.questions.map((q, i) => (
              <View key={i} style={styles.questionBlock}>
                <Text style={styles.questionText}>{i + 1}. {q.question}</Text>
                {q.options.map((opt, idx) => (
                  <Text key={idx} style={styles.tipItem}>{String.fromCharCode(65 + idx)}. {opt}</Text>
                ))}
                <TouchableOpacity
                  style={styles.showAnswerButton}
                  onPress={() => toggleAnswer('reading', i)}
                >
                  <Text style={styles.showAnswerButtonText}>
                    {showReadingAnswers[i] ? 'ซ่อนเฉลย ▲' : 'แสดงเฉลย ▼'}
                  </Text>
                </TouchableOpacity>
                {showReadingAnswers[i] && (
                  <View style={styles.answerBox}>
                    <Text style={styles.answerText}>
                      เฉลย: {String.fromCharCode(65 + q.correct)} - {q.explanation} ({q.thaiExplanation})
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      )}

      {currentSection === 'practice' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚀 ฝึกฝนทักษะของคุณ (Practice Your Skills)</Text>
          <TouchableOpacity
            style={styles.skillButton}
            onPress={() => setShowListeningModal(true)}
          >
            <LinearGradient
              colors={['#4CAF50', '#8BC34A']}
              style={styles.skillButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.skillButtonText}>🎧 ฝึกทักษะการฟัง (Listening Practice)</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skillButton}
            onPress={() => setShowSpeakingModal(true)}
          >
            <LinearGradient
              colors={['#2196F3', '#03A9F4']}
              style={styles.skillButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.skillButtonText}>🎤 ฝึกทักษะการพูด (Speaking Practice)</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skillButton}
            onPress={() => setShowWritingModal(true)}
          >
            <LinearGradient
              colors={['#FFC107', '#FF9800']}
              style={styles.skillButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.skillButtonText}>✍️ ฝึกทักษะการเขียน (Writing Practice)</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skillButton} onPress={() => { setShowQuiz(true); resetQuiz(); }}>
            <LinearGradient
              colors={['#E91E63', '#F06292']}
              style={styles.skillButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.skillButtonText}>🎯 ทำแบบทดสอบ (Take the Quiz)</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      {/* Quiz Section (Modal) */}
      {showQuiz && (
        <Modal visible={showQuiz} animationType="fade" transparent={true}>
          <View style={styles.quizModalOverlay}>
            <LinearGradient
              colors={['#FFFFFF', '#F0F9FF']}
              style={styles.quizModalContainer}
            >
              <Text style={styles.quizModalTitle}>แบบทดสอบ: Environmental</Text>
              {!quizCompleted ? (
                <View style={styles.quizContent}>
                  <Text style={styles.progressText}>คำถามที่ {currentQuiz + 1}/{quizQuestions.length}</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${((currentQuiz + 1) / quizQuestions.length) * 100}%` }]} />
                  </View>
                  <Text style={styles.questionText}>คำถามที่ {currentQuiz + 1}: {quizQuestions[currentQuiz].question}</Text>
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
                        {selectedAnswer === quizQuestions[currentQuiz].correct ? "✅ ถูกต้อง!" : "❌ ไม่ถูกต้อง"}
                      </Text>
                      <Text style={styles.explanationText}>
                        {quizQuestions[currentQuiz].explanation} ({quizQuestions[currentQuiz].thaiExplanation})
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                <View style={styles.resultsContainer}>
                  <Text style={styles.resultText}>✅ คะแนนของคุณ: {score}/{quizQuestions.length}</Text>
                  <Text style={styles.percentageText}>({Math.round((score / quizQuestions.length) * 100)}%)</Text>
                  {score >= 4 && <Text style={styles.excellentText}>🎉 ยอดเยี่ยม! คุณทำดีมาก!</Text>}
                  {score === 3 && <Text style={styles.goodText}>👍 ทำได้ดี! ทบทวนและฝึกฝนเพิ่มเติม</Text>}
                  {score <= 2 && <Text style={styles.needsWork}>📚 ฝึกฝนต่อไป! เน้น Causative Verbs และ Phrasal Verbs</Text>}

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={resetQuiz} style={styles.retakeButton}>
                      <Text style={styles.buttonText}>🔄 ทำแบบทดสอบใหม่</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowQuiz(false)} style={styles.backButton}>
                      <Text style={styles.buttonText}>📚 กลับสู่บทเรียน</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {/* Back button for Quiz Modal - always visible */}
              <TouchableOpacity
                style={styles.modalBackButtonBottom}
                onPress={() => setShowQuiz(false)}
              >
                <Text style={styles.buttonText}>← ปิดแบบทดสอบ</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </Modal>
      )}

      {/* Modals for practice sections */}
      <ListeningModal />
      <SpeakingModal />
      <WritingModal />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FD', // ฟ้าขาวนวล
    padding: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#24B47E', // เขียวสด
    letterSpacing: 1.2,
  },
  mainSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    color: '#71B9F4', // ฟ้า
    fontStyle: 'italic',
    letterSpacing: 0.2,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 22,
    shadowColor: '#b5d0ff',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 13,
    alignItems: 'center',
    borderRadius: 14,
    marginHorizontal: 2,
  },
  activeTab: {
    backgroundColor: '#FDE6EF', // ชมพู
    shadowColor: '#FDB6D0',
    shadowOpacity: 0.12,
    shadowRadius: 9,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92A3B6',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  activeTabText: {
    color: '#DF1580', // ชมพูสด
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
  fontSize: 21,
  fontWeight: 'bold',
  color: '#fff',
  backgroundColor: '#DF1580', // ชมพูเข้ม
  paddingVertical: 8,
  paddingHorizontal: 20,
  borderRadius: 13,
  alignSelf: 'center',
  marginBottom: 18,
  textAlign: 'center',
  letterSpacing: 0.6,
  shadowColor: '#FBCFE8',
  shadowOpacity: 0.11,
  shadowRadius: 7,
  elevation: 2,
},

// ถ้าจะเน้น reading หรือ guide เป็นสีอื่น
readingTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#fff',
  backgroundColor: '#0077D9', // ฟ้าเข้ม
  paddingVertical: 6,
  paddingHorizontal: 16,
  borderRadius: 11,
  alignSelf: 'center',
  marginBottom: 7,
  textAlign: 'center',
},
guideTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#fff',
  backgroundColor: '#24B47E', // เขียวสด
  paddingVertical: 6,
  paddingHorizontal: 16,
  borderRadius: 11,
  alignSelf: 'flex-start',
  marginBottom: 10,
  letterSpacing: 0.2,
},
categoryTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#fff',
  backgroundColor: '#E91E63', // ชมพูสด
  paddingVertical: 5,
  paddingHorizontal: 14,
  borderRadius: 9,
  alignSelf: 'flex-start',
  marginBottom: 13,
},

  guideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#15857E',
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  guideItemContainer: {
    marginBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E3E3E3',
    paddingBottom: 8,
    flexDirection: 'column',
    alignItems: 'flex-start',
    position: 'relative',
  },
  guideItem: {
    fontSize: 15,
    color: '#273143',
    fontWeight: '500',
    lineHeight: 22,
  },
  guideItemThai: {
    fontSize: 13,
    color: '#FF61B4', // ชมพู
    fontStyle: 'italic',
    marginTop: 1,
    marginLeft: 12,
    letterSpacing: 0.1,
  },
  audioButtonSmall: {
    position: 'absolute',
    right: 0,
    top: 2,
    padding: 5,
    backgroundColor: '#D0F2FF',
    borderRadius: 11,
  },
  audioIconSmall: {
    fontSize: 16,
    color: '#189BCA',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0077D9', // ฟ้า
    marginBottom: 13,
  },
  sentenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E6EFE6',
  },
  english: {
    fontSize: 15,
    color: '#1D2B2B',
    fontWeight: '700',
    marginBottom: 1,
  },
  thai: {
    fontSize: 14,
    color: '#D54B8E',
    fontWeight: '500',
    fontStyle: 'italic',
  },
  audioButton: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: '#E1FBFF',
    borderRadius: 11,
  },
  audioIcon: {
    fontSize: 20,
    color: '#24B47E',
  },
  readingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#15857E',
    marginBottom: 7,
    textAlign: 'center',
  },
  readingTitleThai: {
    fontSize: 16,
    color: '#F562A3',
    marginBottom: 11,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  readingContentScroll: {
    maxHeight: 210,
    marginBottom: 13,
  },
  readingText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 24,
    textAlign: 'justify',
    fontWeight: '500',
  },
  playAllButton: {
    backgroundColor: '#BDEDFD',
    padding: 10,
    borderRadius: 9,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 5,
  },
  playAllText: {
    color: '#178DB7',
    fontWeight: '700',
  },
  questionBlock: {
    backgroundColor: '#FAF1F8',
    borderRadius: 13,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#82D8FB', // ฟ้า
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E91E63', // ชมพู
    marginBottom: 7,
  },
  tipItem: {
    fontSize: 13.5,
    color: '#2596be',
    marginLeft: 8,
    marginTop: 2,
    fontWeight: 'bold',
  },
  tipsLabel: {
    marginTop: 8,
    fontWeight: 'bold',
    color: '#E91E63',
  },
  skillButton: {
    marginBottom: 14,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#E1C3FF',
    shadowOpacity: 0.12,
    shadowRadius: 9,
    elevation: 2,
  },
  skillButtonGradient: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  skillButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.6,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 64,
    paddingHorizontal: 20,
    backgroundColor: '#F6F9FB',
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#24B47E',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#E91E63',
    marginBottom: 25,
    textAlign: 'center',
    fontStyle: 'italic',
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
    backgroundColor: '#23D7D0',
    paddingVertical: 11,
    paddingHorizontal: 27,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  playButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.4,
  },
  stopButton: {
    backgroundColor: '#E91E63',
    paddingVertical: 11,
    paddingHorizontal: 27,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  stopButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.2,
  },
  speedControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  speedLabel: {
    fontSize: 16,
    color: '#23A7A7',
    marginRight: 12,
  },
  speedButtons: {
    flexDirection: 'row',
    backgroundColor: '#E1FBFF',
    borderRadius: 15,
    overflow: 'hidden',
  },
  speedBtn: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#24B47E',
  },
  speedBtnText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#24B47E',
  },
  transcriptContainer: {
    backgroundColor: '#F6EFFF',
    borderRadius: 13,
    padding: 15,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#E91E63',
  },
  transcriptText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#334155',
  },
  modalBackButton: {
    backgroundColor: '#E0A0FF',
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 20,
    width: '82%',
    alignSelf: 'center',
  },
  modalBackButtonBottom: {
    backgroundColor: '#24B47E',
    paddingVertical: 13,
    borderRadius: 13,
    alignItems: 'center',
    marginTop: 22,
    width: '75%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 17,
  },
  // Speaking and Writing Modals specific
  sectionLabel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0077D9',
    marginBottom: 10,
    marginTop: 18,
  },
  promptBox: {
    backgroundColor: '#FFEDFB',
    borderRadius: 13,
    padding: 14,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#F06292',
  },
  promptText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#374151',
    fontWeight: '500',
  },
  promptTextThai: {
    fontSize: 14,
    lineHeight: 20,
    color: '#189BCA',
    fontStyle: 'italic',
    marginTop: 5,
  },
  keyPointsBox: {
    backgroundColor: '#E6F9FC',
    borderRadius: 12,
    padding: 13,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#89F0E4',
  },
  keyPointItem: {
    fontSize: 14,
    color: '#F06292',
    marginBottom: 7,
    marginLeft: 13,
    fontWeight: '700',
  },
  keyPointItemThai: {
    fontSize: 13,
    color: '#24B47E',
    fontStyle: 'italic',
    marginBottom: 7,
    marginLeft: 16,
  },
  exampleBox: {
    backgroundColor: '#D8F5FC',
    padding: 12,
    borderRadius: 11,
    marginBottom: 18,
    borderLeftWidth: 5,
    borderLeftColor: '#1E40AF',
  },
  exampleText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  exampleTextThai: {
    fontSize: 13,
    color: '#E91E63',
    fontStyle: 'italic',
    marginTop: 5,
  },
  instructionBox: {
    backgroundColor: '#FFF5F5',
    borderRadius: 11,
    padding: 15,
    marginBottom: 16,
    borderLeftWidth: 5,
    borderLeftColor: '#E91E63',
  },
  wordCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#F2FDFB',
    padding: 8,
    borderRadius: 8,
  },
  wordCountText: {
    fontSize: 14,
    color: '#5E7266',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    flex: 1,
    marginLeft: 12,
    marginRight: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#24B47E',
    borderRadius: 4,
  },
  writingInput: {
    minHeight: 160,
    borderColor: '#24B47E',
    borderWidth: 1,
    borderRadius: 11,
    padding: 15,
    fontSize: 15,
    color: '#243024',
    backgroundColor: '#FCFCFC',
    marginBottom: 15,
    textAlignVertical: 'top',
  },
  tipsContainer: {
    backgroundColor: '#FFF0F6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#FDB6D0',
  },
  tipItemThai: {
    fontSize: 13,
    color: '#15857E',
    fontStyle: 'italic',
    marginLeft: 15,
    marginTop: 2,
  },
  // Quiz Specific Styles (for modal)
  quizModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(249, 170, 215, 0.09)', // ชมพูโปร่ง
  },
  quizModalContainer: {
    borderRadius: 28,
    padding: 27,
    width: '94%',
    maxHeight: '94%',
    alignItems: 'center',
    backgroundColor: '#FFF',
    shadowColor: '#D7B5E9',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 12,
  },
  quizModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#DF1580',
    marginBottom: 17,
    textAlign: 'center',
  },
  quizContent: {
    width: '100%',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: '#92A3B6',
    marginBottom: 9,
  },
  option: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1B7F4',
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#F7F7FC',
    shadowColor: '#BDEDFD',
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  correctOption: {
    backgroundColor: '#E7F9ED',
    borderColor: '#24B47E',
  },
  incorrectOption: {
    backgroundColor: '#FFEBEE',
    borderColor: '#E91E63',
  },
  optionText: {
    fontSize: 15,
    color: '#3C4877',
    fontWeight: 'bold',
  },
  selectedOptionText: {
    fontWeight: 'bold',
    color: '#E91E63',
  },
  explanationBox: {
    marginTop: 13,
    padding: 11,
    backgroundColor: '#E3F6FF',
    borderRadius: 10,
    width: '100%',
    borderLeftWidth: 5,
    borderLeftColor: '#24B47E',
  },
  resultIcon: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#DF1580',
    marginBottom: 3,
  },
  explanationText: {
    fontSize: 14,
    color: '#374151',
  },
  resultsContainer: {
    alignItems: 'center',
    padding: 11,
  },
  resultText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#24B47E',
  },
  percentageText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#E91E63',
  },
  excellentText: {
    fontSize: 16,
    color: '#24B47E',
    fontWeight: 'bold',
  },
  goodText: {
    fontSize: 16,
    color: '#2D9CDB',
    fontWeight: 'bold',
  },
  needsWork: {
    fontSize: 16,
    color: '#E91E63',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 22,
    justifyContent: 'space-around',
    width: '100%',
  },
  retakeButton: {
    backgroundColor: '#FDB6D0',
    padding: 11,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 7,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#24B47E',
    padding: 11,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 7,
    alignItems: 'center',
  },
  showAnswerButton: {
    backgroundColor: '#D0F2FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  showAnswerButtonText: {
    color: '#DF1580',
    fontWeight: 'bold',
    fontSize: 13.2,
  },
  answerBox: {
    backgroundColor: '#FFF3F7',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#24B47E',
  },
  answerText: {
    fontSize: 14,
    color: '#DF1580',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
});
