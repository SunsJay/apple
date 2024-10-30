import React, {useEffect, useState} from 'react';
import {vmrunClone} from "../services/vm.ts";

const ControlPage: React.FC<{
    maxRunNumbers: number,
    runNumbers: number,
    vmExePath: string
    masterMacPath: string,
    sonMacPath: string
}> = ({
          maxRunNumbers,
          runNumbers,
          vmExePath,
          masterMacPath,
          sonMacPath
      }) => {
    // 模拟虚拟机数量统计数据
    const totalNumbers = 10; // 假设有10台虚拟机


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

    const startClone = async () => {
        console.log("Start Clone");
        if (!isCloning && runNumbers < maxRunNumbers) {
            try {
                setIsCloning(true);
                console.log(isCloning, runNumbers, maxRunNumbers)
                await vmrunClone(vmExePath, masterMacPath, sonMacPath);
            } catch (error) {
                console.error('Error during cloning:', error);
                // Handle error, maybe show a message to the user
            } finally {
                setIsCloning(false);
            }
        }
    };

    const stopClone = () => {
        setIsCloning(false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (runNumbers >= maxRunNumbers) {
                setIsCloning(false);
                console.log('当前运行任务数已达到最大值:', runNumbers);
            }
        }, 30000);

        return () => clearInterval(interval);
    }, [runNumbers, maxRunNumbers]);

    return (
        <div>
            <button type="button" onClick={startClone}>启动克隆</button>
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
