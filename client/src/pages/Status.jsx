import React, { useState, useEffect } from 'react';
import './Status.css';

export default function StatusPage() {
  const [serverStatus, setServerStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch('/api/health', { 
          timeout: 5000 
        });
        const data = await response.json();
        setServerStatus(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, []);

  return (
    <div className="status-container">
      <div className="status-page">
        <div className="header">
          <h1>🚀 BackendTest</h1>
          <p className="subtitle">React Vite + Node.js + MongoDB</p>
        </div>

        <div className="content">
          {/* Deployment Status */}
          <section className="status-section">
            <h2>📊 Deployment Status</h2>
            <div className={`status-card ${loading ? 'loading' : error ? 'error' : 'success'}`}>
              {loading && (
                <>
                  <div className="spinner"></div>
                  <p>Checking server status...</p>
                </>
              )}
              {error && (
                <>
                  <span className="icon">⚠️</span>
                  <p><strong>Server Unavailable</strong></p>
                  <p className="error-text">{error}</p>
                </>
              )}
              {serverStatus && (
                <>
                  <span className="icon">✅</span>
                  <p><strong>Server Online</strong></p>
                  <p className="timestamp">{serverStatus.timestamp}</p>
                </>
              )}
            </div>
          </section>

          {/* Project Info */}
          <section className="status-section">
            <h2>📁 Project Information</h2>
            <div className="info-grid">
              <div className="info-box">
                <h3>🎨 Frontend</h3>
                <p>React 18 + Vite</p>
                <p className="small">Modern UI with real-time validation</p>
              </div>
              <div className="info-box">
                <h3>🔧 Backend</h3>
                <p>Node.js + Express</p>
                <p className="small">RESTful API with 6 endpoints</p>
              </div>
              <div className="info-box">
                <h3>💾 Database</h3>
                <p>MongoDB Atlas</p>
                <p className="small">Optimized connection pooling</p>
              </div>
              <div className="info-box">
                <h3>🚀 Deployment</h3>
                <p>Vercel + GitHub</p>
                <p className="small">Auto-deploy on push</p>
              </div>
            </div>
          </section>

          {/* API Endpoints */}
          <section className="status-section">
            <h2>📡 API Endpoints</h2>
            <div className="endpoints-list">
              <div className="endpoint">
                <span className="method get">GET</span>
                <span className="path">/api/health</span>
                <span className="desc">Server status</span>
              </div>
              <div className="endpoint">
                <span className="method post">POST</span>
                <span className="path">/api/contacts</span>
                <span className="desc">Create contact</span>
              </div>
              <div className="endpoint">
                <span className="method get">GET</span>
                <span className="path">/api/contacts</span>
                <span className="desc">Get all contacts</span>
              </div>
              <div className="endpoint">
                <span className="method get">GET</span>
                <span className="path">/api/contacts/:id</span>
                <span className="desc">Get single contact</span>
              </div>
              <div className="endpoint">
                <span className="method put">PUT</span>
                <span className="path">/api/contacts/:id</span>
                <span className="desc">Update status</span>
              </div>
              <div className="endpoint">
                <span className="method delete">DELETE</span>
                <span className="path">/api/contacts/:id</span>
                <span className="desc">Delete contact</span>
              </div>
            </div>
          </section>

          {/* GitHub & Links */}
          <section className="status-section">
            <h2>🔗 Quick Links</h2>
            <div className="links-grid">
              <a href="https://github.com/PranavXDragon/backendtest" target="_blank" rel="noopener noreferrer" className="link-btn github">
                📘 GitHub Repository
              </a>
              <a href="/" className="link-btn contact">
                📬 Contact Form
              </a>
              <a href="/api/health" target="_blank" rel="noopener noreferrer" className="link-btn api">
                🔌 API Health Check
              </a>
            </div>
          </section>

          {/* Stats */}
          <section className="status-section">
            <h2>📈 Tech Stack</h2>
            <div className="stats">
              <div className="stat">
                <span className="stat-number">6</span>
                <span className="stat-label">API Endpoints</span>
              </div>
              <div className="stat">
                <span className="stat-number">10</span>
                <span className="stat-label">DB Pool Size</span>
              </div>
              <div className="stat">
                <span className="stat-number">∞</span>
                <span className="stat-label">Scalability</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Uptime</span>
              </div>
            </div>
          </section>

          {/* MongoDB Connection */}
          <section className="status-section mongodb-section">
            <h2>💾 Database Connection</h2>
            <div className="db-info">
              <div className="db-detail">
                <span className="label">Cluster:</span>
                <span className="value">MongoDB Atlas</span>
              </div>
              <div className="db-detail">
                <span className="label">Database:</span>
                <span className="value">T</span>
              </div>
              <div className="db-detail">
                <span className="label">Collection:</span>
                <span className="value">contacts</span>
              </div>
              <div className="db-detail">
                <span className="label">Pool Size:</span>
                <span className="value">Min: 2, Max: 10</span>
              </div>
              <div className="db-detail">
                <span className="label">Write Concern:</span>
                <span className="value">Majority</span>
              </div>
            </div>
          </section>
        </div>

        <footer className="footer">
          <p>Built with ❤️ using React Vite, Node.js & MongoDB</p>
          <p className="timestamp">Deployed on Vercel • Last Updated: {new Date().toLocaleString()}</p>
        </footer>
      </div>
    </div>
  );
}
