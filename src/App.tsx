import {useEffect, useState} from "react";
// import reactLogo from "./assets/react.svg";
// import {invoke} from "@tauri-apps/api/core";
import {open} from '@tauri-apps/plugin-dialog';
import "./App.css";
import {platform} from "@tauri-apps/plugin-os";

function App() {

    const [vmExePath, setVmExePath] = useState("C:\\Program Files (x86)\\VMware\\VMware Workstation\\vmrun.exe");
    const [osInfo, setOsInfo] = useState("");

    useEffect(() => {
        os_info(); // 在页面更新时运行os_info函数
    }, []);
    let os_info = async () => {
        const currentPlatform = await platform();
        console.log(currentPlatform);
        setOsInfo(currentPlatform)
    }

    async function choose_vmexe_path() {
        const path = await open(
            {
                multiple: false,
                directory: false,
            }
        );

        console.log(path)
        // @ts-ignore
        setVmExePath(path)
    }

    return (
        <main className="container">
            <h1>虚拟机管理系统</h1>

            <p>{osInfo}</p>
            <form className="row">
                <input
                    id="choose-vmexe-path"
                    onChange={(e) => setVmExePath(e.currentTarget.value)}
                    // placeholder={vmExePath}
                    value={vmExePath}
                />
                <button type="button" onClick={choose_vmexe_path}>VMRUN路径</button>
            </form>


        </main>
    );
}

export default App;
