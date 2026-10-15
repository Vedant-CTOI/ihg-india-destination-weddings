import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageSquare, X, Pin, Trash2, MessageCircle, Check, Download, Upload } from 'lucide-react';
import { toPng } from 'html-to-image';

/* ------------------------------------------------------------------ */
/* Types & storage                                                     */
/* ------------------------------------------------------------------ */

export interface CommentRecord {
  id: string;
  page: string;          // which page the pin belongs to
  x: number;             // % position across the page width (0-100)
  y: number;             // % position down the page height (0-100)
  text: string;
  createdAt: number;
  updatedAt?: number;
  resolved?: boolean;
  screenshot?: string;  // base64 PNG thumbnail captured at pin time
}

const STORAGE_KEY = 'ihg_weddings_client_comments_v1';

function loadAll(): Record<string, CommentRecord[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function saveAll(data: Record<string, CommentRecord[]>): void {
  try {
    const all: CommentRecord[] = Object.values(data).flat();
    if (all.length > 200) {
      const kept = all.sort((a, b) => b.createdAt - a.createdAt).slice(0, 200);
      const next: Record<string, CommentRecord[]> = {};
      for (const c of kept) {
        if (!next[c.page]) next[c.page] = [];
        next[c.page].push(c);
      }
      data = next;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable/full — fail silently, commenting is an overlay feature */
  }
}

/* Map the current App view to a stable page key so pins stick to pages */
export function pageKeyFor(view: { type: string; [k: string]: unknown }): string {
  switch (view.type) {
    case 'home':
      return 'home';
    case 'genre-listing':
      return 'genre-listing';
    case 'genre-detail':
      return `genre:${String(view.genreId ?? 'unknown')}`;
    case 'destination-detail':
      return `destination:${String(view.destinationId ?? 'unknown')}`;
    case 'all-hotels':
      return 'all-hotels';
    case 'hotel-detail':
      return `hotel:${String(view.hotelId ?? 'unknown')}`;
    case 'story-detail':
      return `story:${String(view.storyId ?? 'unknown')}`;
    case 'all-stories':
      return 'all-stories';
    case 'conversation':
      return 'conversation';
    case 'sitemap':
      return 'sitemap';
    case 'legal-info':
      return 'legal-info';
    default:
      return String(view.type ?? 'unknown');
  }
}


/* ------------------------------------------------------------------ */
/* Export / Import — feedback handoff via a single JSON file            */
/* ------------------------------------------------------------------ */

export function exportCommentsFile(): void {
  const all = loadAll();
  const payload = {
    project: 'IHG India Destination Weddings — Prototype Feedback',
    exportedAt: new Date().toISOString(),
    pages: all,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `prototype-feedback-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importCommentsFile(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const incoming: Record<string, CommentRecord[]> = parsed.pages || parsed;
        if (!incoming || typeof incoming !== 'object') throw new Error('bad file');
        const current = loadAll();
        let added = 0;
        for (const [page, list] of Object.entries(incoming)) {
          if (!Array.isArray(list)) continue;
          const existingIds = new Set((current[page] || []).map((c) => c.id));
          const fresh = list.filter((c) => c && c.id && !existingIds.has(c.id));
          current[page] = [...(current[page] || []), ...fresh];
          added += fresh.length;
        }
        saveAll(current);
        resolve(added);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

/* Capture a small PNG thumbnail of the viewport area around a pin point.
   Uses html-to-image on the page root; crops to a rect around (xPct, yPct). */
export async function capturePinThumbnail(
  _layerEl: HTMLElement | null,
  docX: number,
  docY: number
): Promise<string | undefined> {
  try {
    const target = document.body;
    if (!target) return undefined;
    // Screenshot the visible viewport (scroll position is implicit in toPng capture of body)
    const scrollY = window.scrollY;
    const dataUrl = await toPng(target, {
      width: window.innerWidth,
      height: window.innerHeight,
      style: { transform: 'none' },
      filter: (node: HTMLElement) =>
        !(node?.dataset && node.dataset.commentOverlay === 'true'),
    });
    const img = new Image();
    await new Promise<void>((res, rej) => {
      img.onload = () => res();
      img.onerror = () => rej(new Error('img'));
      img.src = dataUrl;
    });
    // The pin's viewport position = docX/docY minus current scroll
    const cx = Math.round(docX - window.scrollX);
    const cy = Math.round(docY - scrollY);
    const w = Math.min(480, img.width);
    const h = Math.min(320, img.height);
    const sx = Math.max(0, Math.min(img.width - w, cx - w / 2));
    const sy = Math.max(0, Math.min(img.height - h, cy - h / 2));
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;
    ctx.drawImage(img, sx, sy, w, h, 0, 0, w, h);
    return canvas.toDataURL('image/png');
  } catch {
    return undefined;  // screenshot is best-effort; comment text still saved
  }
}

/* ------------------------------------------------------------------ */
/* useComments — per-page comment state with localStorage persistence  */
/* ------------------------------------------------------------------ */

export function useComments(page: string) {
  const [comments, setComments] = useState<CommentRecord[]>(() => loadAll()[page] || []);

  useEffect(() => {
    setComments(loadAll()[page] || []);
  }, [page]);

  const persist = useCallback((next: CommentRecord[]) => {
    const all = loadAll();
    all[page] = next;
    saveAll(all);
    setComments(next);
  }, [page]);

  const addComment = useCallback((x: number, y: number, text: string, screenshot?: string) => {
    const rec: CommentRecord = {
      id: `c_${Date.now()}_${Math.floor(Math.random() * 1e6)}`,
      page,
      x,
      y,
      text,
      createdAt: Date.now(),
      screenshot,
    };
    persist([...(loadAll()[page] || []), rec]);
  }, [persist, page]);

  const updateComment = useCallback((id: string, text: string) => {
    persist(
      (loadAll()[page] || []).map((c) =>
        c.id === id ? { ...c, text, updatedAt: Date.now() } : c
      )
    );
  }, [persist, page]);

  const deleteComment = useCallback((id: string) => {
    persist((loadAll()[page] || []).filter((c) => c.id !== id));
  }, [persist, page]);

  const toggleResolved = useCallback((id: string) => {
    persist(
      (loadAll()[page] || []).map((c) =>
        c.id === id ? { ...c, resolved: !c.resolved } : c
      )
    );
  }, [persist, page]);

  return { comments, addComment, updateComment, deleteComment, toggleResolved };
}

/* ------------------------------------------------------------------ */
/* CommentToolbar — floating toggle, bottom-right                       */
/* ------------------------------------------------------------------ */

export const CommentToolbar: React.FC<{
  commentCount: number;
  onExport: () => void;
  onImport: (file: File) => void;
}> = ({ commentCount, onExport, onImport }) => {
  return (
    <div data-comment-overlay-ui="true" className="fixed bottom-5 right-5 z-[9999] flex items-center space-x-2">
      {/* Step-by-step helper — always visible, zero learning curve */}
      {commentCount === 0 ? (
        <span className="bg-black text-white text-[11px] font-medium px-4 py-2.5 rounded-full shadow-lg">
          To comment: hold SHIFT and click any spot on the page
        </span>
      ) : (
        <span className="bg-black text-white text-[11px] font-medium px-4 py-2.5 rounded-full shadow-lg">
          {commentCount} comment{commentCount === 1 ? '' : 's'} on this page — SHIFT+click to add more
        </span>
      )}

      {/* Export — appears as soon as one comment exists on the site */}
      {commentCount > 0 && (
        <button
          onClick={onExport}
          className="bg-white border border-neutral-300 text-black text-[11px] uppercase tracking-wider font-medium px-3 py-2.5 rounded-full shadow hover:border-black transition-colors cursor-pointer inline-flex items-center space-x-1.5"
          title="Download all comments (with screenshots) as a JSON file to send back"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Comments</span>
        </button>
      )}

      {/* Import — always available (it's how the owner loads a client's file) */}
      <label
        className="bg-white border border-neutral-300 text-black text-[11px] uppercase tracking-wider font-medium px-3 py-2.5 rounded-full shadow hover:border-black transition-colors cursor-pointer inline-flex items-center space-x-1.5"
        title="Load a feedback JSON file"
      >
        <Upload className="w-3.5 h-3.5" />
        <span>Import</span>
        <input
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onImport(f);
            e.currentTarget.value = '';
          }}
        />
      </label>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* CommentEditor — shared textarea with save + optional delete          */
/* ------------------------------------------------------------------ */

export const CommentEditor: React.FC<{
  initial: string;
  onSubmit: (text: string) => void;
  onDelete?: () => void;
  submitLabel?: string;
  strikethrough?: boolean;
}> = ({ initial, onSubmit, onDelete, submitLabel = 'Save', strikethrough = false }) => {
  const [text, setText] = useState<string>(initial);
  useEffect(() => { setText(initial); }, [initial]);

  return (
    <div className="space-y-2.5">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        className={`w-full text-xs border border-neutral-200 rounded-lg p-2.5 focus:outline-none focus:border-black resize-none ${strikethrough ? 'line-through text-neutral-400' : ''}`}
      />
      <div className="flex items-center justify-between">
        <button
          onClick={() => onSubmit(text.trim())}
          disabled={!text.trim()}
          className="bg-black text-white text-[10px] uppercase tracking-wider font-medium px-3 py-2 rounded-lg disabled:opacity-40 cursor-pointer"
        >
          {submitLabel}
        </button>
        {onDelete && (
          <button
            onClick={onDelete}
            className="text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
            title="Delete comment"
            aria-label="Delete comment"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* CommentPinLayer — pins, popovers, and the pinning interaction        */
/* ------------------------------------------------------------------ */

export const CommentPinLayer: React.FC<{
  comments: CommentRecord[];
  onAdd: (x: number, y: number, text: string, screenshot?: string) => void;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onToggleResolved: (id: string) => void;
  onCommentsChanged: () => void;
}> = ({ comments, onAdd, onUpdate, onDelete, onToggleResolved, onCommentsChanged }) => {
  const [pendingPoint, setPendingPoint] = useState<{ x: number; y: number } | null>(null);
  const [draftText, setDraftText] = useState<string>('');
  const [openId, setOpenId] = useState<string | null>(null);
  const [shiftHeld, setShiftHeld] = useState<boolean>(false);
  const layerRef = useRef<HTMLDivElement>(null);
  const [docHeight, setDocHeight] = useState<number>(0);

  // Track document height so the absolutely-positioned layer always spans the page
  useEffect(() => {
    const measure = () => setDocHeight(Math.max(document.documentElement.scrollHeight, window.innerHeight));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  // SHIFT = commenting key.
  // - SHIFT held: page shows the red pin cursor; clicking pins at the exact point.
  // - Normal clicks behave 100% normally (links navigate, forms submit).
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift' && !e.repeat) setShiftHeld(true);
      if (e.key === 'Escape') {
        setPendingPoint(null);
        setDraftText('');
        setOpenId(null);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') setShiftHeld(false);
    };
    const onBlur = () => setShiftHeld(false);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
      setShiftHeld(false);
    };
  }, []);

  // Capture-phase click interception ONLY while SHIFT is held: the SHIFT+click
  // never reaches the site (links/buttons can't misfire); normal clicks untouched.
  useEffect(() => {
    if (!shiftHeld) return;
    const onDocClick = (e: MouseEvent) => {
      if (!e.shiftKey) return;
      const t = e.target as HTMLElement | null;
      if (t && t.closest('[data-comment-overlay-ui="true"]')) return;
      e.preventDefault();
      e.stopPropagation();
      const docX = e.clientX + window.scrollX;
      const docY = e.clientY + window.scrollY;
      if (pendingPoint) {
        setPendingPoint(null);
        setDraftText('');
        return;
      }
      setPendingPoint({ x: docX, y: docY });
    };
    document.addEventListener('click', onDocClick, { capture: true });
    return () => document.removeEventListener('click', onDocClick, { capture: true });
  }, [shiftHeld, pendingPoint]);



  const handleDraftSubmit = async () => {
    if (!pendingPoint || !draftText.trim()) return;
    const { x, y } = pendingPoint;
    const text = draftText.trim();
    const shot = await capturePinThumbnail(null, x, y);
    onAdd(x, y, text, shot);
    setPendingPoint(null);
    setDraftText('');
    onCommentsChanged();
  };

  return (
    <div
      ref={layerRef}
      data-comment-overlay="true"
      data-comment-overlay-ui="true"
      className="absolute inset-x-0 top-0 z-[9998] pointer-events-none"
      style={{ height: `${docHeight}px` }}
    >
      {/* SHIFT hint chip — appears the moment SHIFT is held, gone on release */}
      {shiftHeld && !pendingPoint && (
        <div
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] bg-red-600 text-white text-[11px] font-medium px-4 py-2 rounded-full shadow-lg pointer-events-none"
        >
          Release SHIFT and click anywhere to pin a comment — or press ESC to dismiss this
        </div>
      )}

      {/* Existing pins — bright red for visibility */}
      {comments.map((c) => (
        <div key={c.id} className="absolute pointer-events-auto" style={{ left: `${c.x}px`, top: `${c.y}px` }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenId((id) => (id === c.id ? null : c.id));
            }}
            className={`-translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer ${
              openId === c.id
                ? 'bg-red-700 text-white scale-110'
                : c.resolved
                  ? 'bg-emerald-600 text-white'
                  : 'bg-red-600 text-white'
            }`}
            title={c.resolved ? 'Resolved — click to view / reopen / delete' : 'Click to view / edit / resolve / delete'}
          >
            {c.resolved ? <Check className="w-3.5 h-3.5" /> : <MessageCircle className="w-3.5 h-3.5" />}
          </button>

          {openId === c.id && (
            <div
              data-comment-overlay-ui="true"
              className="absolute left-4 top-4 w-72 bg-white rounded-xl border border-neutral-200 shadow-2xl p-4 space-y-3 z-30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">
                  {new Date(c.createdAt).toLocaleDateString()}{' '}
                  {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <button
                  onClick={() => setOpenId(null)}
                  className="text-neutral-400 hover:text-black cursor-pointer"
                  aria-label="Close comment"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {c.resolved && (
                <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-700 text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full self-start">
                  <Check className="w-3 h-3" />
                  <span>Resolved</span>
                </span>
              )}

              {c.screenshot && (
                <img
                  src={c.screenshot}
                  alt="Page area at comment"
                  className="w-full h-28 object-cover rounded-lg border border-neutral-200"
                />
              )}

              <CommentEditor
                initial={c.text}
                onSubmit={(t) => { onUpdate(c.id, t); setOpenId(null); }}
                onDelete={() => { onDelete(c.id); setOpenId(null); }}
                submitLabel="Save"
                strikethrough={c.resolved}
              />

              <button
                onClick={() => onToggleResolved(c.id)}
                className={`w-full text-[10px] uppercase tracking-wider font-medium py-2 rounded-lg border transition-colors cursor-pointer ${
                  c.resolved
                    ? 'border-neutral-300 text-neutral-600 hover:border-black hover:text-black'
                    : 'border-emerald-600 text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                {c.resolved ? 'Reopen Comment' : 'Resolve Comment'}
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Pending pin + new-comment draft box — window appears exactly at the pin */}
      {pendingPoint && (
        <div
          className="absolute z-30 pointer-events-auto"
          style={{ left: `${pendingPoint.x}px`, top: `${pendingPoint.y}px` }}
          onClick={(e) => e.stopPropagation()}
          data-comment-overlay-ui="true"
        >
          <div className="-translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg animate-pulse">
            <Pin className="w-3.5 h-3.5" />
          </div>
          <div className="absolute left-4 top-4 w-72 bg-white rounded-xl border-2 border-red-600 shadow-2xl p-4 space-y-3">
            <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">
              New Comment
            </span>
            <textarea
              autoFocus
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              placeholder="Type your feedback…"
              rows={3}
              className="w-full text-xs border border-neutral-200 rounded-lg p-2.5 focus:outline-none focus:border-black resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setPendingPoint(null);
                  setDraftText('');
                }
              }}
            />
            <div className="flex items-center justify-between">
              <button
                onClick={handleDraftSubmit}
                disabled={!draftText.trim()}
                className="bg-black text-white text-[10px] uppercase tracking-wider font-medium px-3 py-2 rounded-lg disabled:opacity-40 cursor-pointer"
              >
                Pin Comment
              </button>
              <button
                onClick={() => { setPendingPoint(null); setDraftText(''); }}
                className="text-[10px] uppercase tracking-wider text-neutral-500 hover:text-black cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
