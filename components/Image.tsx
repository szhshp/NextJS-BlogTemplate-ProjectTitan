/**
 * @name image
 * @description Customized image renderer
 */

import { NextPage } from "next";
import { useState } from "react";
import { Container, Box, Typography } from "@material-ui/core";
import Lightbox from "react-image-lightbox";
import Image from "next/image";

type ImageWrapperProps = {
  src: string;
  title?: string;
  alt?: string;
  height?: string | number;
  width?: string | number;
  activeLightBox?: boolean;
};

export const LightBoxImage: NextPage<ImageWrapperProps> = ({
  src,
  alt,
  title,
  height,
  width,
  activeLightBox = true,
}: ImageWrapperProps) => {
  const [lightBoxOpen, setLightBoxOpen] = useState(false);

  return (
    <>
      <Container
        onClick={
          activeLightBox
            ? (): void => {
                setLightBoxOpen(!lightBoxOpen);
              }
            : undefined
        }
      >
        <div
          style={{
            position: "relative",
            maxWidth: "100%",
            height: height || "400px",
          }}
        >
          <Image
            src={src}
            alt={alt || ""}
            priority
            layout="fill"
            objectFit="contain"
            title={title || ""}
          />
        </div>
        {alt && (
          <Box textAlign="center" m={1}>
            <Typography variant="caption">{alt}</Typography>
          </Box>
        )}
      </Container>
      {activeLightBox && lightBoxOpen && (
        <Lightbox
          mainSrc={src}
          onCloseRequest={(): void => setLightBoxOpen(false)}
        />
      )}
    </>
  );
};
