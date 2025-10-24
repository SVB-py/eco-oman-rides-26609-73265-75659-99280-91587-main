import { useEffect, useMemo, useState } from "react";
import { Toaster as Sonner, toast } from "sonner";

type SonnerTheme = "light" | "dark" | "system" | undefined;

interface ToasterProps {
  theme?: SonnerTheme;
  // Allow forwarding any additional props the Sonner component supports without tight coupling to its types.
  [key: string]: unknown;
}

const prefersDark = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
};

const getDocumentTheme = () => {
  if (typeof document === "undefined") {
    return prefersDark() ? "dark" : "light";
  }
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
};

const SonnerComponent = Sonner as unknown as React.ComponentType<Record<string, unknown>>;

const Toaster = ({ theme, ...props }: ToasterProps) => {
  const [detectedTheme, setDetectedTheme] = useState<SonnerTheme>("system");

  useEffect(() => {
    if (theme) {
      return;
    }

    setDetectedTheme(getDocumentTheme());

    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia?.("(prefers-color-scheme: dark)");

    if (!media) {
      return;
    }

    const listener = (event: MediaQueryListEvent) => {
      setDetectedTheme(event.matches ? "dark" : "light");
    };

    media.addEventListener("change", listener);

    return () => {
      media.removeEventListener("change", listener);
    };
  }, [theme]);

  const resolvedTheme = useMemo<SonnerTheme>(() => {
    if (theme) {
      return theme;
    }
    return detectedTheme ?? "system";
  }, [detectedTheme, theme]);

  return (
    <SonnerComponent
      theme={resolvedTheme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...(props as Record<string, unknown>)}
    />
  );
};

export { Toaster, toast };
