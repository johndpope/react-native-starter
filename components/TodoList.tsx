import React, { useEffect, useState } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { Text } from "react-native-elements";
import { supabase } from "../lib/initSupabase";
import { useUser } from "../components/UserContext";

import { Button, Input, ListItem, CheckBox } from "react-native-elements";
import "react-native-url-polyfill/auto";
import tailwind from "tailwind-rn";

type Todo = {
  id: number;
  user_id: string;
  task: string;
  is_complete: boolean;
  inserted_at: Date;
};

export default function TodoList() {
  const { user } = useUser();
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [newTaskText, setNewTaskText] = useState<string>("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data: todos, error } = await supabase
      .from<Todo>("todos")
      .select("*")
      .order("id", { ascending: false });
    if (error) console.log("error", error);
    else setTodos(todos!);
  };

  const addTodo = async (taskText: string) => {
    const task = taskText.trim();
    if (task.length) {
      const { data: todo, error } = await supabase
        .from<Todo>("todos")
        .insert({ task, user_id: user!.id })
        .single();
      if (error) console.log(error.message);
      else {
        setTodos([todo!, ...todos]);
        setNewTaskText("");
      }
    }
  };

  const toggleCompleted = async (id: number, is_complete: boolean) => {
    const { data, error } = await supabase
      .from<Todo>("todos")
      .update({ is_complete: !is_complete })
      .eq("id", id)
      .single();
    if (error) console.log(error);
    else setTodos(todos.map((todo) => (todo.id === id ? data! : todo)));
  };

  const deleteTodo = async (id: number) => {
    const { error } = await supabase.from<Todo>("todos").delete().eq("id", id);
    if (error) console.log("error", error);
    else setTodos(todos.filter((x) => x.id !== Number(id)));
  };

  return (
    <SafeAreaView style={tailwind("flex-1 p-4")}>
      <View style={tailwind("mb-4")}>
        <Input
          label="New todo"
          leftIcon={{ type: "font-awesome", name: "tasks" }}
          onChangeText={(text) => setNewTaskText(text)}
          value={newTaskText}
        />
        <Button title="Add" onPress={() => addTodo(newTaskText)} />
      </View>
      <SafeAreaView style={tailwind("flex-1")}>
        <FlatList
          scrollEnabled={true}
          data={todos}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item: todo }) => (
            <ListItem bottomDivider>
              <ListItem.Content>
                <View
                  style={tailwind(
                    "w-full flex-1 flex flex-row items-center justify-between"
                  )}
                >
                  <CheckBox
                    checked={todo.is_complete}
                    onPress={() => toggleCompleted(todo.id, todo.is_complete)}
                  />
                  <Text style={tailwind("w-full")}>{todo.task}</Text>
                  <Button
                    title="Delete"
                    onPress={() => deleteTodo(todo.id)}
                  ></Button>
                </View>
              </ListItem.Content>
            </ListItem>
          )}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
}
