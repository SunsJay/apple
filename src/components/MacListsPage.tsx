import React from 'react';
import "../css/IDPage.css";


// @ts-ignore
const MacListsPage: React.FC = ({rows}) => {

    return (
        <div>
            <p>虚拟机信息列表</p>
            <table className="id-table">
                <thead>
                <tr>
                    <th>名称</th>
                    <th>数量</th>

                </tr>
                </thead>
                <tbody>
                {rows.map((row: (string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined)[], index: React.Key | null | undefined) => (
                    <tr key={index}>
                        <td>{row[0]}</td>
                        <td>{row[1]}</td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default MacListsPage;
