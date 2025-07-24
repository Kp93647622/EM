import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function TimeScreen({ route }) {
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));
  const [scaleAnim] = useState(new Animated.Value(0.95));
  const [chartAnim] = useState(new Animated.Value(0));
  
  const user = route?.params?.user || { name: 'นักเรียน' };
  
  // Mock data for study time statistics
  const studyData = {
    totalTime: 2457, // minutes
    todayTime: 125, // minutes
    weeklyGoal: 300, // minutes
    streak: 7, // days
    avgSessionTime: 45, // minutes
    weeklyData: [
      { day: 'จ', time: 45, label: 'จันทร์' },
      { day: 'อ', time: 60, label: 'อังคาร' },
      { day: 'พ', time: 30, label: 'พุธ' },
      { day: 'พฤ', time: 75, label: 'พฤหัสบดี' },
      { day: 'ศ', time: 90, label: 'ศุกร์' },
      { day: 'ส', time: 0, label: 'เสาร์' },
      { day: 'อา', time: 125, label: 'อาทิตย์' }
    ],
    subjects: [
      { name: 'การอ่าน', time: 180, color: '#2196F3', progress: 0.75 },
      { name: 'คำศัพท์', time: 150, color: '#4CAF50', progress: 0.6 },
      { name: 'ไวยากรณ์', time: 120, color: '#FF9800', progress: 0.5 },
      { name: 'การฟัง', time: 90, color: '#E91E63', progress: 0.4 }
    ]
  };
  
  // Animation on component load
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(chartAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      })
    ]).start();
  }, []);
  
  // Convert minutes to hours and minutes
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}ชม. ${mins}นาที`;
    }
    return `${mins}นาที`;
  };
  
  // Calculate weekly progress
  const weeklyProgress = studyData.weeklyData.reduce((sum, day) => sum + day.time, 0);
  const weeklyProgressPercent = Math.min((weeklyProgress / studyData.weeklyGoal) * 100, 100);
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      {/* Header */}
      <Animated.View 
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← กลับ</Text>
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.headerIcon}>⏱️</Text>
          <Text style={styles.headerTitle}>สถิติเวลาการเรียน</Text>
          <Text style={styles.headerSubtitle}>ติดตามความก้าวหน้าของคุณ{user.name}</Text>
        </View>
      </Animated.View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        
        {/* Today's Summary */}
        <Animated.View 
          style={[
            styles.todaySummary,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryIcon}>📅</Text>
            <Text style={styles.summaryTitle}>สรุปวันนี้</Text>
          </View>
          
          <View style={styles.summaryGrid}>
            <View style={[styles.summaryCard, styles.todayCard]}>
              <View style={styles.summaryIconContainer}>
                <Text style={styles.summaryCardIcon}>🎯</Text>
              </View>
              <Text style={styles.summaryCardValue}>{formatTime(studyData.todayTime)}</Text>
              <Text style={styles.summaryCardLabel}>เรียนวันนี้</Text>
            </View>
            
            <View style={[styles.summaryCard, styles.streakCard]}>
              <View style={styles.summaryIconContainer}>
                <Text style={styles.summaryCardIcon}>🔥</Text>
              </View>
              <Text style={styles.summaryCardValue}>{studyData.streak}</Text>
              <Text style={styles.summaryCardLabel}>วันติดต่อกัน</Text>
            </View>
            
            <View style={[styles.summaryCard, styles.avgCard]}>
              <View style={styles.summaryIconContainer}>
                <Text style={styles.summaryCardIcon}>📊</Text>
              </View>
              <Text style={styles.summaryCardValue}>{formatTime(studyData.avgSessionTime)}</Text>
              <Text style={styles.summaryCardLabel}>เฉลี่ยต่อครั้ง</Text>
            </View>
          </View>
        </Animated.View>

        {/* Weekly Progress */}
        <Animated.View 
          style={[
            styles.weeklyProgress,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.weeklyHeader}>
            <Text style={styles.weeklyIcon}>📈</Text>
            <Text style={styles.weeklyTitle}>ความก้าวหน้าสัปดาห์นี้</Text>
          </View>
          
          <View style={styles.weeklyGoal}>
            <View style={styles.goalInfo}>
              <Text style={styles.goalText}>เป้าหมาย: {formatTime(studyData.weeklyGoal)}</Text>
              <Text style={styles.goalProgress}>
                {formatTime(weeklyProgress)} ({Math.round(weeklyProgressPercent)}%)
              </Text>
            </View>
            
            <View style={styles.goalBar}>
              <Animated.View 
                style={[
                  styles.goalFill,
                  {
                    width: chartAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', `${weeklyProgressPercent}%`],
                      extrapolate: 'clamp'
                    })
                  }
                ]} 
              />
            </View>
          </View>
        </Animated.View>

        {/* Weekly Chart */}
        <Animated.View 
          style={[
            styles.weeklyChart,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.chartHeader}>
            <Text style={styles.chartIcon}>📊</Text>
            <Text style={styles.chartTitle}>กราฟรายวัน (7 วันย้อนหลัง)</Text>
          </View>
          
          <View style={styles.chartContainer}>
            <View style={styles.chartGrid}>
              {studyData.weeklyData.map((day, index) => {
                const maxTime = Math.max(...studyData.weeklyData.map(d => d.time));
                const heightPercent = maxTime > 0 ? (day.time / maxTime) * 100 : 0;
                
                return (
                  <View key={index} style={styles.chartBar}>
                    <View style={styles.barContainer}>
                      <Animated.View 
                        style={[
                          styles.bar,
                          {
                            height: chartAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, heightPercent],
                              extrapolate: 'clamp'
                            }).interpolate({
                              inputRange: [0, 100],
                              outputRange: ['0%', '100%'],
                              extrapolate: 'clamp'
                            }),
                            backgroundColor: day.time > 0 ? '#4CAF50' : '#E0E0E0'
                          }
                        ]}
                      />
                      <Text style={styles.barValue}>{day.time > 0 ? day.time : ''}</Text>
                    </View>
                    <Text style={styles.barLabel}>{day.day}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </Animated.View>

        {/* Subject Breakdown */}
        <Animated.View 
          style={[
            styles.subjectBreakdown,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.subjectHeader}>
            <Text style={styles.subjectIcon}>📚</Text>
            <Text style={styles.subjectTitle}>เวลาเรียนแยกตามหัวข้อ</Text>
          </View>
          
          {studyData.subjects.map((subject, index) => (
            <View key={index} style={styles.subjectItem}>
              <View style={styles.subjectInfo}>
                <View style={[styles.subjectColor, { backgroundColor: subject.color }]} />
                <Text style={styles.subjectName}>{subject.name}</Text>
                <Text style={styles.subjectTime}>{formatTime(subject.time)}</Text>
              </View>
              
              <View style={styles.subjectProgressBar}>
                <Animated.View 
                  style={[
                    styles.subjectProgressFill,
                    {
                      backgroundColor: subject.color,
                      width: chartAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', `${subject.progress * 100}%`],
                        extrapolate: 'clamp'
                      })
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </Animated.View>

        {/* Total Statistics */}
        <Animated.View 
          style={[
            styles.totalStats,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.totalHeader}>
            <Text style={styles.totalIcon}>🏆</Text>
            <Text style={styles.totalTitle}>สถิติรวม</Text>
          </View>
          
          <View style={styles.totalGrid}>
            <View style={styles.totalItem}>
              <Text style={styles.totalNumber}>{formatTime(studyData.totalTime)}</Text>
              <Text style={styles.totalLabel}>เวลารวมทั้งหมด</Text>
            </View>
            
            <View style={styles.totalItem}>
              <Text style={styles.totalNumber}>{Math.round(studyData.totalTime / 60)}</Text>
              <Text style={styles.totalLabel}>ชั่วโมงรวม</Text>
            </View>
            
            <View style={styles.totalItem}>
              <Text style={styles.totalNumber}>{Math.round(studyData.totalTime / studyData.avgSessionTime)}</Text>
              <Text style={styles.totalLabel}>ครั้งที่เรียน</Text>
            </View>
          </View>
        </Animated.View>

        {/* Motivational Message */}
        <Animated.View 
          style={[
            styles.motivationMessage,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.motivationIcon}>✨</Text>
          <Text style={styles.motivationText}>
            เยี่ยมมาก! คุณ{user.name} ใช้เวลาเรียนอย่างสม่ำเสมอ{'\n'}
            ความพยายามของคุณจะส่งผลดีในอนาคต
          </Text>
        </Animated.View>

        <View style={styles.bottomPadding} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8faff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 50,
  },
  
  // Header Styles
  header: {
    backgroundColor: '#667eea',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 40,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E8EAFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  
  // Today's Summary Styles
  todaySummary: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 25,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  summaryIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#333',
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  todayCard: {
    backgroundColor: '#E3F2FD',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  streakCard: {
    backgroundColor: '#FFF3E0',
    borderWidth: 2,
    borderColor: '#FF9800',
  },
  avgCard: {
    backgroundColor: '#E8F5E8',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  summaryIconContainer: {
    marginBottom: 10,
  },
  summaryCardIcon: {
    fontSize: 32,
  },
  summaryCardValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#333',
    marginBottom: 5,
  },
  summaryCardLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontWeight: '600',
  },
  
  // Weekly Progress Styles
  weeklyProgress: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    padding: 25,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  weeklyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  weeklyIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  weeklyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#333',
  },
  weeklyGoal: {
    marginBottom: 10,
  },
  goalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  goalText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  goalProgress: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '800',
  },
  goalBar: {
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  goalFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  
  // Weekly Chart Styles
  weeklyChart: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    padding: 25,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  chartIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#333',
  },
  chartContainer: {
    height: 200,
  },
  chartGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
    paddingTop: 20,
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
  },
  barContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '80%',
    position: 'relative',
  },
  bar: {
    width: '100%',
    borderRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    minHeight: 5,
  },
  barValue: {
    position: 'absolute',
    top: -25,
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  barLabel: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  
  // Subject Breakdown Styles
  subjectBreakdown: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    padding: 25,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  subjectIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  subjectTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#333',
  },
  subjectItem: {
    marginBottom: 20,
  },
  subjectInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  subjectColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 15,
  },
  subjectName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  subjectTime: {
    fontSize: 16,
    color: '#666',
    fontWeight: '700',
  },
  subjectProgressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  subjectProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  
  // Total Statistics Styles
  totalStats: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    padding: 25,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 3,
    borderColor: '#E91E63',
  },
  totalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  totalIcon: {
    fontSize: 28,
    marginRight: 10,
  },
  totalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#333',
  },
  totalGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  totalItem: {
    alignItems: 'center',
    flex: 1,
  },
  totalNumber: {
    fontSize: 20,
    fontWeight: '900',
    color: '#E91E63',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    fontWeight: '600',
  },
  
  // Motivational Message Styles
  motivationMessage: {
    backgroundColor: '#E8F5E8',
    margin: 20,
    marginTop: 0,
    padding: 25,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  motivationIcon: {
    fontSize: 32,
    marginBottom: 15,
  },
  motivationText: {
    fontSize: 16,
    color: '#2E7D32',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '600',
  },
  
  bottomPadding: {
    height: 30,
  },
});