import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowUpRightIcon, DownloadIcon, TrashIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SoftBackdrop from '../components/SoftBackdrop';
import { type IThumbnail } from '../assets/assets';
import api from '../configs/api';
import toast from 'react-hot-toast';

const MyGeneration = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const aspectRatioClassMap: Record<string, string> = {
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
    '9:16': 'aspect-[9/16]',
  };

  const [thumbnails, setThumbnails] = useState<IThumbnail[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchThumbnails = async () => {
  try {
    setLoading(true);
   /* console.log("[MyGeneration] ========== FETCH START ==========");
    console.log("[MyGeneration] Step 1: Starting API call...");*/

    const response = await api.get("/api/user/thumbnails");
    
    /*console.log("[MyGeneration] Step 2: Response received");
    console.log("[MyGeneration] Step 3: Response status:", response.status);
    console.log("[MyGeneration] Step 4: Response headers:", response.headers);
    console.log("[MyGeneration] Step 5: Full response object:", response);*/

    const { data } = response;
    
   /* console.log("[MyGeneration] Step 6: Extracted data:", data);
    console.log("[MyGeneration] Step 7: Data type:", typeof data);
    console.log("[MyGeneration] Step 8: Data keys:", Object.keys(data || {}));
    console.log("[MyGeneration] Step 9: data.thumbnails exists?", 'thumbnails' in (data || {}));*/

    // WORKAROUND: Handle both 'thumbnails' and 'thumbnailS' (typo in old backend code)
    const list = data.thumbnails || data.thumbnailS || [];
    
    /*console.log("[MyGeneration] Step 10: List extracted:", list);
    console.log("[MyGeneration] Step 11: List length:", list.length);
    console.log("[MyGeneration] Step 12: List is array?", Array.isArray(list));
    console.log("[MyGeneration] Step 13: Full JSON:", JSON.stringify(data, null, 2));*/

    if (list.length === 0) {
      console.warn("[MyGeneration] WARNING: EMPTY ARRAY!");
      console.warn("[MyGeneration] This means either:");
      console.warn("[MyGeneration] 1. No thumbnails in database for this user");
      console.warn("[MyGeneration] 2. Backend query is not finding thumbnails");
      console.warn("[MyGeneration] 3. Backend is returning wrong data structure");
    }

    // Log each thumbnail in detail
    list.forEach((t: IThumbnail, idx: number) => {
      console.log(`[MyGeneration] ===== Thumbnail ${idx + 1} =====`);
      console.log(`[MyGeneration] Full object:`, t);
      console.log(`[MyGeneration] _id:`, t._id);
      console.log(`[MyGeneration] title:`, t.title);
      console.log(`[MyGeneration] image_url:`, t.image_url);
      console.log(`[MyGeneration] image_url type:`, typeof t.image_url);
      console.log(`[MyGeneration] image_url length:`, t.image_url?.length);
      console.log(`[MyGeneration] has_image_url:`, !!(t.image_url && t.image_url.trim() !== ''));
      console.log(`[MyGeneration] isGenerating:`, t.isGenerating);
    });

    // Filter out ones without image_url
    const withImages = list.filter((t: IThumbnail) => {
      const hasImg = t.image_url && t.image_url.trim() !== "";
      console.log(`[MyGeneration] Filter check for "${t.title}": hasImg=${hasImg}, url="${t.image_url}"`);
      return hasImg;
    });

    console.log("[MyGeneration] ========== FILTER RESULTS ==========");
    console.log("[MyGeneration] Total thumbnails:", list.length);
    console.log("[MyGeneration] With images:", withImages.length);
    console.log("[MyGeneration] Without images:", list.length - withImages.length);

    setThumbnails(list);
    
    console.log("[MyGeneration] ========== FETCH COMPLETE ==========");
  } catch (err: any) {
    console.error("[MyGeneration]  ERROR ");
    console.error("[MyGeneration] Error object:", err);
    console.error("[MyGeneration] Error message:", err.message);
    console.error("[MyGeneration] Error response:", err.response);
    console.error("[MyGeneration] Error response data:", err.response?.data);
    console.error("[MyGeneration] Error response status:", err.response?.status);
    toast.error(err?.response?.data?.message || "Failed to load thumbnails");
  } finally {
    setLoading(false);
    console.log("[MyGeneration] Loading state set to false");
  }
};

  const handleDownload = (image_url: string) => {
    if (!image_url || image_url.trim() === '') {
      toast.error('No image URL available');
      return;
    }

    try {
      // For Cloudinary URLs, add the attachment flag to force download
      const downloadUrl = image_url.includes('cloudinary.com') 
        ? image_url.replace('/upload/', '/upload/fl_attachment/')
        : image_url;
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'thumbnail.png';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Download started');
    } catch (error) {
      console.error('[MyGeneration] Download failed:', error);
      toast.error('Failed to download image');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this thumbnail?');
      if (!confirm) return;

      console.log('[MyGeneration] Deleting thumbnail:', id);
      const { data } = await api.delete(`/api/thumbnail/delete/${id}`);
      
      toast.success(data.message || 'Thumbnail deleted successfully');
      setThumbnails(thumbnails.filter((thumb) => thumb._id !== id));
    } catch (error: any) {
      console.error('[MyGeneration] Delete failed:', error);
      toast.error(error?.response?.data?.message || error.message || 'Failed to delete thumbnail');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      console.log('[MyGeneration] User is logged in, fetching thumbnails...');
      fetchThumbnails();
    } else {
      console.log('[MyGeneration] User is not logged in');
    }
  }, [isLoggedIn]);

  return (
    <div>
      <SoftBackdrop />

      <div className="mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-200">
            My Generations
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            View and manage all your AI-generated thumbnails
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[260px] animate-pulse rounded-2xl border border-white/10 bg-white/6"
              />
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && thumbnails.length === 0 && (
          <div className="py-24 text-center">
            <h3 className="text-lg font-semibold text-zinc-200">
              No thumbnails yet
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              Generate your first thumbnail to see it here
            </p>
            <button
              onClick={() => navigate('/generate')}
              className="mt-6 px-6 py-3 rounded-lg font-medium bg-gradient-to-b from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 transition-colors border border-white/20"
            >
              Create Thumbnail
            </button>
          </div>
        )}

        {/* GRID */}
        {!loading && thumbnails.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-8">
            {thumbnails.map((thumb: IThumbnail) => {
              const aspectClass = aspectRatioClassMap[thumb.aspect_ratio || '16:9'];
              const hasImage = thumb.image_url && thumb.image_url.trim() !== '';
              
              // Log render decision
              console.log(`[MyGeneration] Rendering ${thumb.title}:`, {
                hasImage,
                image_url: thumb.image_url,
                image_url_type: typeof thumb.image_url,
                isGenerating: thumb.isGenerating
              });

              return (
                <div
                  key={thumb._id}
                  onClick={() => navigate(`/generate/${thumb._id}`)}
                  className="mb-8 group relative cursor-pointer rounded-2xl bg-white/6 border border-white/10 shadow-xl break-inside-avoid overflow-hidden hover:border-white/20 transition-all"
                >
                  {/* IMAGE */}
                  <div className={`relative overflow-hidden ${aspectClass} bg-black`}>
                    {hasImage ? (
                      <img
                        src={`${thumb.image_url}?t=${Date.now()}`}
                        alt={thumb.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error('[MyGeneration] Image failed to load:', thumb.image_url);
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            const errorDiv = document.createElement('div');
                            errorDiv.className = 'w-full h-full flex items-center justify-center text-sm text-zinc-400';
                            errorDiv.textContent = 'Failed to load image';
                            parent.appendChild(errorDiv);
                          }
                        }}
                        onLoad={() => {
                          console.log('[MyGeneration] Image loaded successfully:', thumb.image_url);
                        }}
                      />
                    ) : thumb.isGenerating ? (
                      <div className="w-full h-full flex flex-col items-center justify-center text-sm text-zinc-400 gap-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                        <span>Generating...</span>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-sm text-zinc-400 gap-2">
                        <svg className="w-12 h-12 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>No Image</span>
                      </div>
                    )}

                    {/* GENERATING OVERLAY */}
                    {thumb.isGenerating && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-sm font-medium text-white backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-2">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                          <span>Generating…</span>
                        </div>
                      </div>
                    )}

                    {/* ACTIONS */}
                    {hasImage && !thumb.isGenerating && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <button
                          onClick={() => handleDelete(thumb._id)}
                          className="size-8 bg-black/70 hover:bg-red-600 p-1.5 rounded transition-all backdrop-blur-sm"
                          title="Delete"
                        >
                          <TrashIcon className="w-full h-full" />
                        </button>

                        <button
                          onClick={() => handleDownload(thumb.image_url!)}
                          className="size-8 bg-black/70 hover:bg-pink-600 p-1.5 rounded transition-all backdrop-blur-sm"
                          title="Download"
                        >
                          <DownloadIcon className="w-full h-full" />
                        </button>

                        <Link
                          target="_blank"
                          to={`/preview?thumbnail_url=${encodeURIComponent(thumb.image_url!)}&title=${encodeURIComponent(thumb.title)}`}
                          className="size-8 bg-black/70 hover:bg-pink-600 p-1.5 rounded transition-all backdrop-blur-sm"
                          title="Open in new tab"
                        >
                          <ArrowUpRightIcon className="w-full h-full" />
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-semibold text-zinc-100 line-clamp-2">
                      {thumb.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
                      <span className="px-2 py-0.5 rounded bg-white/8">
                        {thumb.style}
                      </span>
                      {thumb.color_scheme && (
                        <span className="px-2 py-0.5 rounded bg-white/8">
                          {thumb.color_scheme}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded bg-white/8">
                        {thumb.aspect_ratio}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-500">
                      {new Date(thumb.createdAt!).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGeneration;