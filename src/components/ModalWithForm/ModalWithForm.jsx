import './ModalWithForm.css'

function ModalWithForm({ title, children, isOpen, onClose, onSubmit }) {
  if (!isOpen) return null

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal__container">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <span className="modal__close-icon" aria-hidden="true"></span>
        </button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit} noValidate>
          {children}
        </form>
      </div>
    </div>
  )
}

export default ModalWithForm
