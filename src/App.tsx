import {useState} from "react";
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

     function choose_vmexe_path() {
        const path =  open(
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
                <button onClick={choose_vmexe_path}>VMRUN路径</button>
            </form>
        </main>
    );
}

export default App;
