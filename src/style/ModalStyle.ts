import styled from "styled-components";

export const ModalContainer = styled.div`
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #78A5D5 0%, #C0C0C0 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.modal-content {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 16px;
    padding: 25px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    animation: slideUp 0.4s ease-out;
    position: relative;
    /* Aseguramos que el modal permanezca nítido */
    filter: none !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
}

@keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

.modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
}

.cancel-button {
    background-color: #e5e7eb;
    color: #374151;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
}

.cancel-button:hover {
    background-color: #d1d5db;
}

.submit-button {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
}

.submit-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px -10px rgba(99, 102, 241, 0.5);
}

.submit-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}
`;