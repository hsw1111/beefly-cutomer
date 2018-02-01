/* Tree()
 * ======
 * Converts a nested list into a multilevel
 * tree view menu.
 *
 * @Usage: $('.my-menu').tree(options)
 *         or add [data-widget="tree"] to the ul element
 *         Pass any option as data-option="value"
 */
+function ($) {
	'use strict';

	var DataKey = 'lte.tree';

	var Default = {
		animationSpeed: 500,
		accordion: true,
		followLink: false,
		trigger: '.treeview a'
	};

	var Selector = {
		tree: '.tree',
		treeview: '.treeview',
		treeviewMenu: '.treeview-menu',
		open: '.menu-open, .active',
		li: 'li',
		activeLi: 'li.active',
		data: '[data-widget="tree"]',
		active: '.active',
		openedLink: '.menu-open > a'
	};

	var ClassName = {
		open: 'menu-open',
		tree: 'tree',
		active: 'active'
	};

	var Event = {
		collapsed: 'collapsed.tree',
		expanded: 'expanded.tree'
	};

	// Tree Class Definition
	// =====================
	var Tree = function (element, options) {
		this.element = element;
		this.options = options;

		$(this.element).addClass(ClassName.tree);

		$(Selector.treeview + Selector.active, this.element).addClass(ClassName.open);

		this._setUpListeners();

		this.loadData();
	};

	Tree.prototype.loadData = function () {
		var that = this;

		$.ajax({
			type: 'get',
			url: 'data/menus.json'
		}).then(function (result) {
			that.renderTree(result);
		})
	};

	Tree.prototype.renderTree = function (menus) {

		var str = '';
		for (var menu of menus) {
			str += `<li class="treeview">`;
			str += `	<a href="#">`;
			str += `		<i class="fa ${menu.icon}"></i> <span>${menu.name}</span>`;
			str += `		<span class="pull-right-container">`;
			str += `      <i class="fa fa-angle-left pull-right"></i>`;
			str += `    </span>`;
			str += `	</a>`;
			str += `	<ul class="treeview-menu">`;
			for (var child of menu.child) {
				str += `		<li><a href="${child.path}" target="_blank"><i class="fa fa-circle-o"></i> ${child.name} </a></li>`;
			}
			str += `	</ul>`;
			str += `</li>`;
		}

		$(this.element).append(str);

	};

	Tree.prototype.toggle = function (link, event) {
		var treeviewMenu = link.next(Selector.treeviewMenu);
		var parentLi = link.parent();
		var isOpen = parentLi.hasClass(ClassName.open);

		if (!parentLi.is(Selector.treeview)) {
			return;
		}

		if (!this.options.followLink || link.attr('href') === '#') {
			event.preventDefault();
		}

		if (isOpen) {
			this.collapse(treeviewMenu, parentLi);
		} else {
			this.expand(treeviewMenu, parentLi);
		}
	};

	Tree.prototype.expand = function (tree, parent) {
		var expandedEvent = $.Event(Event.expanded);

		if (this.options.accordion) {
			var openMenuLi = parent.siblings(Selector.open);
			var openTree = openMenuLi.children(Selector.treeviewMenu);
			this.collapse(openTree, openMenuLi);
		}

		parent.addClass(ClassName.open);
		tree.slideDown(this.options.animationSpeed, function () {
			$(this.element).trigger(expandedEvent);
		}.bind(this));
	};

	Tree.prototype.collapse = function (tree, parentLi) {
		var collapsedEvent = $.Event(Event.collapsed);

		tree.find(Selector.open).removeClass(ClassName.open);
		parentLi.removeClass(ClassName.open);
		tree.slideUp(this.options.animationSpeed, function () {
			tree.find(Selector.open + ' > ' + Selector.treeview).slideUp();
			$(this.element).trigger(collapsedEvent);
		}.bind(this));
	};

	Tree.prototype.open = function (link, event) {
		var parentLi = link.parent();
		var treeviewLi = parentLi.closest(Selector.treeview);
		var tree = $(this.element);

		if (treeviewLi.length == 0) {
			this.toggle($(Selector.openedLink), event);
		}

		tree.find(Selector.activeLi).removeClass(ClassName.active);
		treeviewLi.addClass(ClassName.active);
		parentLi.addClass(ClassName.active);


		var tabs = $('#tabs').tabs();
		tabs.addTab({
			name: link.text(),
			path: link.attr('href')
		})

		event.preventDefault();
	};

	// Private
	Tree.prototype._setUpListeners = function () {
		var that = this;

		$(this.element).on('click', this.options.trigger, function (event) {
			that.toggle($(this), event);
		});

		$(this.element).on('click', "li a[href!='#']", function (event) {
			that.open($(this), event);
		});
	};

	// Plugin Definition
	// =================
	function Plugin(option) {
		return this.each(function () {
			var $this = $(this);
			var data = $this.data(DataKey);

			if (!data) {
				var options = $.extend({}, Default, $this.data(), typeof option == 'object' && option);
				$this.data(DataKey, new Tree($this, options));
			}
		});
	}

	var old = $.fn.tree;

	$.fn.tree = Plugin;
	$.fn.tree.Constructor = Tree;

	// No Conflict Mode
	// ================
	$.fn.tree.noConflict = function () {
		$.fn.tree = old;
		return this;
	};

	// Tree Data API
	// =============
	$(window).on('load', function () {
		$(Selector.data).each(function () {
			Plugin.call($(this));
		});
	});

}(jQuery);
