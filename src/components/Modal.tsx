interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
    hideBtnCancel?: boolean;
    textContinue?: string;
}

export const Modal = ({ isOpen, onClose, onConfirm, message, hideBtnCancel, textContinue = 'Confirmar' }: ModalProps) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
                <p className="text-lg mb-4">{message}</p>
                <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-2 mt-4 justify-end">
                    { !hideBtnCancel && <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-100"
                    >Cancelar
                    </button>}
                    <button
                        onClick={onConfirm}
                        className="w-full sm:w-auto px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                    >{textContinue}
                    </button>
                </div>
            </div>
        </div>
    );
};
