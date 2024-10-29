import {invoke} from "@tauri-apps/api/core";

export const vmrunList = async (setVMs: Function) => {
    try {
        const res = await invoke('vmrun_list');
        setVMs(res)
    } catch (error) {
        console.error('执行vmrun命令出错:', error);
        return "";
    }
};