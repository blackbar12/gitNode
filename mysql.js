var mysql = require('mysql');
var db_info = {
    host: '121.136.208.16',
    port: '51934',
    user: 'root',
    password: 'jtsadmin',
    database: 'site_database'
}

module.exports = {
    init: function () {
        return mysql.createConnection(db_info);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected!');
        });
    }
}