import { SignJWT } from "jose";

const secret = new TextEncoder().encode("my_learning_secret");

export const generateToken = async ({ email = null, provider = "email" }) => {

  const payload = { provider };

  if (email) payload.email = email;

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);

  return token;
};