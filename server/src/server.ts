import express from 'express';
import admin, { ServiceAccount } from 'firebase-admin';
import addRouter from './routes/add';
// import client from './discord/bot';
import './discord/bot';

const serviceAccountKey = require('../serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as ServiceAccount),
});
export const db = admin.firestore();

const app = express();
app.use(express.json());
app.use(addRouter);

app.listen(4000, () => {
  console.log('server started at http://localhost:4000');
});
