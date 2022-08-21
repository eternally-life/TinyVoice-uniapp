function n(n) {
    n ? ((e = n.onOpen), (t = n.onClose), (r = n.onMessage), (u = n.onError)) : ((e = o), (t = o), (r = o), (u = o));
}

var o = function () {},
    e = void 0,
    t = void 0,
    r = void 0,
    u = void 0;

n(null),
    uni.onSocketOpen(function (n) {
        return e(n);
    }),
    uni.onSocketClose(function (n) {
        return t(n);
    }),
    uni.onSocketMessage(function (n) {
        return r(n);
    }),
    uni.onSocketError(function (n) {
        return u(n);
    }),
    (module.exports = {
        listen: n
    });
