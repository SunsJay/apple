import React, {useState} from "react";
import {open} from '@tauri-apps/plugin-dialog';

interface FileSelectorProps {
    defaultPath: string;
    onSelect: (path: string) => void;
}

const FileSelector: React.FC<FileSelectorProps> = ({defaultPath, onSelect}) => {
    const [selectedPath, setSelectedPath] = useState(defaultPath);

    const chooseFile = async () => {
        const path = await open({
            multiple: false,
            directory: false,
        });

        console.log(path);
        // @ts-ignore
        setSelectedPath(path);
        // @ts-ignore
        onSelect(path); // 调用父组件传入的回调函数，将选定的文件路径传递给父组件
    };

    return (
        <div>
            <input
                id="file-path"
                onChange={(e) => setSelectedPath(e.currentTarget.value)}
                value={selectedPath}
            />
            <button type="button" onClick={chooseFile}>选择文件</button>
        </div>
    );
}

export default FileSelector;
