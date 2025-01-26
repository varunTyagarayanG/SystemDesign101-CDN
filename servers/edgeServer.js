class EdgeServer {
    constructor(name, cache) {
        this.name = name;
        this.cache = cache;
    }

    fetchContent(contentId, originServer) {
        let content = this.cache.get(contentId);
        if (content) {
            return { status: 'Cache HIT', content };
        }
        content = originServer.getContent(contentId);
        this.cache.set(contentId, content);
        return { status: 'Cache MISS', content };
    }
}

module.exports = EdgeServer;
