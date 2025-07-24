import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function LessonScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [completedLessons, setCompletedLessons] = useState([1, 3, 5]);
  const navigation = useNavigation();

  const categories = [
    { id: 'all', name: 'ทั้งหมด', icon: '📚' },
    { id: 'basic', name: 'พื้นฐาน', icon: '🔤' },
    { id: 'intermediate', name: 'กลาง', icon: '📈' },
    { id: 'advanced', name: 'สูง', icon: '🏆' },
  ];

  const lessons = [
    { id: 1, title: 'Lesson 1: My Self', category: 'basic', duration: '20 นาที', difficulty: 'ง่าย',
      description: 'เรียนรู้การแนะนำตัวเอง การใช้ Present Perfect, Action Verbs & Statiive Verbs และการพูดเกี่ยวกับตัวเอง',
      progress: 100, skills: ['Speaking', 'Grammar', 'Vocabulary'], icon: '🙋' },
    { id: 2, title: 'Lesson 2: Role Models, Adventure and Exploration', category: 'basic', duration: '25 นาที', difficulty: 'ง่าย',
      description: 'เรียนรู้คำศัพท์เกี่ยวกับบุคคลต้นแบบ การผจญภัย และการสำรวจ Past Perfect Tense, Asverb Sentence starters และ Past Perfect Continuous',
      progress: 0, skills: ['Vocabulary', 'Reading', 'Speaking'], icon: '🚀' },
    { id: 3, title: 'Lesson 3: Time to Celebrate', category: 'intermediate', duration: '30 นาที', difficulty: 'ปานกลาง',
      description: 'เรียนรู้เกี่ยวกับเทศกาลต่างๆ การใช้ Future tense และการวางแผน Present Perfect vs. Past Simple, Present Perfect Continuous และ Phrases to conclude',
      progress: 100, skills: ['Grammar', 'Cultural Knowledge', 'Planning'], icon: '🎉' },
    { id: 4, title: 'Lesson 4: Managing Your Money', category: 'intermediate', duration: '35 นาที', difficulty: 'ปานกลาง',
      description: 'เรียนรู้การจัดการเงิน คำศัพท์ทางการเงิน และ Conditional sentences Modal verbs of necessity, Future Perfect & Future Perfect Continuous',
      progress: 60, skills: ['Vocabulary', 'Logic', 'Critical Thinking'], icon: '💸' },
    { id: 5, title: 'Lesson 5: Who Are You?', category: 'advanced', duration: '40 นาที', difficulty: 'ยาก',
      description: 'เรียนรู้การวิเคราะห์บุคลิกภาพ การเขียนเรียงความ และการแสดงความคิดเห็น Defining Relative Clauses, Non-defining Relative Clauses',
      progress: 100, skills: ['Writing', 'Analysis', 'Self-reflection'], icon: '🧑‍🎓' },
    { id: 6, title: 'Lesson 6: A History of the Future', category: 'advanced', duration: '45 นาที', difficulty: 'ยาก',
      description: 'เรียนรู้เกี่ยวกับอนาคต เทคโนโลยี และการคาดการณ์แนวโน้ม Passive Voice Tenses, Causative passive',
      progress: 0, skills: ['Future tense', 'Technology', 'Prediction'], icon: '🤖' },
    { id: 7, title: 'Lesson 7: Exploring Environmental Policies', category: 'advanced', duration: '50 นาที', difficulty: 'ยาก',
      description: 'เรียนรู้เกี่ยวกับนโยบายสิ่งแวดล้อม การอภิปราย และการเขียนเชิงวิเคราะห์ Causative verbs let, make, have and Causative verbs get, help and Phrasal Verbs',
      progress: 0, skills: ['Environmental Issues', 'Policy Analysis', 'Debate'], icon: '🌱' },
    { id: 8, title: 'Lesson 8: What Will You Be Having?', category: 'advanced', duration: '35 นาที', difficulty: 'ยาก',
      description: 'เรียนรู้การสั่งอาหาร บทสนทนาในร้านอาหาร และมารยาทการรับประทานอาหาร Gerund verbs & Infinitives, Making Dining requests, -ing forms: gerunds, verbs,and adjectives',
      progress: 0, skills: ['Dining Etiquette', 'Conversation', 'Cultural Awareness'], icon: '🍽️' },
  ];

  const filteredLessons = selectedCategory === 'all'
    ? lessons
    : lessons.filter(lesson => lesson.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'ง่าย': return '#34d399';
      case 'ปานกลาง': return '#f59e42';
      case 'ยาก': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getDifficultyBg = (difficulty) => {
    switch (difficulty) {
      case 'ง่าย': return '#e0fdfa';
      case 'ปานกลาง': return '#fff4e6';
      case 'ยาก': return '#e0e7ff';
      default: return '#f3f4f6';
    }
  };

  const getProgressByCategory = (category) => {
    const categoryLessons = lessons.filter(lesson => lesson.category === category);
    const completedInCategory = categoryLessons.filter(lesson => completedLessons.includes(lesson.id)).length;
    return categoryLessons.length > 0 ? Math.round((completedInCategory / categoryLessons.length) * 100) : 0;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#0ea5e9', '#2563eb']} style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>E-M5 Learning Platform</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Progress Overview */}
      <View style={styles.progressOverview}>
        <LinearGradient colors={['#bae6fd', '#dbeafe']} style={styles.progressCard}>
          <Text style={styles.progressTitle}>ความคืบหน้าการเรียนภาษาอังกฤษ</Text>
          <View style={styles.progressStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{completedLessons.length}</Text>
              <Text style={styles.statLabel}>เสร็จแล้ว</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{lessons.length - completedLessons.length}</Text>
              <Text style={styles.statLabel}>เหลือ</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#2563eb' }]}>{Math.round((completedLessons.length / lessons.length) * 100)}%</Text>
              <Text style={styles.statLabel}>เสร็จสิ้น</Text>
            </View>
          </View>
          <View style={styles.levelIndicator}>
            <Text style={styles.levelText}>📚 Upper Intermediate Level</Text>
          </View>
        </LinearGradient>
      </View>

      {/* Category Filter */}
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>ระดับความยาก</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryButton, selectedCategory === category.id && styles.categoryButtonActive]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[styles.categoryText, selectedCategory === category.id && styles.categoryTextActive]}>
                {category.name}
              </Text>
              {category.id !== 'all' && (
                <View style={styles.categoryProgress}>
                  <Text style={styles.categoryProgressText}>{getProgressByCategory(category.id)}%</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Lessons List */}
      <ScrollView style={styles.lessonsContainer} contentContainerStyle={styles.lessonsContent}>
        {filteredLessons.map(lesson => (
          <View key={lesson.id} style={styles.lessonCard}>
            {/* Lesson Card Header */}
            <LinearGradient
              colors={['#0ea5e9', '#2563eb']}
              style={styles.cardHeaderGradient}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <View style={styles.lessonIconWrap}>
                <Text style={styles.lessonIcon}>{lesson.icon}</Text>
              </View>
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyBg(lesson.difficulty) }]}>
                <Text style={[styles.difficultyText, { color: getDifficultyColor(lesson.difficulty) }]}>{lesson.difficulty}</Text>
              </View>
            </LinearGradient>

            {/* Lesson Content */}
            <View style={styles.lessonContent}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Text style={styles.lessonDescription}>{lesson.description}</Text>
              <View style={styles.lessonMeta}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaIcon}>⏱️</Text>
                  <Text style={styles.metaText}>{lesson.duration}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaIcon}>🎯</Text>
                  <Text style={styles.metaText}>มัธยมปลาย</Text>
                </View>
              </View>
              <View style={styles.skillsContainer}>
                <View style={styles.skillTags}>
                  {lesson.skills.map((skill, idx) => (
                    <Text key={idx} style={styles.skillTag}>{skill}</Text>
                  ))}
                </View>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressContainer}>
                <LinearGradient
                  colors={['#0ea5e9', '#2563eb']}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={[styles.progressBar, { width: `${lesson.progress}%` }]}
                />
                <View style={[styles.progressBarBg, { left: `${lesson.progress}%`, width: `${100 - lesson.progress}%` }]} />
                <Text style={styles.progressText}>{lesson.progress}%</Text>
                <View style={[styles.statusBadge, { backgroundColor: lesson.progress === 100 ? '#d1fae5' : lesson.progress > 0 ? '#fff4e6' : '#f3f4f6' }]}>
                  <Text style={[styles.statusText, { color: lesson.progress === 100 ? '#10b981' : lesson.progress > 0 ? '#f59e42' : '#6b7280' }]}>
                    {lesson.progress === 100 ? '✓ เสร็จแล้ว' : lesson.progress > 0 ? '⏳ กำลังเรียน' : '○ ยังไม่เริ่ม'}
                  </Text>
                </View>
              </View>
            </View>
            {/* Action Button */}
            <View style={styles.lessonAction}>
              <TouchableOpacity
                style={styles.actionButtonWrapper}
                onPress={() => navigation.navigate(`Lesson${lesson.id}`)}
                activeOpacity={0.88}
              >
                <LinearGradient
                  colors={lesson.progress === 100 ? ['#dbeafe', '#e0f2fe'] : ['#2563eb', '#0ea5e9']}
                  style={[
                    styles.actionButton,
                    lesson.progress === 100 ? styles.reviewButton : styles.startButton
                  ]}
                >
                  <Text style={[
                    styles.actionButtonText,
                    lesson.progress === 100 ? styles.reviewButtonText : styles.startButtonText
                  ]}>
                    {lesson.progress === 100 ? 'ทบทวน' : lesson.progress > 0 ? 'เรียนต่อ' : 'เริ่มเรียน'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f8ff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 18, paddingBottom: 24,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 8,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
  },
  backButton: {
    width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.45)',
    justifyContent: 'center', alignItems: 'center',
  },
  backButtonText: { fontSize: 22, color: '#2563eb', fontWeight: 'bold' },
  headerTitle: { fontSize: 23, fontWeight: 'bold', color: '#fff', letterSpacing: 1.1 },
  searchButton: {
    width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.45)',
    justifyContent: 'center', alignItems: 'center',
  },
  searchButtonText: { fontSize: 20, color: '#2563eb' },

  // Progress Overview
  progressOverview: { padding: 19, paddingBottom: 10 },
  progressCard: {
    backgroundColor: '#e0e7ff',
    padding: 23,
    borderRadius: 22,
    elevation: 2,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 7,
  },
  progressTitle: { fontSize: 17, fontWeight: 'bold', color: '#2563eb', marginBottom: 15, textAlign: 'center' },
  progressStats: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 14 },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 23, fontWeight: 'bold', color: '#0f172a', marginBottom: 3 },
  statLabel: { fontSize: 12, color: '#2563eb', fontWeight: '500' },
  statDivider: { width: 1, height: 34, backgroundColor: '#bae6fd' },
  levelIndicator: {
    backgroundColor: '#e0f2fe',
    paddingVertical: 8, paddingHorizontal: 18,
    borderRadius: 17,
    alignSelf: 'center',
    marginTop: 3,
  },
  levelText: { fontSize: 15, color: '#2563eb', fontWeight: '600' },

  // Category Filter
  categoryContainer: { paddingHorizontal: 22, marginBottom: 12 },
  categoryTitle: { fontSize: 17, fontWeight: 'bold', color: '#2563eb', marginBottom: 10 },
  categoryScroll: { flexGrow: 0 },
  categoryButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', paddingHorizontal: 17, paddingVertical: 10,
    borderRadius: 22, marginRight: 12, borderWidth: 1.3, borderColor: '#e0e7ff',
  },
  categoryButtonActive: { backgroundColor: '#bae6fd', borderColor: '#2563eb' },
  categoryIcon: { fontSize: 18, marginRight: 8 },
  categoryText: { fontSize: 14, color: '#64748b', fontWeight: '500' },
  categoryTextActive: { color: '#2563eb', fontWeight: 'bold' },
  categoryProgress: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: 10, marginLeft: 8,
  },
  categoryProgressText: { fontSize: 11, color: '#FFF', fontWeight: '700' },

  // Lessons List
  lessonsContainer: { flex: 1, paddingHorizontal: 12 },
  lessonsContent: { paddingBottom: 26 },
  lessonCard: {
    backgroundColor: '#fff',
    borderRadius: 23,
    marginBottom: 18,
    elevation: 3,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.09,
    shadowRadius: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#0ea5e9',
    overflow: 'hidden',
  },
  cardHeaderGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 17,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: 3,
    elevation: 2,
  },
  lessonIconWrap: {
    backgroundColor: 'rgba(255,255,255,0.22)',
    width: 38, height: 38, borderRadius: 19,
    justifyContent: 'center', alignItems: 'center',
    marginRight: 13,
    borderWidth: 1.2, borderColor: 'rgba(255,255,255,0.4)'
  },
  lessonIcon: {
    fontSize: 22,
  },
  difficultyBadge: {
    paddingHorizontal: 13, paddingVertical: 5, borderRadius: 14,
    backgroundColor: '#e0e7ff',
    alignItems: 'center', justifyContent: 'center'
  },
  difficultyText: {
    fontSize: 12, fontWeight: '700', letterSpacing: 0.1,
  },

  lessonContent: { paddingHorizontal: 18, paddingBottom: 13, paddingTop: 8 },
  lessonTitle: { fontSize: 16.5, fontWeight: 'bold', color: '#2563eb', marginBottom: 6 },
  lessonDescription: { fontSize: 13, color: '#64748b', lineHeight: 19, marginBottom: 10 },
  lessonMeta: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  metaItem: { flexDirection: 'row', alignItems: 'center', marginRight: 17 },
  metaIcon: { fontSize: 14, marginRight: 5 },
  metaText: { fontSize: 12, color: '#2563eb', fontWeight: '600' },

  skillsContainer: { marginBottom: 8 },
  skillTags: { flexDirection: 'row', flexWrap: 'wrap' },
  skillTag: {
    backgroundColor: '#e0e7ff',
    color: '#2563eb',
    fontSize: 11.5,
    fontWeight: '700',
    paddingHorizontal: 11, paddingVertical: 5,
    borderRadius: 11,
    marginRight: 7, marginBottom: 4,
    letterSpacing: 0.25,
  },

  // Progress Bar (modern)
  progressContainer: {
    flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 3,
    position: 'relative', height: 18,
  },
  progressBar: {
    position: 'absolute', left: 0, top: 6,
    height: 7,
    borderRadius: 3.5,
    zIndex: 2,
  },
  progressBarBg: {
    position: 'absolute', top: 6,
    height: 7, backgroundColor: '#e5e7eb',
    borderRadius: 3.5,
    zIndex: 1,
  },
  progressText: {
    fontSize: 12, color: '#2563eb', fontWeight: '600', marginLeft: 'auto', minWidth: 32, textAlign: 'right',
    position: 'absolute', right: 5, top: -1,
  },
  statusBadge: {
    position: 'absolute', top: -4, right: 5,
    paddingHorizontal: 10, paddingVertical: 3, borderRadius: 14,
    minWidth: 75, alignItems: 'center',
    zIndex: 3,
    elevation: 2,
  },
  statusText: { fontSize: 11.5, fontWeight: '600' },

  lessonAction: { paddingHorizontal: 18, paddingBottom: 18, paddingTop: 2 },
  actionButtonWrapper: { borderRadius: 26, overflow: 'hidden' },
  actionButton: {
    paddingVertical: 13, borderRadius: 26, alignItems: 'center', elevation: 2,
  },
  startButton: {},
  reviewButton: { borderWidth: 1.2, borderColor: '#e0e7eb' },
  actionButtonText: { fontSize: 15, fontWeight: '700', letterSpacing: 0.2 },
  startButtonText: { color: '#fff' },
  reviewButtonText: { color: '#2563eb' },
});
