import {TimeUtils} from "./index";
import * as moment from 'moment';

const time = new Date()
time.setMonth(10, 11);
time.setHours(11, 11, 11);

TimeUtils.setClock(time, {name: 'ndutils settime'}).then(std => {
    console.log(`system time should be ${moment(time).format("YYYY-MM-DD HH:mm:ss")}, it will recover in 10s.`);
    if (std && std.stdout && std.stdout.length) {
        console.log('stdout:', std.stdout);
    }
    if (std && std.stderr && std.stderr.length) {
        console.log('stderr:', std.stderr);
    }
    setTimeout(() => {
        TimeUtils.setClock(null, {name: 'ndutils recovery'}).then((std) => {
            if (std && std.stdout && std.stdout.length) {
                console.log('stdout:', std.stdout);
            }
            if (std && std.stderr && std.stderr.length) {
                console.log('stderr:', std.stderr);
            }
            console.log('system time recovered by ntp.');
        }).catch((error) => {
            console.log('system time recover failed,', error);
        })
    }, 10000)
}).catch((error) => {
    console.log('system time set failed,', error);
})


//TimeUtils.setClock