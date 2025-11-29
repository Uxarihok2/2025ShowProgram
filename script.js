document.addEventListener('DOMContentLoaded', () => {
    const items = Array.from(document.querySelectorAll('.flight-item'));
    let activeItem = null;
  
    function closeAllMobile() {
      items.forEach(i => {
        i.classList.remove('open');
        const arrow = i.querySelector('.program-arrow');
        if (arrow) arrow.textContent = '▸';
      });
      activeItem = null;
    }
  
    function isDesktop() {
      return window.matchMedia('(min-width: 768px)').matches;
    }
  
    // 初次載入時：桌機不折疊，手機全部收起
    if (!isDesktop()) {
      closeAllMobile();
    }
  
    // 設定每個項目
    items.forEach(item => {
      const toggle = item.querySelector('.program-toggle');
      const arrow = item.querySelector('.program-arrow');
      if (!toggle) return;
  
      toggle.addEventListener('click', () => {
        // 桌機版不折疊、不切換
        if (isDesktop()) return;
  
        const isOpen = item.classList.contains('open');
  
        // 若已有其他展開 → 收合其他
        if (activeItem && activeItem !== item) {
          activeItem.classList.remove('open');
          const otherArrow = activeItem.querySelector('.program-arrow');
          if (otherArrow) otherArrow.textContent = '▸';
        }
  
        // 切換本項目
        if (isOpen) {
          item.classList.remove('open');
          if (arrow) arrow.textContent = '▸';
          activeItem = null;
        } else {
          item.classList.add('open');
          if (arrow) arrow.textContent = '▾';
          activeItem = item;
        }
      });
    });
  
    // 監聽 RWD 切換：桌機 → 強制全部開；手機 → 全部收合
    window.addEventListener('resize', () => {
      if (isDesktop()) {
        // 桌機全部展開視為固定呈現
        items.forEach(i => i.classList.add('open'));
        items.forEach(i => {
          const arrow = i.querySelector('.program-arrow');
          if (arrow) arrow.textContent = '▸'; // 桌機箭頭固定不旋轉
        });
        activeItem = null;
      } else {
        // 手機初始收合
        closeAllMobile();
      }
    });
  });