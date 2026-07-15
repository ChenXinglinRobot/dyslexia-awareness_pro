(function () {
  "use strict";

  var THEME_OVERRIDE_KEY = "theme-override";
  var LEGACY_THEME_KEY = "theme";
  var DARK_QUERY = "(prefers-color-scheme: dark)";
  var THEME_COLORS = {
    light: "#f9f4ec",
    dark: "#050c13",
  };

  function isTheme(value) {
    return value === "light" || value === "dark";
  }

  function safeRemove(key) {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (_error) {
      return false;
    }
  }

  function readOverride() {
    try {
      var value = window.localStorage.getItem(THEME_OVERRIDE_KEY);
      if (isTheme(value)) return value;
      if (value !== null) safeRemove(THEME_OVERRIDE_KEY);
    } catch (_error) {
      // Storage can be unavailable in privacy-restricted contexts.
    }
    return null;
  }

  function writeOverride(theme) {
    if (!isTheme(theme)) return false;
    try {
      window.localStorage.setItem(THEME_OVERRIDE_KEY, theme);
      return true;
    } catch (_error) {
      return false;
    }
  }

  function getMediaQuery() {
    try {
      return typeof window.matchMedia === "function"
        ? window.matchMedia(DARK_QUERY)
        : null;
    } catch (_error) {
      return null;
    }
  }

  function resolveTheme(defaultTheme, switchable) {
    var fallback = isTheme(defaultTheme) ? defaultTheme : "light";

    if (!switchable) {
      return { theme: fallback, override: null, mediaQuery: null };
    }

    // The legacy key mixed automatic results with real user choices, so it
    // cannot safely be migrated as an override.
    safeRemove(LEGACY_THEME_KEY);

    var override = readOverride();
    if (override) {
      return { theme: override, override: override, mediaQuery: null };
    }

    var mediaQuery = getMediaQuery();
    return {
      theme: mediaQuery ? (mediaQuery.matches ? "dark" : "light") : fallback,
      override: null,
      mediaQuery: mediaQuery,
    };
  }

  function applyTheme(theme) {
    if (!isTheme(theme)) return;

    var root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;

    var themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute("content", THEME_COLORS[theme]);

    var favicon = document.querySelector("link[data-theme-icon]");
    if (favicon)
      favicon.setAttribute("href", "/brand/favicon-" + theme + ".svg?v=2");
  }

  window.__themeRuntime = Object.freeze({
    resolveTheme: resolveTheme,
    applyTheme: applyTheme,
    getMediaQuery: getMediaQuery,
    writeOverride: writeOverride,
  });
})();
