import Database from "@tauri-apps/plugin-sql";

export async function initDb(databaseUrl: string) {
    if (databaseUrl) {
        console.log(`URL: ${databaseUrl}`);
        return await Database.load(databaseUrl);
    }
}

export async function queryAppleID(databaseUrl: string, setRows: Function) {
    const db = await initDb(databaseUrl);
    // @ts-ignore
    const queriedRows = await db.select("SELECT * FROM im_id LIMIT 100");
    // @ts-ignore
    console.log(`Length: ${queriedRows.length}`);
    setRows(queriedRows);
}

export async function querySerialNumber(databaseUrl: string, setRows: Function) {
    const db = await initDb(databaseUrl);
    // @ts-ignore
    const queriedRows = await db.select("SELECT * FROM im_5ma LIMIT 100");
    // @ts-ignore
    console.log(`Length: ${queriedRows.length}`);
    setRows(queriedRows);
}