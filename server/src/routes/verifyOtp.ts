import express from 'express';
import { UserResolvable } from 'discord.js';
import bot from '../discord/bot';
import { db } from '../server';
import { Status } from './addUser';
const router = express.Router();

const depts: any = {
  CE: '888412084151410739',
  CS: '889528823207579718', // This is role id which is only used for testing on bot test server
  // CSE: '888410099243184168',
  EC: '888410153022550037',
  EE: '888410209628868618',
  ME: '888412155857219625',
  AM: '888749669293903892',
};

router.post('/verify', async (req, res) => {
  console.log('verify');
  const { admissionNumber, otp, discordId, department, name } = req.body;
  let status: Status;

  const userRef = db
    .collection('user-details')
    .doc(admissionNumber.toString().toUpperCase());
  const doc = await userRef.get();
  const otpExpiryTime = parseInt(doc.data()?.OTPTime);
  const email = doc.data()?.email;

  if (!doc.exists) {
    status = { type: 'Error', msg: 'No such User' };
  } else {
    const dbOtp = doc.data()?.OTP;
    try {
      if (otpExpiryTime + 1000 * 60 * 3 >= Date.now()) {
        console.log(otpExpiryTime, Date.now());
        if (dbOtp === otp) {
          const user = await bot.user?.fetch(discordId.toString()); // discord user id
          const guild = await bot.guilds.fetch('847002678667640872'); // discord guild id aka discord server id
          // const member = await (
          //   await guild.members.fetch(user as UserResolvable)
          // ).roles.set([depts[department.toString().toUpperCase()]]);
          const member = await (
            await guild.members.fetch(user as UserResolvable)
          ).roles.add(['889528823207579718']);
          userRef.set({
            admissionNumber,
            email,
            name,
            discordId,
            department,
            verified: true,
          });
          status = { type: 'Ok', msg: 'OTP verified' };
          res.json(status);
        } else if (dbOtp !== otp) {
          status = { type: 'Error', msg: 'Invalid OTP' };
          res.json(status);
        }
      } else {
        console.log(otpExpiryTime, Date.now());
        status = { type: 'Error', msg: 'Time-Out' };
        res.json(status);
      }
    } catch (err) {
      console.log(err);
      status = { type: 'Error', msg: 'Something went wrong' };
      res.json(status);
    }
  }
});

export default router;
