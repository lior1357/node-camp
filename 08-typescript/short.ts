
export function randomStr(len:number): string {
    const allowedChars:string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    let result:string = "";
    
    
    for(let i = 0; i < len; i++) {
        result += allowedChars[Math.floor(Math.random() * allowedChars.length)];
    }
    return result;
}

