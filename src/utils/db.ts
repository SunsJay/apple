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
    const queriedRows = await db.select("SELECT * FROM im_id WHERE has_used = false LIMIT 1 FOR UPDATE");

    const updateQuery = "UPDATE im_id SET has_used = true WHERE id = ?";
    // @ts-ignore
    const updateParams = [queriedRows[0].id]; // 使用查询结果中的记录ID作为参数
    // @ts-ignore
    console.log(`Length: ${queriedRows.length}`);
    setRows(queriedRows);

    // @ts-ignore
    const queriedRows = await db.execute(updateQuery, updateParams);
    // @ts-ignore
    console.log(queriedRows[0].id)


}

export async function querySerialNumber(databaseUrl: string, setRows: Function) {
    const db = await initDb(databaseUrl);
    // @ts-ignore
    const queriedRows = await db.select("SELECT * FROM im_5ma LIMIT 100");
    // @ts-ignore
    console.log(`Length: ${queriedRows.length}`);
    setRows(queriedRows);
}


export async function getUnuseSerialNumber(databaseUrl: string, setRows: Function) {
    const db = await initDb(databaseUrl);
    // @ts-ignore
    const queriedRows = await db.select("SELECT * FROM im_5ma WHERE has_used is false  LIMIT 1 ");
    // @ts-ignore
    console.log(`Length: ${queriedRows.length}`);
    setRows(queriedRows);
}