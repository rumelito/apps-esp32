import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";


const HomeScreen = () => {
  const navigation = useNavigation();
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedTodo, setEditedTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosRef = collection(db, "todos");
        const querySnapshot = await getDocs(todosRef);
        const todos = [];
        querySnapshot.forEach((doc) => {
          todos.push({ ...doc.data(), id: doc.id });
        });
        setTodos(todos);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchTodos();
  }, []);

  const handleCreate = async () => {
    try {
      const newDocRef = await addDoc(collection(db, "todos"), {
        content: "",
      });
      setTodos([...todos, { id: newDocRef.id, content: "" }]);
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const todosRef = collection(db, "todos");
      const docRef = doc(todosRef, id);
      await updateDoc(docRef, {
        content: editedTodo,
      });
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, content: editedTodo } : todo
      );
      setTodos(updatedTodos);
      setEditingId(null);
      setEditedTodo("");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const todosRef = collection(db, "todos");
      await deleteDoc(doc(todosRef, id));
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.todoItemContainer}>
      {editingId === item.id ? (
        <TextInput
          style={styles.todoItemInput}
          placeholder="Add Todo"
          value={editedTodo}
          onChangeText={setEditedTodo}
        />
      ) : (
        <Text style={styles.todoItem}>{item.content}</Text>
      )}
      <View style={styles.todoItemButtonContainer}>
        {editingId === item.id ? (
          <TouchableOpacity
            style={styles.todoItemButton}
            onPress={() => handleUpdate(item.id)}
          >
            <Text style={styles.todoItemButtonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.todoItemButton}
            onPress={() => {
              setEditingId(item.id);
              setEditedTodo(item.content);
            }}
          >
            <Text style={styles.todoItemButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.todoItemButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.todoItemButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/images/")}
    >
      <View style={styles.listContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.todoListContainer}
        />
      </View>
      <View style={styles.navContainer}>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate("AboutScreen")}
        >
          <Text style={styles.buttonText}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  todoListContainer: {
    padding: 20,
  },
  todoItemContainer: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  todoItem: {
    fontSize: 18,
    color: "#000",
  },
  todoItemInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  todoItemButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  todoItemButton: {
    backgroundColor: "#33cccc",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  todoItemButtonText: {
    textAlign: "center",
  },
  button: {
    width: 300,
    backgroundColor: "#33cccc",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 60,
  },
  button2: {
    backgroundColor: "#33cccc",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    width: 100,
  },
  listContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "#2c786c",
  },
  buttonText: {
    textAlign: "center",
  },
});

export default HomeScreen;



