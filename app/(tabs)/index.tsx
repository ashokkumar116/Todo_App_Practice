import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {useState} from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';


interface todos {
    id: number,
    title: string,
    isComplete: boolean,
}

export default function Index() {

    const [todos, setTodos] = useState<todos[]>([
        {
            id: 1,
            title: "Todo 1",
            isComplete: false,
        },
        {
            id: 2,
            title: "Todo 2",
            isComplete: false,
        },
        {
            id: 3,
            title: "Todo 3",
            isComplete: false,
        },
        {
            id: 4,
            title: "Todo 4",
            isComplete: false,
        }

    ]);

    return (
        <SafeAreaView style={styles.wholeContainer}>
            <KeyboardAvoidingView
                keyboardVerticalOffset={20}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

                style={styles.outerContainer}>
                <View style={styles.topContainer}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Todo App</Text>
                    </View>
                    <View>
                        <FlatList
                            keyboardShouldPersistTaps={"handled"}
                            contentContainerStyle={styles.listContainer}
                            data={todos}
                            renderItem={({item}: any) => <View>
                                <Text>{item.title}</Text>
                            </View>}
                            keyExtractor={(item: any) => item.id.toString()}
                            ItemSeparatorComponent={() => <View style={styles.seperator}></View>}
                        />
                    </View>
                </View>
                <KeyboardAvoidingView
                    style={styles.inputcont}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={80} // adjust based on header height

                >
                    <TextInput
                        style={styles.inputContainer}

                    >

                    </TextInput>
                    <TouchableOpacity onPress={() => alert("Clicked")}>
                        <FontAwesome name="plus" size={24} color="black"/>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
    headerText: {
        fontSize: 20,
        color: 'black',
        fontWeight: '900',

    },
    listContainer: {
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',
    },
    seperator: {
        height: 20,
        width: 20,

    },
    inputContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderWidth: 1,
        borderColor: '#000',

    },
    inputcont: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        gap: 20,
    },
    outerContainer: {
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "column",
    },
    wholeContainer: {
        flex: 1,
        padding:20
    },
    topContainer: {
        gap: 30
    }
})
