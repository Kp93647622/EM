import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  SafeAreaView
} from 'react-native';

const { width } = Dimensions.get('window');

export default function EnglishUnitsScreen() {
  const [completedUnits, setCompletedUnits] = useState([1, 3, 5]);
  const navigation = useNavigation();

  const units = [
    { 
      id: 1, 
      title: 'Unit 1: My Self', 
      category: 'grammar',
      duration: '40 min',
      difficulty: 'Intermediate',
      description: 'มีเวลาในการทำข้อสอบ 40 นาที โดยเวลาจะเริ่มจับหลังจากกดเริ่มทำแบบทดสอบ',
      lessons: 3,
      score: 88,
      status: 'completed',
      color: '#6C5CE7',
      icon: '⏰'
    },
    { 
      id: 2, 
      title: 'Unit 2: My Hero', 
      category: 'grammar',
      duration: '40 min',
      difficulty: 'Intermediate',
      description: 'Understanding the difference between action and stative verbs in context',
      lessons: 6,
      score: null,
      status: 'available',
      color: '#00B894',
      icon: '🎯'
    },
    { 
      id: 3, 
      title: 'Unit 3: Time to celebrate', 
      category: 'skills',
      duration: '40 min',
      difficulty: 'Elementary',
      description: 'Learn vocabulary and expressions for describing physical appearance and personality',
      lessons: 7,
      score: 92,
      status: 'completed',
      color: '#FF7675',
      icon: '👥'
    },
    { 
      id: 4, 
      title: 'Unit 4: Managing your money', 
      category: 'grammar',
      duration: '40 min',
      difficulty: 'Intermediate',
      description: 'Express future intentions, plans, and predictions with confidence',
      lessons: 9,
      score: null,
      status: 'in_progress',
      color: '#FD79A8',
      icon: '🔮'
    },
    { 
      id: 5, 
      title: 'Unit 5: Who are you?', 
      category: 'grammar',
      duration: '40 min',
      difficulty: 'Advanced',
      description: 'Master all types of conditional sentences and their practical applications',
      lessons: 10,
      score: 85,
      status: 'completed',
      color: '#FDCB6E',
      icon: '🔄'
    },
    { 
      id: 6, 
      title: 'Unit 6: A History of the Future', 
      category: 'writing',
      duration: '40 min',
      difficulty: 'Advanced',
      description: 'Develop advanced academic writing skills and essay structure techniques',
      lessons: 12,
      score: null,
      status: 'available',
      color: '#E17055',
      icon: '🎓'
    },
    {
      id: 7,
      title: 'Unit 7: Exploring Environmental Policies',
      category: 'skills',
      duration: '40 min',
      difficulty: 'Intermediate',
      description: 'Giving an opinion about an environmental issues and Read about technology.',
      lessons: 8,
      score: null,
      status: 'available',
      color: '#0984E3',
      icon: '🎉'
    },
    {
      id: 8,
      title: 'Unit 8: What will you be having',
      category: 'skills',
      duration: '40 min',
      difficulty: 'Advanced',
      description: 'Asking Questions about dish, state preferences, and make special requests.',
      lessons: 8,
      score: null,
      status: 'available',
      color: '#00BFAE',
      icon: '🌏'
    }
  ];

  // No categories: always show all units
  const filteredUnits = units;

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Elementary': return '#00B894';
      case 'Intermediate': return '#FDCB6E';
      case 'Advanced': return '#E17055';
      default: return '#74B9FF';
    }
  };

  const getDifficultyBg = (difficulty) => {
    switch(difficulty) {
      case 'Elementary': return '#D1F2EB';
      case 'Intermediate': return '#FEF9E7';
      case 'Advanced': return '#FADBD8';
      default: return '#EBF3FD';
    }
  };

  const getStatusInfo = (status) => {
    switch(status) {
      case 'completed':
        return {
          text: '✓ Completed',
          color: '#00B894',
          bg: '#D1F2EB'
        };
      case 'in_progress':
        return {
          text: '⏳ In Progress',
          color: '#FDCB6E',
          bg: '#FEF9E7'
        };
      case 'available':
        return {
          text: '○ Available',
          color: '#74B9FF',
          bg: '#EBF3FD'
        };
      case 'locked':
        return {
          text: '🔒 Locked',
          color: '#B2BEC3',
          bg: '#F8F9FA'
        };
      default:
        return {
          text: '○ Available',
          color: '#74B9FF',
          bg: '#EBF3FD'
        };
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return '#00B894';
    if (score >= 80) return '#6C5CE7';
    if (score >= 70) return '#FDCB6E';
    return '#FF7675';
  };

  const getActionButton = (status) => {
    switch(status) {
      case 'completed':
      case 'in_progress':
      case 'available':
        return {
          text: 'ทำแบบทดสอบ',
          style: 'ทำแบบทดสอบ'
        };
      case 'locked':
        return {
          text: 'Locked',
          style: 'locked'
        };
      default:
        return {
          text: 'ทำแบบทดสอบ',
          style: 'ทำแบบทดสอบ'
        };
    }
  };

  const totalUnits = units.length;
  const averageScore = units.filter(u => u.score !== null).reduce((sum, u) => sum + u.score, 0) / units.filter(u => u.score !== null).length || 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>English Testing Units</Text>
        <TouchableOpacity style={styles.statsButton}>
          <Text style={styles.statsButtonText}>📊</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Overview */}
      <View style={styles.progressOverview}>
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Your  Progress</Text>
          <View style={styles.progressStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{completedUnits.length}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalUnits - completedUnits.length}</Text>
              <Text style={styles.statLabel}>Remaining</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{Math.round(averageScore)}%</Text>
              <Text style={styles.statLabel}>Avg Score</Text>
            </View>
          </View>
          <View style={styles.overallProgress}>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${(completedUnits.length / totalUnits) * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>{Math.round((completedUnits.length / totalUnits) * 100)}% Complete</Text>
          </View>
        </View>
      </View>

      {/* Units List */}
      <ScrollView 
        style={styles.unitsContainer}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.unitsContent}
      >
        {filteredUnits.map(unit => {
          const statusInfo = getStatusInfo(unit.status);
          const actionButton = getActionButton(unit.status);

          return (
            <TouchableOpacity key={unit.id} style={[
              styles.unitCard,
              unit.status === 'locked' && styles.unitCardLocked
            ]}>

              {/* Unit Icon & Status */}
              <View style={styles.unitHeader}>
                <View style={[styles.unitIconContainer, { backgroundColor: unit.color + '20' }]}>
                  <Text style={[styles.unitIcon, { color: unit.color }]}>{unit.icon}</Text>
                </View>
                <View style={styles.unitHeaderRight}>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: statusInfo.bg }
                  ]}>
                    <Text style={[
                      styles.statusText,
                      { color: statusInfo.color }
                    ]}>
                      {statusInfo.text}
                    </Text>
                  </View>
                  <View style={[
                    styles.difficultyBadge,
                    { backgroundColor: getDifficultyBg(unit.difficulty) }
                  ]}>
                    <Text style={[
                      styles.difficultyText,
                      { color: getDifficultyColor(unit.difficulty) }
                    ]}>
                      {unit.difficulty}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Unit Content */}
              <View style={styles.unitContent}>
                <Text style={[
                  styles.unitTitle,
                  unit.status === 'locked' && styles.unitTitleLocked
                ]}>
                  {unit.title}
                </Text>
                <Text style={[
                  styles.unitDescription,
                  unit.status === 'locked' && styles.unitDescriptionLocked
                ]}>
                  {unit.description}
                </Text>
                <View style={styles.unitMeta}>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaIcon}>⏱️</Text>
                    <Text style={styles.metaText}>{unit.duration}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaIcon}>📖</Text>
                    <Text style={styles.metaText}>{unit.lessons} lessons</Text>
                  </View>
                </View>
                {/* Score Display */}
                {unit.score !== null && (
                  <View style={styles.scoreContainer}>
                    <View style={styles.scoreBar}>
                      <View style={[
                        styles.scoreFill,
                        { 
                          width: `${unit.score}%`,
                          backgroundColor: getScoreColor(unit.score)
                        }
                      ]} />
                    </View>
                    <Text style={[
                      styles.scoreText,
                      { color: getScoreColor(unit.score) }
                    ]}>
                      {unit.score}%
                    </Text>
                  </View>
                )}
              </View>

              {/* Action Button */}
              <View style={styles.unitAction}>
                <TouchableOpacity 
                  style={[
                    styles.actionButton,
                    actionButton.style === 'ทำแบบทดสอบ' && [styles.ทำแบบทดสอบButton, { backgroundColor: unit.color }],
                    actionButton.style === 'locked' && styles.lockedButton
                  ]}
                  disabled={unit.status === 'locked'}
                  onPress={() => {
                    if (actionButton.style === 'ทำแบบทดสอบ') {
                      navigation.navigate(`Test${unit.id}`);
                    }
                  }}
                >
                  <Text style={[
                    styles.actionButtonText,
                    (actionButton.style === 'start' || actionButton.style === 'ทำแบบทดสอบ') && styles.whiteButtonText,
                    actionButton.style === 'locked' && styles.lockedButtonText
                  ]}>
                    {actionButton.text}
                  </Text>
                </TouchableOpacity>
              </View>

            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

// ...[Styles: ใช้ styles เดิมของคุณได้เลย]...


// ...[Styles: ใช้ styles เดิมของคุณได้เลย]...


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8EAED',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8EAED',
  },
  backButtonText: {
    fontSize: 20,
    color: '#6C5CE7',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  statsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsButtonText: {
    fontSize: 18,
  },

  // Progress Overview
  progressOverview: {
    padding: 20,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 20,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 20,
    textAlign: 'center',
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6C5CE7',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#636E72',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#DDD',
  },
  overallProgress: {
    alignItems: 'center',
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6C5CE7',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#636E72',
    fontWeight: '600',
  },

  // Category Filter
  categoryContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 12,
  },
  categoryScroll: {
    flexGrow: 0,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E8EAED',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryButtonActive: {
    backgroundColor: '#6C5CE7',
    borderColor: '#6C5CE7',
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#636E72',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  // Units List
  unitsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  unitsContent: {
    paddingBottom: 20,
  },
  unitCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    overflow: 'hidden',
  },
  unitCardLocked: {
    opacity: 0.6,
  },

  // Unit Card Content
  unitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 16,
  },
  unitIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unitIcon: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  unitHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '700',
  },

  unitContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  unitTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 8,
  },
  unitTitleLocked: {
    color: '#B2BEC3',
  },
  unitDescription: {
    fontSize: 14,
    color: '#636E72',
    lineHeight: 20,
    marginBottom: 16,
  },
  unitDescriptionLocked: {
    color: '#B2BEC3',
  },
  unitMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  metaText: {
    fontSize: 13,
    color: '#636E72',
    fontWeight: '500',
  },

  // Score Bar
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  scoreBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginRight: 12,
  },
  scoreFill: {
    height: '100%',
    borderRadius: 4,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: '700',
    minWidth: 40,
  },

  // Action Button
  unitAction: {
    padding: 20,
    paddingTop: 0,
  },
  actionButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  ทำแบบทดสอบButtonButton: {
    // backgroundColor will be set dynamically
  },
  continueButton: {
    backgroundColor: '#FDCB6E',
  },
  ทำแบบทดสอบButton: {
    backgroundColor: '#00B894',
  },
  lockedButton: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E8EAED',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  whiteButtonText: {
    color: '#FFFFFF',
  },
  lockedButtonText: {
    color: '#B2BEC3',
  },

  // Special Unit (Speaking & Listening)
  specialUnitCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#74B9FF',
  },
  specialUnitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#74B9FF',
  },
  specialUnitIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  specialUnitIcon: {
    fontSize: 28,
  },
  specialUnitInfo: {
    flex: 1,
  },
  specialUnitTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  specialUnitSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  specialUnitContent: {
    padding: 20,
  },
  specialUnitDescription: {
    fontSize: 14,
    color: '#636E72',
    lineHeight: 20,
    marginBottom: 16,
  },
  specialUnitFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#636E72',
    fontWeight: '600',
    textAlign: 'center',
  },
  specialUnitAction: {
    padding: 20,
    paddingTop: 0,
  },
  specialActionButton: {
    backgroundColor: '#74B9FF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#74B9FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  specialActionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});