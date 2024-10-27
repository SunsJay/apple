import React, {useState} from "react";
import FileSelector from "./components/FileSelector.tsx"; // 引入 FileSelector 组件
import "./App.css";

const App: React.FC = () => {
    const [vmExePath, setVmExePath] = useState("C:\\Program Files (x86)\\VMware\\VMware Workstation\\vmrun.exe");
    const [masterMacPath, setMasterMacPath] = useState("D:\\mupan")


    return (
        <main className="container">
            <h1>虚拟机管理系统</h1>

            <form className="row">
                <FileSelector defaultPath={vmExePath} onSelect={(path: string) => setVmExePath(path)}
                              info={"选择vmrun路径"}
                              isDirectory={false} filters={[{
                    extensions: ["exe"],
                    name: "vmrun"
                }]}
                />

                <FileSelector defaultPath={masterMacPath} onSelect={(path: string) => setMasterMacPath(path)}
                              info={"选择母盘(vmx)文件"}
                              isDirectory={false}
                              filters={[{
                                  extensions: ["vmx"],
                                  name: ""
                              }]}

                />

                <FileSelector defaultPath={masterMacPath} onSelect={(path: string) => setMasterMacPath(path)}
                              info={"选择子盘存放目录"}
                              isDirectory={true}

                />
            </form>
        </main>
    );
}

export default App;