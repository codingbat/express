(function () {
    module.exports = {
        localdb: {
            name: "naz-local-database",
            url: "mongodb://localhost/geo",
            port: 27017
        },
        cloud: {
            name: "mongo-cloud",
            url: "mongodb://nazmul:nazmul@cluster0-shard-00-00-rqcvv.mongodb.net:27017,cluster0-shard-00-01-rqcvv.mongodb.net:27017,cluster0-shard-00-02-rqcvv.mongodb.net:27017/geo?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",
            port: 27017,
        }
    };
})();
