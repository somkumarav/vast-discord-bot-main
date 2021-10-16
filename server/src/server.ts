import express from 'express';
import admin, { ServiceAccount } from 'firebase-admin';
import './discord/bot';

import addUser from './routes/addUser';
import regenOtp from './routes/regenOtp';
import verifyOtp from './routes/verifyOtp';

const serviceAccountKey = require('../serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as ServiceAccount),
});
export const db = admin.firestore();

const app = express();
app.use(express.json());
app.use(addUser);
app.use(regenOtp);
app.use(verifyOtp);

app.get('/hello', (req, res) => {
  res.send('Hello there.');
});

app.listen(4000, () => {
  console.log('server started at http://localhost:4000');
});
