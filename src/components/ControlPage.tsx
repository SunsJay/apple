import React, {useEffect} from 'react';
import {getVmNumbers, vmrunClone} from "../services/vm.ts";
import "../App.css";
// 控制页面
const ControlPage: React.FC<{
    maxRunNumbers: number,
    vmExePath: string,
    masterMacPath: string,
    sonMacPath: string,
    isCloning: boolean,
    vms: string[],
    runNumbers: number,
    setVms: React.Dispatch<React.SetStateAction<any[]>>
    setRunNumbers: React.Dispatch<React.SetStateAction<number>>
    setIsCloning: React.Dispatch<React.SetStateAction<boolean>>
}> = ({
          maxRunNumbers,
          vmExePath,
          masterMacPath,
          sonMacPath,
          isCloning,
          vms,
          runNumbers,
          setVms,
          setRunNumbers,
          setIsCloning
      }) => {


    const startClone = async () => {
        console.log('Starting clone...');
        try {
            // @ts-ignore
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
        }, 10000);

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