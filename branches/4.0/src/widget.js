
function _drag(options) {
	var moveEl = options.moveEl,
		moveFn = options.moveFn,
		clickEl = options.clickEl || moveEl,
		beforeDrag = options.beforeDrag,
		iframeFix = options.iframeFix === undefined ? true : options.iframeFix;
	var docs = [document],
		poss = [{ x : 0, y : 0}],
		listeners = [];
	if (iframeFix) {
		K('iframe').each(function() {
			//在IE上，页面设置document.domain后，取得没做过处理的iframe document会报错
			//此时先跳过，不做处理
			try {
				docs.push(_iframeDoc(this));
			} catch (e) {}
			poss.push(K(this).pos());
		});
	}
	clickEl.mousedown(function(e) {
		var self = clickEl.get(),
			x = _removeUnit(moveEl.css('left')),
			y = _removeUnit(moveEl.css('top')),
			width = moveEl.width(),
			height = moveEl.height(),
			pageX = e.pageX,
			pageY = e.pageY,
			dragging = true;
		if (beforeDrag) {
			beforeDrag();
		}
		_each(docs, function(i, doc) {
			function moveListener(e) {
				if (dragging) {
					var diffX = _round(poss[i].x + e.pageX - pageX),
						diffY = _round(poss[i].y + e.pageY - pageY);
					moveFn.call(clickEl, x, y, width, height, diffX, diffY);
				}
				e.stop();
			}
			function selectListener(e) {
				e.stop();
			}
			function upListener(e) {
				dragging = false;
				if (self.releaseCapture) {
					self.releaseCapture();
				}
				_each(listeners, function() {
					K(this.doc).unbind('mousemove', this.move)
						.unbind('mouseup', this.up)
						.unbind('selectstart', this.select);
				});
				e.stop();
			}
			K(doc).mousemove(moveListener)
				.mouseup(upListener)
				.bind('selectstart', selectListener);
			listeners.push({
				doc : doc,
				move : moveListener,
				up : upListener,
				select : selectListener
			});
		});
		if (self.setCapture) {
			self.setCapture();
		}
		e.stop();
	});
}

// create KWidget class
function KWidget(options) {
	this.init(options);
}
_extend(KWidget, {
	init : function(options) {
		var self = this;
		// public properties
		self.name = options.name || '';
		self.doc = options.doc || document;
		self.win = _getWin(self.doc);
		self.x = _addUnit(options.x);
		self.y = _addUnit(options.y);
		self.z = options.z;
		self.width = _addUnit(options.width);
		self.height = _addUnit(options.height);
		self.div = K('<div style="display:block;"></div>');
		self.options = options;
		// pravate properties
		self._alignEl = options.alignEl;
		if (self.width) {
			self.div.css('width', self.width);
		}
		if (self.height) {
			self.div.css('height', self.height);
		}
		if (self.z) {
			self.div.css({
				position : 'absolute',
				left : self.x,
				top : self.y,
				'z-index' : self.z
			});
		}
		if (self.z && (self.x === undefined || self.y === undefined)) {
			self.autoPos(self.width, self.height);
		}
		if (options.cls) {
			self.div.addClass(options.cls);
		}
		if (options.css) {
			self.div.css(options.css);
		}
		if (options.html) {
			self.div.html(options.html);
		}
		K(options.parent || self.doc.body).append(self.div);
	},
	pos : function(x, y) {
		var self = this;
		self.div.css({
			left : x,
			top : y
		});
		self.x = x;
		self.y = y;
		return self;
	},
	autoPos : function(width, height) {
		var self = this,
			w = _removeUnit(width) || 0,
			h = _removeUnit(height) || 0;
		if (self._alignEl) {
			var knode = K(self._alignEl),
				pos = knode.pos(),
				diffX = _round(knode[0].clientWidth / 2 - w / 2),
				diffY = _round(knode[0].clientHeight / 2 - h / 2);
			x = diffX < 0 ? pos.x : pos.x + diffX;
			y = diffY < 0 ? pos.y : pos.y + diffY;
		} else {
			var docEl = _docElement(self.doc),
				scrollPos = _getScrollPos();
			x = _round(scrollPos.x + (docEl.clientWidth - w) / 2);
			y = _round(scrollPos.y + (docEl.clientHeight - h) / 2);
		}
		x = x < 0 ? 0 : _addUnit(x);
		y = y < 0 ? 0 : _addUnit(y);
		return self.pos(x, y);
	},
	remove : function() {
		this.div.remove();
		return this;
	},
	show : function() {
		this.div.show();
		return this;
	},
	hide : function() {
		this.div.hide();
		return this;
	},
	draggable : function(options) {
		var self = this;
		options = options || {};
		options.moveEl = self.div;
		options.moveFn = function(x, y, width, height, diffX, diffY) {
			if ((x = x + diffX) < 0) {
				x = 0;
			}
			if ((y = y + diffY) < 0) {
				y = 0;
			}
			x = _addUnit(x);
			y = _addUnit(y);
			self.div.css('left', x).css('top', y);
			self.x = x;
			self.y = y;
		};
		_drag(options);
		return self;
	}
});

function _widget(options) {
	return new KWidget(options);
}

K.widget = _widget;
