import React, {useState} from "react";
import "./App.css";
import {LocalConfigPage, ScriptConfigPage} from "./components/ConfigPages";
import ControlPage from "./components/ControlPage";
import MacListsPage from "./components/MacListsPage";
import {store} from "./utils/store.ts";

const App: React.FC = () => {

    store();
    const [currentPage, setCurrentPage] = useState('控制台');
    const [vmExePath, setVmExePath] = useState("C:\\Program Files (x86)\\VMware\\VMware Workstation\\vmrun.exe");
    const [masterMacPath, setMasterMacPath] = useState("D:\\mupan");
    const [sonMacPath, setSonMacPath] = useState("D:\\zipan");

    const handlePageChange = (page: string) => {
        setCurrentPage(page);
    };


    return (
        <main className="container">
            <header className="button-container">
                <button onClick={() => handlePageChange('控制台')}>控制台</button>
                <button onClick={() => handlePageChange('本地配置')}>本地配置</button>
                <button onClick={() => handlePageChange('脚本配置')}>脚本配置</button>
                <button onClick={() => handlePageChange('虚拟机列表')}>虚拟机列表</button>
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
                {currentPage === '虚拟机列表' && <MacListsPage/>}
            </div>
        </main>
    );
};

export default App;
