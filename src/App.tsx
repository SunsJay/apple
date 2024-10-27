import React, {useState} from "react";
import FileSelector from "./components/FileSelector.tsx"; // 引入 FileSelector 组件
import "./App.css";

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('fileSelector');


    const [vmExePath, setVmExePath] = useState("C:\\Program Files (x86)\\VMware\\VMware Workstation\\vmrun.exe");
    const [masterMacPath, setMasterMacPath] = useState("D:\\mupan")
    const [sonMacPath, setSonMacPath] = useState("D:\\zipan")
    // 定义页面1的组件

    const handlePageChange = (page: string) => {
        setCurrentPage(page);
    };
    const Page1 = () => {
        return (
            <div>
                <h1>This is Page 1</h1>
                <p>Welcome to Page 1</p>
            </div>
        );
    };
    const FileSelectorPage = () => {
        return (


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
        );
    }

    return (
        <main className="container">
            <h1>虚拟机管理系统</h1>

            <div className="button-container">
                <button onClick={() => handlePageChange('基础配置')}>Go to File Selector</button>
                <button onClick={() => handlePageChange('参数设置')}>Go to Page 1</button>
            </div>

            <div>
                {currentPage === '基础配置' && (
                    <FileSelectorPage/>
                )}
                {currentPage === '参数设置' && (
                    <Page1/>
                )}


            </div>


        </main>
    );
}

export default App;