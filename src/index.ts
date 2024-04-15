import { DataSource } from "typeorm";
import { Country } from "./country";
import { CountryResolver } from "./CountryResolver";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { ContinentResolver } from "./ContinentResolver";
import { Continent } from "./continent";

async function startServer() {
  const dataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    entities: [Country, Continent],
    synchronize: true,
  });
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [CountryResolver, ContinentResolver],
  });
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server ready at : ${url}`);
}

startServer();
