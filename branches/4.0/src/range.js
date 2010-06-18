/**
* KindEditor - WYSIWYG HTML Editor
* Copyright (C) 2006-${THISYEAR} Longhao Luo
*
* @site http://www.kindsoft.net/
* @licence LGPL
* @version ${VERSION}
*/

/**
#using "core.js"
#using "selector.js"
#using "node.js"
*/
(function (K, undefined) {

var _IE = K.IE,
	_node = K.node,
	_inArray = K.inArray,
	_isAncestor = K.isAncestor,
	_START_TO_START = 0,
	_START_TO_END = 1,
	_END_TO_END = 2,
	_END_TO_START = 3;

/**
	Reference:
	DOM Level 2: http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html
*/
function _range(mixed) {
	if (!mixed.nodeName) {
		return _toRange(mixed);
	}
	var doc = mixed;
	function updateCollapsed() {
		this.collapsed = (this.startContainer === this.endContainer && this.startOffset === this.endOffset);
	}
	function updateCommonAncestor() {
		function scan(node, fn) {
			if (node === doc) return;
			while (node) {
				if (fn(node)) return;
				node = node.parentNode;
			}
		}
		var nodes = [];
		scan(this.startContainer, function(node) {
			nodes.push(node);
		});
		var ancestor = doc;
		scan(this.endContainer, function(node) {
			if (_inArray(node, nodes) >= 0) {
				ancestor = node;
				return true;
			}
		});
		this.commonAncestorContainer = ancestor;
	}
	function compareAndUpdate() {
		var rangeA = _range(doc),
			rangeB = _range(doc);
		rangeA.startContainer = rangeA.endContainer = this.startContainer;
		rangeA.startOffset = rangeA.endOffset = this.startOffset;
		rangeB.startContainer = rangeB.endContainer = this.endContainer;
		rangeB.startOffset = rangeB.endOffset = this.endOffset;
		if (rangeA.compareBoundaryPoints(_START_TO_START, rangeB) == 1) {
			this.startContainer = this.endContainer;
			this.startOffset = this.endOffset;
		}
	}
	/*
		cloneContents: copyAndDelete(true, false)
		extractContents: copyAndDelete(true, true)
		deleteContents: copyAndDelete(false, true)
	*/
	function copyAndDelete(isCopy, isDelete) {
		var self = this,
			startContainer = self.startContainer,
			startOffset = self.startOffset,
			endContainer = self.endContainer,
			endOffset = self.endOffset;
		function splitTextNode(node, startOffset, endOffset) {
			var length = node.nodeValue.length,
				centerNode;
			if (isCopy) {
				var cloneNode = node.cloneNode(true),
				centerNode = cloneNode.splitText(startOffset);
				centerNode.splitText(endOffset - startOffset);
			}
			if (isDelete) {
				var center = node;
				if (startOffset > 0) center = node.splitText(startOffset);
				if (endOffset < length) center.splitText(endOffset - startOffset);
				center.parentNode.removeChild(center);
			}
			return centerNode;
		}
		function getTextNode(node) {
			if (node == startContainer && node == endContainer) {
				return splitTextNode(node, startOffset, endOffset);
			} else if (node == startContainer) {
				return splitTextNode(node, startOffset, node.nodeValue.length);
			} else if (node == endContainer) {
				return splitTextNode(node, 0, endOffset);
			} else {
				return splitTextNode(node, 0, node.nodeValue.length);
			}
		}
		function extractNodes(parent, frag) {
			var node = parent.firstChild;
			while (node) {
				var range = _range(doc);
				range.selectNode(node);
				if (range.compareBoundaryPoints(_END_TO_START, self) >= 0) return false;
				var nextNode = node.nextSibling;
				if (range.compareBoundaryPoints(_START_TO_END, self) > 0) {
					//console.log('nodeName:' + node.nodeName);
					//console.log('nodeValue:' + node.nodeValue);
					var type = node.nodeType;
					if (type == 1) {
						if (range.compareBoundaryPoints(_START_TO_START, self) >= 0) {
							if (isCopy) {
								frag.appendChild(node.cloneNode(true));
							}
							if (isDelete) {
								node.parentNode.removeChild(node);
							}
						} else {
							var childFlag;
							if (isCopy) {
								childFlag = node.cloneNode(false);
								frag.appendChild(childFlag);
							}
							if (!extractNodes(node, childFlag)) return false;
						}
					} else if (type == 3) {
						var textNode = getTextNode(node);
						if (textNode) frag.appendChild(textNode);
					}
				}
				node = nextNode;
			}
			return true;
		}
		var frag = doc.createDocumentFragment(),
			ancestor = self.commonAncestorContainer;
		if (ancestor.nodeType == 3) {
			var textNode = getTextNode(ancestor);
			if (textNode) frag.appendChild(textNode);
		} else {
			extractNodes(ancestor, frag);
		}
		return frag;
	}
	return {
		startContainer : doc,
		startOffset : 0,
		endContainer : doc,
		endOffset : 0,
		collapsed : true,
		commonAncestorContainer : doc,
		setStart : function(node, offset) {
			this.startContainer = node;
			this.startOffset = offset;
			if (this.endContainer === doc) {
				this.endContainer = node;
				this.endOffset = offset;
			}
			compareAndUpdate.call(this);
			updateCollapsed.call(this);
			updateCommonAncestor.call(this);
			return this;
		},
		setEnd : function(node, offset) {
			this.endContainer = node;
			this.endOffset = offset;
			if (this.startContainer === doc) {
				this.startContainer = node;
				this.startOffset = offset;
			}
			compareAndUpdate.call(this);
			updateCollapsed.call(this);
			updateCommonAncestor.call(this);
			return this;
		},
		setStartBefore : function(node) {
			return this.setStart(node.parentNode || doc, _node(node).index);
		},
		setStartAfter : function(node) {
			return this.setStart(node.parentNode || doc, _node(node).index + 1);
		},
		setEndBefore : function(node) {
			return this.setEnd(node.parentNode || doc, _node(node).index);
		},
		setEndAfter : function(node) {
			return this.setEnd(node.parentNode || doc, _node(node).index + 1);
		},
		selectNode : function(node) {
			this.setStartBefore(node);
			this.setEndAfter(node);
			return this;
		},
		selectNodeContents : function(node) {
			var knode = _node(node);
			if (knode.type == 3 || !knode.paired()) {
				this.selectNode(node);
			} else {
				if (knode.children.length > 0) {
					this.setStartBefore(knode.firstChild);
					this.setEndAfter(knode.lastChild);
				} else {
					this.setStart(node, 0);
					this.setEnd(node, 0);
				}
			}
			return this;
		},
		collapse : function(toStart) {
			if (toStart) this.setEnd(this.startContainer, this.startOffset);
			else this.setStart(this.endContainer, this.endOffset);
			return this;
		},
		compareBoundaryPoints : function(how, range) {
			var rangeA = this.get(),
				rangeB = range.get();
			if (_IE) {
				var arr = {};
				arr[_START_TO_START] = 'StartToStart';
				arr[_START_TO_END] = 'EndToStart';
				arr[_END_TO_END] = 'EndToEnd';
				arr[_END_TO_START] = 'StartToEnd';
				var cmp = rangeA.compareEndPoints(arr[how], rangeB);
				if (cmp !== 0) return cmp;
				var nodeA, nodeB, posA, posB;
				if (how === _START_TO_START || how === _END_TO_START) {
					nodeA = this.startContainer;
					posA = this.startOffset;
				}
				if (how === _START_TO_END || how === _END_TO_END) {
					nodeA = this.endContainer;
					posA = this.endOffset;
				}
				if (how === _START_TO_START || how === _START_TO_END) {
					nodeB = range.startContainer;
					posB = range.startOffset;
				}
				if (how === _END_TO_END || _END_TO_START) {
					nodeB = range.endContainer;
					posB = range.endOffset;
				}
				if (nodeA === nodeB) return 0;
				var childA = nodeA,
					childB = nodeB;
				if (nodeA.nodeType === 1) {
					childA = nodeA.childNodes[posA];
				}
				if (nodeB.nodeType === 1) {
					childB = nodeB.childNodes[posB];
				}
				if (childA && childB === childA.nextSibling) return -1;
				if (childB && childA === childB.nextSibling) return 1;
				if (how === _START_TO_START || how === _END_TO_START) return _isAncestor(nodeA, nodeB) ? -1 : 1;
				if (how === _END_TO_END || how === _START_TO_END) return _isAncestor(nodeA, nodeB) ? 1 : -1;
			} else {
				return rangeA.compareBoundaryPoints(how, rangeB);
			}
		},
		cloneRange : function() {
			var range = _range(doc);
			range.setStart(this.startContainer, this.startOffset);
			range.setEnd(this.endContainer, this.endOffset);
			return range;
		},
		toString : function() {
			var rng = this.get(),
				str = _IE ? rng.text : rng.toString();
			return str.replace(/\r\n|\n|\r/g, '');
		},
		cloneContents : function() {
			return copyAndDelete.call(this, true, false);
		},
		deleteContents : function() {
			return copyAndDelete.call(this, false, true);
		},
		extractContents : function() {
			return copyAndDelete.call(this, true, true);
		},
		insertNode : function(node) {
			var container = this.startContainer,
				offset = this.startOffset,
				afterNode,
				parentNode,
				endNode,
				endTextNode,
				endTextPos,
				eq = container == this.endContainer;
			if (this.endContainer.nodeType == 1) {
				endNode = this.endContainer.childNodes[this.endOffset - 1];
				eq = container == endNode;
				if (eq) endTextPos = endNode.nodeValue.length;
			}
			if (container.nodeType == 1) {
				afterNode = container.childNodes[offset];
			} else {
				if (offset == 0) {
					afterNode = container;
				} else if (offset < container.length) {
					afterNode = container.splitText(offset);
					if (eq) {
						endTextNode = afterNode;
						endTextPos = endTextPos ? endTextPos - offset : this.endOffset - offset;
						this.setEnd(endTextNode, endTextPos);
					}
				} else {
					parentNode = container.parentNode;
				}
			}
			if (afterNode) afterNode.parentNode.insertBefore(node, afterNode);
			if (parentNode) parentNode.appendChild(node);
			if (node.nodeName.toLowerCase() === '#document-fragment') {
				if (node.firstChild) this.setStartBefore(node.firstChild);
			} else {
				this.setStartBefore(node);
			}
			if (endNode) this.setEndAfter(endNode);
			return this;
		},
		surroundContents : function(node) {
			node.appendChild(this.extractContents());
			return this.insertNode(node);
		},
		get : function() {
			var startContainer = this.startContainer,
				startOffset = this.startOffset,
				endContainer = this.endContainer,
				endOffset = this.endOffset,
				range;
			if (doc.createRange) {
				range = doc.createRange();
				range.selectNodeContents(doc.body);
			} else {
				range = doc.body.createTextRange();
			}
			if (_IE) {
				range.setEndPoint('StartToStart', _getEndRange(startContainer, startOffset));
				range.setEndPoint('EndToStart', _getEndRange(endContainer, endOffset));
			} else {
				range.setStart(startContainer, startOffset);
				range.setEnd(endContainer, endOffset);
			}
			return range;
		}
	};
}

function _getStartEnd(rng, isStart) {
	var doc = rng.parentElement().ownerDocument;
	var range = _range(doc);
	var pointRange = rng.duplicate();
	pointRange.collapse(isStart);
	var parent = pointRange.parentElement();
	var children = parent.childNodes;
	if (children.length == 0) {
		range.selectNode(parent);
		return {node: range.startContainer, offset: range.startOffset};
	}
	var startNode = doc, startPos = 0, isEnd = false;
	var testRange = rng.duplicate();
	testRange.moveToElementText(parent);
	for (var i = 0, len = children.length; i < len; i++) {
		var node = children[i];
		var cmp = testRange.compareEndPoints('StartToStart', pointRange);
		if (cmp > 0) isEnd = true;
		if (cmp == 0) {
			var range = _range(doc);
			if (node.nodeType == 1) range.selectNode(node);
			else range.setStartBefore(node);
			return {node: range.startContainer, offset: range.startOffset};
		}
		if (node.nodeType == 1) {
			var nodeRange = rng.duplicate();
			nodeRange.moveToElementText(node);
			testRange.setEndPoint('StartToEnd', nodeRange);
			if (isEnd) startPos += nodeRange.text.length;
			else startPos = 0;
		} else if (node.nodeType == 3) {
			testRange.moveStart('character', node.nodeValue.length);
			startPos += node.nodeValue.length;
		}
		if (!isEnd) startNode = node;
	}
	if (!isEnd && startNode.nodeType == 1) {
		range.setStartAfter(parent.lastChild);
		return {node: range.startContainer, offset: range.startOffset};
	}
	testRange = rng.duplicate();
	testRange.moveToElementText(parent);
	testRange.setEndPoint('StartToEnd', pointRange);
	startPos -= testRange.text.length;
	return {node: startNode, offset: startPos};
}

function _toRange(rng) {
	if (_IE) {
		var doc = rng.parentElement().ownerDocument;
		if (rng.item) {
			var range = _range(doc);
			range.selectNode(rng.item(0));
			return range;
		}
		var start = _getStartEnd(rng, true),
			end = _getStartEnd(rng, false),
			range = _range(doc);
		range.setStart(start.node, start.offset);
		range.setEnd(end.node, end.offset);
		return range;
	} else {
		var startContainer = rng.startContainer,
			doc = startContainer.ownerDocument || startContainer,
			range = _range(doc);
		range.setStart(startContainer, rng.startOffset);
		range.setEnd(rng.endContainer, rng.endOffset);
		return range;
	}
}

function _getBeforeLength(node) {
	var doc = node.ownerDocument,
		len = 0,
		sibling = node.previousSibling;
	while (sibling) {
		if (sibling.nodeType == 1) {
			if (_node(sibling).paired()) {
				var range = doc.body.createTextRange();
				range.moveToElementText(sibling);
				len += range.text.length;
			} else {
				len += 1;
			}
		} else if (sibling.nodeType == 3) {
			len += sibling.nodeValue.length;
		}
		sibling = sibling.previousSibling;
	}
	return len;
}

function _getEndRange(node, offset) {
	var doc = node.ownerDocument || node,
		range = doc.body.createTextRange();
	if (doc == node) {
		range.collapse(true);
		return range;
	}
	if (node.nodeType == 1) {
		var children = node.childNodes,
			isStart,
			child,
			isTemp = false;
		if (offset == 0) {
			child = children[0];
			isStart = true;
		} else {
			child = children[offset - 1];
			isStart = false;
		}
		if (!child) {
			var temp = doc.createTextNode(' ');
			node.appendChild(temp);
			child = temp;
			isTemp = true;
		}
		if (child.nodeName.toLowerCase() === 'head') {
			if (offset === 1) isStart = true;
			if (offset === 2) isStart = false;
			range.collapse(isStart);
			return range;
		}
		if (child.nodeType == 1) {
			range.moveToElementText(child);
			range.collapse(isStart);
		} else {
			range.moveToElementText(node);
			if (isTemp) node.removeChild(temp);
			var len = _getBeforeLength(child);
			len = isStart ? len : len + child.nodeValue.length;
			range.moveStart('character', len);
		}
	} else if (node.nodeType == 3) {
		range.moveToElementText(node.parentNode);
		range.moveStart('character', offset + _getBeforeLength(node));
	}
	return range;
}

K.range = _range;
K.START_TO_START = _START_TO_START;
K.START_TO_END = _START_TO_END;
K.END_TO_END = _END_TO_END;
K.END_TO_START = _END_TO_START;

})(KindEditor);