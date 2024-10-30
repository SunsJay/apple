import React, {useEffect, useState} from 'react';
import {vmrunClone, vmrunList} from "../services/vm.ts";

const ControlPage: React.FC<{
    maxRunNumbers: number,
    vmExePath: string,
    masterMacPath: string,
    sonMacPath: string
}> = ({
          maxRunNumbers,
          vmExePath,
          masterMacPath,
          sonMacPath
      }) => {
    const [isCloning, setIsCloning] = useState(false);
    const [vms, setVms] = useState([]);
    const [runNumbers, setRunNumbers] = useState(0);

    const getVmNumbers = async () => {
        const res = await vmrunList(vmExePath);
        const extractedNames = parseVmList(res[0]);
        setVms(extractedNames);
        setRunNumbers(res[1]);
    };

    const startClone = async () => {
        if (isCloning || runNumbers >= maxRunNumbers) {
            return;
        }

        setIsCloning(true);

        try {
            await vmrunClone(vmExePath, masterMacPath, sonMacPath);
            console.log("Clone successful");
            getVmNumbers(); // 克隆成功后立即更新虚拟机数量信息
        } catch (error) {
            console.error('Error during cloning:', error);
        } finally {
            setIsCloning(false);
        }
    };

    const stopClone = () => {
        setIsCloning(false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            getVmNumbers();
        }, 5000); // 每5秒更新一次虚拟机数量信息

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (runNumbers < maxRunNumbers && !isCloning) {
            startClone();
        }
    }, [runNumbers, maxRunNumbers, isCloning, startClone]);

    return (
        <div>
            <button type="button" onClick={startClone} disabled={isCloning || runNumbers >= maxRunNumbers}>
                {isCloning ? '克隆中...' : '启动克隆'}
            </button>
            <button type="button" onClick={stopClone}>停止克隆</button>

            <div>
                <p>虚拟机数量统计：</p>
                <p>当前运行实例数： {runNumbers}</p>
                <p>最大实例数限制： {maxRunNumbers}</p>
            </div>

            <div>
                {vms.map((vm, index) => (
                    <p key={index}>{vm}</p>
                ))}
            </div>
        </div>
    );
}

export default ControlPage;
