import { UserResolvable } from 'discord.js';
import express from 'express';
import bot from '../discord/bot';
import { db } from '../server';
const router = express.Router();

router.post('/add', async (req, res) => {
  let status:
    | 'undefined'
    | 'Successful'
    | 'Unsuccessful'
    | 'User already exist' = 'undefined';
  const { admissionNumber, department, discordId, email, name, phoneNumber } =
    req.body;

  const userAlreadyRef = db
    .collection('allUser')
    .doc(admissionNumber.toString().toUpperCase());
  const userResponse = await userAlreadyRef.get();

  if (userResponse.exists) {
    status = 'User already exist';
    res.json(status);
  } else {
    try {
      const user = await bot.user?.fetch(discordId.toString()); // discord user id
      const guild = await bot.guilds.fetch('139103123'); // discord guild id aka discord server id
      const memeber = await (
        await guild.members.fetch(user as UserResolvable)
      ).roles.set(['1413841321']);

      const addRef = db
        .collection('allUser')
        .doc(admissionNumber.toString().toUpperCase());
      await addRef.set({
        admissionNumber,
        department,
        discordId,
        email,
        name,
        phoneNumber,
      });
      status = 'Successful';
      res.json(status);
    } catch (err) {
      console.error(err);
      status = 'Unsuccessful';
      res.json(status);
    }
  }
});

export default router;
