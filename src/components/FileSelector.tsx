import React, {useState} from "react";
import {open} from '@tauri-apps/plugin-dialog';

interface FileSelectorProps {
    defaultPath: string;
    onSelect: (path: string) => void;
    info: string,
    isDirectory: boolean,
    filters?: [
        {
            extensions: string[],
            name: string
        }
    ]
}

const FileSelector: React.FC<FileSelectorProps> = ({defaultPath, onSelect, info, isDirectory, filters}) => {
    const [selectedPath, setSelectedPath] = useState(defaultPath);

    const calculateWidth = (value: string) => {
        return value.length * 8 + 50; // 以每个字符占据 10px 宽度，再加上额外 50px
    };


    const chooseFile = async () => {
        // @ts-ignore
        const path = await open({
            multiple: false,
            directory: isDirectory,
            filters
        });

        console.log(path);
        // @ts-ignore
        setSelectedPath(path);
        // @ts-ignore
        onSelect(path); // 调用父组件传入的回调函数，将选定的文件路径传递给父组件
    };

    return (
        <div>
            <form className="row">

                <input
                    id="file-path"
                    style={{width: `${calculateWidth(selectedPath)}px`}}
                    onChange={(e) => setSelectedPath(e.currentTarget.value)}
                    value={selectedPath}
                />
                <button type="button" onClick={chooseFile}>{info}</button>
            </form>
        </div>
    );
}

export default FileSelector;
