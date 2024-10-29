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

const App: React.FC = () => {
    const [databaseUrl, setDatabaseUrl] = useState("");
    const [currentPage, setCurrentPage] = useState('控制台');
    const [vmExePath, setVmExePath] = useState("C:\\Program Files (x86)\\VMware\\VMware Workstation\\vmrun.exe");
    const [masterMacPath, setMasterMacPath] = useState("D:\\mupan");
    const [sonMacPath, setSonMacPath] = useState("D:\\zipan");
    const [appleIDs, setAppleIDs] = useState([]);
    const [serialNumbers, setSerialNumbers] = useState([]);
    const [vms, setVms] = useState([]);

    useEffect(() => {
        const getVmNumbers = async () => {

            const res = await vmrunList();
            // 将字符串按行分割
            // @ts-ignore
            const lines = res[0].split('\n');

            const extractedNames: string[] = [];

            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim(); // 去除首尾空格
                const parts = line.split('\\'); // 将路径按斜杠分割
                const fileName = parts[parts.length - 1].replace('.vmx', ''); // 获取最后一个斜杠后的文件名（去掉.vmx后缀）
                extractedNames.push(fileName); // 将提取出来的文件名保存到数组中
            }

            console.log(extractedNames); // 输出提取出来的文件名数组
           

            // @ts-ignore
            setVms(res)
        }

        getVmNumbers();

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


    // @ts-ignore
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
                {currentPage === '虚拟机' && <MacListsPage rows={vms}/>}
                {currentPage === '5码' && <SerialNumberPage rows={serialNumbers}/>}
                {currentPage === '苹果ID' && <IDPage rows={appleIDs}/>}
            </div>
        </main>
    );
};

export default App;
