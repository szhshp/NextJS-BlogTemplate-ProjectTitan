import { useState, useEffect } from "react";
import { ShowcaseContentType } from "types/showcaseContent";
import { logger } from "utils/logger";
import { showcaseContent } from "data/showcaseContent";

/**
 * @name useShowcaseContent
 * @description A hook to get the showcase content
 */
export const useShowcaseContent = (): ShowcaseContentType => {
  const [content, setContent] = useState<ShowcaseContentType>(
    showcaseContent[0],
  );

  useEffect(() => {
    const getShowcaseContent = async (): Promise<void> => {
      try {
        const contentToSet = showcaseContent[Math.floor(Math.random() * showcaseContent.length)];
        setContent(contentToSet);
      } catch (error) {
        logger({
          type: "error",
          message: error,
        });
      }
    };

    getShowcaseContent();
  }, []);

  return content;
};
