import React, {useState} from "react";
import "./App.css";
import {LocalConfigPage, ScriptConfigPage} from "./components/ConfigPages";
import ControlPage from "./components/ControlPage.tsx";

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('控制台');


    const [vmExePath, setVmExePath] = useState("C:\\Program Files (x86)\\VMware\\VMware Workstation\\vmrun.exe");
    const [masterMacPath, setMasterMacPath] = useState("D:\\mupan")
    const [sonMacPath, setSonMacPath] = useState("D:\\zipan")
    // 定义页面1的组件

    const handlePageChange = (page: string) => {
        setCurrentPage(page);
    };


    // @ts-ignore
    return (
        <main className="container">

            <header className="button-container">
                <button onClick={() => handlePageChange('控制台')}>控制台</button>
                <button onClick={() => handlePageChange('本地配置')}>本地配置</button>
                <button onClick={() => handlePageChange('脚本配置')}>脚本配置</button>
            </header>


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
            </div>


        </main>
    );
}

export default App;