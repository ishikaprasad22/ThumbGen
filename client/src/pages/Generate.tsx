import { useEffect, useState } from 'react';
import {
  colorSchemes,
  type AspectRatio,
  type IThumbnail,
  type ThumbnailRequest,
  type ThumbnailStyle
} from '../assets/assets';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SoftBackdrop from '../components/SoftBackdrop';
import AspectRatioSelector from '../components/AspectRatioSelector';
import StyleSelector from '../components/StyleSelector';
import ColorSchemeSelector from '../components/ColorSchemeSelector';
import PreviewPanel from '../components/PreviewPanel';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import api from '../configs/api';
import { Info } from 'lucide-react';

const Generate = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [title, setTitle] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [colorSchemeId, setColorSchemeId] = useState<string>(colorSchemes[0].id);
  const [style, setStyle] = useState<ThumbnailStyle>('Bold & Graphic');
  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
  const [loading, setLoading] = useState(false);

  // ---------------- GENERATE THUMBNAIL ----------------
  const handleGenerate = async () => {
    if (!isLoggedIn) return toast.error('Please log in to generate thumbnails.');
    if (!title.trim()) return toast.error('Please enter a title or topic for the thumbnail.');

    setLoading(true);
    try {
      const api_payload: ThumbnailRequest = {
        title,
        style,
        aspectRatio,
        colorSchemeId,
        additionalDetails: additionalDetails || '',
      };

      const { data } = await api.post('/api/thumbnail/generate', api_payload);

      if (data.thumbnail) {
        navigate(`/generate/${data.thumbnail._id}`);
        toast.success(data.message || 'Thumbnail generated successfully');
      } else {
        toast.error(data.message || 'Generation failed');
      }
    } catch (error: any) {
      console.error('Generate error:', error?.response || error);
      const errorMessage = error?.response?.data?.message || error?.message || 'Server error';
      toast.error(errorMessage);

      if (error?.response?.status === 503) {
        toast.error('Model is loading. Please wait 20-30 seconds and try again.', { duration: 5000 });
      }
    } finally {
      setLoading(false);
    }
  };

  //FETCH EXISTING THUMBNAIL
  const fetchThumbnail = async () => {
    if (!id) return;
    try {
      const { data } = await api.get(`/api/user/thumbnail/${id}`);
      const thumbnailData = data?.thumbnail as IThumbnail;
      setThumbnail(thumbnailData);

      setLoading(thumbnailData?.isGenerating || !thumbnailData?.image_url);
      setTitle(thumbnailData?.title || '');
      setAdditionalDetails(thumbnailData?.user_prompt || '');
      setColorSchemeId(thumbnailData?.color_scheme || colorSchemes[0].id);
      setAspectRatio(thumbnailData?.aspect_ratio || '16:9');
      setStyle(thumbnailData?.style || 'Bold & Graphic');
    } catch (error: any) {
      console.error('[Generate] Failed to fetch thumbnail:', error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn && id) fetchThumbnail();
    if (id && loading && isLoggedIn) {
      const interval = setInterval(fetchThumbnail, 5000);
      return () => clearInterval(interval);
    }
  }, [id, loading, isLoggedIn]);

  useEffect(() => {
    if (!id) setThumbnail(null);
  }, [pathname]);

  return (
    <>
      <SoftBackdrop />
      <div className="pt-24 min-h-screen">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8">
            {/* LEFT PANEL */}
            <div className={`p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6 ${id && 'pointer-events-none'}`}>
              <div>
                <h2 className="text-xl font-bold text-zinc-100 mb-1">Create Your Thumbnail</h2>
                <p className="text-sm text-zinc-400">Describe your vision and let AI bring it to life</p>
              </div>

              <div className="space-y-5">
                {/* TITLE INPUT */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Title or Topic</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={100}
                    placeholder="e.g., 10 Tips for Better Sleep"
                    className="w-full px-4 py-3 rounded-lg border border-white/12 bg-black/20 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <div className="flex justify-end">
                    <span className="text-xs text-zinc-400">{title.length}/100</span>
                  </div>
                </div>

                {/* SELECTORS */}
                <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                <StyleSelector value={style} onChange={setStyle} isOpen={styleDropdownOpen} setIsOpen={setStyleDropdownOpen} />
                <ColorSchemeSelector value={colorSchemeId} onChange={setColorSchemeId} />

                {/* ADDITIONAL DETAILS */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Additional Prompts <span className="text-zinc-400 text-xs">(optional)</span>
                  </label>
                  <textarea
                    value={additionalDetails}
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    rows={3}
                    placeholder="Add any specific elements, mood, or style preferences..."
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/6 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                  />
                </div>
              </div>

              {/* GENERATE BUTTON */}
              {!id && (
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="text-[15px] w-full py-3.5 rounded-lg font-medium bg-gradient-to-b from-pink-500 to-pink-600 hover:from-pink-700 disabled:cursor-not-allowed transition-colors border border-white/20 shadow-sm hover:shadow-md px-6"
                >
                  {loading ? 'Generating...' : 'Generate Thumbnail'}
                </button>
              )}
            </div>

            {/* RIGHT PANEL */}
            <div>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl">
                <h2 className="text-lg font-semibold text-zinc-100 mb-4">Preview</h2>
                <PreviewPanel thumbnail={thumbnail} isLoading={loading} aspectRatio={aspectRatio} />
              </div>

              <div className="mt-4 p-4 rounded-2xl bg-white/8 backdrop-blur-xl border border-white/12 shadow-xl text-sm text-zinc-300 flex items-start gap-3 pointer-events-none">
                <div className="relative shrink-0 group pointer-events-auto">
                  <Info className="w-4 h-4 mt-0.5 cursor-pointer text-zinc-400" />
                </div>
                <p className="leading-relaxed">
                  Preview downloads open the image in a new tab. To download inside your device, go to <b>My Generations</b>,
                  hover on your image and click <b>Download</b>.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Generate;
