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
  StatusBar,
  Platform,
  Pressable
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ route }) {
  const progress = 0.65; // ตัวอย่าง progress
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [scaleAnim] = useState(new Animated.Value(0.9));
  const [progressAnim] = useState(new Animated.Value(0));
  const [cardAnimations] = useState([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0), // เพิ่มสำหรับเมนูเกม
  ]);
  
  // รับข้อมูลผู้ใช้จาก route parameters หรือ global state
  const user = route?.params?.user || { name: 'นักเรียน', id: 'M5001' };
  // const password = route?.params?.password;

  // Animation sequence
  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.stagger(150, cardAnimations.map(anim => 
        Animated.spring(anim, {
          toValue: 1,
          tension: 120,
          friction: 8,
          useNativeDriver: true,
        })
      )),
      Animated.timing(progressAnim, {
        toValue: progress,
        duration: 2000,
        useNativeDriver: false,
      })
    ]).start();
  }, []);

  // Greeting by time
  const getGreetingByTime = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return 'สวัสดีตอนเช้า';
    if (currentHour < 18) return 'สวัสดีตอนบ่าย';
    return 'สวัสดีตอนเย็น';
  };

  const getTimeIcon = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return '🌅';
    if (currentHour < 18) return '☀️';
    return '🌙';
  };

  // Card press with animation
  const handleCardPress = (screen, index) => {
    Animated.sequence([
      Animated.timing(cardAnimations[index], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(cardAnimations[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();
    setTimeout(() => {
      navigation.navigate(screen, { user });
    }, 200);
  };

  // Feature Cards Data (เมนูหลัก)
  const featureCards = [
    {
      id: 'lesson',
      title: 'บทเรียน',
      subtitle: 'เนื้อหาที่น่าสนใจ',
      icon: '📚',
      badge: '8 บท',
      action: 'เริ่มเรียน',
      screen: 'Lesson',
      colors: ['#667eea', '#764ba2'],
      accentColor: '#667eea',
    },
    {
      id: 'test',
      title: 'แบบทดสอบ',
      subtitle: 'วัดผลการเรียนรู้',
      icon: '✅',
      badge: '20 นาที',
      action: 'ทำแบบทดสอบ',
      screen: 'Testscreen',
      colors: ['#11998e', '#38ef7d'],
      accentColor: '#11998e',
    },
    {
      id: 'achievement',
      title: 'ความสำเร็จ',
      subtitle: 'รางวัลและใบประกาศ',
      icon: '🏆',
      badge: '5 รางวัล',
      action: 'ดูรางวัล',
      screen: 'Reportscreen',
      colors: ['#ee0979', '#ff6a00'],
      accentColor: '#ee0979',
    },
    {
      id: 'study',
      title: 'เวลาการเรียน',
      subtitle: 'ติดตามเวลาเรียน',
      icon: '⏱️',
      badge: '24 ชม.',
      action: 'ดูสถิติ',
      screen: 'TimesScreen',
      colors: ['#f093fb', '#f5576c'],
      accentColor: '#f093fb',
    },
    {
      id: 'game',
      title: 'เกมภาษาอังกฤษ',
      subtitle: 'เล่นเกมศัพท์และประโยค',
      icon: '🎮',
      badge: '5 เกม',
      action: 'เข้าเล่นเกม',
      screen: 'GameMenu', // ต้องมีใน navigator ของคุณ!
      colors: ['#fdc830', '#f37335'],
      accentColor: '#fdc830',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LinearGradient colors={['#667eea', '#764ba2', '#f093fb']} style={styles.backgroundGradient} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <Animated.View style={[
          styles.header,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}>
          <View style={styles.headerContent}>
            <Animated.View style={[
              styles.greetingContainer,
              { transform: [{ scale: scaleAnim }] }
            ]}>
              <Text style={styles.timeIcon}>{getTimeIcon()}</Text>
              <Text style={styles.greeting}>{getGreetingByTime()}</Text>
              <Text style={styles.waveEmoji}>👋</Text>
            </Animated.View>
            <Text style={styles.personalMessage}>พร้อมที่จะเรียนรู้สิ่งใหม่ๆ ในวันนี้แล้วหรือยัง</Text>
            <BlurView intensity={20} style={styles.schoolInfoCard}>
              <View style={styles.schoolInfo}>
                <Text style={styles.appTitle}>🎓 E-M5 Learning Platform</Text>
                <View style={styles.divider} />
                <Text style={styles.teacherName}>พัฒนาโดย ครูกิติพงษ์ พรมบ้านเปลือย</Text>
                <Text style={styles.welcomeText}>กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ</Text>
                <Text style={styles.welcomeText}>โรงเรียนสันติวิทยาสรรพ์</Text>
              </View>
            </BlurView>
          </View>
          <Animated.View style={[
            styles.progressContainer,
            { transform: [{ scale: scaleAnim }] }
          ]}>
            <BlurView intensity={30} style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>ความคืบหน้าการเรียนรู้ของคุณ ✨</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                  <Animated.View 
                    style={[
                      styles.progressFill,
                      {
                        width: progressAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', '100%'],
                          extrapolate: 'clamp'
                        })
                      }
                    ]} 
                  />
                  <View style={styles.progressDot} />
                </View>
                <Text style={styles.progressText}>{Math.round(progress * 100)}% เสร็จสิ้น</Text>
              </View>
            </BlurView>
          </Animated.View>
        </Animated.View>

        {/* Features Grid */}
        <Animated.View style={[
          styles.featuresGrid,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}>
          {featureCards.map((card, index) => (
            <Animated.View
              key={card.id}
              style={[
                styles.cardWrapper,
                {
                  transform: [
                    { scale: cardAnimations[index] },
                    { 
                      translateY: cardAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                        extrapolate: 'clamp'
                      })
                    }
                  ],
                  opacity: cardAnimations[index]
                }
              ]}
            >
              <Pressable
                style={({ pressed }) => [
                  styles.featureCard,
                  { transform: [{ scale: pressed ? 0.98 : 1 }] }
                ]}
                onPress={() => handleCardPress(card.screen, index)}
              >
                <LinearGradient
                  colors={card.colors}
                  style={styles.cardGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.cardHeader}>
                    <View style={styles.featureIcon}>
                      <Text style={styles.featureIconText}>{card.icon}</Text>
                    </View>
                    <View style={[styles.featureBadge, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                      <Text style={styles.featureBadgeText}>{card.badge}</Text>
                    </View>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.featureTitle}>{card.title}</Text>
                    <Text style={styles.featureSubtitle}>{card.subtitle}</Text>
                  </View>
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardAction}>{card.action} →</Text>
                  </View>
                </LinearGradient>
              </Pressable>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Stats Section */}
        <Animated.View style={[
          styles.statsContainer,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}>
          <BlurView intensity={40} style={styles.statsCard}>
            <View style={styles.statsHeader}>
              <Text style={styles.statsIcon}>📊</Text>
              <Text style={styles.statsTitle}>สถิติการเรียนรู้</Text>
            </View>
            <View style={styles.statsGrid}>
              {[
                { value: '8', label: 'บทที่เรียนแล้ว', color: '#667eea' },
                { value: '85%', label: 'คะแนนเฉลี่ย', color: '#11998e' },
                { value: '24', label: 'ชั่วโมงการเรียน', color: '#ee0979' }
              ].map((stat, index) => (
                <View key={index} style={styles.statItem}>
                  <LinearGradient colors={[stat.color, `${stat.color}88`]} style={styles.statCircle}>
                    <Text style={styles.statNumber}>{stat.value}</Text>
                  </LinearGradient>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </BlurView>
        </Animated.View>

        {/* Quote Section */}
        <Animated.View style={[
          styles.quoteContainer,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}>
          <BlurView intensity={40} style={styles.quoteCard}>
            <View style={styles.quoteHeader}>
              <Text style={styles.quoteIcon}>💡</Text>
              <Text style={styles.quoteTitle}>คำคมวันนี้</Text>
            </View>
            <Text style={styles.quoteText}>
              "การเรียนรู้คือการลงทุนที่ดีที่สุด{'\n'}ในอนาคตของคุณ"
            </Text>
            <Text style={styles.quoteAuthor}>- E-M5 Learning Platform</Text>
          </BlurView>
        </Animated.View>

        {/* Success Message */}
        <Animated.View style={[
          styles.successMessage,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}>
          <LinearGradient colors={['#11998e', '#38ef7d']} style={styles.successGradient}>
            <Text style={styles.successIcon}>🎉</Text>
            <Text style={styles.successText}>
              คุณกำลังทำได้ดีมาก!{'\n'}
              ติดตามการเรียนรู้ของคุณต่อไป
            </Text>
          </LinearGradient>
        </Animated.View>

        {/* Extra padding for better scrolling */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  backgroundGradient: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 50 },
  header: { paddingTop: Platform.OS === 'ios' ? 60 : 40, paddingBottom: 40, paddingHorizontal: 24 },
  headerContent: { alignItems: 'center', marginBottom: 30 },
  greetingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  timeIcon: { fontSize: 32, marginRight: 12 },
  greeting: { fontSize: 36, fontWeight: '900', color: '#FFFFFF', textAlign: 'center', textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 8 },
  waveEmoji: { fontSize: 32, marginLeft: 12 },
  personalMessage: { fontSize: 18, color: '#FFFFFF', textAlign: 'center', marginBottom: 30, fontWeight: '600', opacity: 0.9 },
  schoolInfoCard: { borderRadius: 24, overflow: 'hidden', width: '100%', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  schoolInfo: { alignItems: 'center', padding: 24 },
  appTitle: { fontSize: 20, color: '#FFFFFF', textAlign: 'center', marginBottom: 16, fontWeight: '800' },
  divider: { width: 60, height: 3, backgroundColor: 'rgba(255, 255, 255, 0.6)', marginBottom: 16, borderRadius: 2 },
  teacherName: { fontSize: 16, color: '#FFFFFF', textAlign: 'center', marginBottom: 8, fontWeight: '600' },
  welcomeText: { fontSize: 14, color: '#FFFFFF', textAlign: 'center', opacity: 0.8, marginBottom: 4 },
  progressContainer: { marginTop: 20 },
  progressCard: { borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  progressHeader: { alignItems: 'center', marginBottom: 20, marginTop: 24 },
  progressLabel: { fontSize: 18, color: '#FFFFFF', fontWeight: '700' },
  progressBarContainer: { alignItems: 'center', paddingHorizontal: 24, paddingBottom: 24 },
  progressBar: { height: 12, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 8, overflow: 'hidden', marginBottom: 16, width: '100%', position: 'relative' },
  progressFill: { height: '100%', backgroundColor: '#38ef7d', borderRadius: 8, shadowColor: '#38ef7d', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 8 },
  progressDot: { position: 'absolute', right: 4, top: 2, width: 8, height: 8, backgroundColor: '#FFFFFF', borderRadius: 4 },
  progressText: { fontSize: 16, color: '#FFFFFF', fontWeight: '800' },
  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 20, marginBottom: 20 },
  cardWrapper: { width: (width - 64) / 2, marginBottom: 20 },
  featureCard: { borderRadius: 24, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.3, shadowRadius: 24, elevation: 12 },
  cardGradient: { padding: 20, minHeight: 160 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  cardContent: { flex: 1, marginBottom: 16 },
  cardFooter: { alignItems: 'flex-start' },
  featureIcon: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  featureIconText: { fontSize: 24 },
  featureTitle: { fontSize: 18, fontWeight: '800', color: '#FFFFFF', marginBottom: 6 },
  featureSubtitle: { fontSize: 14, color: '#FFFFFF', opacity: 0.9, lineHeight: 20 },
  featureBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  featureBadgeText: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  cardAction: { fontSize: 14, color: '#FFFFFF', fontWeight: '700', opacity: 0.9 },
  statsContainer: { marginHorizontal: 24, marginBottom: 20 },
  statsCard: { borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  statsHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 24, marginTop: 24 },
  statsIcon: { fontSize: 28, marginRight: 12 },
  statsTitle: { fontSize: 20, fontWeight: '800', color: '#FFFFFF' },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 24 },
  statItem: { alignItems: 'center' },
  statCircle: { width: 70, height: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center', marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 },
  statNumber: { fontSize: 16, fontWeight: '900', color: '#FFFFFF' },
  statLabel: { fontSize: 12, color: '#FFFFFF', textAlign: 'center', fontWeight: '600', opacity: 0.8 },
  quoteContainer: { marginHorizontal: 24, marginBottom: 20 },
  quoteCard: { borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  quoteHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 24, paddingHorizontal: 24 },
  quoteIcon: { fontSize: 32, marginRight: 12 },
  quoteTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  quoteText: { fontSize: 16, color: '#FFFFFF', textAlign: 'center', lineHeight: 28, fontStyle: 'italic', marginBottom: 16, fontWeight: '500', paddingHorizontal: 24 },
  quoteAuthor: { fontSize: 14, color: '#FFFFFF', fontWeight: '600', textAlign: 'center', opacity: 0.8, paddingBottom: 24 },
  successMessage: { marginHorizontal: 24, marginBottom: 20, borderRadius: 24, overflow: 'hidden', shadowColor: '#11998e', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.3, shadowRadius: 24, elevation: 12 },
  successGradient: { padding: 24, alignItems: 'center' },
  successIcon: { fontSize: 36, marginBottom: 16 },
  successText: { fontSize: 16, color: '#FFFFFF', textAlign: 'center', lineHeight: 26, fontWeight: '600' },
  bottomPadding: { height: 40 },
});
