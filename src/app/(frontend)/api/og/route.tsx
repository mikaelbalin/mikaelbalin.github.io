import { HomeOG } from "@/components/og/HomeOG";
import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { getServerSideURL } from "@/utilities/getURL";
import { verifyPayloadUser } from "@/utilities/verifyPayloadUser";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export async function GET(req: Request): Promise<Response> {
  const { user } = await verifyPayloadUser();

  if (!user) {
    return new Response(null, {
      status: 404,
    });
  }

  const payload = await getPayload({ config: configPromise });

  try {
    const { searchParams } = new URL(req.url);

    const hasTitle = searchParams.has("title");
    const param = hasTitle ? searchParams.get("title")! : getServerSideURL();
    const title = param.length > 17 ? `${param.slice(0, 17)} ...` : param;

    const fontPath = join(process.cwd(), "public/fonts/Inter_24pt-Regular.ttf");
    const fontData = await readFile(fontPath);

    return new ImageResponse(<HomeOG title={title} />, {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    });
  } catch (err) {
    payload.logger.error("Error verifying token for image generation:", err);

    return new Response("Failed to generate the image", {
      status: 500,
    });
  }
}
