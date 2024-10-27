import {useEffect, useState} from "react";
// import reactLogo from "./assets/react.svg";
// import {invoke} from "@tauri-apps/api/core";
import {open} from '@tauri-apps/plugin-dialog';
import "./App.css";

function App() {

    const [vmExePath, setVmExePath] = useState("C:\\Program Files (x86)\\VMware\\VMware Workstation\\vmrun.exe");
    // async function greet() {
    //     // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    //     setGreetMsg(await invoke("greet", {name}));
    // }

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
        close()
    }

    useEffect(() => {
        // 在vmExePath值变化时执行刷新操作
        console.log("vmExePath值发生变化:", vmExePath);
        // 在这里可以执行刷新组件的操作
    }, [vmExePath]);

    return (
        <main className="container">
            <h1>虚拟机管理系统</h1>


            <form
                className="row"

            >
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
