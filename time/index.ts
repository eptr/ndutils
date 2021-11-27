import * as os from 'os';
import * as sudo from 'sudo-prompt';
import * as moment from 'moment';
import {Buffer} from "buffer";

declare interface stdio {
    stdout: string | Buffer,
    stderr: string | Buffer
}

export class TimeUtils {

    private static execute(cmd: string,
                           option?: { name?: string, icns?: string, env?: { [key: string]: string } }) {
        return new Promise<stdio>((resolve, reject) => {
            sudo.exec(cmd, option || {},
                (error, stdout, stderr) => {
                    if (error) {
                        reject(error);
                    }
                    resolve({stdout: stdout, stderr: stderr});
                });
        });
    }

    static setClock(date?: Date,
                    option?: { name: string; icns?: string; env?: { [key: string]: string; }; }): Promise<stdio> {
        if (os.platform() == 'win32') {
            if (date) {
                const cmds = [
                    'net stop w32time',
                    `date ${moment(date).format('YYYY-MM-DD')}`,
                    `time ${moment(date).format('HH:mm:ss')}`];
                return this.execute(cmds.join('&'), option);
            } else {
                const cmds = [
                    'net start w32time',
                    'w32tm /resync'];
                return this.execute(cmds.join('&'), option);
            }
        } else if (os.platform() == 'darwin') {
            if (date) {
                const cmds = [
                    'systemsetup -setusingnetworktime off',
                    `date "${moment(date).format('MMDDHHmmyy')}"`
                ];
                return this.execute(cmds.join(';'), option);
            } else {
                const cmds = [
                    'systemsetup -setusingnetworktime on',
                    'sntp -sS time.apple.com'
                ];
                return this.execute(cmds.join(';'), option);
            }
        } else if (os.platform() == 'linux') {
            if (date) {
                const cmds = [
                    'timedatectl set-ntp false',
                    `date -s "${moment.utc(date).format('MM/DD/YYYY HH:mm:ss')}" --utc`,
                    'hwclock -w --utc'
                ];
                return this.execute(cmds.join(';'), option);
            } else {
                const cmds = ['timedatectl set-ntp true'];
                return this.execute(cmds.join(';'), option);
            }
        } else {
            return Promise.reject(new Error(`operating system ${os.platform()} not supported.`));
        }
    }
}
