import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import React from 'react';

class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, color: '#fff', background: '#000', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h1 style={{ color: '#ff2d78' }}>App Crashed!</h1>
          <p style={{ fontSize: 20 }}>Please take a screenshot of this error and show it to the AI:</p>
          <pre style={{ background: '#222', padding: 20, color: '#00f3ff', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {this.state.error?.toString()}
          </pre>
          <pre style={{ background: '#111', padding: 20, color: '#ffaaaa', marginTop: 20, whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {this.state.error?.stack}
          </pre>
          <button onClick={() => window.location.href = '/'} style={{ padding: '10px 20px', background: '#fff', color: '#000', border: 'none', cursor: 'pointer', marginTop: 20 }}>
            Go Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <GlobalErrorBoundary>
    <App />
  </GlobalErrorBoundary>,
)
