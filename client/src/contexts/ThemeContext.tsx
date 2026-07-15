import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

type Theme = "light" | "dark";

interface ThemeResolution {
  theme: Theme;
  override: Theme | null;
  mediaQuery: MediaQueryList | null;
}

interface ThemeRuntime {
  resolveTheme: (defaultTheme: Theme, switchable: boolean) => ThemeResolution;
  applyTheme: (theme: Theme) => void;
  getMediaQuery: () => MediaQueryList | null;
  writeOverride: (theme: Theme) => boolean;
}

declare global {
  interface Window {
    __themeRuntime: ThemeRuntime;
  }
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme?: () => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = false,
}: ThemeProviderProps) {
  const [themeState, setThemeState] = useState<{
    theme: Theme;
    override: Theme | null;
  }>(() => {
    const resolution = window.__themeRuntime.resolveTheme(
      defaultTheme,
      switchable
    );
    return { theme: resolution.theme, override: resolution.override };
  });

  useLayoutEffect(() => {
    window.__themeRuntime.applyTheme(themeState.theme);
  }, [themeState.theme]);

  useEffect(() => {
    if (!switchable || themeState.override) return;

    const mediaQuery = window.__themeRuntime.getMediaQuery();
    if (!mediaQuery) return;

    const handleChange = (event: MediaQueryListEvent) => {
      setThemeState(previous =>
        previous.override
          ? previous
          : {
              theme: event.matches ? "dark" : "light",
              override: null,
            }
      );
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [switchable, themeState.override]);

  const toggleTheme = switchable
    ? () => {
        const nextTheme = themeState.theme === "light" ? "dark" : "light";
        window.__themeRuntime.writeOverride(nextTheme);
        setThemeState({ theme: nextTheme, override: nextTheme });
      }
    : undefined;

  return (
    <ThemeContext.Provider
      value={{ theme: themeState.theme, toggleTheme, switchable }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
