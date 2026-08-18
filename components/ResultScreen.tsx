import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Usando TypeScript para definir os "tipos" de props que esperamos receber
type ResultScreenProps = {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void; // Esperamos receber uma função para o botão
};

export default function ResultScreen({ score, totalQuestions, onPlayAgain }: ResultScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fim de Jogo!</Text>
      <Text style={styles.scoreText}>
        Você acertou {score} de {totalQuestions} perguntas!
      </Text>

      <TouchableOpacity style={styles.button} onPress={onPlayAgain}>
        <Text style={styles.buttonText}>Jogar Novamente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 12,
    color: '#2C3E50',
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 36,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF6B4A', // Laranja vibrante padronizado
    paddingVertical: 18,
    paddingHorizontal: 40,
    width: '100%', // Botão ocupando a largura do container
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#FF6B4A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});