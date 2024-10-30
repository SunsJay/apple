import {invoke} from "@tauri-apps/api/core";

export const vmrunList = async (vmExePath: string) => {
    try {
        // console.log(vm_exe_path);
        // @ts-ignore
        // console.log(res)
        return await invoke('vmrun_list', {vmExePath: vmExePath})
    } catch (error) {
        console.error('VMRUN-LIST ERROR:', error);
        return "";
    }
};


export const vmrunClone = async (vmExePath: string, masterMacPath: string, sonMacPath: string) => {
    try {

        return await invoke('vmrun_clone', {vmExePath, masterMacPath, sonMacPath})
    } catch (error) {
        console.error('VMRUN-CLONE ERROR:', error);
        return "";
    }
};