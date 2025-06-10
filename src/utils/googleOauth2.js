import { OAuth2Client } from 'google-auth-library';
import * as path from 'node:path';
import { readFile } from 'node:fs/promises';

import { getEnvVar } from './getEnvVar.js';

const googleOauthJsonPath = path.resolve('google-oauth.json');

const oauthConfig = JSON.parse(await readFile(googleOauthJsonPath, 'utf-8'));

const clientId = getEnvVar('GOOGLE_OAUTH_CLIENT_ID');

const clientSecret = getEnvVar('GOOGLE_OAUTH_CLIENT_SECRET');

const googleOauthClient = new OAuth2Client({
  clientId,
  clientSecret,
  redirectUri: oauthConfig.web.redirect_uris[0],
});

export const generateOauthUrl = () => {
  const url = googleOauthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });

  return url;
};

export const validateCode = async (code) => {};
