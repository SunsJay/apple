import React, {useEffect, useState} from "react";
import "./App.css";
import {LocalConfigPage, ScriptConfigPage} from "./components/ConfigPages";
import ControlPage from "./components/ControlPage";
import MacListsPage from "./components/MacListsPage";
import {getDatabaseUrl} from "./utils/env.ts";
import SerialNumberPage from "./components/SerialNumberPage.tsx";
import Database from "@tauri-apps/plugin-sql";

const App: React.FC = () => {


    const [databaseUrl, setDatabaseUrl] = useState("");
    const [currentPage, setCurrentPage] = useState('控制台');
    const [vmExePath, setVmExePath] = useState("C:\\Program Files (x86)\\VMware\\VMware Workstation\\vmrun.exe");
    const [masterMacPath, setMasterMacPath] = useState("D:\\mupan");
    const [sonMacPath, setSonMacPath] = useState("D:\\zipan");
    const [rows, setRows] = useState([]);

    // const [id, setId] = useState(1)

    async function initDb() {
        if (databaseUrl) {
            console.log(`URL: ${databaseUrl}`);
            return await Database.load(databaseUrl);
        }
    }

    async function queryID() {
        const db = await initDb();
        return await db.select("SELECT  * FROM im_id")
    }

    // @ts-ignore
    useEffect(() => {

        // @ts-ignore
        getDatabaseUrl().then((res) =>
            setDatabaseUrl(res)
        )

        if (databaseUrl) {
            async function setupDB() {
                const queriedRows = await queryID();
                console.log(`Length: ${queriedRows.length}`);
                setRows(queriedRows);
            }

            setupDB();
        }
    }, [databaseUrl]);

    const handlePageChange = (page: string) => {
        setCurrentPage(page);
    };


    // @ts-ignore
    // @ts-ignore
    return (
        <main className="container">
            <header className="button-container">
                <button onClick={() => handlePageChange('控制台')}>控制台</button>
                <button onClick={() => handlePageChange('本地配置')}>本地配置</button>
                <button onClick={() => handlePageChange('脚本配置')}>脚本配置</button>
                <button onClick={() => handlePageChange('虚拟机')}>虚拟机列表</button>
                <button onClick={() => handlePageChange('苹果ID')}>苹果ID</button>
                <button onClick={() => handlePageChange('5码')}>5码</button>
            </header>
            <p>{databaseUrl}</p>

            <div>
                <h2>Auth Table Rows</h2>
                <h2>Queried Rows Length: {rows.length}</h2>
                <ul>
                    {
                        rows.map((row, index) => (
                            <li key={index}>
                                ID: {row.id}, AppleID: {row.config_appleid}, Pwd: {row.config_appleid_pwd}
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div>
                {currentPage === '控制台' && <ControlPage/>}
                {currentPage === '本地配置' && (
                    <LocalConfigPage
                        // @ts-ignore
                        vmExePath={vmExePath}
                        setVmExePath={setVmExePath}
                        masterMacPath={masterMacPath}
                        setMasterMacPath={setMasterMacPath}
                        sonMacPath={sonMacPath}
                        setSonMacPath={setSonMacPath}
                    />
                )}
                {currentPage === '脚本配置' && <ScriptConfigPage/>}
                {currentPage === '虚拟机列表' && <MacListsPage/>}
                {/*{currentPage === '苹果ID' && <IDPage dbUrl={databaseUrl}/>}*/}
                {currentPage === '5码' && <SerialNumberPage/>}
            </div>
        </main>
    );
};

export default App;
