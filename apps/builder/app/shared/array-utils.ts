type Predicate<Item> = (value: Item) => boolean;

export const removeByMutable = <Item>(
  array: Item[],
  predicate: Predicate<Item>
) => {
  // reversed order to splice without breaking index
  for (let index = array.length - 1; index >= 0; index -= 1) {
    if (predicate(array[index])) {
      array.splice(index, 1);
    }
  }
};

export const getMapValuesByKeysSet = <Key, Value>(
  map: Map<Key, Value>,
  keys: Set<Key>
) => {
  const values: NonNullable<Value>[] = [];
  for (const key of keys) {
    const value = map.get(key);
    if (value != null) {
      values.push(value);
    }
  }
  return values;
};

export const getMapValuesBy = <Key, Value>(
  map: Map<Key, Value>,
  predicate: Predicate<Value>
) => {
  const values: Value[] = [];
  for (const value of map.values()) {
    if (predicate(value)) {
      values.push(value);
    }
  }
  return values;
};

// @todo replace with builtin Map.groupBy when support
export const groupBy = <Item, Key>(
  array: Item[] | IterableIterator<Item>,
  getKey: (item: Item) => Key
) => {
  const groups = new Map<Key, Item[]>();
  for (const item of array) {
    const key = getKey(item);
    let group = groups.get(key);
    if (group === undefined) {
      group = [];
      groups.set(key, group);
    }
    group.push(item);
  }
  return groups;
};
