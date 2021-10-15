import { Options, UserResolvable } from 'discord.js';
import dotEnv from 'dotenv';
import express, { text } from 'express';
import nodemailer from 'nodemailer';
import bot from '../discord/bot';
import { db } from '../server';
dotEnv.config();
const router = express.Router();

let status: 'undefined' | 'Successful' | 'Unsuccessful' | 'User already exist';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export const generateOTP = () => {
  const OTPSize = 6;
  let OTP = 0;
  for (let i = 0; i < OTPSize; i++) {
    const random = Math.floor(Math.random() * OTPSize);
    OTP = OTP * 10 + random;
  }
  return OTP;
};

router.post('/add', async (req, res) => {
  const { admissionNumber, department, discordId, email, name, phoneNumber } =
    req.body;

  const userAlreadyRef = db
    .collection('user-details')
    .doc(admissionNumber.toString().toUpperCase());
  const userResponse = await userAlreadyRef.get();
  const newOtp = generateOTP();

  if (userResponse.exists) {
    status = 'User already exist';
    res.json(status);
  } else {
    try {
      // const user = await bot.user?.fetch(discordId.toString()); // discord user id
      // const guild = await bot.guilds.fetch('847002678667640872'); // discord guild id aka discord server id
      // const memeber = await (
      //   await guild.members.fetch(user as UserResolvable)
      // ).roles.set(['1413841321']);

      const addRef = db
        .collection('user-details')
        .doc(admissionNumber.toString().toUpperCase());
      await addRef.set({
        admissionNumber,
        department,
        discordId,
        email,
        name,
        phoneNumber,
        OTP: newOtp,
        OTPTime: Date.now(),
      });
      const mailOptions = {
        from: 'vastdiscordbot@gmail.com',
        to: email,
        subject: 'Discord OTP',
        text: `otp: ${newOtp}`,
      };
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          console.log('email sent');
        }
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
