import { useState } from 'react';
import { Todo } from '../types/todo';
import { Modal } from './Modal.tsx'
import trash from '../assets/icons/trash.png';

interface Props {
    todo: Todo;
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newText: string) => void;
}

export const TodoItem = ({ todo, todos, onToggle, onDelete, onEdit }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [hideCancelModal, setHideCancelModal] = useState(false);
    const [messageModal, setMessageModal] = useState('');
    const [messageBtnConfirmModal, setMessageBtnConfirmModal] = useState('');
    const completedStyle = todo.completed ? 'bg-lime-100' : '';
    const [lastTouchTime, setLastTouchTime] = useState(0);
    const doubleClickThreshold = 300;

    const handleEdit = () => {
        if (editText.trim() !== '' && editText.trim().toLowerCase() !== todo.text.toLowerCase()) {
            const exists = todos.some(
                todo => todo.text.toLowerCase() === editText.trim().toLowerCase()
            );
            if (exists) {
                setMessageModal("La tarea ingresada ya existe");
                setMessageBtnConfirmModal("Aceptar");
                setEditText(todo.text);
                setHideCancelModal(true);
                setShowDeleteModal(true);
                setIsEditing(false);
                return;
            }
            onEdit(todo.id, editText);
            setIsEditing(false);
        } else {
            setEditText(todo.text);
            setIsEditing(false);
        }
    };

    const handleTouchEnd = () => {
        const now = Date.now();
        if (now - lastTouchTime <= doubleClickThreshold) {
            setIsEditing(true);
        }
        setLastTouchTime(now);
    };

    const handleDelete = () => {
        setHideCancelModal(false);
        setMessageModal("¿Está seguro de eliminar esta tarea?");
        setMessageBtnConfirmModal("Confirmar");
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        onDelete(todo.id);
        setShowDeleteModal(false);
    };

    return (
        <>
            <div className={`flex items-center gap-2 p-2 border rounded-lg group ${completedStyle}`}>
                <div className="checkbox-wrapper">
                    <div className="round">
                        <input
                            type="checkbox"
                            id={`checkbox-${todo.id}`}
                            checked={todo.completed}
                            onChange={() => onToggle(todo.id)}
                            className="min-w-[20px]"
                        />
                        <label htmlFor={`checkbox-${todo.id}`}></label>
                    </div>
                </div>
                {isEditing ? (
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={handleEdit}
                        onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
                        className="w-full sm:flex-1 px-2 py-1 border rounded"
                        autoFocus
                    />
                ) : (
                    <span
                        className={`flex-1 break-words overflow-hidden ${
                            todo.completed ? 'line-through text-gray-500' : ''
                        }`}
                        onTouchEnd={handleTouchEnd}
                        onDoubleClick={() => setIsEditing(true)}
                    >
                      {todo.text}
                    </span>
                )}
                <img src={trash} alt="Eliminar tarea" className="cursor-pointer" onClick={handleDelete} />
            </div>
            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={() => {
                    if (!hideCancelModal)
                        confirmDelete();
                    else
                        setShowDeleteModal(false)
                }}
                hideBtnCancel={hideCancelModal}
                message={messageModal}
                textContinue={messageBtnConfirmModal}
            />
        </>
    );
};
