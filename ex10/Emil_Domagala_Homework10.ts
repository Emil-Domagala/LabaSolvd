type Entry<K, V> = { key: K; val: V };

export class HashTable_10 {
  public storage: Array<Array<Entry<string, string>>>;
  private readonly capacity: number;
  private size: number = 0;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.storage = new Array(capacity).fill(null).map(() => []);
  }

  /*
   multiplies by 31 (in order to minimalize colisions) and adds char codes and then 
   does modulo with capacity to make sure its inside the array.
  */
  private hash(key: string): number {
    let hash = 0;
    const PRIME = 31;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * PRIME + key.charCodeAt(i)) % this.capacity;
    }
    return hash;
  }

  /*
   put new entry in the bucket or update if already exist
   uses the hash() fn to get index, then goes through bucket array
   if key exists it overwrites the value otherwise it just add
   O(n) inside the bucket cause of loop but average its faster
  */
  public set(entry: Entry<string, string>) {
    const index = this.hash(entry.key);
    const bucket = this.storage[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === entry.key) {
        bucket[i].val = entry.val;
        return;
      }
    }
    bucket.push(entry);
    this.size++;
  }

  /*
   gets the value for a key if its there otherwise undefined
   best case O(1) but can be slow if lots of colision
  */
  public get(key: string) {
    const index = this.hash(key);
    const entries = this.storage[index];
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].key === key) {
        return entries[i].val;
      }
    }
    return undefined;
  }

  /*
   remove key if found. returns true if removed otherwise false
   if found the key inside bucket then splice it out.
  */
  public delete(key: string) {
    const index = this.hash(key);
    const entries = this.storage[index];
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].key === key) {
        entries.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }
}
