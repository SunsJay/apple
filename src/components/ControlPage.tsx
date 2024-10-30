import React from 'react';

const ControlPage: React.FC = () => {
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

    return (
        <div>
            <button>启动克隆</button>
            <div style={containerStyle}>
                <p style={statStyle}>虚拟机数量统计：</p>
                <p style={inlineStyle}>总数： {totalNumbers}</p>
                <p style={inlineStyle}>可用： {totalNumbers}</p>
                <p style={inlineStyle}>静置中： {totalNumbers}</p>
                <p style={inlineStyle}>已失效： {totalNumbers}</p>
            </div>

            <div style={containerStyle}>
                <p style={statStyle}>运行实例状态：</p>
                <p style={inlineStyle}>开机任务数： {totalNumbers}</p>
                <p style={inlineStyle}>执行任务中： {totalNumbers}</p>
                <p style={inlineStyle}>初始化中： {totalNumbers}</p>
            </div>
        </div>
    );
}

export default ControlPage;
