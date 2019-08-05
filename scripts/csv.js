class SplitString {
  constructor(text, splitChar) {
    this.text = text;
    this.splitChar = splitChar;
  }

  readLine(startIndex) {
    const endIndex = this.getEndIndex(startIndex);
    return this.text.slice(startIndex, endIndex);
  }

  getEndIndex(startIndex = 0) {
    const nextIndex = this.text.indexOf(this.splitChar, startIndex);
    if (nextIndex < 0) return this.text.length;
    return nextIndex;
  }

  [Symbol.iterator]() {
    return new SplitStringIterator(this);
  }
}

class SplitStringIterator {
  constructor(splitString) {
    this.splitString = splitString;
    this.startIndex = 0;
  }

  next() {
    if (this.startIndex >= this.splitString.text.length) return { done: true };

    const value = this.splitString.readLine(this.startIndex);
    this.startIndex = this.splitString.getEndIndex(this.startIndex) + 1;

    return { value, done: false };
  }
}

export default SplitString;
