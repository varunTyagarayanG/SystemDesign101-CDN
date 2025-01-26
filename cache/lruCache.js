class LRUCache {
    constructor(size) {
        this.size = size;
        this.cache = new Map(); // Key-value store for cached items
        this.linkedList = { prev: null, next: null, key: null, value: null }; // Doubly linked list root node
        this.linkedList.prev = this.linkedList;
        this.linkedList.next = this.linkedList;
        this.full = false; // Indicates if the cache is full
    }

    _addToFront(key, value) {
        const head = this.linkedList.next;
        const newNode = { prev: this.linkedList, next: head, key, value };
        this.linkedList.next = head.prev = newNode;
        return newNode;
    }

    _moveToFront(node) {
        this._removeNode(node);
        const newNode = this._addToFront(node.key, node.value);
        this.cache.set(node.key, newNode);
    }

    _removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    _evict() {
        // Evict the least recently used (LRU) node
        const lruNode = this.linkedList.prev;
        if (lruNode.key !== null) {
            this.cache.delete(lruNode.key);
            this._removeNode(lruNode);
        }
    }

    get(key) {
        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            this._moveToFront(node); // Move accessed node to the front
            return node.value;
        }
        return null; // Cache miss
    }

    set(key, value) {
        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            this._removeNode(node); // Remove the old node
        } else if (this.cache.size === this.size) {
            this._evict(); // Evict the least recently used node
        }
        const newNode = this._addToFront(key, value); // Add the new node to the front
        this.cache.set(key, newNode);
    }
}

module.exports = LRUCache;
