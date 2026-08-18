// components/QuizScreen.tsx

import { StyleSheet, Text, View, TouchableOpacity, Vibration } from 'react-native';

// Definimos o formato de um objeto de pergunta para reutilizar o tipo
type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

// Definimos o formato exato das props que o componente espera
type QuizScreenProps = {
  currentQuestion: Question;
  selectedOption: string | null;
  isOptionsDisabled: boolean;
  onOptionPress: (option: string) => void;
  onNextQuestion: () => void;
};

// Paleta de cores alegres e vivas para trocar o fundo do card da pergunta
const CARD_COLORS = [
  '#FF7675', // Vermelho Coral
  '#74B9FF', // Azul Claro
  '#55E6C1', // Verde Menta
  '#F0DF4A', // Amarelo Lindo
  '#A29BFE', // Roxo Suave
  '#FF9FF3', // Rosa Choque
  '#FECA57', // Laranja Claro
];

// Função simples para escolher uma cor baseada na pergunta
const getCardBackgroundColor = (questionText: string) => {
  let hash = 0;
  for (let i = 0; i < questionText.length; i++) {
    hash = questionText.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % CARD_COLORS.length;
  return CARD_COLORS[index];
};

export default function QuizScreen({
  currentQuestion,
  selectedOption,
  isOptionsDisabled,
  onOptionPress,
  onNextQuestion,
}: QuizScreenProps) {

  // Função para lidar com o clique na opção e acionar a vibração se errar
  const handlePress = (option: string) => {
    // Se a opção selecionada for incorreta, faz o celular vibrar por 400 milissegundos
    if (option !== currentQuestion.correctAnswer) {
      Vibration.vibrate(400); 
    }
    onOptionPress(option);
  };

  const getOptionStyle = (option: string) => {
    if (selectedOption) {
      const isCorrect = option === currentQuestion.correctAnswer;
      if (isCorrect) {
        return styles.correctOption;
      }
      if (option === selectedOption && !isCorrect) {
        return styles.incorrectOption;
      }
    }
    return {};
  };

  const getOptionTextStyle = (option: string) => {
    if (selectedOption) {
      if (option === currentQuestion.correctAnswer || option === selectedOption) {
        return styles.selectedOptionText;
      }
    }
    return {};
  };

  // Cor dinâmica para o card da pergunta atual
  const dynamicCardColor = getCardBackgroundColor(currentQuestion.question);

  return (
    <View style={styles.container}>
      <View style={[styles.questionContainer, { backgroundColor: dynamicCardColor }]}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.option, getOptionStyle(option)]}
            onPress={() => handlePress(option)}
            disabled={isOptionsDisabled}
          >
            <Text style={[styles.optionText, getOptionTextStyle(option)]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedOption && (
        <TouchableOpacity style={styles.nextButton} onPress={onNextQuestion}>
          <Text style={styles.nextButtonText}>Próxima Pergunta</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F7F9FC', 
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  questionContainer: { 
    flex: 0.8, 
    borderRadius: 24, 
    padding: 24, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 20,

    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  questionText: { 
    fontSize: 22, 
    fontWeight: '800', 
    textAlign: 'center',
    color: '#FFFFFF', 
  
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  optionsContainer: { 
    flex: 1, 
    justifyContent: 'center',
    gap: 12,
  },
  option: { 
    backgroundColor: '#FFFFFF', 
    paddingVertical: 18, 
    paddingHorizontal: 20, 
    borderRadius: 16, 
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    borderWidth: 1.5,
    borderColor: '#EFEFEF',
  },
  optionText: { 
    fontSize: 16, 
    fontWeight: '600',
    color: '#2C3E50', 
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#FFFFFF', 
  },
  correctOption: { 
    backgroundColor: '#2ECC71', 
    borderColor: '#2ECC71',
  },
  incorrectOption: { 
    backgroundColor: '#FF5252',
    borderColor: '#FF5252',
  },
  nextButton: { 
    backgroundColor: '#FF6B4A',
    paddingVertical: 18, 
    borderRadius: 16, 
    marginTop: 16, 
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#FF6B4A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  nextButtonText: { 
    color: '#FFFFFF', 
    fontSize: 18, 
    fontWeight: '700',
  },
});