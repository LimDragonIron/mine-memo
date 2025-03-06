import { JWT as OriginalJWT } from "next-auth/jwt";

interface JWT extends OriginalJWT {
    provider?: string;
}

interface NewToken {
    refresh_token: string;
    access_token: string;
    expires_at: number;
}
  
interface ServiceEnvDict {
    [key: string]: {
        [key: string]: string;
    };
}

const serviceEnvDict: ServiceEnvDict = {
    google: {
        endpoint: 'https://oauth2.googleapis.com/token',
        clientId: process.env.AUTH_GOOGLE_ID!,
        clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    },
    // Add other providers here
};
  
export async function getNewOauthTokens(token: JWT): Promise<NewToken> {
    if (!token.provider || !token.refresh_token) {
      throw new Error('Missing token.provider or token.refresh_token');
    }
  
    const response = await fetch(serviceEnvDict[token.provider].endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: serviceEnvDict[token.provider].clientId,
        client_secret: serviceEnvDict[token.provider].clientSecret,
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token,
      }),
    });
  
    const newTokens = await response.json();
  
    if (!response.ok) throw newTokens;
  
    return {
      refresh_token: newTokens.refresh_token ?? token.refresh_token,
      access_token: newTokens.access_token,
      expires_at: Math.floor(Date.now() / 1000) + Number(newTokens.expires_in),
    };
}

export async function updateOauthToken(token: JWT) {
    try {
      if (!token.email || !token.provider) {
        throw new Error('Missing token.email or token.provider');
      }
  
      const newTokens = await getNewOauthTokens(token);
  
      token.access_token = newTokens.access_token;
      token.expires_at = newTokens.expires_at;
      if (newTokens.refresh_token) {
        token.refresh_token = newTokens.refresh_token;
      }
  
      return token;
    } catch (error) {
      console.error(error);
      token.error = 'RefreshTokenError'; 
      return token;
    }
  }