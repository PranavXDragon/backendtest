import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Contact.module.css';

export default function Contact() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [redirectTimer, setRedirectTimer] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setErrors({});

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
`${data.message} - Redirecting...` });
        setFormData({ name: '', email: '', message: '' });
        const timer = setTimeout(() => router.push('/'), 2000);
        setRedirectTimer(timerdata.message });
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(null), 5000);
      } else if (data.errors) {
        const errorMap = {};
        data.errors.forEach(err => {
          errorMap[err.field] = err.message;
        });
        setErrors(errorMap);
        setStatus({ type: 'error', message: 'Please fix the errors below' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to submit form' });
    } finally {
      setLoading(false);
    

  const handleManualRedirect = () => {
    if (redirectTimer) clearTimeout(redirectTimer);
    router.push('/');
  };}
  };

  return (
    <>
      <Head>
        <title>Contact Form - BackendTest</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.container}>
        <div className={styles.header}>
          <Link href="/" className={styles.backBtn}>← Back</Link>
          <h1>📬 Contact Us</h1>
          <p>Send us a message</p>
        </div>

        <div className={styles.formContainer}>
          {status && (
            <div className={`${styles.alert} ${styles[`alert_${status.type}`]}`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className={errors.name ? styles.inputError : ''}
              />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className={errors.email ? styles.inputError : ''}
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                rows="5"
                className={errors.message ? styles.inputError : ''}
              ></textarea>
              {errors.message && <span className={styles.errorText}>{errors.message}</span>}
            </div>

            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? 'Sending... ⏳' : 'Send Message ✉️'}
            </button>
          </form>

          <div className={styles.infoBox}>

          {status?.type === 'success' && (
            <button onClick={handleManualRedirect} className={styles.redirectBtn}>
              ↩️ Return to Home
            </button>
          )}
            <h3>💡 About This App</h3>
            <p>✅ Built with Next.js 14</p>
            <p>💾 Powered by MongoDB</p>
            <p>🚀 Deployed on Vercel</p>
          </div>
        </div>

        <footer className={styles.footer}>
          <p>Built with ❤️ using Next.js & MongoDB</p>
        </footer>
      </main>
    </>
  );
}
