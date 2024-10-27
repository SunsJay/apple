import {useState} from "react";
import reactLogo from "./assets/react.svg";
import {invoke} from "@tauri-apps/api/core";
import {open} from '@tauri-apps/plugin-dialog';
import "./App.css";

function App() {
    const [greetMsg, setGreetMsg] = useState("");
    const [name, setName] = useState("");
    const [vmExePath, setVmExePath] = useState("C:\\Program Files (x86)\\VMware\\VMware Workstation\\vmrun.exe");

    async function greet() {
        // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
        setGreetMsg(await invoke("greet", {name}));
    }

    async function open_folder() {
        const folder = await open(
            {
                multiple: false,
                directory: true
            }
        );

        setVmExePath(folder)
    }

    return (
        <main className="container">
            <h1>虚拟机管理系统</h1>


            <form
                className="row"

            >


                <input
                    id="choose-vmexe-path"
                    onChange={(e) => setVmExePath(e.currentTarget.value)}
                    placeholder={vmExePath}
                />
                <button onClick={open_folder}>VMRUN路径</button>
            </form>
        </main>
    );
}

export default App;
