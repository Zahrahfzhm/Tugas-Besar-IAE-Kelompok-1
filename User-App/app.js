const express = require('express');
const app = express();
const PORT = 5001;
const amqp = require('amqplib');
const mysql = require('mysql');

let rabbitMQConnection;
const exchangeName = 'userExchange';
const addUserRoutingKey = 'add_user_route';
const deleteUserRoutingKey = 'delete_user_route';
const addUserMessagesStorage = [];
const deleteUserMessagesStorage = [];

// Koneksi ke database MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'userdb',
  port: 3307
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/addUserMessage', (req, res) => {
  try {
    return res.json({ messages: addUserMessagesStorage });
  } catch (error) {
    return res.status(500).json({
      detail: error.message
    });
  }
});

app.get('/deleteUserMessages', (req, res) => {
  try {
    return res.json({ messages: deleteUserMessagesStorage });
  } catch (error) {
    return res.status(500).json({
      detail: error.message
    });
  }
});

// Listen add User
async function listenAddUserMessages() {
  const channel = await rabbitMQConnection.createChannel();
  await channel.assertExchange(exchangeName, 'direct', { durable: false });
  const q = await channel.assertQueue('', { exclusive: true });
  await channel.bindQueue(q.queue, exchangeName, addUserRoutingKey);
  console.log(`Waiting for messages in queue: ${q.queue}`);

  channel.consume(q.queue, (message) => {
    if (message !== null) {
      const receivedJSON = JSON.parse(message.content.toString());
      console.log(`Received an Add User Event using RabbitMQ:`, receivedJSON);
      addUserMessagesStorage.push(receivedJSON);

      // Memasukkan data ke tabel user
      const { id_user, nama_user, email_user } = receivedJSON;
      const user = {
        id_user,
        nama_user,
        email_user
      };

      db.query('INSERT INTO pengguna SET ?', user, (err, result) => {
        if (err) {
          console.error('Error inserting user:', err);
          return;
        }
        console.log('User data inserted successfully');
      });

      channel.ack(message);
    } else {
      console.log('Received null message');
    }
  });
}

// Listen Delete Film
async function listenDeleteUserMessages() {
  const channel = await rabbitMQConnection.createChannel();
  await channel.assertExchange(exchangeName, 'direct', { durable: false });
  const q = await channel.assertQueue('', { exclusive: true });
  await channel.bindQueue(q.queue, exchangeName, deleteUserRoutingKey);
  console.log(`Waiting for messages in queue: ${q.queue}`);

  channel.consume(q.queue, (message) => {
    if (message !== null) {
      const receivedJSON = JSON.parse(message.content.toString());
      console.log(`Received a Delete User Event using RabbitMQ:`, receivedJSON);
      deleteUserMessagesStorage.push(receivedJSON);

      // Menghapus data dari tabel user
      const { id_user } = receivedJSON;

      db.query('DELETE FROM pengguna WHERE id_user = ?', [id_user], (err, result) => {
        if (err) {
          console.error('Error deleting user:', err);
          return;
        }
        console.log('User data deleted successfully');
      });

      channel.ack(message);
    } else {
      console.log('Received null message');
    }
  });
}

// All User
app.get('/users', (req, res) => {
  db.query('SELECT * FROM pengguna', (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(rows);
  });
});

// Detail User
app.get('/users/:user_id', (req, res) => {
  const userId = parseInt(req.params.user_id);
  db.query('SELECT * FROM pengguna WHERE id_user = ?', [userId], (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
});

amqp.connect('amqp://localhost').then(async (connection) => {
  rabbitMQConnection = connection;
  console.log('Connected to RabbitMQ');
  await listenAddUserMessages();
  await listenDeleteUserMessages();
  app.listen(PORT, () => {
    console.log(`😀 server on port ${PORT}`);
  });
}).catch(err => {
  console.error('Error connecting to RabbitMQ:', err);
});
