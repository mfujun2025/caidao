// 菜刀.cn 全站交互脚本
(function () {
  'use strict';

  // 移动端导航折叠
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var expanded = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }

  // 文章中心分类筛选
  var filterBar = document.querySelector('.filter-bar');
  var articleItems = document.querySelectorAll('[data-cat]');
  if (filterBar && articleItems.length > 0) {
    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      var buttons = filterBar.querySelectorAll('button');
      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.getAttribute('data-filter');
      articleItems.forEach(function (item) {
        var show = cat === 'all' || item.getAttribute('data-cat') === cat;
        item.style.display = show ? '' : 'none';
      });
    });
  }
})();
