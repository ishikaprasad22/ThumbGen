import { ChevronDown, Sparkles, Square, Image, PenTool, Cpu } from 'lucide-react';
import { thumbnailStyles, type ThumbnailStyle } from '../assets/assets';
import type { ReactNode } from 'react';

const StyleSelector = ({
    value,
    onChange,
    isOpen,
    setIsOpen,
}: {
    value: ThumbnailStyle;
    onChange: (style: ThumbnailStyle) => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}) => {
    const styleDescriptions: Record<ThumbnailStyle, string> = {
        'Bold & Graphic': 'High contrast, bold typography, striking visuals',
        Minimalist: 'Clean, simple, lots of white space',
        Photorealistic: 'Photo-based, natural looking',
        Illustrated: 'Hand-drawn, artistic, creative',
        'Tech/Futuristic': 'Modern, sleek, tech-inspired',
    };
    const styleIcons: Record<ThumbnailStyle, ReactNode> = {
        'Bold & Graphic': <Sparkles className="h-4 w-4" />,
        Minimalist: <Square className="h-4 w-4" />,
        Photorealistic: <Image className="h-4 w-4" />,
        Illustrated: <PenTool className="h-4 w-4" />,
        'Tech/Futuristic': <Cpu className="h-4 w-4" />,
    };


    return (
        <div className="relative space-y-3 dark">
            <label className="block text-sm font-medium text-zinc-200">
                Thumbnail Style
            </label>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between rounded-md border px-4 py-3 text-left transition bg-white/8 border-white/10 text-zinc-200 hover:bg-white/12"
            >
                <div className="space-y-1">
                    <div className="flex items-center gap-2 font-medium">
                        {styleIcons[value]}
                        <span>{value}</span>
                    </div>
                    <p className="text-xs text-zinc-400">
                        {styleDescriptions[value]}
                    </p>
                </div>
                <ChevronDown
                    className={[
                        'h-5 w-5 text-zinc-400 transition-transform',
                        isOpen && 'rotate-180',
                    ].join(' ')}
                />

            </button>
            {isOpen && (
                <div className="absolute bottom-0 z-50 mt-1 w-full rounded-md border border-white/12 bg-zinc-900 shadow-lg">
                    {thumbnailStyles.map((style) => (
                        <button
                            key={style}
                            type="button"
                            onClick={() => {
                                onChange(style);
                                setIsOpen(false);
                            }}
                            className="flex w-full items-start gap-3 px-4 py-3 text-left rounded-md border border-white/10 bg-zinc-800 transition hover:bg-zinc-700"
                        >
                            <div className="mt-0.5">{styleIcons[style]}</div>
                            <div>
                                <p className="font-medium">{style}</p>
                                <p className="text-xs text-zinc-400">
                                    {styleDescriptions[style]}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            )}

        </div>
    );
};

export default StyleSelector