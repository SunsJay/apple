import {invoke} from "@tauri-apps/api/core";

export const vmrunList = async () => {
    try {
        const res = await invoke('vmrun_list');
        console.log(res)
        return res
    } catch (error) {
        console.error('执行vmrun命令出错:', error);
        return "";
    }
};