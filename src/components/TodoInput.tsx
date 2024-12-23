import { useState } from 'react';
import {Todo} from "../types/todo.ts";
import {Modal} from "./Modal.tsx";

interface Props {
    onAddTodo: (text: string) => void;
    todos: Todo[];
}

export const TodoInput = ({ onAddTodo, todos }: Props) => {
    const [text, setText] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            const exists = todos.some(
                todo => todo.text.toLowerCase() === text.trim().toLowerCase()
            );
            if (exists) {
                setShowModal(true);
                return;
            }
            onAddTodo(text);
            setText('');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Añadir nueva tarea..."
                    />
                    <button
                        type="submit"
                        className="w-full sm:w-auto px-4 py-2 mt-3 sm:mt-0 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Añadir
                    </button>
                </div>
            </form>
            <Modal
                isOpen={showModal}
                hideBtnCancel={true}
                onConfirm={() => setShowModal(false)}
                message="La tarea ingresada ya existe"
                textContinue="Aceptar"
            />
        </>
    );
};
