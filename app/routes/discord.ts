import { Link, redirect } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";

export const loader: LoaderFunction = ({ context }) =>
  redirect(`https://discord.gg/${context.cloudflare.env.DISCORD_INVITE_CODE}`);
