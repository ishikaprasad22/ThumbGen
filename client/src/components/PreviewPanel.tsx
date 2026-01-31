import type { AspectRatio, IThumbnail } from "../assets/assets";
import { DownloadIcon, ImageIcon, Loader2Icon } from "lucide-react";

interface PreviewPanelProps {
  thumbnail: IThumbnail | null;
  isLoading: boolean;
  aspectRatio: AspectRatio;
}

const PreviewPanel = ({ thumbnail, isLoading, aspectRatio }: PreviewPanelProps) => {
  const aspectClasses: Record<AspectRatio, string> = {
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
    '9:16': 'aspect-[9/16]',
  };

  const onDownload = () => {
    if (!thumbnail?.image_url) return;
    window.open(thumbnail.image_url, "_blank"); // open in new tab
  };

  return (
    <div className="relative mx-auto w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl">
      <div
        className={`relative overflow-hidden w-full max-h-[480px] sm:max-h-[560px] md:max-h-[720px] ${aspectClasses[aspectRatio]}`}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/25">
            <Loader2Icon className="size-8 animate-spin text-zinc-400" />
            <div className="text-center">
              <p className="text-sm font-medium text-zinc-200">
                AI is creating your thumbnail...
              </p>
              <p className="mt-1 text-xs text-zinc-400">This may take a few moments</p>
            </div>
          </div>
        )}

        {/* Image Preview */}
        {!isLoading && thumbnail?.image_url && (
          <div className="group relative h-full w-full">
            <img
              src={thumbnail.image_url}
              alt={thumbnail.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-end justify-center bg-black/10 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={onDownload}
                type="button"
                className="mb-6 flex items-center gap-2 rounded-md px-5 py-2.5 text-xs font-medium transition bg-white/30 ring-2 ring-white/40 backdrop-blur hover:scale-105 active:scale-95"
              >
                <DownloadIcon className="size-4" />
                Download Thumbnail
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !thumbnail?.image_url && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-white/20 bg-black/25 p-4">
            <div className="max-sm:hidden flex size-20 items-center justify-center rounded-full bg-white/10">
              <ImageIcon className="size-10 text-white opacity-50" />
            </div>
            <div className="px-4 text-center">
              <p className="font text-zinc-200">Generate your first thumbnail</p>
              <p className="mt-1 text-xs text-zinc-400">
                Fill out the form and click Generate
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
