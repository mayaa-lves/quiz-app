// components/QuizScreen.tsx

import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Vibration } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Accelerometer } from 'expo-sensors';
import { Audio } from 'expo-av';

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type QuizScreenProps = {
  currentQuestion: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedOption: string | null;
  isOptionsDisabled: boolean;
  onOptionPress: (option: string) => void;
  onNextQuestion: () => void;
};

const CARD_COLORS = ['#FF7043', '#FFB74D', '#4DB6AC', '#7986CB', '#BA68C8', '#FF8A65'];

const getCardBackgroundColor = (questionText: string) => {
  let hash = 0;
  for (let i = 0; i < questionText.length; i++) {
    hash = questionText.charCodeAt(i) + ((hash << 5) - hash);
  }
  return CARD_COLORS[Math.abs(hash) % CARD_COLORS.length];
};

export default function QuizScreen({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  selectedOption,
  isOptionsDisabled,
  onOptionPress,
  onNextQuestion,
}: QuizScreenProps) {

  const [timeLeft, setTimeLeft] = useState(15);
  const [isVibrating, setIsVibrating] = useState(false);
  
  const vibrationIntervalRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const soundRef = useRef<Audio.Sound | null>(null);

  // Parar áudios em execução
  const stopSound = async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      } catch (e) {
        // Ignora erros de limpeza
      }
      soundRef.current = null;
    }
  };

  // Tocador de Efeitos Sonoros com volume no máximo
  const playSound = async (isCorrect: boolean) => {
    await stopSound();
    try {
      // URL de alarme estridente/buzina estridente ao errar
      const soundUri = isCorrect
        ? 'https://actions.google.com/sounds/v1/cartoon/clown_horn.ogg'
        : 'https://actions.google.com/sounds/v1/emergency/air_horn.ogg'; 

      const { sound } = await Audio.Sound.createAsync(
        { uri: soundUri },
        { shouldPlay: true, volume: 1.0 } // Volume no Máximo (1.0)
      );

      soundRef.current = sound;
    } catch (e) {
      // Falha ao carregar o som
    }
  };

  const stopContinuousVibration = () => {
    if (vibrationIntervalRef.current) {
      clearInterval(vibrationIntervalRef.current);
      vibrationIntervalRef.current = null;
    }
    Vibration.cancel();
    stopSound(); // Para o som irritante assim que chacoalhar
    setIsVibrating(false);
  };

  const startContinuousVibration = () => {
    stopContinuousVibration();
    setIsVibrating(true);
    vibrationIntervalRef.current = setInterval(() => {
      Vibration.vibrate(300);
    }, 400);
  };

  // Temporizador por Pergunta (15 segundos)
  useEffect(() => {
    setTimeLeft(15);
    setIsVibrating(false);
    
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          if (!selectedOption) {
            handlePress(''); // Tempo esgotado
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQuestionIndex]);

  // Sensor do Acelerômetro
  useEffect(() => {
    let subscription: any;
    Accelerometer.setUpdateInterval(100);

    subscription = Accelerometer.addListener((data) => {
      const { x, y, z } = data;
      const acceleration = Math.sqrt(x * x + y * y + z * z);

      if (acceleration > 1.8) {
        stopContinuousVibration();
      }
    });

    return () => {
      subscription && subscription.remove();
      stopContinuousVibration();
    };
  }, []);

  const handlePress = (option: string) => {
    if (timerRef.current) clearInterval(timerRef.current);

    const isCorrect = option === currentQuestion.correctAnswer;

    if (isCorrect) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      playSound(true);
    } else {
      playSound(false); // Dispara a buzina estridente
      startContinuousVibration();
    }

    onOptionPress(option);
  };

  const handleNextWithCleanup = () => {
    stopContinuousVibration();
    onNextQuestion();
  };

  const getOptionStyle = (option: string) => {
    if (selectedOption !== null) {
      const isCorrect = option === currentQuestion.correctAnswer;
      if (isCorrect) return styles.correctOption;
      if (option === selectedOption && !isCorrect) return styles.incorrectOption;
    }
    return {};
  };

  const getOptionTextStyle = (option: string) => {
    if (selectedOption !== null && (option === currentQuestion.correctAnswer || option === selectedOption)) {
      return styles.selectedOptionText;
    }
    return {};
  };

  const dynamicCardColor = getCardBackgroundColor(currentQuestion.question);
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.logo}>QUIZ</Text>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>⏱️ {timeLeft}s</Text>
        </View>
      </View>

      {/* Barra de Progresso */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
      </View>
      <Text style={styles.progressCounter}>
        Pergunta {currentQuestionIndex + 1} de {totalQuestions}
      </Text>

      {/* Card da Pergunta */}
      <View style={[styles.questionContainer, { backgroundColor: dynamicCardColor }]}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      {/* Mensagem de Erro e Bloqueio */}
      {selectedOption !== null && selectedOption !== currentQuestion.correctAnswer && (
        <Text style={[styles.shakeHint, isVibrating && styles.shakeHintActive]}>
          {isVibrating 
            ? "🚨 CHACOALHE O CELULAR PARA PARAR O BARULHO!" 
            : "✅ Desbloqueado! Você já pode avançar."}
        </Text>
      )}

      {/* Opções */}
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.option, getOptionStyle(option)]}
            onPress={() => handlePress(option)}
            disabled={isOptionsDisabled}
            activeOpacity={0.8}
          >
            <Text style={[styles.optionText, getOptionTextStyle(option)]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botão de Avançar */}
      {selectedOption !== null && (
        <TouchableOpacity 
          style={[styles.nextButton, isVibrating && styles.disabledButton]} 
          onPress={handleNextWithCleanup}
          disabled={isVibrating}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>
            {isVibrating ? 'CHACOALHE PARA LIBERAR' : 'PRÓXIMA PERGUNTA'}
          </Text>
          <Text style={styles.arrow}>{isVibrating ? '🔒' : '→'}</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F3' },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 40,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: { fontSize: 25, fontWeight: '900', color: '#FF7043', letterSpacing: 3 },
  timerContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    elevation: 2,
  },
  timerText: { fontSize: 13, fontWeight: '800', color: '#FF7043' },
  progressTrack: {
    height: 8,
    backgroundColor: '#FFE3D5',
    borderRadius: 4,
    marginVertical: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF7043',
    borderRadius: 4,
  },
  progressCounter: {
    fontSize: 12,
    fontWeight: '700',
    color: '#777',
    marginBottom: 15,
  },
  questionContainer: { 
    minHeight: 160,
    borderRadius: 24, 
    padding: 22, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 10,
    elevation: 4,
  },
  questionText: { 
    fontSize: 20, 
    fontWeight: '900', 
    textAlign: 'center',
    color: '#FFFFFF', 
    lineHeight: 26,
  },
  shakeHint: {
    textAlign: 'center',
    color: '#4CAF50',
    fontWeight: '800',
    fontSize: 13,
    marginBottom: 8,
  },
  shakeHintActive: {
    color: '#D32F2F',
  },
  optionsContainer: { gap: 10, marginBottom: 15 },
  option: { 
    backgroundColor: '#FFFFFF', 
    paddingVertical: 15, 
    paddingHorizontal: 20, 
    borderRadius: 18, 
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    borderWidth: 1.5,
    borderColor: '#FFE3D5',
  },
  optionText: { fontSize: 15, fontWeight: '700', color: '#444', textAlign: 'center' },
  selectedOptionText: { color: '#FFFFFF', fontWeight: '900' },
  correctOption: { backgroundColor: '#66BB6A', borderColor: '#66BB6A' },
  incorrectOption: { backgroundColor: '#EF5350', borderColor: '#EF5350' },
  nextButton: { 
    height: 60,
    backgroundColor: '#FF7043',
    borderRadius: 20, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: '#BDBDBD',
    elevation: 0,
  },
  nextButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '900', letterSpacing: 1 },
  arrow: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', marginLeft: 10 },
});