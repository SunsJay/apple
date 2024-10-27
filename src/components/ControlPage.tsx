import React from 'react';

const ControlPage: React.FC = () => {
    // 模拟虚拟机数量统计数据
    const totalNumbers = 10; // 假设有10台虚拟机

    const statStyle: React.CSSProperties = {
        position: 'absolute',
        top: '-30px',
        backgroundColor: '#f6f6f6',
        padding: '5px',
        left: '10px', // 调整左边距以适应框的宽度
    };

    const inlineStyle: React.CSSProperties = {
        display: 'inline-block',
        marginRight: '20px', // 设置间距
    };

    return (
        <div>
            <p>控制台</p>
            <div style={{
                border: '1px solid black',
                padding: '10px',
                marginTop: '10px',
                position: 'relative',
                minHeight: '50px',
                boxSizing: 'border-box',
            }}>
                <p style={statStyle}>虚拟机数量统计：</p>
                <p style={inlineStyle}>总数： {totalNumbers}</p>
                <p style={inlineStyle}>可用： {totalNumbers}</p>
                <p style={inlineStyle}>静置中： {totalNumbers}</p>
                <p style={inlineStyle}>已失效： {totalNumbers}</p>
            </div>

            <div style={{
                border: '1px solid black',
                padding: '10px',
                marginTop: '10px',
                position: 'relative',
                minHeight: '50px',
                boxSizing: 'border-box',
            }}>
                <p style={statStyle}>运行实例状态：</p>
                <p style={inlineStyle}>开机任务数： {totalNumbers}</p>
                <p style={inlineStyle}>执行任务中： {totalNumbers}</p>
                <p style={inlineStyle}>初始化中： {totalNumbers}</p>
            </div>
        </div>
    );
}

export default ControlPage;
