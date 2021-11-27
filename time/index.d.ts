import * as Buffer from "buffer";

declare interface stdio {
    stdout: string | Buffer,
    stderr: string | Buffer
}

declare class TimeUtils {
    static setClock(date?: Date,
                    option?: { name?: string, icns?: string, env?: { [key: string]: string } }): Promise<any>;
}