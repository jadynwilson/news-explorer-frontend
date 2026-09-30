import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../LoginModal/LoginModal.css";

function RegisterModal({
  isOpen,
  onClose,
  onSwitchToLogin,
  onRegister,
  submitError,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const isValid =
    email.trim() !== "" && password.trim() !== "" && username.trim() !== "";

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;
    onRegister({ email, password, name: username });
  }

  return (
    <ModalWithForm
      title="Sign up"
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
      <label className="login-modal__field">
        <span className="login-modal__label">Username</span>
        <input
          type="text"
          className="login-modal__input"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      {submitError && <p className="login-modal__error">{submitError}</p>}
      <button type="submit" className="login-modal__submit" disabled={!isValid}>
        Sign up
      </button>
      <p className="login-modal__switch">
        or{" "}
        <button
          type="button"
          className="login-modal__switch-link"
          onClick={onSwitchToLogin}
        >
          Sign in
        </button>
      </p>
    </ModalWithForm>
  );
}

export default RegisterModal;
