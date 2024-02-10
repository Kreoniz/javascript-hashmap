import Node from 'singly-linked-lists/node';
import LinkedList from 'singly-linked-lists/linked-list';

class HashMap {
  #capacity  = 16;
  #loadFactor = 0.75;
  #buckets = Array(this.#capacity).fill(null);

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.#capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);

    if (index < 0 || index >= this.#buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    const object = {};
    object[key] = value;

    if (this.#buckets[index]) {
      let tmp = this.#buckets[index].head();
      while (tmp !== null) {
        if (Object.keys(tmp.value).includes(key)) {
          tmp.value[key] = value;
          return;
        }
        tmp = tmp.nextNode;
      }

      this.#buckets[index].append(object);
    } else {
      this.#buckets[index] = new LinkedList(new Node(object));
    }
  }

  get(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.#buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    
    const bucket = this.#buckets[index];

    if (!bucket) {
      return null;
    }

    let tmp = bucket.head();
    while (tmp !== null && !Object.keys(tmp.value).includes(key)) {
      tmp = tmp.nextNode;
    }

    if (!tmp) {
      return null;
    }

    return tmp.value[key];
  }

  has(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.#buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    
    const bucket = this.#buckets[index];

    if (!bucket) {
      return false;
    }

    let tmp = bucket.head();
    while (tmp !== null && !Object.keys(tmp.value).includes(key)) {
      tmp = tmp.nextNode;
    }

    return Boolean(tmp);
  }

  remove(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.#buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    const bucket = this.#buckets[index];

    if (!bucket) {
      return false;
    }

    this.#buckets[index] = null;
    return true;
  }

  length() {
    let len = 0;

    for (let i = 0; i < this.#capacity; i += 1) {
      const bucket = this.#buckets[i];
      if (bucket) {
        let tmp = bucket.head();
        while (tmp !== null) {
          len += 1;
          tmp = tmp.nextNode;
        }
      }
    }

    return len;
  }

  clear() {
    this.#buckets = Array(this.#capacity).fill(null);
  }

  keys() {
    const array = [];

    for (let i = 0; i < this.#capacity; i += 1) {
      const bucket = this.#buckets[i];
      if (bucket) {
        let tmp = bucket.head();
        while (tmp !== null) {
          array.push(...Object.keys(tmp.value));
          tmp = tmp.nextNode;
        }
      }
    }

    return array;
  }

  values() {
    const array = [];

    for (let i = 0; i < this.#capacity; i += 1) {
      const bucket = this.#buckets[i];
      if (bucket) {
        let tmp = bucket.head();
        while (tmp !== null) {
          array.push(...Object.values(tmp.value));
          tmp = tmp.nextNode;
        }
      }
    }

    return array;
  }

  entries() {
    const array = [];

    for (let i = 0; i < this.#capacity; i += 1) {
      const bucket = this.#buckets[i];
      if (bucket) {
        let tmp = bucket.head();
        while (tmp !== null) {
          array.push(...Object.entries(tmp.value));
          tmp = tmp.nextNode;
        }
      }
    }

    return array;
  }
}

const hashmap = new HashMap()

hashmap.set('test', 'testValue');
hashmap.set('test', 'newTestValue');
hashmap.set('banana', 'orange');
hashmap.set('apple', 'apricot');
hashmap.remove('apple');

let string = 'a';
for (let i = 0; i < 4; i += 1) {
  hashmap.set(string, string + string);
  string += 'a';
}

console.log();
console.log('GET:');
console.log(hashmap.get('test'));
console.log(hashmap.get('ash'));

console.log();
console.log('HAS:');
console.log(hashmap.has('test'));
console.log(hashmap.has('ash'));

console.log();
console.log('LENGTH:');
console.log(hashmap.length());

console.log();
console.log('KEYS:');
console.log(hashmap.keys());

console.log();
console.log('VALUES:');
console.log(hashmap.values());

console.log();
console.log('ENTRIES:');
console.log(hashmap.entries());

console.log();
console.log('CLEAR');
hashmap.clear();

console.log();
console.log('ENTRIES:');
console.log(hashmap.entries());

console.log();
console.log(hashmap);
