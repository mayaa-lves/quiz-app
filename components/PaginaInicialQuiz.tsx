import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

// Tipamos a prop para receber a função de início enviada pela HomePage (index.tsx)
type PaginaInicialProps = {
  onStartQuiz: () => void;
};

export default function PaginaInicial({ onStartQuiz }: PaginaInicialProps) {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >

      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.logo}>QUIZ</Text>

        <View style={styles.menuButton}>
          <Text style={styles.menuText}>☰</Text>
        </View>
      </View>


      {/* Conteúdo principal */}
      <View style={styles.content}>

        {/* Ilustração */}
        <View style={styles.illustration}>
          <Text style={styles.brain}>🧠</Text>

          <View style={styles.questionBubble}>
            <Text style={styles.questionMark}>?</Text>
          </View>
        </View>


        {/* Título */}
        <Text style={styles.title}>
          Teste seus conhecimentos!
        </Text>

        {/* Descrição */}
        <Text style={styles.subtitle}>
          Responda perguntas, desafie sua mente
          e descubra o quanto você sabe.
        </Text>


        {/* Informações do quiz */}
        <View style={styles.infoContainer}>

          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>❓</Text>
            <Text style={styles.infoNumber}>30</Text>
            <Text style={styles.infoText}>Perguntas</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>⭐</Text>

            <Text style={styles.infoNumber}>100</Text>
            <Text style={styles.infoText}>Pontos</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>🏆</Text>
            <Text style={styles.infoNumber}>1</Text>
            <Text style={styles.infoText}>Desafio</Text>
          </View>

        </View>


        {/* Botão iniciar */}
        <TouchableOpacity
          style={styles.startButton}
          activeOpacity={0.8}
          onPress={onStartQuiz}
        >
          <Text style={styles.startText}>
            INICIAR QUIZ
          </Text>

          <Text style={styles.arrow}>
            →
          </Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFF8F3',
  },

  scrollContent: {
    paddingBottom: 40,
    flexGrow: 1,
  },

  header: {
    height: 80,
    paddingHorizontal: 25,
    marginTop: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    fontSize: 25,
    fontWeight: '900',
    color: '#FF7043',
    letterSpacing: 3,
  },

  menuButton: {
    width: 45,
    height: 45,

    borderRadius: 15,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  menuText: {
    fontSize: 22,
    color: '#444',
  },

  content: {
    flex: 1,

    alignItems: 'center',

    paddingHorizontal: 25,
  },

  illustration: {
    width: 180,
    height: 180,

    marginTop: 10,
    marginBottom: 25,

    borderRadius: 90,

    backgroundColor: '#FFE3D5',

    alignItems: 'center',
    justifyContent: 'center',

    position: 'relative',
  },

  brain: {
    fontSize: 85,
  },

  questionBubble: {
    position: 'absolute',

    right: 0,
    top: 5,

    width: 55,
    height: 55,

    borderRadius: 28,

    backgroundColor: '#FF7043',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 5,
    borderColor: '#FFF8F3',
  },

  questionMark: {
    color: '#FFFFFF',

    fontSize: 30,
    fontWeight: '900',
  },

  title: {
    fontSize: 28,

    fontWeight: '900',

    color: '#252525',

    textAlign: 'center',

    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,

    lineHeight: 22,

    color: '#777',

    textAlign: 'center',

    maxWidth: 330,

    marginBottom: 25,
  },

  infoContainer: {
    width: '100%',

    flexDirection: 'row',

    justifyContent: 'space-between',

    marginBottom: 25,
  },

  infoBox: {
    width: '31%',

    backgroundColor: '#FFFFFF',

    borderRadius: 18,

    paddingVertical: 12,

    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  infoIcon: {
    fontSize: 18,

    marginBottom: 3,
  },

  infoNumber: {
    fontSize: 19,

    fontWeight: '900',

    color: '#FF7043',
  },

  infoText: {
    fontSize: 11,

    color: '#777',

    fontWeight: '600',
  },

  startButton: {
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

  startText: {
    color: '#FFFFFF',

    fontSize: 17,

    fontWeight: '900',

    letterSpacing: 1,
  },

  arrow: {
    color: '#FFFFFF',

    fontSize: 25,

    fontWeight: 'bold',

    marginLeft: 15,
  },

});