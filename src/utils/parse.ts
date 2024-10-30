export const parseVmList = (vmListString: string) => {
    const lines = vmListString.split('\n');
    const extractedNames = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        const parts = line.split('\\');
        const fileName = parts[parts.length - 1].replace('.vmx', '');

        if (fileName.trim() !== "") {
            extractedNames.push(fileName.trim());
        }
    }

    return extractedNames;
};