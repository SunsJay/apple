import React, {useEffect} from "react";
import "./App.css";
import {LocalConfigPage, ScriptConfigPage} from "./components/ConfigPages";
import ControlPage from "./components/ControlPage";
import MacListsPage from "./components/MacListsPage";
import {getDatabaseUrl,} from "./utils/env.ts";
import SerialNumberPage from "./components/SerialNumberPage.tsx";
import IDPage from "./components/IDPage.tsx";
import {queryAppleID, querySerialNumber} from "./utils/db.ts";
import {handlePageChange} from "./utils/common.ts";
import {useAppState} from "./model/useAppState.ts";
import {getVmNumbers} from "./services/vm.ts";

const App: React.FC = () => {
    const {
        databaseUrl, setDatabaseUrl,
        currentPage, setCurrentPage,
        vmExePath, setVmExePath,
        masterMacPath, setMasterMacPath,
        sonMacPath, setSonMacPath,
        appleIDs, setAppleIDs,
        serialNumbers, setSerialNumbers,
        vms, setVms,
        runNumbers, setRunNumbers,
        isCloning, setIsCloning,
        maxRunNumbers, setMaxRunNumbers
    } = useAppState();

    useEffect(() => {
        const updateRunNumbers = async () => {
            await getVmNumbers(vmExePath, setVms, setRunNumbers);
        }

        updateRunNumbers().then(() => console.log('Update VM List'))
    }, [])
    // 获取 VM 数量和数据库 URL 的 useEffect
    useEffect(() => {


        const updateData = async () => {
            // await getVmNumbers();
            const dbUrl = await getDatabaseUrl();
            setDatabaseUrl(dbUrl);
        };

        updateData();

        const interval = setInterval(() => {
            updateData();
        }, 10000); // 每隔 60 秒更新一次

        return () => clearInterval(interval); // 清除定时器
    }, [vmExePath]);

    useEffect(() => {
        if (databaseUrl) {
            queryAppleID(databaseUrl, setAppleIDs);
            querySerialNumber(databaseUrl, setSerialNumbers);
        }
    }, [databaseUrl]);


    // @ts-ignore
    // @ts-ignore
    return (
        <main className="container">
            <header className="button-container">
                {['控制台', '本地配置', '脚本配置', '虚拟机', '苹果ID', '5码'].map(page => (
                    <button key={page} onClick={() => handlePageChange(page, setCurrentPage)}>{page}</button>
                ))}
            </header>

            <div>
                {currentPage === '控制台' &&  // @ts-ignore
                    <ControlPage maxRunNumbers={maxRunNumbers} runNumbers={runNumbers} masterMacPath={masterMacPath}
                                 sonMacPath={sonMacPath} vmExePath={vmExePath} setRunNumbers={setRunNumbers}
                                 vms={vms} isCloning={isCloning}
                        // @ts-ignore
                                 setVms={setVms}
                                 setIsCloning={setIsCloning}/>}
                {currentPage === '本地配置' &&
                    // @ts-ignore
                    <LocalConfigPage vmExePath={vmExePath} setVmExePath={setVmExePath} masterMacPath={masterMacPath}
                                     setMasterMacPath={setMasterMacPath} sonMacPath={sonMacPath}
                                     setSonMacPath={setSonMacPath} maxRunNumbers={maxRunNumbers}
                                     setMaxRunNumbers={setMaxRunNumbers}/>}
                {currentPage === '脚本配置' && <ScriptConfigPage/>}

                {currentPage === '虚拟机' &&
                    // @ts-ignore
                    <MacListsPage rows={vms} runNumbers={runNumbers}/>}
                {currentPage === '5码' && <SerialNumberPage rows={serialNumbers}/>}
                {currentPage === '苹果ID' && <IDPage rows={appleIDs}/>}
            </div>
        </main>
    );
};

export default App;
