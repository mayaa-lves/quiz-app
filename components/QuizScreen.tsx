// components/QuizScreen.tsx

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

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

// Aplicamos a tipagem aqui na assinatura da função
export default function QuizScreen({
  currentQuestion,
  selectedOption,
  isOptionsDisabled,
  onOptionPress,
  onNextQuestion,
}: QuizScreenProps) {

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

  return (
    <View style={styles.container}>
       {/* A View do placar foi removida daqui, pois a lógica de placar agora está no componente pai */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.option, getOptionStyle(option)]}
            onPress={() => onOptionPress(option)}
            disabled={isOptionsDisabled}
          >
            <Text style={styles.optionText}>{option}</Text>
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
    backgroundColor: '#F7F9FC', // Fundo bem limpo, levemente azulado
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  questionContainer: { 
    flex: 0.8, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 20, 
    padding: 24, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 20,
    // Sombras bem suaves e elegantes como na imagem
    elevation: 3,
    shadowColor: '#95A5A6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  questionText: { 
    fontSize: 20, 
    fontWeight: '700', 
    textAlign: 'center',
    color: '#2C3E50',
    lineHeight: 28,
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
    alignItems: 'flex-start', // Alinhamento à esquerda igual à interface de referência
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
    color: '#4A5568', 
  },
  correctOption: { 
    backgroundColor: '#2ECC71', // Verde sólido e chamativo
    borderColor: '#2ECC71',
  },
  incorrectOption: { 
    backgroundColor: '#FF5252', // Vermelho/coral sólido
    borderColor: '#FF5252',
  },
  nextButton: { 
    backgroundColor: '#FF6B4A', // Laranja vibrante característico do design
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