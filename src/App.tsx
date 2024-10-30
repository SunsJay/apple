import React, {useEffect, useState} from "react";
import "./App.css";
import {LocalConfigPage, ScriptConfigPage} from "./components/ConfigPages";
import ControlPage from "./components/ControlPage";
import MacListsPage from "./components/MacListsPage";
import {getDatabaseUrl,} from "./utils/env.ts";
import SerialNumberPage from "./components/SerialNumberPage.tsx";
import IDPage from "./components/IDPage.tsx";
import {queryAppleID, querySerialNumber} from "./utils/db.ts";
import {vmrunList} from "./services/vm.ts";
import {handlePageChange} from "./utils/common.ts";

const App: React.FC = () => {
    const [databaseUrl, setDatabaseUrl] = useState("");
    const [currentPage, setCurrentPage] = useState('控制台');
    const [vmExePath, setVmExePath] = useState("C:\\Program Files (x86)\\VMware\\VMware Workstation\\vmrun.exe");
    const [masterMacPath, setMasterMacPath] = useState("D:\\mupan");
    const [sonMacPath, setSonMacPath] = useState("D:\\zipan");
    const [appleIDs, setAppleIDs] = useState([]);
    const [serialNumbers, setSerialNumbers] = useState([]);
    const [vms, setVms] = useState([]);
    const [runNumbers, setRunNumbers] = useState(0);
    const [maxRunNumbers, setMaxRunNumbers] = useState(5);

    // 解析 VM 列表字符串并提取文件名的函数
    const parseVmList = (vmListString: string) => {
        const lines = vmListString.split('\n');
        const extractedNames = [];

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            const parts = line.split('\\');
            const fileName = parts[parts.length - 1].replace('.vmx', '');

            if (fileName.trim() !== "") {
                extractedNames.push(fileName.trim());
            }
        }

        return extractedNames;
    };


    // 获取 VM 数量和数据库 URL 的 useEffect
    useEffect(() => {
        const getVmNumbers = async () => {
            const res = await vmrunList(vmExePath);
            // @ts-ignore
            const extractedNames = parseVmList(res[0]);


            // @ts-ignore
            setVms(extractedNames);
            // @ts-ignore
            setRunNumbers(res[1]);
        };

        const updateData = async () => {
            await getVmNumbers();
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
    return (
        <main className="container">
            <header className="button-container">
                {['控制台', '本地配置', '脚本配置', '虚拟机', '苹果ID', '5码'].map(page => (
                    <button key={page} onClick={() => handlePageChange(page, setCurrentPage)}>{page}</button>
                ))}
            </header>

            <div>
                {currentPage === '控制台' &&  // @ts-ignore
                    <ControlPage maxRunNumbers={maxRunNumbers}/>}
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
