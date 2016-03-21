/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2016, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/


/**
 * An object which produces an iterator over its values.
 *
 * #### Notes
 * Iterable objects are the target of the iteration algorithms.
 */
export
interface IIterable<T> {
  /**
   * Create an iterator over the object's values.
   *
   * @returns A new iterator which traverses the object's values.
   */
  iter(): IIterator<T>;
}


/**
 * An object which traverses a collection of values.
 *
 * #### Notes
 * For the convenience of API implementors, an iterator itself is an
 * iterable. Most concrete iterators will simply return `this` from
 * their `iter()` method.
 */
export
interface IIterator<T> extends IIterable<T> {
  /**
   * Create an independent clone of the iterator.
   *
   * @returns A new independent clone of the iterator.
   *
   * #### Notes
   * The cloned iterator can be consumed independently of the current
   * iterator. In essence, it is a copy of the iterator value stream
   * which starts at the current location. This can be useful for
   * lookahead and stream duplication.
   *
   * Most iterators can trivially support cloning. Those which cannot
   * should throw an exception and document the restriction.
   */
  clone(): IIterator<T>;

  /**
   * Get the next value in the collection.
   *
   * @returns The next value in the collection, or `undefined` if the
   *   iterator is exhausted.
   *
   * #### Notes
   * The `undefined` value is used to signal the end of iteration and
   * should therefore not be used as a value in a collection.
   *
   * The use of the `undefined` sentinel is an explicit design choice
   * which favors performance over purity. The ES6 iterator design of
   * returning a `{ value, done }` pair is suboptimal, as it requires
   * an object allocation on each iteration; and an `isDone()` method
   * increases implementation and runtime complexity.
   */
  next(): T;
}


/**
 * A finite-length sequence of indexable values.
 *
 * #### Notes
 * A slice is commonly used to provide a view into a collection.
 */
export
interface ISlice<T> extends IIterable<T> {
  /**
   * The length of the slice.
   *
   * #### Notes
   * This is a read-only property.
   */
  length: number;

  /**
   * Get the value at the specified index.
   *
   * @param index - The positive integer index of interest.
   *
   * @returns The value at the specified index, or `undefined` if
   *   the index is non-integral, negative, or is out of range.
   */
  get(index: number): T;
}


/**
 * A slice which allows mutation of the underlying values.
 */
export
interface IMutableSlice<T> extends ISlice<T> {
  /**
   * Set the value at the specified index.
   *
   * @param index - The positive integer index of interest.
   *
   * @param value - The value to set at the specified index.
   *
   * #### Notes
   * This is a no-op if the index is non-integral, negative, or
   * is out of range.
   */
  set(index: number, value: T): void;
}