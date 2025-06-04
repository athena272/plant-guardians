import React, { useState } from 'react'
import bgImage from '../../assets/bg-form.jpg'
import s from './form.module.scss'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);

    try {
      const response = await fetch('https://getform.io/f/aronnekb', {
        method: 'POST',
        body: new FormData(e.target),
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        console.log('%c✔️ Formulário enviado com sucesso!', 'color: green; font-weight: bold;');
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        window.history.replaceState(null, '', window.location.pathname);
      } else {
        console.error('%c❌ Erro ao enviar o formulário', 'color: red; font-weight: bold;');
        setSubmitError(true);
      }
    } catch (error) {
      console.error('%c❌ Erro inesperado:', 'color: red; font-weight: bold;', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    const nameValid = /^[a-zA-ZÀ-ÿ\s]{2,50}$/.test(formData.name);
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const phoneValid = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/.test(formData.phone);
    const messageValid = formData.message.trim().length > 10;
    return nameValid && emailValid && phoneValid && messageValid;
  };

  return (
    <main className={s.formContainer} id='form-contact'>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          type="text"
          name="_gotcha"
          style={{ display: 'none' }}
          tabIndex="-1"
          autoComplete="off"
        />

        <div className={s.formHeader}>
          <h2>Solicite uma Demonstração</h2>
          <p>Veja o Plant Guardians em ação e descubra como ele pode proteger sua plantação. Preencha o formulário e entraremos em contato.</p>

          {submitSuccess && (
            <aside className={s.successMessage} role="alert" aria-live="assertive">
              Obrigado pela sua mensagem! Entraremos em contato em breve.
            </aside>
          )}

          {submitError && (
            <aside className={s.errorMessage} role="alert" aria-live="assertive">
              Algo deu errado. Por favor, tente novamente mais tarde.
            </aside>
          )}
        </div>

        <div className={s.formGroup}>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            pattern="^[a-zA-ZÀ-ÿ\s]{2,50}$"
            title="Digite um nome válido (apenas letras e espaços)"
            placeholder="Seu nome completo"
          />
        </div>

        <div className={s.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="seu@email.com"
          />
        </div>

        <div className={s.formGroup}>
          <label htmlFor="phone">Telefone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$"
            title="Digite um telefone válido com DDD"
            placeholder="(99) 99999-9999"
          />
        </div>

        <div className={s.formGroup}>
          <label htmlFor="message">Mensagem</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
            placeholder="Como podemos ajudar?"
            style={{ minHeight: '100px', maxHeight: '300px' }}
          ></textarea>
        </div>

        <button type="submit" disabled={isSubmitting || !isFormValid()}>
          {isSubmitting ? 'Enviando...' : 'Solicitar Demonstração'}
        </button>
      </form>
      <div className={s.imageContainer}>
        <img src={bgImage} alt="fotografia de plantação" />
      </div>
    </main>
  );
};

export default ContactForm;
