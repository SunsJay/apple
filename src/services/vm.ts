import {invoke} from "@tauri-apps/api/core";

export const vmrunList = async (vmExePath: string) => {
    try {
        // @ts-ignore
        console.log(vmExePath);
        const res = await invoke('vmrun_list', vmExePath);
        console.log(res)
        return res
    } catch (error) {
        console.error('执行vmrun命令出错:', error);
        return "";
    }
};