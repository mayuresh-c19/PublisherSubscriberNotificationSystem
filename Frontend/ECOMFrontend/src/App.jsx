import React, { useState } from 'react';
import './App.css';

function App() {
  const [topicId, setTopicId] = useState('');
  const [subscriberId, setSubscriberId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    const response = await fetch('https://publishersubscribernotificationsystem.onrender.com/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topicId, subscriberId }),
    });
    const data = await response.text();
    setMessage(data);
  };

  const handleNotify = async () => {
    const response = await fetch('https://publishersubscribernotificationsystem.onrender.com/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topicId }),
    });
    const data = await response.json();
    setMessage(`Notified subscribers: ${data.join(', ')}`);
  };

  const handleUnsubscribe = async () => {
    const response = await fetch('https://publishersubscribernotificationsystem.onrender.com/unsubscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topicId, subscriberId }),
    });
    const data = await response.text();
    setMessage(data);
  };

  const [stateData, setStateData] = useState('');

  const handlePrintState = async () => {
    const response = await fetch('https://publishersubscribernotificationsystem.onrender.com/printState');
    const data = await response.json();
  
    let formattedData = 'Current state of topics:\n';
    for (const [topicId, subscribers] of Object.entries(data)) {
      formattedData += `Topic: ${topicId}, Subscribers: ${subscribers.join(', ')}\n`;
    }
  
    setStateData(formattedData);
  };

  return (
    <>
      <div className="App">
        <h1>Publisher Subscriber Notification System</h1>
        <input
          type="text"
          placeholder="Topic ID"
          value={topicId}
          onChange={(e) => setTopicId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subscriber ID"
          value={subscriberId}
          onChange={(e) => setSubscriberId(e.target.value)}
        />
        <button onClick={handleSubscribe}>Subscribe</button>
        <button onClick={handleNotify}>Notify</button>
        <button onClick={handleUnsubscribe}>Unsubscribe</button>
        <button onClick={handlePrintState}>Current State</button>
        <p>{message}</p>
      </div>
      <div className='stateData'>
        <h2>State Data</h2>
        <pre>{stateData}</pre>
      </div>
    </>
  );
}


export default App;
