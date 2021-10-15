import { UserResolvable } from 'discord.js';
import express from 'express';
import bot from '../discord/bot';
import { db } from '../server';
const router = express.Router();

const depts = {
  CE: '888412084151410739',
  CSE: '889528823207579718', // This is role id which is only used for testing on bot test server
  // CSE: '888410099243184168',
  ECE: '888410153022550037',
  EEE: '888410209628868618',
  ME: '888412155857219625',
  MCA: '888749669293903892',
};

let status:
  | 'No such User'
  | 'Invalid OTP'
  | 'OTP verified'
  | 'Unsuccessful'
  | 'Time-Out'
  | 'Something went wrong';

router.post('/verify', async (req, res) => {
  const { admissionNumber, otp, discordId, department } = req.body;
  const userRef = db
    .collection('user-details')
    .doc(admissionNumber.toString().toUpperCase());
  const doc = await userRef.get();
  const otpExpiryTime = parseInt(doc.data()?.OTPTime);

  console.log(otpExpiryTime + 1000 * 60 * 30 - Date.now());

  if (!doc.exists) {
    status = 'No such User';
    res.json(status);
  } else {
    const dbOTP = doc.data()?.OTP;
    try {
      if (otpExpiryTime + 1000 * 60 * 3 >= Date.now()) {
        if (dbOTP === otp) {
          const user = await bot.user?.fetch(discordId.toString()); // discord user id
          const guild = await bot.guilds.fetch('888100556491608094'); // discord guild id aka discord server id
          const memeber = await (
            await guild.members.fetch(user as UserResolvable)
          ).roles.set([depts[department.toString().toUpperCase()]]);
          status = 'OTP verified';
          res.json(status);
        } else if (dbOTP !== otp) {
          status = 'Invalid OTP';
          res.json(status);
        }
      } else {
        status = 'Time-Out';
        res.json(status);
      }
    } catch (err) {
      console.error(err);
      status = 'Something went wrong';
      res.json(status);
    }
  }
});

export default router;
