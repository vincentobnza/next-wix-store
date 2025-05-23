import { ImgHTMLAttributes } from "react";
import { media as wixMedia } from "@wix/sdk";

type WixImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt" | "width" | "height"
> & {
  mediaIdentifier: string | undefined;
  placeholder?: string;
  alt?: string | null | undefined;
} & (
    | {
        scaleToFill?: true;
        width: number;
        height: number;
      }
    | {
        scaleToFill: false;
      }
  );

export function WixImage({
  mediaIdentifier,
  placeholder = "",
  alt,
  ...props
}: WixImageProps) {
  const imageUrl = mediaIdentifier
    ? props.scaleToFill === undefined || props.scaleToFill
      ? wixMedia.getScaledToFillImageUrl(
          mediaIdentifier,
          (props as { width: number; height: number }).width,
          (props as { width: number; height: number }).height,
          {},
        )
      : wixMedia.getImageUrl(mediaIdentifier).url
    : placeholder;

  if (!imageUrl) {
    return null;
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={imageUrl} alt={alt ?? ""} {...props} />;
}
