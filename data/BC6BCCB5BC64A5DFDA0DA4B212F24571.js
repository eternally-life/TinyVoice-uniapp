var e = 'weapp_session_' + require('./C7D68300BC64A5DFA1B0EB0727C24571.js').WX_SESSION_MAGIC_ID,
    t = {
        get: function () {
            return uni.getStorageSync(e) || null;
        },
        set: function (t) {
            uni.setStorageSync(e, t);
        },
        clear: function () {
            uni.removeStorageSync(e);
        }
    };

module.exports = t;
