class Client {
    constructor(edgeServers) {
        this.edgeServers = edgeServers;
    }

    requestContent(contentId, originServer) {
        const randomServer = this.edgeServers[
            Math.floor(Math.random() * this.edgeServers.length)
        ];
        return randomServer.fetchContent(contentId, originServer);
    }
}

module.exports = Client;
