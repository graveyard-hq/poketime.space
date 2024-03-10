import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useState } from "react";

import { Theme } from "~/utils/getTheme";
import { useTheme } from "./hooks/useTheme";
import styles from "~/styles/index.css";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: styles },
];

export const Root: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  useTheme(setTheme);

  return (
    <html
      lang="en"
      className={theme === Theme.DARK ? "bg-[#111111]" : "bg-white"}
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="title" content="PokeTime" />
        <meta name="description" content="Poking through time and space!" />
        <meta name="theme-color" content="#ed409f" />

        <link rel="icon" href="/logo.png" />
        <title>PokeTime</title>

        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default Root;
