class BlobStreamController {
  constructor(blob, size) {
    this.blob = blob; // file object
    this.index = 0;
    this.chunkSize = size || 1024 * 64;
  }

  pull(controller) {
    return new Promise((resolve, reject) => {
      const bytesLeft = this.blob.size - this.index;
      if (bytesLeft <= 0) {
        controller.close();
        return resolve();
      }
      const size = Math.min(this.chunkSize, bytesLeft);
      const slice = this.blob.slice(this.index, this.index + size);
      const reader = new FileReader();
      reader.onload = () => {
        controller.enqueue(new Uint8Array(reader.result));
        resolve();
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(slice);
      this.index += size;
    });
  }
}

class ConcatStreamController {
  constructor(streams) {
    this.streams = streams;
    this.index = 0;
    this.reader = null;
    this.nextReader();
  }

  nextReader() {
    const next = this.streams[this.index++];
    this.reader = next && next.getReader();
  }

  async pull(controller) {
    if (!this.reader) {
      return controller.close();
    }
    const data = await this.reader.read();
    if (data.done) {
      this.nextReader();
      return this.pull(controller);
    }
    controller.enqueue(data.value);
  }
}
