import { useState, useEffect } from "react";

/**
 * Hook to generate an object URL for a file. This URL will be revoked when the
 * component unmounts (or when the file changes).
 */
export function useObjectUrl() {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  const setObjectUrlFromFile = (file: File) => {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }

    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    return url;
  };

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  return { objectUrl, setObjectUrlFromFile };
}
