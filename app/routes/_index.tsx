import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
import { screenshots } from "~/images";

export const meta: MetaFunction = () => {
  return [
    { title: "XMC" },
    { property: "og:title", content: "XMC" },
    {
      name: "description",
      content:
        "XMC is a small, whitelist-enabled, vanilla-compatible Minecraft server.",
    },
    {
      property: "og:image",
      content: "https://xmcnet.work/xmc-large.png",
    },
    {
      name: "theme-color",
      content: "#c961cc",
    },
  ];
};

export const linkClassName =
  "hover:underline text-fuchsia-600 dark:text-fuchsia-300";

export default function Index() {
  const month = new Date().getMonth();
  const december = month === 11;

  const candidates = screenshots.filter((s) =>
    december ? s.tags.includes("winter") : true,
  );
  const hero = candidates[Math.floor(Math.random() * candidates.length)];

  return (
    <div>
      <div className="bg-fuchsia-100 dark:bg-slate-800">
        <div className="flex flex-col-reverse sm:flex-row">
          <div className="sm:w-1/3">
            <h1 className="font-bold text-3xl">Welcome to XMC!</h1>
            <p className="mb-1">
              We're a vanilla Minecraft server that's been going strong since
              2019. You can apply in our Discord server by clicking the Join
              button.
            </p>
            <Link to="/discord">
              <button
                type="button"
                className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white transition py-1.5 px-4 rounded"
              >
                Join
              </button>
            </Link>
            <Link to="https://map.xmcnet.work" target="_blank">
              <button
                type="button"
                className="bg-purple-500 hover:bg-purple-600 text-white transition py-1.5 px-4 rounded ml-1"
              >
                Map <i className="ci-External_Link" />
              </button>
            </Link>
          </div>
          <div className="mb-2 sm:mb-0 sm:ml-2 relative sm:w-2/3">
            <p className="absolute top-2 left-2 text-sm bg-fuchsia-400/80 italic rounded px-2">
              {hero.author} <span className="opacity-60">{hero.year}</span>
            </p>
            <img
              src={hero.small ?? hero.large}
              className="rounded-lg w-full sm:shadow-lg border-2 border-fuchsia-400/20 dark:border-purple-400/20"
              alt={hero.alt}
              title={hero.alt}
            />
          </div>
        </div>
        <h1 className="font-bold text-2xl mt-4">Vanilla+</h1>
        <p>
          We have several server-side supplements that we believe enhance the
          vanilla experience and make it more enjoyable in the long term. See
          the{" "}
          <a
            href="https://docs.google.com/document/d/1DJsojmyY8hlaMkRiYvmJqpBqXefM-U2cZcUDKYaMi2o/edit"
            className={linkClassName}
            target="_blank"
            rel="noreferrer"
          >
            full list here
          </a>
          . You can always join the server with a completely vanilla client.
        </p>
        <h1 className="font-bold text-2xl mt-4">Bedrock</h1>
        <p>
          This is a Java server, but we also support Bedrock clients. To join on
          Bedrock, you must own a Java account and{" "}
          <a
            href="https://link.geysermc.org"
            className={linkClassName}
            target="_blank"
            rel="noreferrer"
          >
            link them through Geyser
          </a>
          . The Bedrock-specific server address is available in our Discord
          server.
        </p>
        {/* <h1 className="font-bold text-2xl mt-4">Map</h1>
      <div className="bg-fuchsia-200 dark:bg-slate-700 rounded-lg p-4">
        <p className="mb-2 -mt-2">
          <a
            className={linkClassName}
            href="https://map.xmcnet.work"
            target="_blank"
            rel="noreferrer"
          >
            Open in new tab
          </a>
        </p>
        <iframe
          src="https://map.xmcnet.work"
          title="Map"
          className="rounded-lg w-full aspect-square sm:h-96"
        />
      </div> */}
      </div>
    </div>
  );
}
