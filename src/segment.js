function isLeafNode(to) {
  return to === 1;
}
class SegmentTreeNode {
  constructor() {
    this.pendingVal = null;
    this.sum = 0;
    this.min = 0;
    this.max = 0;
    this.from = 0;
    this.to = 0;
  }
  size() {
    return this.to - this.from + 1;
  }
}

class SegmentTree {
  constructor(array){
    this.array = array;
    this.heap = [];
  }

  size() {
    return this.array.length;
  }

  build(index=1, from=0, to=this.array.length) {
    this.heap[index] = new SegmentTreeNode();
    this.heap[index].from = from;
    this.heap[index].to = from + to -1;
    if (isLeafNode(to)) {
      let leafVal = this.array[from];
      this.heap[index].sum = leafVal;
      this.heap[index].min = leafVal;
      this.heap[index].max = leafVal;
    } else {
      this.build()
    }
  }
}

