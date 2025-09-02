// pages/PostEdit.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import parse from "html-react-parser";
import { ArrowLeft, Eye, Plus, UploadCloud } from "lucide-react";

import { usePost } from "../hooks/usePost";
import { useUpdatePost } from "../hooks/useUpdatePost";
import { fadeUp } from "../animations/variants";
import { isClient } from "../utils/dom";
import { newBlock, composeHtmlFromBlocks, blocksFromHtml } from "../utils/blocks";

import TabButton from "../components/post/TabButton";
import ToolbarButton from "../components/post/ToolbarButton";
import TemplatePicker from "../components/post/TemplatePicker";
import BlockEditor from "../components/post/BlockEditor";

const publishPost = ({ slug, blocks, rawHtml }) => {
    console.log("PUBLISH", { slug, blocks, rawHtml });
    alert("Publish requested (mock). Wire this to your backend.");
};

export default function PostEdit() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const shouldReduceMotion = useReducedMotion();
    const { updatePost, isLoading: isSaving, error: saveError } = useUpdatePost();


    // Load post
    const { data, isLoading, isError, error } = usePost(slug);

    // Local editing state
    const [activeTab, setActiveTab] = useState("blocks"); // 'html' | 'blocks' | 'preview'
    const [blocks, setBlocks] = useState([]);
    const [rawHtml, setRawHtml] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const [pickerForId, setPickerForId] = useState(null); // block_id that wants an insert-below


    const handlePublish = async () => {
        try {
            await updatePost(slug, blocks);
            alert("Post updated successfully!");
        } catch (e) {
            alert("Failed to update post: " + e.message);
        }
    };

    useEffect(() => {
        if (data) {
            const safeBlocks = Array.isArray(data.blocks) ? data.blocks : [];
            setBlocks(safeBlocks);
            const initialHtml = composeHtmlFromBlocks(safeBlocks);
            setRawHtml(initialHtml);
        }
    }, [data]);

    useEffect(() => {
        if (activeTab !== "html") {
            setRawHtml(composeHtmlFromBlocks(blocks));
        }
    }, [blocks, activeTab]);

    useEffect(() => {
        if (!isClient) return;
        window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
    }, [slug, shouldReduceMotion]);

    // Derived full HTML from blocks (for preview tab)
    const composedHtml = useMemo(() => composeHtmlFromBlocks(blocks), [blocks]);

    // Helper: handle tab switches; on leaving HTML, convert rawHtml → blocks
    const switchTab = (next) => {
        if (activeTab === "html" && (next === "blocks" || next === "preview")) {
            const parsed = blocksFromHtml(rawHtml);
            setBlocks(parsed);
        }
        setActiveTab(next);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen text-white container mx-auto px-6 py-24">
                <div className="animate-pulse space-y-4 max-w-2xl">
                    <div className="h-6 w-40 bg-white/10 rounded" />
                    <div className="h-8 w-3/4 bg-white/10 rounded" />
                    <div className="h-4 w-full bg-white/10 rounded" />
                    <div className="h-4 w-5/6 bg-white/10 rounded" />
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="min-h-screen text-white container mx-auto px-6 py-24">
                <div className="max-w-2xl">
                    <button
                        onClick={() => {
                            if (isClient && window.history.length > 1) navigate(-1);
                                else navigate("/blog");
                        }}
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="w-4 h-4" aria-hidden /> Back
                    </button>
                    <h1 className="text-3xl font-bold mb-4">Post not found</h1>
                    <p className="text-white/70">
                        {error?.message || "The article you're looking for doesn't exist or the link is broken."}
                    </p>
                    <Link
                        to="/blog"
                        className="inline-block mt-6 px-5 py-2 rounded-xl bg-amber-500 text-black font-semibold"
                    >
                        Go to Blog
                    </Link>
                </div>
            </div>
        );
    }

    // ---- UI ----
    return (
        <div className="relative min-h-screen text-white">
            {/*Header*/}
            <div className="fixed inset-x-0 top-0 z-10 bg-black/60 backdrop-blur border-b border-white/10 py-4">
                {/* Back Button */}
                <button
                    onClick={() => {
                        if (isClient && window.history.length > 1) navigate(-1);
                            else navigate("/blog");
                    }}
                    className="fixed z-20 top-6 left-6 inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-amber-300/10 hover:border-amber-300/40 backdrop-blur"
                    aria-label="Go back"
                >
                    <ArrowLeft className="w-4 h-4" aria-hidden /> Back
                </button>

                <div className="container mx-auto px-6 flex items-center justify-center">
                    <h1 className="text-2xl font-bold">
                        <span className="text-4xl text-amber-500">Edit Post:</span> {data.title}
                    </h1>
                </div>
            </div>

            {/* Main */}
            <main className="container mx-auto px-6 py-8 pt-40">
                {/* HTML Tab */}
                {activeTab === "html" && (
                    <motion.section initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl mx-auto">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="text-sm text-white/60 mb-2">
                                Editing the whole post as raw HTML (does not auto-split into blocks).
                            </div>
                            <textarea
                                value={rawHtml}
                                onChange={(e) => setRawHtml(e.target.value)}
                                className="w-full min-h-[400px] rounded-xl bg-black/40 border border-white/10 p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                                placeholder="Write the entire article HTML here…"
                            />
                        </div>
                        <div className="mt-4 text-right">
                            <ToolbarButton onClick={() => switchTab("preview")} ariaLabel="Preview">
                                <Eye className="w-4 h-4" /> Quick preview
                            </ToolbarButton>
                        </div>
                    </motion.section>
                )}

                {/* BLOCKS Tab */}
                {activeTab === "blocks" && (
                    <motion.section initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm text-white/70">{blocks.length} block(s)</div>
                            <ToolbarButton onClick={() => setShowPicker(true)} ariaLabel="Add block">
                                <Plus className="w-4 h-4" /> Add block
                            </ToolbarButton>
                        </div>

                        <div className="space-y-4">
                            {blocks.map((b) => (
                                <BlockEditor
                                    key={b.block_id}
                                    block={b}
                                    isActive={selectedId === b.block_id}
                                    onFocus={() => setSelectedId(b.block_id)}
                                    onChange={(id, content) => {
                                        setBlocks((prev) => prev.map((x) => (x.block_id === id ? { ...x, content } : x)));
                                    }}
                                    onDelete={() => setBlocks((prev) => prev.filter((x) => x.block_id !== b.block_id))}
                                    onAddBelow={() => setPickerForId(b.block_id)}
                                />
                            ))}

                            {blocks.length === 0 && (
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                                    <p className="text-white/70">No blocks yet.</p>
                                    <button
                                        onClick={() => setShowPicker(true)}
                                        className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-black font-semibold"
                                    >
                                        <Plus className="w-4 h-4" /> Add your first block
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Compose button */}
                        <div className="mt-6 flex items-center justify-end gap-2">
                            <ToolbarButton onClick={() => switchTab("preview")} ariaLabel="Preview">
                                <Eye className="w-4 h-4" /> Preview post
                            </ToolbarButton>
                        </div>

                        {(showPicker || pickerForId) && (
                            <TemplatePicker
                                onPick={(tpl) => {
                                    setBlocks((prev) => {
                                        if (pickerForId) {
                                            const idx = prev.findIndex((x) => x.block_id === pickerForId);
                                            if (idx === -1) return prev;
                                            const next = [...prev];
                                            next.splice(idx + 1, 0, newBlock(tpl));
                                            return next;
                                        }
                                        return [newBlock(tpl), ...prev];
                                    });
                                    setShowPicker(false);
                                    setPickerForId(null);
                                }}
                                onClose={() => {
                                    setShowPicker(false);
                                    setPickerForId(null);
                                }}
                            />
                        )}
                    </motion.section>
                )}

                {/* PREVIEW Tab */}
                {activeTab === "preview" && (
                    <motion.section initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl mx-auto">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                            <div className="prose prose-base prose-invert max-w-none prose-headings:scroll-mt-24">
                                {rawHtml?.trim() ? parse(rawHtml) : parse(composedHtml)}
                            </div>
                        </div>
                    </motion.section>
                )}

                <footer className="border-t border-white/10 bg-black/40 py-6 mt-8">
                    <div className="container mx-auto px-6">
                        <div className="text-center">
                            <div className="flex items-center gap-2 justify-center">
                                <TabButton active={activeTab === "html"} onClick={() => switchTab("html")}>
                                    Edit plain HTML
                                </TabButton>
                                <TabButton active={activeTab === "blocks"} onClick={() => switchTab("blocks")}>
                                    Edit blocks
                                </TabButton>
                                <TabButton active={activeTab === "preview"} onClick={() => switchTab("preview")}>
                                    Preview post
                                </TabButton>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 mt-6">
                                <ToolbarButton onClick={handlePublish} ariaLabel="Publish">
                                    <UploadCloud className="w-4 h-4" /> Publish
                                </ToolbarButton>
                            </div>
                        </div>

                        <div className="mt-10 text-center text-sm text-white/60">
                            <p>
                                Editing post: <span className="font-semibold">{data.title}</span>
                            </p>
                            <p className="mt-1">
                                Last updated: {data.last_updated ? new Date(data.last_updated).toLocaleDateString() : "N/A"}
                            </p>
                        </div>
                    </div>
                </footer>
            </main>

            <style>{`
.prose :where(img):not(:where([class~="not-prose"] *)) { margin: 0; }
`}</style>
        </div>
    );
}
