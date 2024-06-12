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
      if (this.topics[topicId].has(subscriberId)) {
        this.topics[topicId].delete(subscriberId);
        console.log(`Subscriber ${subscriberId} unsubscribed from topic ${topicId}`);
        if (this.topics[topicId].size === 0) {
          delete this.topics[topicId]; // Clean up the topic if no subscribers left
        }
        this.printState();
      } else {
        console.log(`Subscriber ${subscriberId} is not subscribed to topic ${topicId}`);
      }
    } else {
      console.log(`Topic ${topicId} does not exist`);
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
  if (notificationSystem.topics[topicId] && notificationSystem.topics[topicId].has(subscriberId)) {
    res.send(`Subscriber ${subscriberId} is already subscribed to topic ${topicId}`);
  } else {
    notificationSystem.subscribe(topicId, subscriberId);
    res.send(`${subscriberId} subscribed to ${topicId}`);
  }
});

app.post('/notify', (req, res) => {
  const { topicId } = req.body;
  const subscribers = notificationSystem.notify(topicId);
  res.send(subscribers);
});

app.post('/unsubscribe', (req, res) => {
  const { topicId, subscriberId } = req.body;
  if (notificationSystem.topics[topicId]) {
    if (notificationSystem.topics[topicId].has(subscriberId)) {
      notificationSystem.topics[topicId].delete(subscriberId);
      if (notificationSystem.topics[topicId].size === 0) {
        delete notificationSystem.topics[topicId];
      }
      res.send(`Subscriber ${subscriberId} unsubscribed from topic ${topicId}`);
    } else {
      res.send(`Subscriber ${subscriberId} is not subscribed to topic ${topicId}`);
    }
  } else {
    res.send(`Topic ${topicId} does not exist`);
  }
});

app.get('/printState', (req, res) => {
  const state = notificationSystem.printState();
  res.json(state);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
