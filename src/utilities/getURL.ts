import canUseDOM from "./canUseDOM";

/**
 * Retrieves the server-side URL based on environment variables.
 *
 * This function first attempts to get the URL from the `NEXT_PUBLIC_SERVER_URL` environment variable.
 * If that is not set, it checks for the `VERCEL_PROJECT_PRODUCTION_URL` environment variable and constructs
 * a URL using that value.
 * If neither of these environment variables are set, it defaults to `http://localhost:3000`.
 *
 * @returns {string} The server-side URL.
 */
export const getServerSideURL = (): string => {
  let url = process.env.NEXT_PUBLIC_SERVER_URL;

  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (!url) {
    url = "http://localhost:3000";
  }

  return url;
};

/**
 * Retrieves the client-side URL.
 *
 * If running in a browser environment, constructs the URL using the current window location's protocol, hostname, and port.
 * If not running in a browser environment, attempts to use environment variables to determine the URL.
 *
 * @returns {string} The client-side URL.
 */
export const getClientSideURL = (): string => {
  if (canUseDOM) {
    const protocol = window.location.protocol;
    const domain = window.location.hostname;
    const port = window.location.port;

    return `${protocol}//${domain}${port ? `:${port}` : ""}`;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  return process.env.NEXT_PUBLIC_SERVER_URL || "";
};
