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

    const statStyle: React.CSSProperties = {
        position: 'absolute',
        top: '-30%',
        left: '10%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#f6f6f6',
        padding: '5px',
    };

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid black',
        padding: '10px',
        marginTop: '10px',
        position: 'relative',
        minHeight: '50px',
        boxSizing: 'border-box',
    };

    const inlineStyle: React.CSSProperties = {
        display: 'inline-block',
        margin: '0 20px',
    };

    const [isCloning, setIsCloning] = useState(false);

    const cloneVM = async () => {
        if (runNumbers < maxRunNumbers) {
            try {
                await vmrunClone(vmExePath, masterMacPath, sonMacPath);
                console.log("Clone successful");
            } catch (error) {
                setIsCloning(false)
                console.error('Error during cloning:', error);
            }
        }
    };

    const stopClone = () => {
        setIsCloning(false);
    };

    const startClone = () => {
        setIsCloning(true);

    }

    useEffect(() => {
        const interval = setInterval(() => {

            if (isCloning) {
                cloneVM();
            }

        }, 30000);

        return () => clearInterval(interval);
    }, [runNumbers, maxRunNumbers, isCloning, cloneVM]);

    return (
        <div>
            <button type="button" onClick={startClone}>
                启动克隆
            </button>
            <button type="button" onClick={stopClone}>停止克隆</button>
            <div style={containerStyle}>
                <p style={statStyle}>虚拟机数量统计：</p>
                <p style={inlineStyle}>总数： {totalNumbers}</p>
                <p style={inlineStyle}>可用： {totalNumbers}</p>
                <p style={inlineStyle}>静置中： {totalNumbers}</p>
                <p style={inlineStyle}>已失效： {totalNumbers}</p>
            </div>

            <div style={containerStyle}>
                <p style={statStyle}>运行实例状态：</p>
                <p style={inlineStyle}>开机任务数： {runNumbers}</p>
                <p style={inlineStyle}>执行任务中： {totalNumbers - runNumbers}</p>
                <p style={inlineStyle}>初始化中： {totalNumbers - runNumbers}</p>
            </div>
        </div>
    );
}

export default ControlPage;
