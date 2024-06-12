const express = require('express');
const cors = require('cors');

class NotificationSystem {
  constructor() {
    this.topics = {}; // To store topics and their subscribers
  }

  subscribe(topicId, subscriberId) {
    if (!this.topics[topicId]) {
      this.topics[topicId] = new Set(); // Using Set to avoid duplicate subscribers
    }
    if(this.topics[topicId].has(subscriberId)) {
      console.log(`Subscriber ${subscriberId} already subscribed to topic ${topicId}`);
      return;
    }else{
    this.topics[topicId].add(subscriberId);
    console.log(`Subscriber ${subscriberId} subscribed to topic ${topicId}`);
    }
    this.printState();
  }

  notify(topicId) {
    if (!this.topics[topicId]) {
      console.log(`No subscribers for topic ${topicId}`);
      return [];
    }
    console.log(`Notifying subscribers of topic ${topicId}`);
    return Array.from(this.topics[topicId]);
  }

  unsubscribe(topicId, subscriberId) {
    if (this.topics[topicId]) {
      this.topics[topicId].delete(subscriberId);
      console.log(`Subscriber ${subscriberId} unsubscribed from topic ${topicId}`);
      if (this.topics[topicId].size === 0) {
        delete this.topics[topicId]; // Clean up the topic if no subscribers left
      }
      this.printState();
    }
  }

  printState() {
    const state = {};
    for (const [topicId, subscribers] of Object.entries(this.topics)) {
      state[topicId] = Array.from(subscribers);
    }
    return state;
  }
}

const app = express();
const notificationSystem = new NotificationSystem();

app.use(cors());
app.use(express.json());

app.post('/subscribe', (req, res) => {
  const { topicId, subscriberId } = req.body;
  notificationSystem.subscribe(topicId, subscriberId);
  res.send(`${subscriberId} subscribed to ${topicId}`);
});

app.post('/notify', (req, res) => {
  const { topicId } = req.body;
  const subscribers = notificationSystem.notify(topicId);
  res.send(subscribers);
});

app.post('/unsubscribe', (req, res) => {
  const { topicId, subscriberId } = req.body;
  notificationSystem.unsubscribe(topicId, subscriberId);
  res.send(`${subscriberId} unsubscribed from ${topicId}`);
});

app.get('/printState', (req, res) => {
  const state = notificationSystem.printState();
  res.json(state);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
