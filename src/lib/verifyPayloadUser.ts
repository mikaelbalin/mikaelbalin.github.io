import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getPayload } from "payload";
import configPromise from "@payload-config";

const payloadToken = "payload-token";

export async function verifyPayloadUser(): Promise<{
  user?: string | jwt.JwtPayload;
  token?: string;
}> {
  const payload = await getPayload({ config: configPromise });

  const cookieStore = await cookies();
  const token = cookieStore.get(payloadToken)?.value;

  if (!token) {
    return {};
  }

  try {
    const user = jwt.verify(token, payload.secret);

    return { user, token };
  } catch (error) {
    payload.logger.error("Error verifying token for live preview:", error);

    return {};
  }
}
