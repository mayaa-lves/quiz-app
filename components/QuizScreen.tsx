import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Importa nosso banco de dados de perguntas
import questions from '../questions.json';

export default function QuizScreen() {
  // pega a primeira pergunta do bd
  const currentQuestion = questions[0];

  return (
    <View style={styles.container}>

        {/* header */}
        <View style={styles.header}>
            <Text style={styles.title}> 👩‍🎓 Quiz App</Text>
            <Text style={styles.progress}>Pergunta 1 de {questions.length}</Text>
        </View>
        
        {/* card */}
        <View style={styles.questionCard}>
            <Text style={styles.questionText}>
                {currentQuestion.question}
            </Text>
        </View>

        {/* opções */}
        <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option) => (
                <TouchableOpacity style={styles.option} key={option}activeOpacity={0.8}>
                    <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
            ))} 
        </View>

    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EEF4FF",
        paddingHorizontal: 20,
        paddingTop: 15,
        
    },

    header: {
        marginBottom: 25,
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#355CFF",
    },

    progress: {
        marginTop: 8,
        color: "#777",
        fontSize: 16,
    },

    questionCard: {
        backgroundColor: "#FFF",
        borderRadius: 22,
        padding: 25,
        minHeight: 180,
        justifyContent: "center",
        marginBottom: 30,
        elevation: 6,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 12,
        shadowOffset: {width: 0,height: 6,}

    },

    questionText: {
        fontSize: 25,
        fontWeight: "700",
        textAlign: "center",
        color: "#333",
        lineHeight: 35,
    },

    optionsContainer: {
        flex: 1,
        justifyContent: "space-evenly",
    },

    option: {
        backgroundColor: "#FFF",
        borderRadius: 18,
        padding: 18,
        marginBottom: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: .08,
        shadowRadius: 8,
        shadowOffset: {width: 0,height: 3,}
    },

    optionText: {
        fontSize: 18,
        color: "#333",
        fontWeight: "600",
    }

});