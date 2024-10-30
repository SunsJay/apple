import {invoke} from "@tauri-apps/api/core";
import {parseVmList} from "../utils/parse.ts";

export const vmrunList = async (vmExePath: string) => {
    try {
        return await invoke('vmrun_list', {vmExePath: vmExePath});
    } catch (error) {
        console.error('VMRUN-LIST ERROR:', error);
        return ["", ""]; // 返回一个空数组或默认值，以便处理同步情况
    }
};


export const vmrunClone = async (vmExePath: string, masterMacPath: string, sonMacPath: string, maxRunNumbers: number) => {
    try {

        return await invoke('vmrun_clone', {
            vmExePath: vmExePath,
            masterMacPath: masterMacPath,
            sonMacPath: sonMacPath,
            maxRunNumbers: maxRunNumbers
        })
    } catch (error) {
        console.error('VMRUN-CLONE ERROR:', error);
        return "";
    }
};


export const getVmNumbers = async (vmExePath: string, setVms: Function, setRunNumbers: Function) => {
    const res = vmrunList(vmExePath)
    // @ts-ignore
    const extractedNames = parseVmList(res[0]);
    // @ts-ignore
    setVms(extractedNames);
    // @ts-ignore
    setRunNumbers(res[1]);


};