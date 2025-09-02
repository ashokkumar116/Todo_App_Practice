import {
    Alert,
    FlatList,
    KeyboardAvoidingView,
    Platform, RefreshControl,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {useCallback, useEffect, useState} from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Animated, {LinearTransition} from "react-native-reanimated";
import {useRouter} from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from "@react-native-async-storage/async-storage";


interface todos {
    id: number,
    title: string,
    isComplete: boolean,
}

export default function Index() {

    const router = useRouter();

    const [refreshing, setRefreshing] = useState<boolean>(false);

    useEffect(()=> {
            const loadTodos = async ()=>{
                try {
                    const storedTodos = await AsyncStorage.getItem("todos");
                    if(storedTodos){
                        setTodos(JSON.parse(storedTodos))
                    }
                }catch (error){
                    console.log(error)
                }
            }
            loadTodos();
        
    },[])

    const [todos, setTodos] = useState<todos[]>([
        {
            id: 1,
            title: "Todo 1",
            isComplete: false,
        },

    ]);
    const [todoText, setTodoText] = useState<string>("");

    const addTodo = (): void => {
        const newTodos = [...todos, {
            id: Date.now(),
            title: todoText,
            isComplete: false,
        }]
        setTodos(newTodos);
        AsyncStorage.setItem("todos", JSON.stringify(newTodos));
        setTodoText("");
    }

    const updateTodoStatus = (id: number) => {
        setTodos((prev) => prev.map((todo) => todo.id === id ? {...todo, isComplete: !todo.isComplete} : todo))
        AsyncStorage.setItem("todos", JSON.stringify(todos))
    }

    const deleteTodo = (id: number) => {
        Alert.alert("Are you sure you want to delete it?", "This action cannot be undone.", [
                {
                    text: 'Cancel',
                    onPress: () => {
                    },
                    style: 'destructive'
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        const newTodos = todos.filter((todo) => todo.id !== id)
                        setTodos(newTodos);
                        AsyncStorage.setItem("todos", JSON.stringify(newTodos));
                    },
                }
            ],
            {
                cancelable: true,
            }
        );

    }

    const onRefresh = useCallback(() => {
        const refreshTodos = async () => {
            try {
                setRefreshing(true);
                const storedTodos = await AsyncStorage.getItem("todos");
                if(storedTodos){
                    setTodos(JSON.parse(storedTodos))
                }
            }catch (error) {
                console.log(error);
            }finally {
                setRefreshing(false);
            }
        }
        refreshTodos();
    }, []);


    return (
        <SafeAreaView style={styles.wholeContainer}>
            <KeyboardAvoidingView
                keyboardVerticalOffset={20}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

                style={styles.outerContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Todo App</Text>
                </View>
                <Animated.FlatList
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    itemLayoutAnimation={LinearTransition}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps={"handled"}
                    contentContainerStyle={styles.listContainer}
                    data={[...todos].reverse()}
                    renderItem={({item}: any) => <TouchableOpacity
                        onPress={() => router.push({
                            pathname: "/todo/[id]",
                            params: {id: item.id.toString(), title: item.title}
                        })}
                        onLongPress={() => updateTodoStatus(item.id)}
                        style={styles.todo}>
                        <Text
                            style={{
                                textDecorationLine: item.isComplete ? "line-through" : "none",
                                color: item.isComplete ? "gray" : "Black",
                                width: '80%',
                            }}

                        >{item.title}</Text>
                        <TouchableOpacity
                            onPress={() => deleteTodo(item.id)}
                        >
                            <Feather name="trash-2" size={24} color="red"/>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    }
                    keyExtractor={(item: any) => item.id.toString()}
                    ItemSeparatorComponent={() => <View style={styles.seperator}></View>
                    }
                    showsVerticalScrollIndicator={false}
                />
                <KeyboardAvoidingView
                    style={styles.inputcont}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={80}

                >
                    <TextInput
                        style={styles.inputContainer}
                        value={todoText}
                        onChangeText={(text: string) => setTodoText(text)}
                        placeholder="Enter todo..."
                    />
                    <TouchableOpacity onPress={() => addTodo()}>
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
        fontSize: 40,
        color: 'black',
        fontWeight: '900',

    },
    listContainer: {
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
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
        padding: 20
    },
    todo: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        width: '100%',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
        alignItems: 'flex-start',

    }
})
