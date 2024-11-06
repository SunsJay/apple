import Database from "@tauri-apps/plugin-sql";
import {invoke} from "@tauri-apps/api/core";
import {path} from "@tauri-apps/api";

export async function initDb(databaseUrl: string) {
    if (databaseUrl) {
        return await Database.load(databaseUrl);
    }
}

export async function queryAppleID(db: Database, setRows: Function) {
    // const db = await initDb(databaseUrl);
    // @ts-ignore
    const queriedRows = await db.select("SELECT * FROM im_id ");
    // @ts-ignore
    setRows(queriedRows);
}

export async function querySerialNumber(db: Database, setRows: Function) {
    // const db = await initDb(databaseUrl);
    // @ts-ignore
    const queriedRows = await db.select("SELECT * FROM im_5ma LIMIT 1000");
    setRows(queriedRows);
}


export async function getUnuseSerialNumber(db: Database) {
    // const db = await initDb(databaseUrl);

    // @ts-ignore
    const queriedRow = await db.select("SELECT * FROM im_5ma WHERE has_used is false  LIMIT 1 ");
    // @ts-ignore
    console.log(queriedRow)

    const updateQuery = "UPDATE im_5ma SET has_used = true WHERE id = ?";
    // @ts-ignore
    const updateParams = [queriedRow[0].id]; // 使用查询结果中的记录ID作为参数
    // @ts-ignore
    await db.execute(updateQuery, updateParams);

    const homePath = await path.homeDir();
    const filePath = await path.join(homePath, 'a.txt');


    // @ts-ignore
    const content = queriedRow[0].config_smuuid + ':' +  queriedRow[0].config_sn + ':' +queriedRow[0].config_rom + ':' + queriedRow[0].config_mlb + ':' + queriedRow[0].config_model;
    let res = await invoke('vmrun_write', {
        // @ts-ignore
        filePath: filePath, content:content

    })
    console.log(res)

}