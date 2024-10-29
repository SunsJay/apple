import React, {useState} from "react";
import "../css/IDPage.css";

interface Row {
    id: number;
    config_smuuid: string;
    config_mlb: string;
    config_rom: string;
    config_sn: string;
    config_model: string;
}

const ITEMS_PER_PAGE = 10; // 每页显示的数据条数

const SerialNumberPage: React.FC<{ rows: Row[] }> = ({rows}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > Math.ceil(rows.length / ITEMS_PER_PAGE)) {
            return;
        }
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <table className="id-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>smuuid</th>
                    <th>mlb</th>
                    <th>rom</th>
                    <th>sn</th>
                    <th>model</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((row, index) => (
                    <tr key={index}>
                        <td>{row.id}</td>
                        <td>{row.config_smuuid}</td>
                        <td>{row.config_mlb}</td>
                        <td>{row.config_rom}</td>
                        <td>{row.config_sn}</td>
                        <td>{row.config_model}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>上一页</button>
                <span>当前页：{currentPage}</span>
                <button onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === Math.ceil(rows.length / ITEMS_PER_PAGE)}>下一页
                </button>
                <input type="number" value={currentPage} onChange={(e) => setCurrentPage(parseInt(e.target.value))}/>
                <button onClick={() => paginate(currentPage)}>跳转</button>
            </div>
        </div>
    );
};

export default SerialNumberPage;
