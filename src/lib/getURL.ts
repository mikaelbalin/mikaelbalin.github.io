import canUseDOM from "#lib/canUseDOM";

const LOCAL_URL = "http://localhost:3000";

/**
 * Retrieves the server-side URL based on environment variables.
 *
 * This function first attempts to get the URL from the `NEXT_PUBLIC_SERVER_URL` environment variable.
 * If that is not set, it checks for the `VERCEL_PROJECT_PRODUCTION_URL` environment variable and constructs
 * a URL using that value.
 * If neither of these environment variables are set, it defaults to `http://localhost:3000`.
 *
 * @returns The server-side URL.
 */
export const getServerSideURL = (): string => {
  let url = null;

  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (!url) {
    url = LOCAL_URL;
  }

  return url;
};

/**
 * Retrieves the client-side URL.
 *
 * If running in a browser environment, constructs the URL using the current window location's protocol, hostname, and port.
 * If not running in a browser environment, attempts to use environment variables to determine the URL.
 *
 * @returns The client-side URL.
 */
export const getClientSideURL = (): string => {
  if (canUseDOM) {
    const protocol = window.location.protocol;
    const domain = window.location.hostname;
    const port = window.location.port;

    return `${protocol}//${domain}${port ? ":3000" : ""}`;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  return LOCAL_URL;
};
