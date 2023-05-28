// import { Kysely } from "kysely";
// import { PlanetScaleDialect } from "kysely-planetscale";
// import SqlString from "sqlstring";
// import type { UserType } from "./zod";

// type Database = {
//   User: UserType;
// };

// export const db = new Kysely<Database>({
//   dialect: new PlanetScaleDialect({
//     url: process.env.DATABASE_URL,
//     format: SqlString.format,
//   }),
// });

import { PrismaClient } from "@prisma/client/edge";

export const getDB = (
  env: QwikCityPlatform["env"] & { get: (arg0: string) => string | undefined }
) => {
  return new PrismaClient({
    datasources: {
      db: {
        url: env.get("DATABASE_URL"),
      },
    },
  });
};
