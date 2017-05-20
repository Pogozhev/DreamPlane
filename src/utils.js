module.exports = {
    validNick: function(nickname){
        var regex = /^\w*$/;
        return regex.exec(nickname) !== null;
    },
    findIndex: function(arr, id) {
        var len = arr.length;

        while (len--) {
            if (arr[len].id === id) {
                return len;
            }
        }

        return -1;
    },
    sanitizeString: function(message){
        return message.replace(/(<([^>]+)>)/ig,'').substring(0, 100);
    }
}