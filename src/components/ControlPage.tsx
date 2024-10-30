import React, {useEffect, useState} from 'react';
import {vmrunClone} from "../services/vm.ts";

const ControlPage: React.FC<{
    maxRunNumbers: number,
    runNumbers: number,
    vmExePath: string,
    masterMacPath: string,
    sonMacPath: string
}> = ({
          maxRunNumbers,
          runNumbers,
          vmExePath,
          masterMacPath,
          sonMacPath
      }) => {
    const totalNumbers = 10;
    const [isCloning, setIsCloning] = useState(false);

    const startClone = async () => {
        if (isCloning || runNumbers >= maxRunNumbers) {
            return;
        }

        setIsCloning(true);

        try {
            await vmrunClone(vmExePath, masterMacPath, sonMacPath);
            console.log("Clone successful");
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
            if (isCloning) {
                startClone();
            }
        }, 30000);

        return () => clearInterval(interval);
    }, [runNumbers, maxRunNumbers, isCloning, startClone]);

    return (
        <div>
            <button type="button" onClick={startClone} disabled={isCloning || runNumbers >= maxRunNumbers}>
                {isCloning ? '克隆中...' : '启动克隆'}
            </button>
            <button type="button" onClick={stopClone}>停止克隆</button>

            <div>
                <p>虚拟机数量统计：</p>
                <p>总数： {totalNumbers}</p>
                <p>可用： {totalNumbers}</p>
                <p>静置中： {totalNumbers}</p>
                <p>已失效： {totalNumbers}</p>
            </div>

            <div>
                <p>运行实例状态：</p>
                <p>开机任务数： {runNumbers}</p>
                <p>执行任务中： {totalNumbers - runNumbers}</p>
                <p>初始化中： {totalNumbers - runNumbers}</p>
            </div>
        </div>
    );
}

export default ControlPage;
