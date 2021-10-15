import express from 'express';
import admin, { ServiceAccount } from 'firebase-admin';
import './discord/bot';

import addUser from './routes/addUser';
import regenOtp from './routes/regenOtp';
import verifyOtp from './routes/verifyOtp';
// import addRouter from './routes/add';
// import verifyRouter from './routes/verify';
// import regen from './routes/regen';
// import client from './discord/bot';

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
// app.use(addRouter);
// app.use(regen);
// app.use(verifyRouter);

app.get('/hello', (req, res) => {
  res.send('hello');
});

app.listen(4000, () => {
  console.log('server started at http://localhost:4000');
});
