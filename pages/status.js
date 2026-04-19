import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Status.module.css';

export default function Status() {
  const [serverStatus, setServerStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setServerStatus(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Status Dashboard - BackendTest</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.container}>
        <div className={styles.header}>
          <Link href="/" className={styles.backBtn}>← Back</Link>
          <h1>📊 Status Dashboard</h1>
          <p>System Overview</p>
        </div>

        <div className={styles.content}>
          <div className={styles.statusSection}>
            <h2>🚀 Server Status</h2>
            <div className={`${styles.statusCard} ${loading ? styles.loading : error ? styles.error : styles.success}`}>
              {loading && <div className={styles.spinner}></div>}
              {loading && <p>Checking server...</p>}
              {error && <p>⚠️ Server Unavailable: {error}</p>}
              {serverStatus && (
                <>
                  <p>✅ Server Online</p>
                  <p className={styles.timestamp}>{serverStatus.timestamp}</p>
                </>
              )}
            </div>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoBox}>
              <h3>🎯 Framework</h3>
              <p>Next.js 14</p>
            </div>
            <div className={styles.infoBox}>
              <h3>💾 Database</h3>
              <p>MongoDB Atlas</p>
            </div>
            <div className={styles.infoBox}>
              <h3>🔌 API</h3>
              <p>REST Endpoints</p>
            </div>
            <div className={styles.infoBox}>
              <h3>🚀 Deployment</h3>
              <p>Vercel</p>
            </div>
          </div>

          <div className={styles.apiSection}>
            <h2>📡 API Endpoints</h2>
            <div className={styles.endpointsList}>
              <div className={styles.endpoint}>
                <span className={`${styles.method} ${styles.post}`}>POST</span>
                <span className={styles.path}>/api/contacts</span>
                <span className={styles.desc}>Create contact</span>
              </div>
              <div className={styles.endpoint}>
                <span className={`${styles.method} ${styles.get}`}>GET</span>
                <span className={styles.path}>/api/contacts</span>
                <span className={styles.desc}>Get all contacts</span>
              </div>
              <div className={styles.endpoint}>
                <span className={`${styles.method} ${styles.get}`}>GET</span>
                <span className={styles.path}>/api/contacts/[id]</span>
                <span className={styles.desc}>Get single contact</span>
              </div>
              <div className={styles.endpoint}>
                <span className={`${styles.method} ${styles.put}`}>PUT</span>
                <span className={styles.path}>/api/contacts/[id]</span>
                <span className={styles.desc}>Update status</span>
              </div>
              <div className={styles.endpoint}>
                <span className={`${styles.method} ${styles.delete}`}>DELETE</span>
                <span className={styles.path}>/api/contacts/[id]</span>
                <span className={styles.desc}>Delete contact</span>
              </div>
            </div>
          </div>

          <div className={styles.techStack}>
            <h2>🛠️ Tech Stack</h2>
            <ul>
              <li>Next.js 14 - React framework</li>
              <li>MongoDB - Document database</li>
              <li>Mongoose - ODM</li>
              <li>Vercel - Deployment</li>
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
