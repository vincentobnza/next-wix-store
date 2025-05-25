import { Lens } from "@/components/ui/lens";
import { WixImage } from "@/components/WixImage";
import { cn } from "@/lib/utils";
import { products } from "@wix/stores";
import { useEffect, useState } from "react";
import { Play } from "lucide-react";

type ProductMediaProps = {
  media: products.MediaItem[] | undefined;
};

export default function ProductMedia({ media }: ProductMediaProps) {
  const [hovering, setHovering] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(media?.[0]);

  useEffect(() => {
    setSelectedMedia(media?.[0]);
  }, [media]);

  if (!media?.length) return null;

  const selectedImage = selectedMedia?.image;
  const selectedVideo = selectedMedia?.video?.files?.[0];

  return (
    <div className="basis-2/5 relative">
      <div className="flex gap-4">
        {/* Preview thumbnails on the left */}
        {media.length > 1 && (
          <div className="flex flex-col gap-2 flex-shrink-0">
            {media.map((item) => (
              <Preview
                key={item?._id}
                mediaItem={item}
                isSelected={item._id === selectedMedia?._id}
                onSelect={() => {
                  setSelectedMedia(item);
                  setHovering(false);
                }}
              />
            ))}
          </div>
        )}

        {/* Main image/video display */}
        <div className="aspect-square flex items-center gap-2 flex-grow">
          {selectedImage?.url ? (
            <Lens hovering={hovering} setHovering={setHovering}>
              <WixImage
                mediaIdentifier={selectedImage.url}
                alt={selectedImage.altText}
                width={1000}
                height={1000}
              />
            </Lens>
          ) : selectedVideo?.url ? (
            <div className="flex size-full items-center bg-black">
              <video
                className="size-full object-cover"
                src={selectedVideo.url}
                controls
                autoPlay
              >
                <source
                  src={selectedVideo.url}
                  type={`video/${selectedVideo.format}`}
                />
              </video>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

type PreviewProps = {
  mediaItem: products.MediaItem;
  isSelected: boolean;
  onSelect: () => void;
};

function Preview({ mediaItem, isSelected, onSelect }: PreviewProps) {
  const imageUrl = mediaItem.image?.url;
  const stillFrameMediaId = mediaItem.video?.stillFrameMediaId;

  const thumbnailUrl = mediaItem.thumbnail?.url;
  const resolveThumbnailUrl =
    stillFrameMediaId && thumbnailUrl
      ? thumbnailUrl.split(stillFrameMediaId)[0] + stillFrameMediaId
      : undefined;

  if (!imageUrl && !resolveThumbnailUrl) return null;

  return (
    <div
      className={cn(
        "relative cursor-pointer",
        isSelected && "outline outline-2 outline-offset-2 outline-primary",
      )}
    >
      <WixImage
        mediaIdentifier={imageUrl || resolveThumbnailUrl}
        alt={mediaItem.image?.altText || mediaItem.video?.files?.[0].altText}
        width={50}
        height={50}
        onMouseEnter={onSelect}
      />

      {resolveThumbnailUrl && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Play className="text-white size-4" strokeWidth={3} />
        </span>
      )}
    </div>
  );
}
