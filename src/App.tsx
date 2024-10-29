import React, {useEffect, useState} from "react";
import "./App.css";
import {LocalConfigPage, ScriptConfigPage} from "./components/ConfigPages";
import ControlPage from "./components/ControlPage";
import MacListsPage from "./components/MacListsPage";
import {getDatabaseUrl, vmrunList} from "./utils/env.ts";
import SerialNumberPage from "./components/SerialNumberPage.tsx";
import IDPage from "./components/IDPage.tsx";
import {queryAppleID, querySerialNumber} from "./utils/db.ts";

const App: React.FC = () => {
    const [databaseUrl, setDatabaseUrl] = useState("");
    const [currentPage, setCurrentPage] = useState('控制台');
    const [vmExePath, setVmExePath] = useState("C:\\Program Files (x86)\\VMware\\VMware Workstation\\vmrun.exe");
    const [masterMacPath, setMasterMacPath] = useState("D:\\mupan");
    const [sonMacPath, setSonMacPath] = useState("D:\\zipan");
    const [appleIDs, setAppleIDs] = useState([]);
    const [serialNumbers, setSerialNumbers] = useState([]);

    useEffect(() => {
        vmrunList()
        getDatabaseUrl().then((res) => {
            setDatabaseUrl(res);
        });
    }, []);

    useEffect(() => {
        if (databaseUrl) {
            queryAppleID(databaseUrl, setAppleIDs);
            querySerialNumber(databaseUrl, setSerialNumbers);
        }
    }, [databaseUrl]);

    const handlePageChange = (page: string) => {
        setCurrentPage(page);
    };


    return (
        <main className="container">
            <header className="button-container">
                {['控制台', '本地配置', '脚本配置', '虚拟机', '苹果ID', '5码'].map(page => (
                    <button key={page} onClick={() => handlePageChange(page)}>{page}</button>
                ))}
            </header>

            <div>
                {currentPage === '控制台' && <ControlPage/>}
                {currentPage === '本地配置' &&
                    // @ts-ignore
                    <LocalConfigPage vmExePath={vmExePath} setVmExePath={setVmExePath} masterMacPath={masterMacPath}
                                     setMasterMacPath={setMasterMacPath} sonMacPath={sonMacPath}
                                     setSonMacPath={setSonMacPath}/>}
                {currentPage === '脚本配置' && <ScriptConfigPage/>}
                {currentPage === '虚拟机' && <MacListsPage/>}
                {currentPage === '5码' && <SerialNumberPage rows={serialNumbers}/>}
                {currentPage === '苹果ID' && <IDPage rows={appleIDs}/>}
            </div>
        </main>
    );
};

export default App;
