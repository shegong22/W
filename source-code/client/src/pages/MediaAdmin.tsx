import { useMemo, useState } from "react";
import { ArrowUpRight, ImagePlus, LogOut, RefreshCw, ShieldCheck, Trash2, UploadCloud } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const defaultForm = { slot: "", category: "home", title: "", altText: "" };
const categoryLabels: Record<string, string> = { home: "首页", about: "关于我们", services: "服务", order: "订单", feedback: "客户反馈" };
const categoryLabel = (category: string) => categoryLabels[category] || category;

export default function MediaAdmin() {
  const { user, loading, logout } = useAuth({ redirectOnUnauthenticated: true });
  const [form, setForm] = useState(defaultForm);
  const [file, setFile] = useState<File | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("全部");
  const assets = trpc.media.list.useQuery(undefined, { enabled: user?.role === "admin" });
  const utils = trpc.useUtils();
  const categories = useMemo(() => ["全部", ...Array.from(new Set((assets.data ?? []).filter(asset => asset.category !== "products").map(asset => asset.category)))], [assets.data]);
  const filteredAssets = useMemo(() => { const available = (assets.data ?? []).filter(asset => asset.category !== "products"); return categoryFilter === "全部" ? available : available.filter(asset => asset.category === categoryFilter); }, [assets.data, categoryFilter]);
  const upload = trpc.media.upload.useMutation({
    onSuccess: async () => { toast.success("图片资产已保存"); setForm(defaultForm); setFile(null); await utils.media.list.invalidate(); await utils.media.publicList.invalidate(); },
    onError: error => toast.error(error.message || "图片保存失败"),
  });
  const remove = trpc.media.delete.useMutation({
    onSuccess: async () => { toast.success("图片资产已删除"); await utils.media.list.invalidate(); await utils.media.publicList.invalidate(); },
    onError: error => toast.error(error.message || "图片删除失败"),
  });

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return toast.error("请先选择一张图片");
    if (!form.slot || !form.title || !form.altText) return toast.error("请填写图片位置、标题和替代文本");
    if (!file.type.startsWith("image/")) return toast.error("只支持图片文件");
    if (file.size > 8 * 1024 * 1024) return toast.error("图片大小请控制在 8 MB 以内");
    const dataBase64 = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = () => reject(new Error("图片读取失败")); reader.readAsDataURL(file); });
    upload.mutate({ ...form, fileName: file.name, mimeType: file.type as "image/jpeg" | "image/png" | "image/webp" | "image/gif", dataBase64 });
  };

  if (loading) return <main className="admin-shell"><div className="admin-loading">正在验证管理员权限…</div></main>;
  if (user && user.role !== "admin") return <main className="admin-shell"><div className="admin-empty"><span>403 / 仅限管理员</span><h1>访问受限</h1><p>你的账号没有管理网站图片的权限。</p><Link href="/" className="admin-link">返回 Tide 首页 <ArrowUpRight size={15} /></Link></div></main>;

  return <main className="admin-shell media-admin-shell">
    <header className="admin-topbar"><Link href="/" className="admin-brand">TIDE / 图片资产管理</Link><nav className="admin-nav"><Link href="/admin/inquiries">客户询盘</Link><Link href="/admin/media">图片库</Link><Link href="/admin/copy">网站文案</Link></nav><div className="admin-user"><span>{user?.name || user?.email || "管理员"}</span><button onClick={() => void logout()}><LogOut size={15} /> 退出登录</button></div></header>
    <section className="admin-content">
      <div className="admin-heading"><div><span>内部运营 / 图片内容</span><h1>图片资产库</h1><p>管理首页、About、Services、订单和工厂证据模块使用的图片资产。</p></div><button className="admin-refresh" onClick={() => void assets.refetch()}><RefreshCw size={15} /> 刷新</button></div>
      <div className="media-admin-grid">
        <form className="media-upload-panel" onSubmit={submit}><div className="media-panel-kicker"><ShieldCheck size={15} /> 管理员图片编辑</div><h2>上传或替换图片</h2><p>使用相同的 slot 名称即可替换前台图片。删除资产后，前台会自动恢复默认图片。</p><label>图片位置<input value={form.slot} onChange={event => setForm({ ...form, slot: event.target.value })} placeholder="home_product_rt60" /></label><label>分类<select value={form.category} onChange={event => setForm({ ...form, category: event.target.value })}><option value="home">首页</option><option value="about">关于我们</option><option value="services">服务</option><option value="order">订单</option><option value="feedback">客户反馈</option></select></label><label>显示标题<input value={form.title} onChange={event => setForm({ ...form, title: event.target.value })} placeholder="Retatrutide RT60" /></label><label>替代文本<input value={form.altText} onChange={event => setForm({ ...form, altText: event.target.value })} placeholder="Retatrutide RT60 真实批次照片" /></label><label className="media-file-picker"><UploadCloud size={18} /><span>{file ? file.name : "选择 JPG、PNG、WEBP 或 GIF 图片"}</span><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={event => setFile(event.target.files?.[0] || null)} /></label><button className="button button-primary media-submit" type="submit" disabled={upload.isPending}><ImagePlus size={16} />{upload.isPending ? "正在上传…" : "保存图片资产"}</button></form>
        <div className="media-assets-panel"><div className="media-assets-head"><div><span className="media-panel-kicker">{filteredAssets.length} 张图片 / 当前筛选</span><h2>当前图片库</h2></div><div className="media-filter-row">{categories.map(category => <button type="button" key={category} className={categoryFilter === category ? "active" : ""} onClick={() => setCategoryFilter(category)}>{categoryLabel(category)}</button>)}</div></div>{assets.isLoading ? <div className="admin-empty">正在加载图片资产…</div> : assets.error ? <div className="admin-empty">图片资产加载失败。</div> : filteredAssets.length ? <div className="media-asset-grid">{filteredAssets.map(asset => <article className="media-asset-card" key={asset.id}><img src={asset.url} alt={asset.altText} /><div className="media-asset-copy"><span>{categoryLabel(asset.category)} / 启用</span><strong>{asset.title}</strong><small>位置：{asset.slot}<br />文件：{asset.fileName}</small><div className="media-asset-actions"><button type="button" onClick={() => { setForm({ slot: asset.slot, category: asset.category, title: asset.title, altText: asset.altText }); window.scrollTo({ top: 0, behavior: "smooth" }); }}>替换</button><button type="button" className="media-danger" onClick={() => { if (window.confirm(`确定删除“${asset.title}”？前台将恢复默认图片。`)) remove.mutate({ id: asset.id }); }}><Trash2 size={13} /> 删除</button></div></div></article>)}</div> : <div className="admin-empty"><span>该分类暂无图片</span><h2>暂无内容</h2><p>请选择其他分类，或上传一张新的管理图片。</p></div>}</div>
      </div>
    </section>
  </main>;
}
