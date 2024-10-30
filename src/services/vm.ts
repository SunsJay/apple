import {invoke} from "@tauri-apps/api/core";

export const vmrunList = async (vm_exe_path: string) => {
    try {
        // console.log(vm_exe_path);
        // @ts-ignore
        // console.log(res)
        return await invoke('vmrun_list', {vmExePath: vm_exe_path})
    } catch (error) {
        console.error('执行vmrun命令出错:', error);
        return "";
    }
};
