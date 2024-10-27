import React, {useState} from "react";
import FileSelector from "./components/FileSelector.tsx"; // 引入 FileSelector 组件
import "./App.css";

const App: React.FC = () => {
    const [vmExePath, setVmExePath] = useState("C:\\Program Files (x86)\\VMware\\VMware Workstation\\vmrun.exe");

    const handleFileSelect = (path: string) => {
        setVmExePath(path);
    };

    return (
        <main className="container">
            <h1>虚拟机管理系统</h1>

            <FileSelector defaultPath={vmExePath} onSelect={handleFileSelect}/>

        </main>
    );
}

export default App;