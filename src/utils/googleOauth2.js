import { OAuth2Client } from 'google-auth-library';

import * as path from 'node:path';

import { readFile } from 'node:fs/promises';

import { getEnvVar } from './getEnvVar.js';

import createHttpError from 'http-errors';

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

export const validateCode = async (code) => {
  const response = await googleOauthClient.getToken(code);
  if (!response?.tokens?.id_token)
    throw createHttpError(401, 'Google OAuth code invalid');

  const ticket = await googleOauthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });

  return ticket;
};

export const getUserNameFromGoogleTokenPayload = (payload) => {
  if (payload.name) return payload.name;
  let name = '';
  if (payload.given_name) {
    name += payload.given_name;
  }
  if (payload.given_name && payload.family_name) {
    name += ` ${payload.family_name}`;
  }
  if (!payload.given_name && payload.family_name) {
    name += payload.family_name;
    return name;
  }
};
