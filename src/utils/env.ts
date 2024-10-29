import {invoke} from "@tauri-apps/api/core";

export const getDatabaseUrl = async (): Promise<string> => {
    try {
        const key = 'DATABASE_URL';
        return await invoke('get_env_var', {key});
    } catch (error) {
        console.error('获取数据库 URL 时出错:', error);
        return "";
    }
};


export const vmrunList = async () => {
    try {
        const res = await invoke('vmrun_list');
        console.log(res)
    } catch (error) {
        console.error('获取数据库 URL 时出错:', error);
        return "";
    }
};