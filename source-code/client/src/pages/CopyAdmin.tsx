import { useMemo, useState } from "react";
import { ArrowUpRight, Check, LogOut, Plus, RefreshCw, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const blank = { contentKey: "", page: "about", section: "hero", field: "title", label: "", value: "", valueType: "textarea" as "text" | "textarea" | "url" };

export default function CopyAdmin() {
  const { user, loading, logout } = useAuth({ redirectOnUnauthenticated: true });
  const [form, setForm] = useState(blank);
  const [pageFilter, setPageFilter] = useState("全部");
  const [sectionFilter, setSectionFilter] = useState("全部");
  const copy = trpc.copy.list.useQuery(undefined, { enabled: user?.role === "admin" });
  const utils = trpc.useUtils();
  const save = trpc.copy.upsert.useMutation({ onSuccess: async () => { toast.success("文案已保存"); setForm(blank); await utils.copy.list.invalidate(); await utils.copy.publicList.invalidate(); }, onError: error => toast.error(error.message || "保存失败") });
  const remove = trpc.copy.delete.useMutation({ onSuccess: async () => { toast.success("文案已删除，将恢复默认文案"); await utils.copy.list.invalidate(); await utils.copy.publicList.invalidate(); }, onError: error => toast.error(error.message || "删除失败") });
  const pages = useMemo(() => ["全部", ...Array.from(new Set((copy.data ?? []).map(item => item.page)))], [copy.data]);
  const sections = useMemo(() => ["全部", ...Array.from(new Set((copy.data ?? []).filter(item => pageFilter === "全部" || item.page === pageFilter).map(item => item.section)))], [copy.data, pageFilter]);
  const rows = useMemo(() => (copy.data ?? []).filter(item => (pageFilter === "全部" || item.page === pageFilter) && (sectionFilter === "全部" || item.section === sectionFilter)), [copy.data, pageFilter, sectionFilter]);
  if (loading) return <main className="admin-shell"><div className="admin-loading">正在验证管理员权限…</div></main>;
  if (user && user.role !== "admin") return <main className="admin-shell"><div className="admin-empty"><span>403 / 仅限管理员</span><h1>访问受限</h1><p>你的账号没有管理网站文案的权限。</p><Link href="/" className="admin-link">返回 Tide 首页 <ArrowUpRight size={15} /></Link></div></main>;
  const set = (patch: Partial<typeof blank>) => setForm(current => ({ ...current, ...patch }));
  return <main className="admin-shell copy-admin-shell">
    <header className="admin-topbar"><Link href="/" className="admin-brand">TIDE / 文案管理</Link><nav className="admin-nav"><Link href="/admin/inquiries">客户询盘</Link><Link href="/admin/media">图片库</Link><Link href="/admin/copy">网站文案</Link></nav><div className="admin-user"><span>{user?.name || user?.email || "管理员"}</span><button onClick={() => void logout()}><LogOut size={15} /> 退出登录</button></div></header>
    <section className="admin-content"><div className="admin-heading"><div><span>内部运营 / 全量 CMS</span><h1>网站文案</h1><p>编辑导航、页面标题、说明、按钮、流程、保障、表单和页脚。未配置的字段继续使用网站默认文案。</p></div><button className="admin-refresh" onClick={() => void copy.refetch()}><RefreshCw size={15} /> 刷新</button></div>
      <div className="copy-admin-layout"><form className="copy-editor-panel" onSubmit={event => { event.preventDefault(); if (!form.contentKey || !form.label || !form.value) return toast.error("请填写键名、显示名称和文案内容"); save.mutate(form); }}><div className="media-panel-kicker"><Plus size={15} /> 新增或编辑字段</div><h2>文案字段</h2><p>键名建议使用 page.section.field，例如 about.hero.title。</p><label>字段键名<input value={form.contentKey} onChange={event => set({ contentKey: event.target.value })} placeholder="about.hero.title" /></label><div className="copy-form-row"><label>页面<input value={form.page} onChange={event => set({ page: event.target.value })} placeholder="about" /></label><label>区块<input value={form.section} onChange={event => set({ section: event.target.value })} placeholder="hero" /></label></div><div className="copy-form-row"><label>字段<input value={form.field} onChange={event => set({ field: event.target.value })} placeholder="title" /></label><label>类型<select value={form.valueType} onChange={event => set({ valueType: event.target.value as typeof form.valueType })}><option value="text">单行文字</option><option value="textarea">多行文字</option><option value="url">链接</option></select></label></div><label>后台显示名称<input value={form.label} onChange={event => set({ label: event.target.value })} placeholder="首页主标题" /></label><label>文案内容<textarea rows={8} value={form.value} onChange={event => set({ value: event.target.value })} placeholder="输入前台要显示的文案" /></label><button className="button button-primary media-submit" type="submit" disabled={save.isPending}><Check size={16} />{save.isPending ? "正在保存…" : "保存文案"}</button></form>
        <div className="copy-list-panel"><div className="media-assets-head"><div><span className="media-panel-kicker">{rows.length} 个字段 / 当前筛选</span><h2>已配置文案</h2></div><div className="media-filter-row">{pages.map(page => <button type="button" key={page} className={pageFilter === page ? "active" : ""} onClick={() => { setPageFilter(page); setSectionFilter("全部"); }}>{page}</button>)}</div><div className="media-filter-row">{sections.map(section => <button type="button" key={section} className={sectionFilter === section ? "active" : ""} onClick={() => setSectionFilter(section)}>{section}</button>)}</div></div>{copy.isLoading ? <div className="admin-empty">正在加载文案…</div> : copy.error ? <div className="admin-empty">文案加载失败。</div> : rows.length ? <div className="copy-row-list">{rows.map(item => <article className="copy-row" key={item.id}><div><span>{item.page} / {item.section} / {item.field}</span><strong>{item.label}</strong><p>{item.value}</p></div><div className="copy-row-actions"><button type="button" onClick={() => setForm({ contentKey: item.contentKey, page: item.page, section: item.section, field: item.field, label: item.label, value: item.value, valueType: item.valueType as typeof form.valueType })}>编辑</button><button type="button" className="media-danger" onClick={() => { if (window.confirm(`确定删除“${item.label}”？前台将恢复默认文案。`)) remove.mutate({ id: item.id }); }}><Trash2 size={13} /> 删除</button></div></article>)}</div> : <div className="admin-empty"><span>暂无文案覆盖</span><h2>使用默认文案</h2><p>在左侧添加第一个字段后，公开网站会优先读取保存的内容。</p></div>}</div>
      </div></section>
  </main>;
}
