import React, { createContext, useContext, useState, useEffect, useRef } from "react";


const ContentCtx = createContext(null);
export const useContent = () => useContext(ContentCtx);

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(null);
  const initializedRef = useRef(false);

  // Update CSS variable for theme color when content.primaryColor changes
  useEffect(() => {
    // Light mode
    document.documentElement.style.setProperty('--primary-color', content && content.primaryColor ? content.primaryColor : '#004d43');
    document.documentElement.style.setProperty('--background-color', content && content.backgroundColor ? content.backgroundColor : '#fff');
    document.documentElement.style.setProperty('--alt-background-color', content && content.altBackgroundColor ? content.altBackgroundColor : '#f8fafc');
    // Dark mode
    document.documentElement.style.setProperty('--primary-color-dark', content && content.primaryColorDark ? content.primaryColorDark : '#00b894');
    document.documentElement.style.setProperty('--background-color-dark', content && content.backgroundColorDark ? content.backgroundColorDark : '#18181b');
    document.documentElement.style.setProperty('--alt-background-color-dark', content && content.altBackgroundColorDark ? content.altBackgroundColorDark : '#23272f');
  }, [content && content.primaryColor, content && content.backgroundColor, content && content.altBackgroundColor, content && content.primaryColorDark, content && content.backgroundColorDark, content && content.altBackgroundColorDark]);

  // On mount, load local static content first (siteContent.json).
  // If an API is available, it will override the local content.
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const serverContent = await res.json();
          setContent(serverContent || null);
        } else {
          setContent(null);
        }
      } catch (e) {
        setContent(null);
      } finally {
        initializedRef.current = true;
      }
    })();
  }, []);

  // Persist content to server when it changes (after initial load).
  useEffect(() => {
    if (!initializedRef.current) return;
    (async () => {
      try {
        await fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(content),
        });
      } catch (e) {
        // ignore network errors in dev
      }
    })();
  }, [content]);

  const updateSection = (section, value) => {
    setContent((prev) => ({ ...prev, [section]: value }));
  };

  const resetContent = async () => {
    try {
      // Reset to empty content on both client and server.
      setContent(null);
      try {
        await fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        });
      } catch (e) {
        // ignore
      }
    } catch (e) {
      // ignore
    }
  };

  return (
    <ContentCtx.Provider value={{ content, setContent, updateSection, resetContent }}>
      {children}
    </ContentCtx.Provider>
  );
};
