import React, { useState } from 'react';
import ContactForm from './components/ContactForm';
import Status from './pages/Status';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('contact');

  return (
    <>
      {currentPage === 'contact' && (
        <div className="app">
          <header className="app-header">
            <div className="header-content">
              <h1>🚀 BackendTest</h1>
              <p>React Vite + Node.js + MongoDB</p>
              <nav className="nav-links">
                <button className="nav-btn active" onClick={() => setCurrentPage('contact')}>📬 Contact Form</button>
                <button className="nav-btn" onClick={() => setCurrentPage('status')}>📊 Status</button>
              </nav>
            </div>
          </header>
          
          <main className="app-main">
            <ContactForm />
          </main>

          <footer className="app-footer">
            <p>Built with ❤️ using React, Vite, Node.js & MongoDB</p>
          </footer>
        </div>
      )}

      {currentPage === 'status' && (
        <div className="status-wrapper">
          <button className="back-btn" onClick={() => setCurrentPage('contact')}>← Back to Contact</button>
          <Status />
        </div>
      )}
    </>
  );
}

export default App;
