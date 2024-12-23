import { useState, useEffect } from 'react';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todo';

function App() {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text: string) => {
        setTodos([
            ...todos,
            { id: crypto.randomUUID(), text, completed: false }
        ]);
    };

    const toggleTodo = (id: string) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const editTodo = (id: string, newText: string) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, text: newText } : todo
        ));
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-2xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8">Lista de Tareas</h1>
                <div className="bg-white px-6 pt-6 pb-3 rounded-lg shadow-md">
                    <TodoInput onAddTodo={addTodo} todos={todos} />
                </div>
                {
                    todos.length > 0 && (
                        <div className="bg-white p-6 rounded-lg shadow-md mt-10">
                            <TodoList
                                todos={todos}
                                onToggle={toggleTodo}
                                onDelete={deleteTodo}
                                onEdit={editTodo}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default App;
