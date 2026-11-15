(function () {
  var key = 'scentient-theme';
  var root = document.documentElement;

  function storedTheme() {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function preferredTheme() {
    var stored = storedTheme();
    if (stored === 'light' || stored === 'dark') return stored;
    return 'dark';
  }

  function setStoredTheme(theme) {
    try {
      window.localStorage.setItem(key, theme);
    } catch (error) {
      return;
    }
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    var label = theme === 'light' ? 'Light' : 'Dark';
    var icon = theme === 'light' ? 'L' : 'D';
    document.querySelectorAll('.theme-toggle').forEach(function (button) {
      button.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
      button.setAttribute('aria-label', 'Switch to ' + (theme === 'light' ? 'dark' : 'light') + ' mode');
      var labelNode = button.querySelector('.theme-toggle__label');
      var iconNode = button.querySelector('.theme-toggle__icon');
      if (labelNode) labelNode.textContent = label;
      if (iconNode) iconNode.textContent = icon;
    });
  }

  function toggleTheme() {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    setStoredTheme(next);
    applyTheme(next);
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(preferredTheme());
    document.querySelectorAll('.theme-toggle').forEach(function (button) {
      button.addEventListener('click', toggleTheme);
    });
  });
})();
