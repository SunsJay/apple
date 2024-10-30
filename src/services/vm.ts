import {invoke} from "@tauri-apps/api/core";

export const vmrunList = async (vmExePath: string) => {
    try {
        // console.log(vm_exe_path);
        // @ts-ignore
        // console.log(res)
        return await invoke('vmrun_list', {vmExePath: vmExePath})
    } catch (error) {
        console.error('执行vmrun命令出错:', error);
        return "";
    }
};
