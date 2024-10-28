import React from 'react';
import Database from "@tauri-apps/plugin-sql";


// @ts-ignore
const IDPage: React.FC<DBUrl> = async (dbUrl: string) => {
    const db = await Database.load(dbUrl);
    const res = await db.execute("SELECT * from im_id");
    console.log(res)

    return (
        <div>
            <p>苹果ID</p>
            <div style={{
                border: '1px solid black',
                padding: '10px',
                marginTop: '10px',
                position: 'relative',
                minHeight: '50px',
                boxSizing: 'border-box',
            }}>

            </div>


        </div>
    );
}

export default IDPage;
