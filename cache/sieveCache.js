class SIEVECache {
    constructor(size) {
        this.size = size;
        this.cache = new Map(); // Stores the cached key-value pairs
        this.visited = new Map(); // Tracks whether a key has been visited
        this.linkedList = { prev: null, next: null, key: null }; // Doubly linked list for eviction
        this.linkedList.prev = this.linkedList;
        this.linkedList.next = this.linkedList;
        this.hand = this.linkedList; // Pointer for eviction
    }

    _addToHead(key) {
        // Add a node at the head of the doubly linked list
        const head = this.linkedList.next;
        const newNode = { prev: this.linkedList, next: head, key };
        this.linkedList.next = head.prev = newNode;
        return newNode;
    }

    _removeNode(node) {
        // Remove a node from the doubly linked list
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    _evict() {
        // Eviction logic: find the next unvisited node
        while (this.hand !== this.linkedList && this.visited.get(this.hand.key)) {
            this.visited.set(this.hand.key, false); // Reset visited status
            this.hand = this.hand.prev; // Move to the previous node
        }

        // Evict the node
        if (this.hand.key !== null) {
            const keyToEvict = this.hand.key;
            this.cache.delete(keyToEvict);
            this.visited.delete(keyToEvict);
            const nodeToEvict = this.hand;
            this.hand = this.hand.prev; // Move the hand pointer before removing
            this._removeNode(nodeToEvict);
        }
    }

    get(key) {
        if (this.cache.has(key)) {
            this.visited.set(key, true); // Mark as visited
            return this.cache.get(key); // Return cached value
        }
        return null; // Cache miss
    }

    set(key, value) {
        if (this.cache.has(key)) {
            // Update the value and mark as visited
            this.cache.set(key, value);
            this.visited.set(key, true);
        } else {
            if (this.cache.size === this.size) {
                this._evict(); // Evict least recently visited
            }
            // Add the new key-value pair to the cache
            this.cache.set(key, value);
            this.visited.set(key, true);
            const newNode = this._addToHead(key);
            if (this.hand === this.linkedList) {
                // Initialize the hand pointer if cache was empty
                this.hand = newNode;
            }
        }
    }
}

module.exports = SIEVECache;
