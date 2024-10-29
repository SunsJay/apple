import "../css/IDPage.css"

const IDPage = ({rows}) => {
    return (
        <table className="id-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Apple ID</th>
                <th>Password</th>
            </tr>
            </thead>
            <tbody>
            {rows.map((row, index) => (
                <tr key={index}>
                    <td>{row.id}</td>
                    <td>{row.config_appleid}</td>
                    <td>{row.config_appleid_pwd}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default IDPage;