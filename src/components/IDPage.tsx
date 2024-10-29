import {useState} from 'react';
import "../css/IDPage.css";

const IDPage = ({rows}) => {
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentRows = rows.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(rows.length / itemsPerPage);

    const handlePageChange = (page) => {
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
                {currentRows.map((row, index) => (
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
