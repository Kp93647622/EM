import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const GAMES = [
  { name: 'Quiz Game', icon: '📝', desc: 'ตอบคำถามภาษาอังกฤษ', screen: 'Quizgame' },
  { name: 'Memory Matching', icon: '🃏', desc: 'จับคู่ภาพคำศัพท์', screen: 'memorymatching' },
  { name: 'Word Scramble', icon: '🔀', desc: 'เรียงตัวอักษรทายคำ', screen: 'Wordscramble' },
  { name: 'Tapping Game', icon: '👆', desc: 'แตะเร็วเก็บคะแนน', screen: 'tappinggame' },
  { name: 'Drag and Drop', icon: '🖲️', desc: 'ลาก-วางคำศัพท์', screen: 'draganddrop' },
];

export default function GameMenu({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>English Learning Games</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        {GAMES.map((g, i) => (
          <TouchableOpacity
            key={g.name}
            style={styles.gameBtn}
            onPress={() => navigation.navigate(g.screen)}
          >
            <Text style={styles.icon}>{g.icon}</Text>
            <View>
              <Text style={styles.gameName}>{g.name}</Text>
              <Text style={styles.desc}>{g.desc}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eef4ff', paddingTop: 18 },
  header: { fontSize: 27, fontWeight: 'bold', color: '#2563eb', margin: 16, textAlign: 'center' },
  scroll: { padding: 14 },
  gameBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16,
    marginVertical: 10, padding: 22, shadowColor: '#60a5fa', shadowOpacity: 0.09, shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10, elevation: 3,
  },
  icon: { fontSize: 40, marginRight: 18 },
  gameName: { fontSize: 19, fontWeight: 'bold', color: '#2563eb' },
  desc: { color: '#555', fontSize: 14, marginTop: 2 },
});
