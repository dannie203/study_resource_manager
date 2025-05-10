export const decodeFileName = (fileName: string): string | null => {
    // Validate invalid/blank filename 
    if(!fileName || fileName.length == 0) {
        console.error('stringHelper.decodeFileName() Invalid params!'); 
        return null; 
    }
    // Trim input to check whitespace
    if(fileName.trim().length == 0) {
        console.error('stringHelper.decodeFileName() Blank file name!'); 
        return null; 
    }

    return Buffer.from(fileName.trim(), 'latin1').toString('utf-8');
}
