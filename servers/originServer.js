class OriginServer {
    constructor() {
        this.data = {};
        for (let i = 1; i <= 10; i++) {
            this.data[`content-${i}`] = `Data for content-${i}`;
        }
    }

    getContent(contentId) {
        return this.data[contentId] || null;
    }
}

module.exports = OriginServer;
