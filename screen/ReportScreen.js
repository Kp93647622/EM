import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ReportScreen({ navigation }) {
   const subjects = [
    {
      id: 1,
      name: 'My Self',
      icon: '📚',
      score: 87,
      grade: 'A',
      attendance: 95,
      trend: 'up',
      color: '#4CAF50'
    },
    {
      id: 2,
      name: 'Role models, Adventure and Exploration',
      icon: '👥',
      score: 76,
      grade: 'B+',
      attendance: 88,
      trend: 'down',
      color: '#2196F3'
    },
    {
      id: 3,
      name: 'Time to celebrate',
      icon: '🔮',
      score: 82,
      grade: 'A-',
      attendance: 92,
      trend: 'up',
      color: '#FF9800'
    },
    {
      id: 4,
      name: 'Managing your money',
      icon: '💭',
      score: 79,
      grade: 'B+',
      attendance: 90,
      trend: 'stable',
      color: '#9C27B0'
    },
    {
      id: 5,
      name: 'Who are you?',
      icon: '✍️',
      score: 85,
      grade: 'A',
      attendance: 96,
      trend: 'up',
      color: '#F44336'
    },
    {
      id: 6,
      name: 'A history of the future',
      icon: '🎧',
      score: 88,
      grade: 'A',
      attendance: 94,
      trend: 'up',
      color: '#00BCD4'
    },
    {
      id: 7,
      name: 'Exploring Environmental Policies',
      icon: '💡',
      score: 90,
      grade: 'A',
      attendance: 98,
      trend: 'up',
      color: '#8BC34A'
    },
    {
      id: 8,
      name: 'What will you be having?',
      icon: '🥗',
      score: 83,
      grade: 'A-',
      attendance: 93,
      trend: 'up',
      color: '#FFB300'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'นักเรียนดีเด่น',
      description: 'ได้คะแนนเฉลี่ย 3.5 ขึ้นไป',
      icon: '🏆',
      date: '15 มิ.ย. 2568',
      type: 'gold'
    },
    {
      id: 2,
      title: 'เข้าเรียนสม่ำเสมอ',
      description: 'เข้าเรียนครบ 95% ของเวลา',
      icon: '⭐',
      date: '10 มิ.ย. 2568',
      type: 'silver'
    }
  ];

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return '#4CAF50';
    if (grade.includes('B')) return '#2196F3';
    if (grade.includes('C')) return '#FF9800';
    if (grade.includes('D')) return '#FF5722';
    return '#F44336';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getAchievementStyle = (type) => {
    switch (type) {
      case 'gold':
        return { bg: '#FFF8E1', border: '#FFD700', text: '#F57F17', shadow: '#FFD700' };
      case 'silver':
        return { bg: '#F3E5F5', border: '#C0C0C0', text: '#7B1FA2', shadow: '#C0C0C0' };
      case 'bronze':
        return { bg: '#FFF3E0', border: '#CD7F32', text: '#E65100', shadow: '#CD7F32' };
      default:
        return { bg: '#F5F5F5', border: '#9E9E9E', text: '#616161', shadow: '#9E9E9E' };
    }
  };

  // คำนวณสถิติรวม
  const averageScore = subjects.reduce((sum, subject) => sum + subject.score, 0) / subjects.length;
  const averageAttendance = subjects.reduce((sum, subject) => sum + subject.attendance, 0) / subjects.length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>รายงานผลการเรียน</Text>
        <TouchableOpacity style={styles.exportButton}>
          <Text style={styles.exportButtonText}>📊</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Overall Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>สรุปผลรวม</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <View style={styles.averageCircle}>
                <Text style={styles.averageText}>คะแนนเฉลี่ย</Text>
                <Text style={styles.averageValue}>{Math.round(averageScore)}</Text>
              </View>
              <View style={styles.summaryDetails}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryNumber}>{subjects.length}</Text>
                  <Text style={styles.summaryLabel}>หน่วยเรียน</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryNumber}>{Math.round(averageAttendance)}%</Text>
                  <Text style={styles.summaryLabel}>เข้าเรียน</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Subjects Performance */}
        <View style={styles.subjectsContainer}>
          <Text style={styles.sectionTitle}>ผลการเรียนแต่ละหน่วย</Text>
          {subjects.map((subject, index) => (
            <TouchableOpacity
              key={subject.id}
              style={[styles.subjectCard, { borderLeftColor: subject.color }]}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('LessonDetailScreen', { subjectId: subject.id })}
            >
              <View style={styles.subjectHeader}>
                <View style={styles.subjectInfo}>
                  <View style={[styles.subjectIconContainer, { backgroundColor: subject.color + '20' }]}>
                    <Text style={styles.subjectIcon}>{subject.icon}</Text>
                  </View>
                  <View style={styles.subjectDetails}>
                    <Text style={styles.subjectName}>{subject.name}</Text>
                  </View>
                </View>
                <View style={styles.subjectGrade}>
                  <Text style={[
                    styles.gradeText,
                    { color: getGradeColor(subject.grade) }
                  ]}>
                    {subject.grade}
                  </Text>
                  <Text style={styles.trendIcon}>{getTrendIcon(subject.trend)}</Text>
                </View>
              </View>
              <View style={styles.subjectMetrics}>
                <View style={styles.metricRow}>
                  <Text style={styles.metricLabel}>คะแนน</Text>
                  <View style={styles.scoreBarContainer}>
                    <View style={styles.scoreBar}>
                      <View style={[
                        styles.scoreBarFill,
                        {
                          width: `${subject.score}%`,
                          backgroundColor: subject.color
                        }
                      ]} />
                    </View>
                    <Text style={styles.scoreValue}>{subject.score}</Text>
                  </View>
                </View>
                <View style={styles.metricRow}>
                  <Text style={styles.metricLabel}>เข้าเรียน</Text>
                  <View style={styles.scoreBarContainer}>
                    <View style={styles.scoreBar}>
                      <View style={[
                        styles.scoreBarFill,
                        {
                          width: `${subject.attendance}%`,
                          backgroundColor: subject.attendance >= 90 ? '#4CAF50' : '#FF9800'
                        }
                      ]} />
                    </View>
                    <Text style={styles.scoreValue}>{subject.attendance}%</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Achievements */}
        <View style={styles.achievementsContainer}>
          <Text style={styles.sectionTitle}>รางวัลและความสำเร็จ</Text>
          {achievements.map(achievement => {
            const style = getAchievementStyle(achievement.type);
            return (
              <View key={achievement.id} style={[
                styles.achievementCard,
                {
                  backgroundColor: style.bg,
                  borderColor: style.border,
                  shadowColor: style.shadow
                }
              ]}>
                <View style={styles.achievementHeader}>
                  <View style={styles.achievementIconContainer}>
                    <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                  </View>
                  <View style={styles.achievementInfo}>
                    <Text style={[
                      styles.achievementTitle,
                      { color: style.text }
                    ]}>
                      {achievement.title}
                    </Text>
                    <Text style={styles.achievementDescription}>
                      {achievement.description}
                    </Text>
                  </View>
                  <Text style={styles.achievementDate}>{achievement.date}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Performance Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>ภาพรวมผลการเรียน</Text>
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>คะแนนแต่ละหน่วย</Text>
            </View>
            <View style={styles.chartContent}>
              {subjects.map((subject, index) => (
                <View key={subject.id} style={styles.chartRow}>
                  <View style={styles.chartLabel}>
                    <Text style={styles.chartIcon}>{subject.icon}</Text>
                    <Text style={styles.chartSubject} numberOfLines={1}>
                      หน่วยที่ {index + 1}
                    </Text>
                  </View>
                  <View style={styles.chartBar}>
                    <View style={[
                      styles.chartBarFill,
                      {
                        width: `${subject.score}%`,
                        backgroundColor: subject.color
                      }
                    ]} />
                  </View>
                  <Text style={styles.chartScore}>{subject.score}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Recommendations */}
        <View style={styles.recommendationsContainer}>
          <Text style={styles.sectionTitle}>คำแนะนำ</Text>
          <View style={styles.recommendationCard}>
            <View style={styles.recommendationHeader}>
              <Text style={styles.recommendationIcon}>💡</Text>
              <Text style={styles.recommendationTitle}>พื้นที่ที่ควรปรับปรุง</Text>
            </View>
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationText}>
                • ควรเพิ่มความตั้งใจในหน่วย "Describing People and Appearance" เนื่องจากคะแนนมีแนวโน้มลดลง{'\n'}
                • เพิ่มการเข้าเรียนในหน่วยที่มีเปอร์เซ็นต์การเข้าเรียนต่ำกว่า 90%{'\n'}
                • รักษาผลการเรียนที่ดีในหน่วยอื่นๆ ต่อไป
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ... (styles ยังคงเหมือนเดิม ไม่ต้องเปลี่ยนแปลง) ...
// สามารถใช้ styles จากโค้ดที่คุณส่งมาได้เลย


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
    borderBottomColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  exportButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exportButtonText: {
    fontSize: 20,
  },

  // Scroll Container
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },

  // Section Title
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },

  // Summary Section
  summaryContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  averageCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E91E63',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 25,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  averageText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  averageValue: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  summaryDetails: {
    flex: 1,
    gap: 15,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FF',
    padding: 12,
    borderRadius: 10,
  },
  summaryNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },

  // Subjects Section
  subjectsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  subjectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    borderLeftWidth: 4,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  subjectInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  subjectIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  subjectIcon: {
    fontSize: 24,
  },
  subjectDetails: {
    flex: 1,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  subjectGrade: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  gradeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  trendIcon: {
    fontSize: 16,
  },

  // Subject Metrics
  subjectMetrics: {
    gap: 15,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
    width: 70,
    fontWeight: '500',
  },
  scoreBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 15,
  },
  scoreBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 12,
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    minWidth: 40,
    textAlign: 'right',
  },

  // Achievements Section
  achievementsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  achievementCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  achievementIcon: {
    fontSize: 24,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 13,
    color: '#666',
  },
  achievementDate: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },

  // Chart Section
  chartContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  chartHeader: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  chartContent: {
    gap: 12,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  chartLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
  },
  chartIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  chartSubject: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  chartBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  chartBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  chartScore: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    width: 30,
    textAlign: 'right',
  },

  // Recommendations Section
  recommendationsContainer: {
    paddingHorizontal: 20,
  },
  recommendationCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FFE082',
    shadowColor: '#FF9800',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  recommendationIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E65100',
  },
  recommendationContent: {
    paddingLeft: 36,
  },
  recommendationText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
});