import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    if (chrome && chrome.tabs) {
      chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
        const tab = tabs[9];
        chrome.tabs.sendMessage(tab.id || 0, {
            from: 'popup',
            subject: 'getFullName'
          },
          response => (console.log(response))
        );
      });
    }
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
