import { HomeOG } from "@/components/og/HomeOG";
import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { getServerSideURL } from "@/utilities/getURL";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const hasTitle = searchParams.has("title");
    const param = hasTitle ? searchParams.get("title")! : getServerSideURL();
    const title = param.length > 17 ? `${param.slice(0, 17)} ...` : param;

    const fontPath = join(process.cwd(), "public/Inter_24pt-Regular.ttf");
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
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log(String(e));
    }
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
