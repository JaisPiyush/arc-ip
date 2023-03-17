import { DB } from "https://deno.land/x/sqlite/mod.ts";

export class KeyValueDB {
  readonly name: string;
  readonly db: DB;

  constructor(name: string) {
    this.name = name;
    this.db = new DB(name);
  }
}
