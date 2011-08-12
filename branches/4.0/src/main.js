
var _plugins = {};

function _plugin(name, fn) {
	_plugins[name] = fn;
}

var _language = {};

function _parseLangKey(key) {
	var match, ns = 'core';
	if ((match = /^(\w+)\.(\w+)$/.exec(key))) {
		ns = match[1];
		key = match[2];
	}
	return { ns : ns, key : key };
}
/**
	@example
	K.lang('about'); //get core.about
	K.lang('about.version'); // get about.version
	K.lang('about.').version; // get about.version
	K.lang('about', 'en'); //get English core.about
	K.lang({
		core.about : '关于',
		about.version : '4.0'
	}, 'zh_CN'); //add language
*/
function _lang(mixed, langType) {
	langType = langType === undefined ? _options.langType : langType;
	if (typeof mixed === 'string') {
		if (!_language[langType]) {
			return 'no language';
		}
		var pos = mixed.length - 1;
		if (mixed.substr(pos) === '.') {
			return _language[langType][mixed.substr(0, pos)];
		}
		var obj = _parseLangKey(mixed);
		return _language[langType][obj.ns][obj.key];
	}
	_each(mixed, function(key, val) {
		var obj = _parseLangKey(key);
		if (!_language[langType]) {
			_language[langType] = {};
		}
		if (!_language[langType][obj.ns]) {
			_language[langType][obj.ns] = {};
		}
		_language[langType][obj.ns][obj.key] = val;
	});
}

function _bindContextmenuEvent() {
	var self = this, doc = self.edit.doc;
	K(doc).contextmenu(function(e) {
		if (self.menu) {
			self.hideMenu();
		}
		if (!self.useContextmenu) {
			e.preventDefault();
			return;
		}
		if (self._contextmenus.length === 0) {
			return;
		}
		var maxWidth = 0, items = [];
		_each(self._contextmenus, function() {
			if (this.title == '-') {
				items.push(this);
				return;
			}
			if (this.cond && this.cond()) {
				items.push(this);
				if (this.width && this.width > maxWidth) {
					maxWidth = this.width;
				}
			}
		});
		while (items.length > 0 && items[0].title == '-') {
			items.shift();
		}
		while (items.length > 0 && items[items.length - 1].title == '-') {
			items.pop();
		}
		var prevItem = null;
		_each(items, function(i) {
			if (this.title == '-' && prevItem.title == '-') {
				delete items[i];
			}
			prevItem = this;
		});
		if (items.length > 0) {
			e.preventDefault();
			var pos = K(self.edit.iframe).pos(),
				menu = _menu({
					x : pos.x + e.clientX,
					y : pos.y + e.clientY,
					width : maxWidth,
					css : { visibility: 'hidden' }
				});
			_each(items, function() {
				if (this.title) {
					menu.addItem(this);
				}
			});
			// 下拉菜单超过可视区域时调整菜单位置
			var docEl = _docElement(menu.doc),
				menuHeight = menu.div.height();
			if (e.clientY + menuHeight >= docEl.clientHeight - 100) {
				menu.pos(menu.x, _removeUnit(menu.y) - menuHeight);
			}
			menu.div.css('visibility', 'visible');
			self.menu = menu;
		}
	});
}

function _bindNewlineEvent() {
	var self = this, doc = self.edit.doc, newlineTag = self.newlineTag;
	if (_IE && newlineTag !== 'br') {
		return;
	}
	if (_GECKO && _V < 3 && newlineTag !== 'p') {
		return;
	}
	if (_OPERA) {
		return;
	}
	K(doc).keydown(function(e) {
		if (e.which != 13 || e.shiftKey || e.ctrlKey || e.altKey) {
			return;
		}
		self.cmd.selection();
		var range = self.cmd.range,
			ancestor = K(range.commonAncestor());
		if (ancestor.type == 3) {
			ancestor = ancestor.parent();
		}
		var tagName = ancestor.name;
		if (tagName == 'marquee' || tagName == 'select') {
			return;
		}
		// br
		if (newlineTag === 'br' && _inArray(tagName, 'h1,h2,h3,h4,h5,h6,pre,li'.split(',')) < 0) {
			e.preventDefault();
			self.insertHtml('<br />');
			return;
		}
		// p
		if (_inArray(tagName, 'p,h1,h2,h3,h4,h5,h6,pre,div,li,blockquote'.split(',')) < 0) {
			_nativeCommand(doc, 'formatblock', '<P>');
		}
	});
}

function _bindTabEvent() {
	var self = this;
	K(self.edit.doc).keydown(function(e) {
		if (e.which == 9) {
			e.preventDefault();
			if (self.afterTab) {
				self.afterTab.call(self, e);
				return;
			}
			self.insertHtml('&nbsp;&nbsp;&nbsp;&nbsp;');
		}
	});
}

function _bindFocusEvent() {
	var self = this;
	K(self.edit.textarea[0], self.edit.win).focus(function(e) {
		if (self.afterFocus) {
			self.afterFocus.call(self, e);
		}
	}).blur(function(e) {
		if (self.afterBlur) {
			self.afterBlur.call(self, e);
		}
	});
}

function _removeBookmarkTag(html) {
	return _trim(html.replace(/<span [^>]*id="__kindeditor_bookmark_\w+_\d+__"[^>]*><\/span>/i, ''));
}

function _addBookmarkToStack(stack, bookmark) {
	if (stack.length === 0) {
		stack.push(bookmark);
		return;
	}
	var prev = stack[stack.length - 1];
	if (_removeBookmarkTag(bookmark.html) !== _removeBookmarkTag(prev.html)) {
		stack.push(bookmark);
	}
}

// undo: _undoToRedo.call(this, undoStack, redoStack);
// redo: _undoToRedo.call(this, redoStack, undoStack);
function _undoToRedo(fromStack, toStack) {
	var self = this, edit = self.edit, range, bookmark;
	if (fromStack.length === 0) {
		return self;
	}
	if (edit.designMode) {
		range = self.cmd.range;
		bookmark = range.createBookmark(true);
		bookmark.html = edit.html();
	} else {
		bookmark = {
			html : edit.html()
		};
	}
	_addBookmarkToStack(toStack, bookmark);
	var prev = fromStack.pop();
	if (_removeBookmarkTag(bookmark.html) === _removeBookmarkTag(prev.html) && fromStack.length > 0) {
		prev = fromStack.pop();
	}
	if (edit.designMode) {
		edit.html(prev.html);
		if (prev.start) {
			range.moveToBookmark(prev);
			self.select();
		}
	} else {
		edit.html(_removeBookmarkTag(prev.html));
	}
	return self;
}

function KEditor(options) {
	var self = this;
	// save original options
	self.options = {};
	function setOption(key, val) {
		if (KEditor.prototype[key] === undefined) {
			self[key] = val;
		}
		self.options[key] = val;
	}
	// set options from param
	_each(options, function(key, val) {
		setOption(key, options[key]);
		if (key === 'basePath') {
			setOption('themesPath', options[key] + 'themes/');
			setOption('langPath', options[key] + 'lang/');
			setOption('pluginsPath', options[key] + 'plugins/');
		}
	});
	// set options from default setting
	_each(_options, function(key, val) {
		if (self[key] === undefined) {
			setOption(key, val);
		}
	});
	var se = K(self.srcElement);
	if (!self.width) {
		setOption('width', se.width() || self.minWidth);
	}
	if (!self.height) {
		setOption('height', se.height() || self.minHeight);
	}
	setOption('width', _addUnit(self.width));
	setOption('height', _addUnit(self.height));
	if (_MOBILE) {
		self.designMode = false;
	}
	self.srcElement = se;
	self.initContent = _elementVal(se);
	self.plugin = {};
	// private properties
	self._handlers = {};
	self._contextmenus = [];
	self._undoStack = [];
	self._redoStack = [];
}

KEditor.prototype = {
	lang : function(mixed) {
		return _lang(mixed, this.langType);
	},
	loadPlugin : function(name, fn) {
		var self = this;
		if (_plugins[name]) {
			_plugins[name].call(self, KindEditor);
			if (fn) {
				fn.call(self);
			}
			return self;
		}
		_loadScript(self.pluginsPath + name + '/' + name + '.js?ver=' + encodeURIComponent(_DEBUG ? _TIME : _VERSION), function() {
			if (_plugins[name]) {
				self.loadPlugin(name, fn);
			}
		});
		return self;
	},
	handler : function(key, fn) {
		var self = this;
		if (!self._handlers[key]) {
			self._handlers[key] = [];
		}
		if (_isFunction(fn)) {
			self._handlers[key].push(fn);
			return self;
		}
		_each(self._handlers[key], function() {
			fn = this.call(self, fn);
		});
		return fn;
	},
	clickToolbar : function(name, fn) {
		var self = this, key = 'clickToolbar' + name;
		if (fn === undefined) {
			if (self._handlers[key]) {
				return self.handler(key);
			}
			self.loadPlugin(name, function() {
				self.handler(key);
			});
			return self;
		}
		return self.handler(key, fn);
	},
	updateState : function() {
		var self = this;
		_each(('justifyleft,justifycenter,justifyright,justifyfull,insertorderedlist,insertunorderedlist,' +
			'subscript,superscript,bold,italic,underline,strikethrough').split(','), function(i, name) {
			self.cmd.state(name) ? self.toolbar.select(name) : self.toolbar.unselect(name);
		});
		return self;
	},
	addContextmenu : function(item) {
		this._contextmenus.push(item);
		return this;
	},
	afterCreate : function(fn) {
		return this.handler('afterCreate', fn);
	},
	beforeRemove : function(fn) {
		return this.handler('beforeRemove', fn);
	},
	beforeGetHtml : function(fn) {
		return this.handler('beforeGetHtml', fn);
	},
	beforeSetHtml : function(fn) {
		return this.handler('beforeSetHtml', fn);
	},
	afterSetHtml : function(fn) {
		return this.handler('afterSetHtml', fn);
	},
	create : function() {
		var self = this, fullscreenMode = self.fullscreenMode;
		if (self.container) {
			return self;
		}
		if (fullscreenMode) {
			_docElement().style.overflow = 'hidden';
		} else {
			_docElement().style.overflow = '';
		}
		var width = fullscreenMode ? _docElement().clientWidth + 'px' : self.width,
			height = fullscreenMode ? _docElement().clientHeight + 'px' : self.height;
		// 校正IE6和IE7的高度
		if ((_IE && _V < 8) || document.compatMode != 'CSS1Compat') {
			height = _addUnit(_removeUnit(height) + 2);
		}
		var container = K('<div class="ke-container ke-container-' + self.themeType + '"></div>').css('width', width);
		if (fullscreenMode) {
			container.css({
				position : 'absolute',
				left : 0,
				top : 0,
				'z-index' : 811211
			});
			K(document.body).append(container);
			// 为了防止拖动偏移，把文档高度设置成0
			self._scrollPos = _getScrollPos();
			window.scrollTo(0, 0);
			K(document.body).css({
				'height' : 0,
				'overflow' : 'hidden'
			});
			K(document.body.parentNode).css('overflow', 'hidden');
		} else {
			self.srcElement.before(container);
			// 恢复文档高度
			if (self._scrollPos) {
				K(document.body).css({
					'height' : '',
					'overflow' : ''
				});
				K(document.body.parentNode).css('overflow', '');
				window.scrollTo(self._scrollPos.x, self._scrollPos.y);
			}
		}
		// create toolbar
		var toolbar = _toolbar({
				parent : container,
				noDisableItems : self.noDisableItems
			});
		_each(self.items, function(i, name) {
			toolbar.addItem({
				name : name,
				title : self.lang(name),
				click : function(e) {
					if (self.menu) {
						var menuName = self.menu.name;
						self.hideMenu();
						if (menuName === name) {
							return;
						}
					}
					e.stopPropagation();
					self.clickToolbar(name);
				}
			});
		});
		// create edit
		var edit = _edit({
			height : _removeUnit(height) - toolbar.div.height(),
			parent : container,
			srcElement : self.srcElement,
			designMode : self.designMode,
			themesPath : self.themesPath,
			bodyClass : self.bodyClass,
			cssPath : self.cssPath,
			cssData : self.cssData,
			beforeGetHtml : function(html) {
				html = self.beforeGetHtml(html);
				return _formatHtml(html, self.filterMode ? self.htmlTags : null, self.urlType, self.wellFormatMode, self.indentChar);
			},
			beforeSetHtml : function(html) {
				html = self.beforeSetHtml(html);
				return _formatHtml(html, self.filterMode ? self.htmlTags : null, '', false);
			},
			afterSetHtml : function() {
				self.afterSetHtml();
			},
			afterCreate : function() {
				self.cmd = this.cmd;
				// hide menu when click document
				K(this.doc, document).mousedown(function(e) {
					if (self.menu) {
						self.hideMenu();
					}
				});
				_bindContextmenuEvent.call(self);
				_bindNewlineEvent.call(self);
				_bindTabEvent.call(self);
				_bindFocusEvent.call(self);
				// afterChange event
				this.afterChange(function(e) {
					self.updateState();
					self.addBookmark();
					if (self.options.afterChange) {
						self.options.afterChange.call(self);
					}
				});
				this.textarea.keyup(function(e) {
					if (!e.ctrlKey && !e.altKey && _INPUT_KEY_MAP[e.which]) {
						if (self.options.afterChange) {
							self.options.afterChange.call(self);
						}
					}
				});
				// readonly
				if (self.readonlyMode) {
					self.readonly();
				}
				self.afterCreate();
				if (self.options.afterCreate) {
					self.options.afterCreate.call(self);
				}
			}
		});
		// create statusbar
		var statusbar = K('<div class="ke-statusbar"></div>');
		container.append(statusbar);
		statusbar.append('<span class="ke-inline-block ke-statusbar-center-icon"></span>')
		.append('<span class="ke-inline-block ke-statusbar-right-icon"></span>');
		// set properties
		self.container = container;
		self.toolbar = toolbar;
		self.edit = edit;
		self.statusbar = statusbar;
		self.menu = self.contextmenu = null;
		self.dialogs = [];
		// remove resize event
		K(window).unbind('resize');
		// reset size
		self.resize(width, height);
		// 为了限制宽度和高度，包装self.resize
		function resize(width, height, updateProp) {
			updateProp = _undef(updateProp, true);
			if (width && width >= self.minWidth) {
				self.resize(width, null);
				if (updateProp) {
					self.width = _addUnit(width);
				}
			}
			if (height && height >= self.minHeight) {
				self.resize(null, height);
				if (updateProp) {
					self.height = _addUnit(height);
				}
			}
		}
		// fullscreen mode
		if (fullscreenMode) {
			K(window).bind('resize', function(e) {
				if (self.container) {
					resize(_docElement().clientWidth, _docElement().clientHeight, false);
				}
			});
			toolbar.select('fullscreen');
			statusbar.first().css('visibility', 'hidden');
			statusbar.last().css('visibility', 'hidden');
		} else {
			// bind drag event
			if (self.resizeType > 0) {
				_drag({
					moveEl : container,
					clickEl : statusbar,
					moveFn : function(x, y, width, height, diffX, diffY) {
						height += diffY;
						resize(null, height);
					}
				});
			} else {
				statusbar.first().css('visibility', 'hidden');
			}
			if (self.resizeType === 2) {
				_drag({
					moveEl : container,
					clickEl : statusbar.last(),
					moveFn : function(x, y, width, height, diffX, diffY) {
						width += diffX;
						height += diffY;
						resize(width, height);
					}
				});
			} else {
				statusbar.last().css('visibility', 'hidden');
			}
		}
		return self;
	},
	remove : function() {
		var self = this;
		if (!self.container) {
			return self;
		}
		self.beforeRemove();
		if (self.menu) {
			self.hideMenu();
		}
		_each(self.dialogs, function() {
			self.hideDialog();
		});
		self.toolbar.remove();
		self.edit.remove();
		self.statusbar.last().remove();
		self.statusbar.remove();
		self.container.remove();
		self.container = self.toolbar = self.edit = self.menu = null;
		self.dialogs = [];
		return self;
	},
	resize : function(width, height) {
		var self = this;
		if (!self.container) {
			return self;
		}
		if (width !== null) {
			self.container.css('width', _addUnit(width));
		}
		if (height !== null) {
			height = _removeUnit(height) - self.toolbar.div.height() - self.statusbar.height();
			if (height > 0) {
				self.edit.setHeight(height);
			}
		}
		return self;
	},
	select : function() {
		this.container && this.cmd.select();
		return this;
	},
	html : function(val) {
		var self = this;
		if (val === undefined) {
			return self.container ? self.edit.html() : _elementVal(self.srcElement);
		}
		self.container ? self.edit.html(val) : _elementVal(self.srcElement, val);
		return self;
	},
	fullHtml : function() {
		return this.container ? this.edit.html(undefined, true) : '';
	},
	text : function(val) {
		var self = this;
		if (val === undefined) {
			return _trim(self.html().replace(/<(?!img|embed).*?>/ig, '').replace(/&nbsp;/ig, ' '));
		} else {
			return self.html(_escape(val));
		}
	},
	isEmpty : function() {
		return _trim(this.text().replace(/\r\n|\n|\r/, '')) === '';
	},
	selectedHtml : function() {
		return this.container ? this.cmd.range.html() : '';
	},
	count : function(mode) {
		var self = this;
		mode = (mode || 'html').toLowerCase();
		if (mode === 'html') {
			return _removeBookmarkTag(self.html()).length;
		}
		if (mode === 'text') {
			return self.text().replace(/<(?:img|embed).*?>/ig, 'K').replace(/\r\n|\n|\r/g, '').length;
		}
		return 0;
	},
	exec : function(key) {
		key = key.toLowerCase();
		var self = this, cmd = self.cmd;
		cmd[key].apply(cmd, _toArray(arguments, 1));
		// 下面命令不改变HTML内容，所以不需要改变工具栏状态，也不需要保存bookmark
		if (_inArray(key, 'selectall,copy,paste,print'.split(',')) < 0) {
			self.updateState();
			self.addBookmark();
			if (self.options.afterChange) {
				self.options.afterChange.call(self);
			}
		}
		return self;
	},
	insertHtml : function(val) {
		this.container && this.exec('inserthtml', val);
		return this;
	},
	appendHtml : function(val) {
		this.html(this.html() + val);
		if (self.container) {
			var cmd = this.cmd;
			cmd.range.selectNodeContents(cmd.doc.body).collapse(false);
			cmd.select();
		}
		return this;
	},
	sync : function() {
		_elementVal(this.srcElement, this.html());
		return this;
	},
	focus : function() {
		this.container ? this.edit.focus() : this.srcElement[0].focus();
		return this;
	},
	blur : function() {
		this.container ? this.edit.blur() : this.srcElement[0].blur();
		return this;
	},
	addBookmark : function() {
		var self = this, edit = self.edit, bookmark;
		if (edit.designMode) {
			var range = self.cmd.range;
			bookmark = range.createBookmark(true);
			bookmark.html = edit.html();
			range.moveToBookmark(bookmark);
		} else {
			bookmark = {
				html : edit.html()
			};
		}
		if (self._undoStack.length > 0) {
			var prev = self._undoStack[self._undoStack.length - 1];
			if (Math.abs(bookmark.html.length -  prev.html.length) < self.minChangeSize) {
				return self;
			}
		}
		_addBookmarkToStack(self._undoStack, bookmark);
		return self;
	},
	undo : function() {
		return _undoToRedo.call(this, this._undoStack, this._redoStack);
	},
	redo : function() {
		return _undoToRedo.call(this, this._redoStack, this._undoStack);
	},
	fullscreen : function(bool) {
		this.fullscreenMode = (bool === undefined ? !this.fullscreenMode : bool);
		return this.remove().create();
	},
	readonly : function(isReadonly) {
		isReadonly = _undef(isReadonly, true);
		var self = this, edit = self.edit, doc = edit.doc;
		if (self.designMode) {
			self.toolbar.disableItems(isReadonly, []);
		} else {
			_each(self.noDisableItems, function() {
				self.toolbar[isReadonly ? 'disable' : 'enable'](this);
			});
		}
		if (_IE) {
			doc.body.contentEditable = !isReadonly;
		} else {
			doc.designMode = isReadonly ? 'off' : 'on';
		}
		edit.textarea[0].disabled = isReadonly;
	},
	createMenu : function(options) {
		var self = this,
			name = options.name,
			knode = self.toolbar.get(name),
			pos = knode.pos();
		options.x = pos.x;
		options.y = pos.y + knode.height();
		if (options.selectedColor !== undefined) {
			options.cls = 'ke-colorpicker-' + self.themeType;
			options.noColor = self.lang('noColor');
			self.menu = _colorpicker(options);
		} else {
			options.cls = 'ke-menu-' + self.themeType;
			options.centerLineMode = false;
			self.menu = _menu(options);
		}
		return self.menu;
	},
	hideMenu : function() {
		this.menu.remove();
		this.menu = null;
		return this;
	},
	hideContextmenu : function() {
		this.contextmenu.remove();
		this.contextmenu = null;
		return this;
	},
	createDialog : function(options) {
		var self = this, name = options.name;
		options.autoScroll = _undef(options.autoScroll, true);
		options.shadowMode = _undef(options.shadowMode, self.shadowMode);
		options.closeBtn = _undef(options.closeBtn, {
			name : self.lang('close'),
			click : function(e) {
				self.hideDialog().focus();
			}
		});
		options.noBtn = _undef(options.noBtn, {
			name : self.lang(options.yesBtn ? 'no' : 'close'),
			click : function(e) {
				self.hideDialog().focus();
			}
		});
		if (self.dialogAlignType != 'page') {
			options.alignEl = self.container;
		}
		options.cls = 'ke-dialog-' + self.themeType;

		if (self.dialogs.length > 0) {
			var firstDialog = self.dialogs[0],
				parentDialog = self.dialogs[self.dialogs.length - 1];
			// 提高mask的z-index
			firstDialog.mask.div.css('z-index', parentDialog.z + 1);
			// 提高dialog的z-index
			options.z = parentDialog.z + 2;
			// 不显示mask
			options.showMask = false;
		}
		var dialog = _dialog(options);
		self.dialogs.push(dialog);
		return dialog;
	},
	hideDialog : function() {
		var self = this;
		if (self.dialogs.length > 0) {
			self.dialogs.pop().remove();
		}
		if (self.dialogs.length > 0) {
			var firstDialog = self.dialogs[0],
				parentDialog = self.dialogs[self.dialogs.length - 1];
			// 降低mask的z-index
			firstDialog.mask.div.css('z-index', parentDialog.z - 1);
		}
		return self;
	}
};

/**
	@example
	K.create('textarea');
	K.create('textarea.class');
	K.create('#id');
*/
function _create(expr, options) {
	options = options || {};
	function create(editor) {
		_each(_plugins, function(name, fn) {
			fn.call(editor, KindEditor);
		});
		return editor.create();
	}
	var knode = K(expr);
	if (!knode) {
		return;
	}
	options.srcElement = knode[0];
	if (!options.width) {
		options.width = knode.width();
	}
	if (!options.height) {
		options.height = knode.height();
	}
	var editor = new KEditor(options);
	// create editor
	if (_language[editor.langType]) {
		return create(editor);
	}
	// create editor after load lang file
	_loadScript(editor.langPath + editor.langType + '.js?ver=' + encodeURIComponent(_DEBUG ? _TIME : _VERSION), function() {
		return create(editor);
	});
	return editor;
}

// 解决IE6浏览器重复下载背景图片的问题
if (_IE && _V < 7) {
	_nativeCommand(document, 'BackgroundImageCache', true);
}

// core plugins
_plugin('core', function(K) {
	var self = this,
		shortcutKeys = {
			undo : 'Z', redo : 'Y', bold : 'B', italic : 'I', underline : 'U', print : 'P', selectall : 'A'
		};
	// afterChange
	self.afterSetHtml(function() {
		if (self.options.afterChange) {
			self.options.afterChange.call(self);
		}
	});
	// sync
	if (self.syncType == 'form') {
		var el = K(self.srcElement), hasForm = false;
		while ((el = el.parent())) {
			if (el.name == 'form') {
				hasForm = true;
				break;
			}
		}
		if (hasForm) {
			el.bind('submit', function(e) {
				self.sync();
			});
			var resetBtn = K('[type="reset"]', el);
			resetBtn.click(function() {
				self.html(self.initContent);
			});
			self.beforeRemove(function() {
				el.unbind();
				resetBtn.unbind();
			});
		}
	}
	// source
	self.clickToolbar('source', function() {
		if (_MOBILE) {
			return;
		}
		if (self.edit.designMode) {
			self.toolbar.disableItems(true);
			self.edit.design(false);
			self.toolbar.select('source');
		} else {
			self.toolbar.disableItems(false);
			self.edit.design(true);
			self.toolbar.unselect('source');
		}
		self.designMode = self.edit.designMode;
	});
	self.afterCreate(function() {
		if (this.designMode) {
			this.toolbar.unselect('source');
		} else {
			this.toolbar.disableItems(true).select('source');
		}
	});
	// fullscreen
	self.clickToolbar('fullscreen', function() {
		self.fullscreen();
	});
	var loaded = false;
	self.afterCreate(function() {
		K(self.edit.doc, self.edit.textarea).keyup(function(e) {
			if (e.which == 27) {
				self.clickToolbar('fullscreen');
			}
		});
		if (loaded) {
			self.focus();
		}
		if (!loaded) {
			loaded = true;
		}
	});
	// undo, redo
	_each('undo,redo'.split(','), function(i, name) {
		if (shortcutKeys[name]) {
			self.afterCreate(function() {
				_ctrl(this.edit.doc, shortcutKeys[name], function() {
					self.clickToolbar(name);
				});
			});
		}
		self.clickToolbar(name, function() {
			self[name]();
		});
	});
	// formatblock
	self.clickToolbar('formatblock', function() {
		var blocks = self.lang('formatblock.formatBlock'),
			heights = {
				h1 : 28,
				h2 : 24,
				h3 : 18,
				H4 : 14,
				p : 12
			},
			curVal = self.cmd.val('formatblock'),
			menu = self.createMenu({
				name : 'formatblock',
				width : self.langType == 'en' ? 200 : 150
			});
		_each(blocks, function(key, val) {
			var style = 'font-size:' + heights[key] + 'px;';
			if (key.charAt(0) === 'h') {
				style += 'font-weight:bold;';
			}
			menu.addItem({
				title : '<span style="' + style + '">' + val + '</span>',
				height : heights[key] + 12,
				checked : (curVal === key || curVal === val),
				click : function() {
					self.select().exec('formatblock', '<' + key.toUpperCase() + '>').hideMenu();
				}
			});
		});
	});
	// fontname
	self.clickToolbar('fontname', function() {
		var curVal = self.cmd.val('fontname'),
			menu = self.createMenu({
				name : 'fontname',
				width : 150
			});
		_each(self.lang('fontname.fontName'), function(key, val) {
			menu.addItem({
				title : '<span style="font-family: ' + key + ';">' + val + '</span>',
				checked : (curVal === key.toLowerCase() || curVal === val.toLowerCase()),
				click : function() {
					self.exec('fontname', key).hideMenu();
				}
			});
		});
	});
	// fontsize
	self.clickToolbar('fontsize', function() {
		var curVal = self.cmd.val('fontsize');
			menu = self.createMenu({
				name : 'fontsize',
				width : 150
			});
		_each(self.fontSizeTable, function(i, val) {
			menu.addItem({
				title : '<span style="font-size:' + val + ';">' + val + '</span>',
				height : _removeUnit(val) + 12,
				checked : curVal === val,
				click : function() {
					self.exec('fontsize', val).hideMenu();
				}
			});
		});
	});
	// forecolor,hilitecolor
	_each('forecolor,hilitecolor'.split(','), function(i, name) {
		self.clickToolbar(name, function() {
			self.createMenu({
				name : name,
				selectedColor : self.cmd.val(name) || 'default',
				colors : self.colorTable,
				click : function(color) {
					self.exec(name, color).hideMenu();
				}
			});
		});
	});
	// cut,copy,paste
	_each(('cut,copy,paste').split(','), function(i, name) {
		self.clickToolbar(name, function() {
			self.focus();
			try {
				self.exec(name, null);
			} catch(e) {
				alert(self.lang(name + 'Error'));
			}
		});
	});
	// about
	self.clickToolbar('about', function() {
		var html = '<div style="margin:20px;">' +
			'<div>KindEditor ' + _VERSION + '</div>' +
			'<div>Copyright &copy; <a href="http://www.kindsoft.net/" target="_blank">kindsoft.net</a> All rights reserved.</div>' +
			'</div>';
		self.createDialog({
			name : 'about',
			width : 300,
			title : self.lang('about'),
			body : html
		});
	});
	// link,image,flash,media
	self.plugin.getSelectedLink = function() {
		return self.cmd.commonAncestor('a');
	};
	self.plugin.getSelectedImage = function() {
		var range = self.edit.cmd.range,
			sc = range.startContainer, so = range.startOffset;
		if (!_WEBKIT && !range.isControl()) {
			return null;
		}
		var img = K(sc.childNodes[so]);
		if (!img || img.name !== 'img' || /^ke-\w+$/i.test(img[0].className)) {
			return null;
		}
		return img;
	};
	self.plugin.getSelectedFlash = function() {
		var range = self.edit.cmd.range,
			sc = range.startContainer, so = range.startOffset;
		if (!_WEBKIT && !range.isControl()) {
			return null;
		}
		var img = K(sc.childNodes[so]);
		if (!img || img.name !== 'img' || img[0].className !== 'ke-flash') {
			return null;
		}
		return img;
	};
	self.plugin.getSelectedMedia = function() {
		var range = self.edit.cmd.range,
			sc = range.startContainer, so = range.startOffset;
		if (!_WEBKIT && !range.isControl()) {
			return null;
		}
		var img = K(sc.childNodes[so]);
		if (!img || img.name !== 'img' || !/^ke-\w+$/.test(img[0].className)) {
			return null;
		}
		if (img[0].className == 'ke-flash') {
			return null;
		}
		return img;
	};
	_each('link,image,flash,media'.split(','), function(i, name) {
		var uName = name.charAt(0).toUpperCase() + name.substr(1);
		_each('edit,delete'.split(','), function(j, val) {
			self.addContextmenu({
				title : self.lang(val + uName),
				click : function() {
					self.loadPlugin(name, function() {
						self.plugin[name][val]();
						self.hideMenu();
					});
				},
				cond : self.plugin['getSelected' + uName],
				width : 150,
				iconClass : val == 'edit' ? 'ke-icon-' + name : undefined
			});
		});
		self.addContextmenu({ title : '-' });
	});
	self.beforeGetHtml(function(html) {
		return html.replace(/<img[^>]*class="?ke-\w+"?[^>]*>/ig, function(full) {
			var imgAttrs = _getAttrList(full),
				attrs = _mediaAttrs(imgAttrs['data-ke-tag']);
			return _mediaEmbed(attrs);
		});
	});
	self.beforeSetHtml(function(html) {
		return html.replace(/<embed[^>]*type="([^"]+)"[^>]*>(?:<\/embed>)?/ig, function(full) {
			var attrs = _getAttrList(full);
			attrs.src = _undef(attrs.src, '');
			attrs.width = _undef(attrs.width, 0);
			attrs.height = _undef(attrs.height, 0);
			return _mediaImg(self.themesPath + 'common/blank.gif', attrs);
		});
	});
	// table
	self.plugin.getSelectedTable = function() {
		return self.cmd.commonAncestor('table');
	};
	self.plugin.getSelectedRow = function() {
		return self.cmd.commonAncestor('tr');
	};
	self.plugin.getSelectedCell = function() {
		return self.cmd.commonAncestor('td');
	};
	_each(('prop,cellprop,colinsertleft,colinsertright,rowinsertabove,rowinsertbelow,rowmerge,colmerge,' +
	'rowsplit,colsplit,coldelete,rowdelete,insert,delete').split(','), function(i, val) {
		var cond = _inArray(val, ['prop', 'delete']) < 0 ? self.plugin.getSelectedCell : self.plugin.getSelectedTable;
		self.addContextmenu({
			title : self.lang('table' + val),
			click : function() {
				self.loadPlugin('table', function() {
					self.plugin.table[val]();
					self.hideMenu();
				});
			},
			cond : cond,
			width : 170,
			iconClass : 'ke-icon-table' + val
		});
	});
	self.addContextmenu({ title : '-' });
	// other
	_each(('selectall,justifyleft,justifycenter,justifyright,justifyfull,insertorderedlist,' +
		'insertunorderedlist,indent,outdent,subscript,superscript,hr,print,' +
		'bold,italic,underline,strikethrough,removeformat,unlink').split(','), function(i, name) {
		if (shortcutKeys[name]) {
			self.afterCreate(function() {
				_ctrl(this.edit.doc, shortcutKeys[name], function() {
					self.cmd.selection();
					self.clickToolbar(name);
				});
			});
		}
		self.clickToolbar(name, function() {
			self.focus().exec(name, null);
		});
	});
	// paste
	self.afterCreate(function() {
		var doc = self.edit.doc, cls = '__kindeditor_paste__';
		K(doc.body).bind('paste', function(e) {
			if (self.pasteType === 0) {
				e.stop();
			}
		});
		K(doc.body).bind(_IE ? 'beforepaste' : 'paste', function(e){
			if (self.pasteType === 0 || K('div.' + cls, doc).length > 0) {
				return;
			}
			var cmd = self.cmd.selection(),
				bookmark = cmd.range.createBookmark(),
				div = K('<div class="' + cls + '">&nbsp;</div>', doc).css({
					position : 'absolute',
					width : '1px',
					height : '1px',
					overflow : 'hidden',
					left : '-1981px',
					top : K(bookmark.start).pos().y + 'px',
					'white-space' : 'nowrap'
				});
			K(doc.body).append(div);
			cmd.range.selectNodeContents(div[0]);
			cmd.select();
			// 结束粘贴后
			setTimeout(function() {
				cmd.range.moveToBookmark(bookmark);
				cmd.select();
				if (_WEBKIT) {
					K('div.' + cls, div).each(function() {
						K(this).after('<br />').remove(true);
					});
					K('span.Apple-style-span', div).remove(true);
					K('meta', div).remove();
				}
				var html = div.html();
				div.remove();
				// paste HTML
				if (self.pasteType === 2) {
					html = self.beforeSetHtml(html);
					html = _formatHtml(html, self.filterMode ? self.htmlTags : null);
				}
				// paste text
				if (self.pasteType === 1) {
					html = html.replace(/<br[^>]*>/ig, '\n');
					html = html.replace(/<\/p><p[^>]*>/ig, '\n');
					html = html.replace(/<[^>]+/g, '');
					html = html.replace(/&nbsp;/ig, ' ');
					html = html.replace(/\n\s*\n/g, '\n');
					if (self.newlineTag == 'p') {
						html = html.replace(/^/, '<p>').replace(/$/, '</p>').replace(/\n/g, '</p><p>');
					} else {
						html = html.replace(/\n/g, '<br />$&');
					}
				}
				self.insertHtml(html);
			}, 0);
		});
	});
	self.beforeGetHtml(function(html) {
		return html.replace(/<div\s+[^>]*data-ke-script-attr="([^"]*)"[^>]*>([\s\S]*?)<\/div>/ig, function(full, attr, code) {
			return '<script' + unescape(attr) + '>' + code + '</script>';
		})
		.replace(/(<[^>]*)data-ke-src="([^"]*)"([^>]*>)/ig, function(full, start, src, end) {
			full = full.replace(/(\s+(?:href|src)=")[^"]*(")/i, '$1' + src + '$2');
			full = full.replace(/\s+data-ke-src="[^"]*"/i, '');
			return full;
		})
		.replace(/(<[^>]+\s)data-ke-(on\w+="[^"]*"[^>]*>)/ig, function(full, start, end) {
			return start + end;
		});
	});
	self.beforeSetHtml(function(html) {
		return html.replace(/<script([^>]*)>([\s\S]*?)<\/script>/ig, function(full, attr, code) {
			return '<div class="ke-script" data-ke-script-attr="' + escape(attr) + '">' + code + '</div>';
		})
		.replace(/(<[^>]*)(href|src)="([^"]*)"([^>]*>)/ig, function(full, start, key, src, end) {
			if (full.match(/\sdata-ke-src="[^"]*"/i)) {
				return full;
			}
			full = start + key + '="' + src + '"' + ' data-ke-src="' + src + '"' + end;
			return full;
		})
		.replace(/(<[^>]+\s)(on\w+="[^"]*"[^>]*>)/ig, function(full, start, end) {
			return start + 'data-ke-' + end;
		})
		.replace(/<table([^>]*)>/ig, function(full) {
			if (full.indexOf('ke-zeroborder') >= 0) {
				return full;
			}
			var attrs = _getAttrList(full);
			if (attrs.border === undefined || attrs.border === '' || attrs.border === '0') {
				return _addClassToTag(full, 'ke-zeroborder');
			}
			return full;
		});
	});
});

K.create = _create;
K.plugin = _plugin;
K.lang = _lang;

