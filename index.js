import HashMap from './hashmap.js';

const hashmap = new HashMap()

// Generating random strings
const letters = [];
for (let i = 'a'.charCodeAt(); i <= 'z'.charCodeAt(); i+= 1) {
  letters.push(String.fromCharCode(i));
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const testHashes = [];
const length = getRandomInt(10, 1000);

for (let i = 0; i < length; i += 1) {
  const charCount = getRandomInt(1, 20);
  let string = '';

  for (let j = 0; j < charCount; j += 1) {
    string += letters[getRandomInt(0, letters.length - 1)];
  }

  testHashes.push(string);
}

// Populating the hash map with generated strings as keys and values
for (let i = 0; i < testHashes.length; i += 1) {
  hashmap.set(testHashes[i], testHashes[testHashes.length - i - 1]);
}

console.log();
console.log('Entries:');
console.log(hashmap.entries().slice(0, 10));

console.log();
console.log('Keys:');
console.log(hashmap.keys().slice(0, 10));

console.log();
console.log('Values:');
console.log(hashmap.values().slice(0, 10));

console.log();
console.log('Has:');
console.log(hashmap.has(testHashes[0]));
console.log(hashmap.has('Not in here'));

console.log();
console.log('Get:');
console.log(hashmap.get(testHashes[0]));
console.log(hashmap.get('Not in here'));

console.log();
console.log('Length:', hashmap.length());
console.log('Remove an element:', hashmap.remove(testHashes[0]));
console.log('Length:', hashmap.length());

console.log();
console.log('Length:', hashmap.length());
console.log('Clear a hashmap');
hashmap.clear();
console.log('Length:', hashmap.length());
