// public/site-helper.js
(function() {
  'use strict';

  // 页面增强工具：提示卡片、关键词徽章、访问说明
  const SITE_CONFIG = {
    baseUrl: 'https://cnwebs-lovegames.com',
    keywords: ['爱游戏', '休闲', '益智', '冒险'],
    pageTitle: '爱游戏乐园',
    version: '1.0.0'
  };

  // 工具函数：安全创建元素
  function createElement(tag, attrs, content) {
    const el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(key => {
        if (key === 'className') {
          el.className = attrs[key];
        } else if (key === 'data') {
          Object.keys(attrs[key]).forEach(dk => {
            el.dataset[dk] = attrs[key][dk];
          });
        } else {
          el.setAttribute(key, attrs[key]);
        }
      });
    }
    if (content !== undefined) {
      if (typeof content === 'string') {
        el.textContent = content;
      } else if (content instanceof HTMLElement) {
        el.appendChild(content);
      }
    }
    return el;
  }

  // 生成提示卡片
  function createTipCard() {
    const card = createElement('div', {
      className: 'site-helper-card',
      id: 'helper-card',
      data: { role: 'tip' }
    });
    const title = createElement('h4', {}, '欢迎来到 ' + SITE_CONFIG.pageTitle);
    const desc = createElement('p', {}, '探索更多精彩内容，请访问官网：');
    const link = createElement('a', {
      href: SITE_CONFIG.baseUrl,
      target: '_blank',
      rel: 'noopener noreferrer'
    }, SITE_CONFIG.baseUrl);
    desc.appendChild(link);
    card.appendChild(title);
    card.appendChild(desc);
    return card;
  }

  // 生成关键词徽章容器
  function createKeywordBadges() {
    const container = createElement('div', {
      className: 'keyword-badges',
      id: 'badge-container'
    });
    const label = createElement('span', { className: 'badge-label' }, '热门关键词：');
    container.appendChild(label);
    SITE_CONFIG.keywords.forEach(kw => {
      const badge = createElement('span', {
        className: 'badge-item',
        data: { keyword: kw }
      }, kw);
      container.appendChild(badge);
    });
    return container;
  }

  // 生成访问说明
  function createAccessGuide() {
    const guide = createElement('div', {
      className: 'access-guide',
      id: 'access-info'
    });
    const icon = createElement('span', { className: 'guide-icon' }, '💡');
    const text = createElement('p', {}, 
      '如访问遇到问题，请尝试刷新页面或检查网络连接。本站专注于 ' + 
      SITE_CONFIG.keywords[0] + ' 相关内容，祝您游玩愉快！'
    );
    guide.appendChild(icon);
    guide.appendChild(text);
    return guide;
  }

  // 注入样式
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .site-helper-card, .keyword-badges, .access-guide {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        max-width: 600px;
        margin: 16px auto;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        background: #ffffff;
        border: 1px solid #e0e0e0;
        color: #333;
        line-height: 1.5;
      }
      .site-helper-card h4 {
        margin: 0 0 8px 0;
        font-size: 1.1em;
        color: #1a73e8;
      }
      .site-helper-card a {
        color: #1a73e8;
        text-decoration: none;
        font-weight: 500;
        word-break: break-all;
      }
      .site-helper-card a:hover {
        text-decoration: underline;
      }
      .keyword-badges {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
      }
      .badge-label {
        font-weight: 600;
        margin-right: 4px;
      }
      .badge-item {
        display: inline-block;
        background: #e8f0fe;
        color: #1a73e8;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 0.85em;
        border: 1px solid #c4d7f5;
      }
      .access-guide {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        background: #fef9e7;
        border-color: #f9e79f;
      }
      .guide-icon {
        font-size: 1.4em;
        line-height: 1;
      }
      .access-guide p {
        margin: 0;
        color: #6b5b00;
      }
    `;
    document.head.appendChild(style);
  }

  // 主初始化函数
  function init() {
    // 防止重复执行
    if (document.getElementById('helper-card')) return;
    injectStyles();
    // 按顺序插入元素
    const body = document.body;
    if (!body) {
      console.warn('[SiteHelper] body not ready');
      return;
    }
    // 使用文档片段批量插入
    const fragment = document.createDocumentFragment();
    fragment.appendChild(createTipCard());
    fragment.appendChild(createKeywordBadges());
    fragment.appendChild(createAccessGuide());
    body.insertBefore(fragment, body.firstChild);
  }

  // 根据 DOM 状态执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();