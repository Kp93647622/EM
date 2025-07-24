import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, KeyboardAvoidingView, Platform, Dimensions, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // สำหรับ Welcome Modal
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  const validStudentIds = [
    '10223', '10224', '10243', '10247', '10290', '10404', '10853', '11338', '11339', '10230',
    '10233', '10235', '10236', '10248', '10249', '10250', '10258', '10266', '10275', '10311',
    '10338', '10344', '10386', '10529', '11340', '11341', '11342', '11343', '10227', '10238',
    '10239', '10281', '10283', '10284', '10328', '10330', '10332', '10356', '10358', '10363',
    '10409', '10417', '11353', '10257', '10269', '10271', '10274', '10276', '10334', '10335',
    '10351', '10353', '10393', '10419', '10423', '10526', '10848', '11346', '11348', '11349',
    '11350', '11351', '11352', '11419', '10240', '10244', '11159', '11354', '11355', '11357',
    '09818', '10052', '10231', '10251', '10252', '10256', '10263', '10264', '10272', '10295',
    '10296', '10304', '10337', '10349', '10350', '10352', '10856', '11358', '11359', '11360',
    '11361', '11363', '11364', '11365', '11366', '11397', '10405', '10225', '10241', '10318',
    '10324', '10331', '10355', '10371', '10375', '10410', '10418', '11368', '11369', '11370',
    '11391', '10254', '10260', '10268', '10310', '10347', '10382', '10394', '10427', '11371',
    '11372', '11373', '11374', '11375', '11376', '11377', '11378', '11388', '11389', '11395',
    '11418', '11427', '11362', '10390', '10354', '10289', '10321', '10359', '10365', '10366',
    '10372', '10395', '10397', '10401', '10403', '11379', '11381', '11403', '11428', '10299',
    '10300', '10301', '10302', '10309', '10383', '10420', '10425', '10428', '10845', '11386',
    '11387', '11356'
  ];

  const getWelcomeMessage = (studentId) => {
    const messages = [
      `สวัสดีน้อง! ยินดีต้อนรับกลับมาสู่ระบบ`,
      `ดีใจที่ได้เจอกันอีกครั้ง น้องนักเรียน`,
      `พร้อมเรียนรู้สิ่งใหม่ ๆ วันนี้หรือยัง?`,
      `มาเริ่มต้นการเรียนรู้ไปด้วยกัน!`,
      `วันนี้จะเป็นวันที่ยอดเยี่ยม!`,
      `พร้อมที่จะบรรลุเป้าหมายการเรียน!`,
      `ขอให้วันนี้เป็นวันที่เต็มไปด้วยความสำเร็จ!`,
      `ยินดีต้อนรับสู่โลกแห่งการเรียนรู้!`
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleLogin = () => {
    if (!studentId.trim()) {
      alert('กรุณากรอกรหัสประจำตัวนักเรียน');
      return;
    }

    if (!password.trim()) {
      alert('กรุณากรอกรหัสผ่าน');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const isValidStudent = validStudentIds.includes(studentId.trim());
      if (isValidStudent && password === '1234') {
        setWelcomeMessage(getWelcomeMessage(studentId));
        setIsLoading(false);
        setShowWelcome(true);
      } else if (!isValidStudent) {
        setIsLoading(false);
        alert('กรุณาตรวจสอบรหัสประจำตัวนักเรียนให้ถูกต้อง');
      } else {
        setIsLoading(false);
        alert('รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
      }
    }, 900);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Welcome Modal */}
      <Modal
        visible={showWelcome}
        transparent
        animationType="fade"
        onRequestClose={() => setShowWelcome(false)}
      >
        <View style={styles.modalBackdrop}>
          <LinearGradient
            colors={['#6dd5ed', '#2193b0', '#114075']}
            style={styles.modalContainer}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalIcon}>🎉</Text>
            </View>
            <Text style={styles.modalTitle}>เข้าสู่ระบบสำเร็จ</Text>
            <Text style={styles.modalMessage}>{welcomeMessage}</Text>
            <Text style={styles.modalStudentId}>
              รหัสประจำตัว: <Text style={{ fontWeight: 'bold' }}>{studentId}</Text>
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowWelcome(false);
                navigation.navigate('Home');
              }}
            >
              <LinearGradient
                colors={['#21d4fd', '#2152ff']}
                style={styles.modalButtonGradient}
              >
                <Text style={styles.modalButtonText}>ไปหน้าแรก</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>

      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        {/* Decorative Elements */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
        <View style={styles.decorativeCircle3} />

        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoEmoji}>🎓</Text>
            </View>
            <Text style={styles.title}>เข้าสู่ระบบ </Text>
            <Text style={styles.title}>E-M5 Learning Platform</Text>
            <Text style={styles.subtitle}>โรงเรียนสันติวิทยาสรรพ์</Text>
            <Text style={styles.welcomeText}>ยินดีต้อนรับกลับมา!</Text>
          </View>

          {/* Login Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>รหัสประจำตัวนักเรียน</Text>
              <TextInput
                style={styles.input}
                placeholder="กรอกรหัสประจำตัวนักเรียน (เช่น 10223)"
                value={studentId}
                onChangeText={setStudentId}
                placeholderTextColor="#a0a0a0"
                keyboardType="numeric"
                maxLength={5}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>รหัสผ่าน</Text>
              <TextInput
                style={styles.input}
                placeholder="กรอกรหัสผ่าน"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#a0a0a0"
              />
            </View>

            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <LinearGradient
                colors={isLoading ? ['#ccc', '#999'] : ['#667eea', '#764ba2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                {
                  isLoading
                    ? <ActivityIndicator color="#fff" size="small" />
                    : <Text style={styles.loginButtonText}>เข้าสู่ระบบ</Text>
                }
              </LinearGradient>
            </TouchableOpacity>

            {/* Help Text */}
            <View style={styles.helpContainer}>
              <Text style={styles.helpText}>
                หากลืมรหัสผ่าน กรุณาติดต่อครูผู้ดูแลระบบ
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <Text style={styles.footerText}>พัฒนาโดย</Text>
            <Text style={styles.developerName}>นายกิติพงษ์ พรมบ้านเปลือย</Text>
            <Text style={styles.developerPosition}>ครูกลุ่มสาระการเรียนรู้ภาษาต่างประเทศ</Text>
            <Text style={styles.developerSchool}>โรงเรียนสันติวิทยาสรรพ์</Text>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradientBackground: { flex: 1, position: 'relative' },
  decorativeCircle1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  decorativeCircle2: {
    position: 'absolute',
    top: height * 0.3,
    left: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  decorativeCircle3: {
    position: 'absolute',
    bottom: 100,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoEmoji: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    opacity: 0.8,
    fontStyle: 'italic',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 28,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4a5568',
    marginBottom: 8,
  },
  input: {
    height: 56,
    borderColor: '#e2e8f0',
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#f8fafc',
    color: '#2d3748',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  loginButton: {
    borderRadius: 16,
    marginTop: 8,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  buttonGradient: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  helpContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderRadius: 12,
  },
  helpText: {
    fontSize: 13,
    color: '#667eea',
    textAlign: 'center',
    lineHeight: 18,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 16,
  },
  footerContent: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#ffffff',
    marginBottom: 4,
    opacity: 0.9,
  },
  developerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  developerPosition: {
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 2,
    opacity: 0.9,
  },
  developerSchool: {
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'center',
    opacity: 0.9,
  },

  // Modal style
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,32,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: width * 0.8,
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 18,
    alignItems: 'center',
    elevation: 12,
    shadowColor: '#0a244d',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
  },
  modalHeader: {
    marginBottom: 10,
  },
  modalIcon: {
    fontSize: 44,
  },
  modalTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
  },
  modalMessage: {
    fontSize: 17,
    color: '#e3f1ff',
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '600',
  },
  modalStudentId: {
    fontSize: 16,
    color: '#b4dcff',
    marginBottom: 2,
  },
  modalSchool: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 20,
    opacity: 0.85,
  },
  modalButton: {
    borderRadius: 18,
    overflow: 'hidden',
    marginTop: 12,
    width: '60%',
  },
  modalButtonGradient: {
    paddingVertical: 12,
    borderRadius: 18,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
  },
});
