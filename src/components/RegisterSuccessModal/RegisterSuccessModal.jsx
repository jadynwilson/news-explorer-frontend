import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../LoginModal/LoginModal.css";

function RegisterSuccessModal({ isOpen, onClose, onSignInClick }) {
  return (
    <ModalWithForm
      title="Registration successfully completed!"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e) => e.preventDefault()}
    >
      <button
        type="button"
        className="login-modal__switch-link"
        onClick={onSignInClick}
      >
        Sign in
      </button>
    </ModalWithForm>
  );
}

export default RegisterSuccessModal;
