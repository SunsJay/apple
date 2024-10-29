import {invoke} from "@tauri-apps/api/core";

export const vmrunList = async () => {
    try {
        return await invoke('vmrun_list')
    } catch (error) {
        console.error('执行vmrun命令出错:', error);
        return "";
    }
};