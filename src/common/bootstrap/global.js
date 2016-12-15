/**
 * this file will be loaded before server started
 * you can define global functions used in controllers, models, templates
 */

/**
 * use global.xxx to define global functions
 *
 * global.fn1 = function(){
 *
 * }
 */
import ZMQ from 'zmq';
if (!global.sock) {
    think.log("ZMQ Version: " + ZMQ.version, "ZMQ");

    let sockUrl = think.config('zmq.url');
    let sock = ZMQ.socket('push');

    sock.bindSync(sockUrl);
    think.log("ZMQ binding " + sockUrl, "ZMQ");

    sock.sendAction = function (actionname, params) {
        let json = {
            type: actionname,
            params: params
        };
        sock.send(JSON.stringify(json));
    };
    think.log("register global success", "ZMQ");
    global.sock = sock;
}
