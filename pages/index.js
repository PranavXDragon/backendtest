import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [serverStatus, setServerStatus] = useState(null);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setServerStatus(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Head>
        <title>BackendTest - Next.js + MongoDB</title>
        <meta name="description" content="Contact form application with Next.js and MongoDB" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.container}>
        <div className={styles.header}>
          <h1>🚀 BackendTest</h1>
          <p>Next.js + MongoDB Contact Form</p>
        </div>

        <div className={styles.content}>
          <div className={styles.statusCard}>
            <h2>📊 Server Status</h2>
            {serverStatus ? (
              <div className={styles.statusInfo}>
                <p><span className={styles.label}>Status:</span> <span className={styles.badge}>✅ Online</span></p>
                <p><span className={styles.label}>Framework:</span> Next.js 14</p>
                <p><span className={styles.label}>Database:</span> MongoDB Atlas</p>
              </div>
            ) : (
              <p>Checking server...</p>
            )}
          </div>

          <div className={styles.navigation}>
            <h2>🎯 Quick Navigation</h2>
            <div className={styles.navLinks}>
              <Link href="/contact" className={styles.navBtn}>
                📬 Contact Form
              </Link>
              <Link href="/status" className={styles.navBtn}>
                📊 Status Dashboard
              </Link>
            </div>
          </div>

          <div className={styles.features}>
            <h2>✨ Features</h2>
            <ul>
              <li>⚡ Next.js 14 with React 18</li>
              <li>🗄️ MongoDB with Mongoose</li>
              <li>📝 Contact form with validation</li>
              <li>🔌 RESTful API endpoints</li>
              <li>📊 Live status dashboard</li>
              <li>🚀 Vercel deployment ready</li>
            </ul>
          </div>
        </div>

        <footer className={styles.footer}>
          <p>Built with ❤️ using Next.js & MongoDB</p>
        </footer>
      </main>
    </>
  );
}
