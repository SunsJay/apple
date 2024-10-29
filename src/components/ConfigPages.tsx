import React from 'react';
// @ts-ignore
import FileSelector from './FileSelector.tsx';


const ScriptConfigPage: React.FC = () => {
    return (
        <div>
            <h1>脚本配置</h1>
        </div>
    );
};


const LocalConfigPage: React.FC = ({
                                       vmExePath,
                                       setVmExePath,
                                       masterMacPath,
                                       setMasterMacPath,
                                       sonMacPath,
                                       setSonMacPath,
                                       maxRunNumbers, setMaxRunNumbers
                                   }: any) => {
    return (
        <form className="row file-selectors-container">
            <div className="file-selector-wrapper">
                <label htmlFor="vmExePath">vmrun路径:</label>
                <FileSelector
                    defaultPath={vmExePath}
                    onSelect={(path: string) => setVmExePath(path)}
                    info={"选择"}
                    isDirectory={false}
                    filters={[{extensions: ["exe"], name: "vmrun"}]}
                />
            </div>

            <div className="file-selector-wrapper">
                <label htmlFor="masterMacPath">母盘目录:</label>
                <FileSelector
                    defaultPath={masterMacPath}
                    onSelect={(path: string) => setMasterMacPath(path)}
                    info={"选择"}
                    isDirectory={false}
                    filters={[{extensions: ["vmx"], name: ""}]}
                />
            </div>

            <div className="file-selector-wrapper">
                <label htmlFor="sonMacPath">子盘目录:</label>
                <FileSelector
                    defaultPath={sonMacPath}
                    onSelect={(path: string) => setSonMacPath(path)}
                    info={"选择"}
                    isDirectory={true}
                />
            </div>

            <div className="file-selector-wrapper">
                <label htmlFor="maxRunNumbers">最大运行数量:</label>
                <input
                    type="text"
                    value={maxRunNumbers}
                    onChange={(e) => setMaxRunNumbers(e.target.value)}
                />
            </div>
        </form>
    );
};

export {ScriptConfigPage, LocalConfigPage};
