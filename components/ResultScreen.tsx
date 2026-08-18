// components/ResultScreen.tsx

import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

type ResultScreenProps = {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
};

export default function ResultScreen({ score, totalQuestions, onPlayAgain }: ResultScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Ilustração Festiva */}
      <View style={styles.illustration}>
        <Text style={styles.trophy}>🏆</Text>
        <View style={styles.starBubble}>
          <Text style={styles.star}>⭐</Text>
        </View>
      </View>

      {/* Título de Fim de Jogo */}
      <Text style={styles.title}>Fim de Jogo!</Text>
      
      <Text style={styles.subtitle}>
        Você completou o desafio do quiz. Confira a sua pontuação abaixo:
      </Text>

      {/* Card com os Detalhes da Pontuação */}
      <View style={styles.scoreCard}>
        <Text style={styles.scoreNumber}>{score} / {totalQuestions}</Text>
        <Text style={styles.scoreText}>Perguntas Incorretas/Corretas</Text>
        
        <View style={styles.badgePercentage}>
          <Text style={styles.percentageText}>{percentage}% de Aproveitamento</Text>
        </View>
      </View>

      {/* Botão para Jogar Novamente */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={onPlayAgain}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>JOGAR NOVAMENTE</Text>
        <Text style={styles.arrow}>↻</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F3', // Fundo cremoso idêntico
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  illustration: {
    width: 160,
    height: 160,
    marginBottom: 20,
    borderRadius: 80,
    backgroundColor: '#FFE3D5',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  trophy: {
    fontSize: 75,
  },
  starBubble: {
    position: 'absolute',
    right: 0,
    top: 5,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF7043',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFF8F3',
  },
  star: {
    fontSize: 22,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#252525',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#777',
    textAlign: 'center',
    maxWidth: 300,
    marginBottom: 25,
  },
  scoreCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: '#FFE3D5',
  },
  scoreNumber: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FF7043',
    marginBottom: 4,
  },
  scoreText: {
    fontSize: 14,
    color: '#777',
    fontWeight: '600',
    marginBottom: 12,
  },
  badgePercentage: {
    backgroundColor: '#FFE3D5',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  percentageText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FF7043',
  },
  button: {
    width: '100%',
    height: 62,
    backgroundColor: '#FF7043',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF7043',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 1,
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 12,
  },
});