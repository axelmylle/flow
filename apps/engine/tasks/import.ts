import Typesense from "typesense";
import { getInstitutions } from "./get-institutions";

const typesense = new Typesense.Client({
  nodes: [
    {
      host: "localhost",
      port: 8108,
      protocol: "http",
    },
  ],
  apiKey: "xyz",
  numRetries: 3,
  connectionTimeoutSeconds: 120,
  logLevel: "debug",
});

const schema = {
  name: "institutions",
  num_documents: 0,
  fields: [
    {
      name: "name",
      type: "string",
      facet: false,
    },
    {
      name: "countries",
      type: "string[]",
      facet: true,
    },
    {
      name: "provider",
      type: "string",
      facet: true,
    },
    {
      name: "popularity",
      type: "int32",
      facet: false,
    },
  ],
  default_sorting_field: "popularity",
};

async function main() {
  const documents = await getInstitutions();
  console.log(documents);
  // await typesense.collections("institutions").delete();
  console.log("hi!!!!!");
  try {
    await typesense.collections().create(schema);
    await typesense
      .collections("institutions")
      .documents()
      .import(documents, { action: "upsert" });
  } catch (error) {
    // @ts-ignore
    console.log(error.importResults);
  }
}

main();
