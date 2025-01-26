const fs = require('fs');
const path = require('path');
const LRUCache = require('./cache/lruCache');
const SIEVECache = require('./cache/sieveCache');
const EdgeServer = require('./servers/edgeServer');
const OriginServer = require('./servers/originServer');
const Client = require('./clients/client');
const config = require('./config/simulationConfig');
const Logger = require('./utils/logger');

Logger.logEvent('Simulation started');

function runSimulation(cacheType) {
    Logger.logEvent(`Running simulation with ${cacheType} cache...`);

    const { cacheSize, numRequests, numEdgeServers } = config;
    const originServer = new OriginServer();
    const edgeServers = Array.from({ length: numEdgeServers }, (_, i) =>
        new EdgeServer(`EdgeServer-${i + 1}`, 
            cacheType === 'LRU' ? new LRUCache(cacheSize) : new SIEVECache(cacheSize)
        )
    );

    const client = new Client(edgeServers);

    let cacheHits = 0;
    let cacheMisses = 0;

    for (let i = 0; i < numRequests; i++) {
        const contentId = `content-${Math.floor(Math.random() * 25) + 1}`;
        Logger.logEvent(`Client requesting content: ${contentId}`);

        const { status } = client.requestContent(contentId, originServer);
        
        if (status === 'Cache HIT') {
            cacheHits++;
            Logger.logEvent(`Cache HIT for ${contentId}`);
        } else {
            cacheMisses++;
            Logger.logEvent(`Cache MISS for ${contentId}`);
        }
    }

    const hitRate = (cacheHits / numRequests) * 100;

    // Create result text
    const result = [
        `Simulation Results (${cacheType}):`,
        `Cache Hits: ${cacheHits}`,
        `Cache Misses: ${cacheMisses}`,
        `Hit Rate: ${hitRate.toFixed(2)}%`,
    ].join('\n');

    // Write results to a file
    const filePath = path.join(__dirname, `${cacheType}_results.txt`);
    fs.writeFileSync(filePath, result, 'utf8');

    Logger.logEvent(`Simulation results written to ${filePath}`);
}

// Run both simulations
runSimulation('LRU');
runSimulation('SIEVE');

Logger.logEvent('Simulation completed');
