import React, {useEffect, useState} from 'react';
import {getVmNumbers, vmrunClone} from "../services/vm.ts";

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

    const startClone = async () => {
        setIsCloning(true);

    };

    const stopClone = () => {
        setIsCloning(false);
    };


    useEffect(() => {
        const interval = setInterval(async () => {
            getVmNumbers(vmExePath, setVms, setRunNumbers);

            if (isCloning) {
                try {
                    await vmrunClone(vmExePath, masterMacPath, sonMacPath, maxRunNumbers);
                    console.log("Clone successful");
                    await getVmNumbers(vmExePath, setVms, setRunNumbers);
                } catch (error) {
                    console.error('Error during cloning:', error);
                }
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <button type="button" onClick={startClone}>
                {'启动克隆'}
            </button>
            <button type="button" onClick={stopClone}>
                {'停止克隆'}
            </button>

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
