import React from 'react';
import "../css/IDPage.css";


// @ts-ignore
const MacListsPage: React.FC = ({rows, runNumbers}) => {

    return (
        <div>
            <p>虚拟机信息列表</p>
            <p>正在运行的虚拟机数量： {runNumbers}</p>
            <table className="id-table">
                <thead>
                <tr>
                    <th>名称</th>
                    <th>状态</th>

                </tr>
                </thead>
                <tbody>
                {rows.map((row: [string, number], index: React.Key | null | undefined) => (
                    <tr key={index}>
                        <td>{row}</td>

                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    );
}

export default MacListsPage;
