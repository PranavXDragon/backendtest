import ContactForm from './components/ContactForm';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🚀 BackendTest</h1>
          <p>React Vite + Node.js + MongoDB</p>
        </div>
      </header>
      
      <main className="app-main">
        <ContactForm />
      </main>

      <footer className="app-footer">
        <p>Built with ❤️ using React, Vite, Node.js & MongoDB</p>
      </footer>
    </div>
  );
}

export default App;
