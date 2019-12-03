import passport from 'passport';
import dotenv from 'dotenv';
import { BasicStrategy } from 'passport-http';
import boom from '@hapi/boom';
import axios from 'axios';

dotenv.config();

passport.use(
  // eslint-disable-next-line consistent-return
  new BasicStrategy((async (email, password, cb) => {
    try {
      const { data, status } = await axios({
        url: `${process.env.API_URL}/api/auth/sign-in`,
        method: 'post',
        auth: {
          password,
          username: email,
        },
        data: {
          apiKeyToken: process.env.API_KEY_TOKEN,
        },
      });

      if (!data || status !== 200) return cb(boom.unauthorized(), false);

      return cb(null, data);
    } catch (error) {
      cb(error);
    }
  })),
);
