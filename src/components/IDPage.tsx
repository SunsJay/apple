import {JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, SetStateAction, useState} from 'react';
import "../css/IDPage.css";

// @ts-ignore
const IDPage = ({rows}) => {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentRows = rows.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(rows.length / itemsPerPage);

    const handlePageChange = (page: SetStateAction<number>) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <table className="id-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Apple ID</th>
                    <th>Password</th>
                </tr>
                </thead>
                <tbody>
                {currentRows.map((row: {
                    id: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
                    config_appleid: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
                    config_appleid_pwd: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
                }, index: Key | null | undefined) => (
                    <tr key={index}>
                        <td>{row.id}</td>
                        <td>{row.config_appleid}</td>
                        <td>{row.config_appleid_pwd}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                {Array.from({length: totalPages}, (_, index) => (
                    <button key={index} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default IDPage;
