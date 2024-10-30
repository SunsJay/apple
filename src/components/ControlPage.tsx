import React, {useEffect, useState} from 'react';
import {getVmNumbers, vmrunClone} from "../services/vm.ts";
import "../App.css";
// 控制页面
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
        console.log('Starting clone...');
        try {
            const res = await vmrunClone(vmExePath, masterMacPath, sonMacPath, maxRunNumbers);
            if (res === "limit") {
                console.log("Clone limit");
            }
            console.log("Clone successful");
        } catch (error) {
            console.error('Error during cloning:', error);
        }
    };

    const stopClone = () => {
        console.log('Stopping clone...');
        setIsCloning(false);
    };

    useEffect(() => {
        const interval = setInterval(async () => {
            await getVmNumbers(vmExePath, setVms, setRunNumbers);

            if (isCloning) {
                startClone().then(() => {
                    getVmNumbers(vmExePath, setVms, setRunNumbers);
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isCloning]);

    return (
        <div>
            <button type="button" className="button-start" onClick={() => setIsCloning(true)}
                    disabled={runNumbers >= maxRunNumbers || isCloning}>
                {isCloning ? '克隆中...' : '启动克隆'}
            </button>
            <button type="button" className="button-stop" onClick={stopClone} disabled={!isCloning}>
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