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

  // 产品图集灯箱
  var galleryItems = document.querySelectorAll('.masonry .gallery-item img');
  if (galleryItems.length > 0) {
    var lightbox = document.querySelector('.lightbox');
    var lbImg = lightbox ? lightbox.querySelector('img') : null;
    var lbCounter = lightbox ? lightbox.querySelector('.lb-counter') : null;
    var current = 0;

    function show(index) {
      current = (index + galleryItems.length) % galleryItems.length;
      var img = galleryItems[current];
      var full = img.getAttribute('data-full') || img.currentSrc || img.src;
      if (lbImg) {
        lbImg.src = full;
        lbImg.alt = img.alt;
      }
      if (lbCounter) lbCounter.textContent = (current + 1) + ' / ' + galleryItems.length;
      if (lightbox) lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function hide() {
      if (lightbox) lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    galleryItems.forEach(function (img, i) {
      img.addEventListener('click', function () { show(i); });
    });

    var btnClose = lightbox ? lightbox.querySelector('.lb-close') : null;
    var btnPrev = lightbox ? lightbox.querySelector('.lb-prev') : null;
    var btnNext = lightbox ? lightbox.querySelector('.lb-next') : null;
    if (btnClose) btnClose.addEventListener('click', hide);
    if (btnPrev) btnPrev.addEventListener('click', function () { show(current - 1); });
    if (btnNext) btnNext.addEventListener('click', function () { show(current + 1); });

    // 点击空白处关闭
    if (lightbox) {
      lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) hide();
      });
    }

    // 键盘导航
    document.addEventListener('keydown', function (e) {
      if (!lightbox || !lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') hide();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }
})();
