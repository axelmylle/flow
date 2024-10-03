import type { Bindings } from "@/common/bindings";
import Typesense from "typesense";

export function SearchClient(envs: Bindings) {
  return new Typesense.Client({
    nodes: [
      {
        host: "localhost",
        port: 8108,
        protocol: "http",
      },
    ],
    apiKey: envs.TYPESENSE_API_KEY,
    connectionTimeoutSeconds: 2,
  });
}

export async function getHealthCheck(envs: Bindings) {
  const typesense = SearchClient(envs);
  const searchResponse = await typesense.health.retrieve();

  return {
    healthy:
      typeof searchResponse === "string" && JSON.parse(searchResponse).ok,
  };
}
