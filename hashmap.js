import Node from 'singly-linked-lists/node';
import LinkedList from 'singly-linked-lists/linked-list';

export default class HashMap {
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

    if (this.length() >= this.#capacity * this.#loadFactor) {
      const entries = this.entries();
      this.#capacity *= 2;
      this.#buckets = Array(this.#capacity).fill(null);
      for (let i = 0; i < entries.length; i += 1) {
        this.set(entries[i][0], entries[i][1]);
      }
    }

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

    let tmp = bucket.head();
    let i = 0;
    while (tmp !== null && !Object.keys(tmp.value).includes(key)) {
      tmp = tmp.nextNode;
      i += 1;
    }

    if (!tmp) {
      return false;
    }

    this.#buckets[index].removeAt(i);
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
