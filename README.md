
# CDN Simulation Project

## Project Description

This project simulates a Content Delivery Network (CDN) system with caching mechanisms. It models the interaction between clients, edge servers, and origin servers to efficiently fetch content, using different caching strategies. The system simulates the behavior of edge servers with **LRU (Least Recently Used)** and **SIEVE (a custom cache eviction policy)** caches, allowing performance comparisons of different caching algorithms.

## Key Features

- **Edge Servers with Caching**: Simulate edge servers storing cached content using **LRU** and **SIEVE** algorithms.
- **Client Request Simulation**: Clients request content from edge servers, and if it’s not cached, they fall back to the origin server.
- **Logging and Result Reporting**: Logs key actions and tracks cache hits/misses, producing detailed simulation results.
- **Configurable Parameters**: Cache size, number of edge servers, and number of requests are configurable for testing various scenarios.

## Use Cases

- **Evaluate Cache Strategies**: Compare **LRU** and **SIEVE** caching strategies by examining their cache hit rates.
- **Simulate CDN Traffic**: Model a CDN to understand content distribution and retrieval times across edge servers.
- **Analyze Performance**: Assess the impact of cache size and server distribution on network performance, cache hit rates, and overall efficiency.

## Technologies Used

- **Node.js**: The backend runtime for the project.
- **JavaScript**: For implementing caching algorithms and server-client interactions.
- **File System (fs)**: For logging results to a file.
- **Custom Cache Algorithms**: LRU and SIEVE caching strategies.
- **Logging**: Custom logging implemented for tracking key events and results.

## Installation & Setup

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your system. If not, download and install it from [here](https://nodejs.org/).

### Clone the Repository

```bash
git clone https://github.com/yourusername/cdn-simulation.git
cd cdn-simulation
```

### Install Dependencies

```bash
npm install
```

### Run the Simulation

You can run the simulation by executing the following command:

```bash
node index.js
```

The simulation will run for both the **LRU** and **SIEVE** cache types, generating results in text files (e.g., `LRU_results.txt`, `SIEVE_results.txt`).

## Project Structure

```
cdn-simulation/
│
├── cache/               # Contains caching algorithms (LRU, SIEVE)
│   ├── lruCache.js      # LRU Cache implementation
│   └── sieveCache.js    # SIEVE Cache implementation
│
├── clients/             # Client logic for interacting with servers
│   └── client.js        # Client requesting content from edge servers
│
├── config/              # Configuration for simulation settings
│   └── simulationConfig.js # Configuration file for cache size, number of requests, etc.
│
├── servers/             # Contains server logic (edge, origin)
│   ├── edgeServer.js    # Edge server with cache management
│   └── originServer.js  # Origin server for fetching content
│
├── utils/               # Utilities such as logging
│   └── logger.js        # Logger for tracking simulation events
│
├── index.js             # Main entry point to run the simulation
├── README.md            # Project documentation
└── package.json         # Project metadata and dependencies
```

## How It Works

1. **Edge Servers**: Each edge server uses a cache (LRU or SIEVE) to store content. When a client makes a request, the edge server checks if the content is available in its cache.
2. **Client**: The client requests content from a random edge server. If the content is not cached, it falls back to the origin server.
3. **Cache Misses and Hits**: Each request is logged, and the results are stored in text files, including the cache hits, misses, and hit rates.

## Cache Algorithms

### LRU (Least Recently Used)

The LRU cache evicts the least recently used item when the cache reaches its size limit.

### SIEVE Cache (Custom)

The SIEVE cache uses a custom algorithm where it maintains a priority of cache items. Items are evicted based on their usage frequency.

### Flow between client and origin Server

```
Client Request: content-123
├── Edge Server: Checking cache for content-123
│   ├── Cache MISS
│   ├── Forwarding request to Origin Server
│   │   └── Origin Server: Retrieving content-123
│   └── Edge Server: Storing content-123 in cache
└── Client: Received content-123

Client Request: content-456
├── Edge Server: Checking cache for content-456
│   ├── Cache HIT
└── Client: Received content-456

```
## Example Simulation Output

```
Simulation Results (LRU):
Cache Hits: 34
Cache Misses: 966
Hit Rate: 3.40%

Simulation Results (SIEVE):
Cache Hits: 361
Cache Misses: 639
Hit Rate: 36.10%
```

## Logging

All simulation events, including cache hits, misses, and result generation, are logged into files. The results for each cache type (LRU and SIEVE) are written to separate text files for easy comparison.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENCE) file for details.

## Contributing

Feel free to fork this repository, submit issues, or make pull requests to improve the simulation or add new features.

---
