import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onSwitchToRegister, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid = email.trim() !== "" && password.trim() !== "";

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;
    onLogin({ email, password });
  }

  return (
    <ModalWithForm
      title="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="login-modal__field">
        <span className="login-modal__label">Email</span>
        <input
          type="email"
          className="login-modal__input"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="login-modal__field">
        <span className="login-modal__label">Password</span>
        <input
          type="password"
          className="login-modal__input"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="login-modal__submit" disabled={!isValid}>
        Sign in
      </button>
      <p className="login-modal__switch">
        or{" "}
        <button
          type="button"
          className="login-modal__switch-link"
          onClick={onSwitchToRegister}
        >
          Sign up
        </button>
      </p>
    </ModalWithForm>
  );
}

export default LoginModal;
