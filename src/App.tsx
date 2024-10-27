import React, {useState} from "react";
import FileSelector from "./components/FileSelector.tsx"; // 引入 FileSelector 组件
import "./App.css";

const App: React.FC = () => {
    const [vmExePath, setVmExePath] = useState("C:\\Program Files (x86)\\VMware\\VMware Workstation\\vmrun.exe");
    const [masterMacPath, setMasterMacPath] = useState("D:\\mupan")
    const [sonMacPath, setSonMacPath] = useState("D:\\zipan")
    // 定义页面1的组件
    const Page1 = () => {
        return (
            <div>
                <h1>This is Page 1</h1>
                <p>Welcome to Page 1</p>
            </div>
        );
    };

    const handleButtonClick = (page: string) => {
        // 实现页面跳转的逻辑，这里可以根据需要进行不同页面的跳转
        console.log(`Navigating to ${page}`)
        Page1()
    };
    return (
        <main className="container">
            <h1>虚拟机管理系统</h1>

            <div>
                <button onClick={() => handleButtonClick('page1')}>Go to Page 1</button>
                <button onClick={() => handleButtonClick('page2')}>Go to Page 2</button>
                <button onClick={() => handleButtonClick('page3')}>Go to Page 3</button>
            </div>

            <form className="row file-selectors-container">
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

                <FileSelector defaultPath={sonMacPath} onSelect={(path: string) => setSonMacPath(path)}
                              info={"选择子盘存放目录"}
                              isDirectory={true}

                />
            </form>
        </main>
    );
}

export default App;