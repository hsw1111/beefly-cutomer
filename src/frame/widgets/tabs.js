/* Tabs()
 * ======
 * Converts a nested list into a multilevel
 * tabs view menu.
 *
 * @Usage: $('.my-menu').tabs(options)
 *         or add [data-widget="tabs"] to the ul element
 *         Pass any option as data-option="value"
 */
+function ($) {
	'use strict';

	var DataKey = 'lte.tabs';

	var Default = {
		animationSpeed: 500,
		accordion: true,
		followLink: false,
		trigger: '.tabsview a'
	};

	var Selector = {
		data: '[data-widget="tabs"]',
		tabs: '.tabs',
		tabHeader: '.tab-header',
		tabContent: '.tab-content',
		tabUl: '.tab-ul',
		li: '.tab-ul li',
		link: '.tab-ul li a'
	};

	var ClassName = {
		active: 'active'
	};

	var Event = {
		collapsed: 'collapsed.tabs',
		expanded: 'expanded.tabs'
	};

	// Tabs Class Definition
	// =====================
	var Tabs = function (element, options) {
		this.element = element;
		this.options = options;

		$(this.element).addClass(ClassName.tabs);

		this.tabHeader = $(this.element).find(Selector.tabHeader);
		this.tabContent = $(this.element).find(Selector.tabContent);
		this.tabUl = $(this.element).find(Selector.tabUl);

		this._setUpListeners();

	};

	// 添加标签页
	Tabs.prototype.addTab = function (tab) {
		// 带参数
		var queryString = '';
		if (tab.params) {
			var params = tab.params;
			var paramsArray = [];
			for (var key in params) {
				paramsArray.push(key + '=' + encodeURIComponent(params[key]));
			}
			if (paramsArray.length > 0)
				queryString = '?' + paramsArray.join('&');
		}
		var url = `module.html${queryString}#${tab.path}`;

		var li = this.tabUl.find(`li[data-path="${url}"]`);
		if (li.length == 0) {
			this.tabUl.children().removeClass(ClassName.active);
			this.tabContent.children().removeClass(ClassName.active);


			this.tabUl.append(`<li class="active" data-path="${url}">
				<a href="javascript:">
					${tab.name}
					<i class="fa fa-fw fa-close"></i>
				</a>
			</li>`)

			var frameHeight = $('.content-wrapper').height() - 55;
			this.tabContent.append(`<div class="tab-pane active">
				<iframe src="${url}" width="100%" height="${frameHeight}" frameborder="0"></iframe>
			</div>`);
		} else {
			this.tabUl.children().removeClass(ClassName.active);
			this.tabContent.children().removeClass(ClassName.active);
			var index = this.tabUl.children().index(li);
			li.addClass(ClassName.active);
			this.tabContent.children().eq(index).addClass(ClassName.active);
		}

		this.scrollTab()
	};

	// 关闭标签页
	Tabs.prototype.scrollTab = function () {
		var that = this;

		this.initScrollShow();

		var index = this.getActiveIndex();
		var activeLi = this.tabUl.children().eq(index);

		var marginLeft = 0;

		// 滚动到可视区域:在左侧
		if (activeLi.position().left < marginLeft) {
			var left = this.tabUl.scrollLeft() + activeLi.position().left - marginLeft;
			this.tabUl.animate({scrollLeft: left}, 200, function () {
				that.initScrollState();
			});
		}
		// 滚动到可视区域:在右侧
		if ((activeLi.position().left + activeLi.width() - marginLeft) > this.tabUl[0].clientWidth) {
			var left = this.tabUl.scrollLeft() + ((activeLi.position().left + activeLi.width() - marginLeft) - this.tabUl[0].clientWidth);
			this.tabUl.animate({scrollLeft: left}, 200, function () {
				that.initScrollState();
			});
		}

	}

	// 关闭标签页
	Tabs.prototype.closeTab = function (li) {
		var index = -1;

		if (li) {
			if (typeof li == 'number') {		// 传索引
				index = li;
			} else {
				index = this.tabUl.children().index(li); // 传$(li)
			}
		} else {
			index = this.getActiveIndex();		// 不传，关闭当前
		}

		if (index == 0) {
			// alert('首页不能关闭哦！')
			return;
		}

		this.tabUl.children().eq(index).remove();
		this.tabContent.children().eq(index).remove();

		if (index > this.tabUl.children().length - 1) {
			index--
		}

		this.switchTab(index);
	}

	// index or link
	Tabs.prototype.switchTab = function (link) {
		var li = null, index = 0;
		if (typeof link == 'number') {
			index = link;
			li = this.tabUl.children().eq(index);
		} else {
			li = link.parent();
			index = this.tabUl.children().index(li);
		}

		this.tabUl.children().removeClass(ClassName.active);
		li.addClass(ClassName.active);
		this.tabContent.children().removeClass(ClassName.active);
		this.tabContent.children().eq(index).addClass(ClassName.active);

		this.scrollTab()
	}

	// 所有当前活动页索引
	Tabs.prototype.getActiveIndex = function () {
		var li = this.tabUl.find('li.active');
		return this.tabUl.children().index(li);
	}

	// 重新加载当前页
	Tabs.prototype.reloadTab = function () {
		var index = this.getActiveIndex();
		var iframe = this.tabContent.children().eq(index).find('iframe')[0];
		iframe.contentWindow.location.reload()
	}

	// 关闭所有
	Tabs.prototype.closeAllTab = function () {
		var len = this.tabUl.children().length;

		this.tabUl.children().slice(1).remove();
		this.tabContent.children().slice(1).remove();
		this.switchTab(0);
	}

	// 关闭所有
	Tabs.prototype.scrollLeft = function () {
		var that = this;
		this.tabUl.animate({scrollLeft: this.tabUl.scrollLeft() - 300}, 200, function () {
			that.initScrollState();
		});
	}

	// 关闭所有
	Tabs.prototype.scrollRight = function () {
		var that = this;
		this.tabUl.animate({scrollLeft: this.tabUl.scrollLeft() + 300}, 200, function () {
			that.initScrollState();
		});
	}

	Tabs.prototype.initScrollState = function () {
		var lnkLeft = $(this.element).find('#lnkLeft');
		var lnkRight = $(this.element).find('#lnkRight');

		if (this.tabUl.scrollLeft() == 0) {
			lnkLeft.removeClass(ClassName.active);
		} else {
			lnkLeft.addClass(ClassName.active);
		}
		if ((this.tabUl.scrollLeft() + this.tabUl[0].clientWidth) >= this.tabUl[0].scrollWidth) {
			lnkRight.removeClass(ClassName.active);
		} else {
			lnkRight.addClass(ClassName.active);
		}
	}


	Tabs.prototype.initScrollShow = function () {
		if (this.tabUl[0].scrollWidth > this.tabUl[0].clientWidth) {
			$(this.element).addClass('scroll');
		} else {
			$(this.element).removeClass('scroll');
		}
	}

	Tabs.prototype.resizeFrameHeight = function () {

		var footerHeight = $('.main-footer').outerHeight() || 0;
		var windowHeight = $(window).height();

		$('.content-wrapper').css('height', windowHeight - footerHeight);

		var frameHeight = windowHeight - footerHeight - 100;
		this.tabContent.find('iframe').attr('height', frameHeight);
	}

	// Private
	Tabs.prototype._setUpListeners = function () {
		var that = this;

		$(this.element).on('click', Selector.link, function (event) {
			that.switchTab($(this));
		});

		$(this.element).on('click', '.tab-ul li a .fa-close', function (event) {
			that.closeTab();
			event.preventDefault();
			event.stopPropagation();
		});

		$(this.element).on('click', '#lnkReload', function (event) {
			that.reloadTab($(this));
		});

		$(this.element).on('click', '#lnkClose', function (event) {
			that.closeTab();
		});

		$(this.element).on('click', '#lnkCloseAll', function (event) {
			that.closeAllTab();
		});

		// 控制选项卡滚动位置
		$(this.element).on('click', '#lnkLeft', function () {
			that.scrollLeft()
		});
		// 向右箭头
		$(this.element).on('click', '#lnkRight', function () {
			that.scrollRight()
		});

		$(this.element).find('.tab-ul').contextMenu({
			menuSelector: "#contextMenu",
			menuSelected: function (invokedOn, selectedMenu) {
				console.log($.trim(invokedOn.text()), $.trim(selectedMenu.text()))
				var action = selectedMenu.attr('data-action');
				if (action === 'refresh') {
					that.reloadTab()
				} else if (action === 'close') {
					that.closeTab(invokedOn.parent())
				} else if (action === 'closeAll') {
					that.closeAllTab()
				}
			}
		});


		$(window).on('resize', function () {
			that.resizeFrameHeight();
			that.initScrollShow();
			that.initScrollState();
		});

		that.resizeFrameHeight();
	};

	// Plugin Definition
	// =================
	function Plugin(option) {
		var $this = $(this[0]);
		var data = $this.data(DataKey);

		if (!data) {
			var options = $.extend({}, Default, $this.data(), typeof option == 'object' && option);
			var tabs = new Tabs($this, options);
			$this.data(DataKey, tabs);
			return tabs
		} else {
			return data
		}
	}

	var old = $.fn.tabs;

	$.fn.tabs = Plugin;
	$.fn.tabs.Constructor = Tabs;

	// No Conflict Mode
	// ================
	$.fn.tabs.noConflict = function () {
		$.fn.tabs = old;
		return this;
	};

	// Tabs Data API
	// =============
	$(window).on('load', function () {
		$(Selector.data).each(function () {
			Plugin.call($(this));
		});

		// 添加Tab页
		beefly.addTab = function (tab) {
			var tabs = $('#tabs').tabs();
			tabs.addTab(tab)
		};

		// 关闭当前活动Tab页
		beefly.closeTab = function () {
			var tabs = $('#tabs').tabs();
			tabs.closeTab()
		};
	});

}(jQuery);
