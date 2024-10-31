import {useState} from 'react';

export const useAppState = () => {
    const [databaseUrl, setDatabaseUrl] = useState("");
    const [currentPage, setCurrentPage] = useState('控制台');
    const [vmExePath, setVmExePath] = useState("C:\\Program Files (x86)\\VMware\\VMware Workstation\\vmrun.exe");
    const [masterMacPath, setMasterMacPath] = useState("D:\\MUPAN2\\MUPAN2.vmx");
    const [sonMacPath, setSonMacPath] = useState("D:\\zipan");
    const [appleIDs, setAppleIDs] = useState([]);
    const [serialNumbers, setSerialNumbers] = useState([]);
    const [vms, setVms] = useState([]);
    const [runNumbers, setRunNumbers] = useState(0);
    const [maxRunNumbers, setMaxRunNumbers] = useState('8');

    return {
        databaseUrl, setDatabaseUrl,
        currentPage, setCurrentPage,
        vmExePath, setVmExePath,
        masterMacPath, setMasterMacPath,
        sonMacPath, setSonMacPath,
        appleIDs, setAppleIDs,
        serialNumbers, setSerialNumbers,
        vms, setVms,
        runNumbers, setRunNumbers,
        maxRunNumbers, setMaxRunNumbers
    };
};
