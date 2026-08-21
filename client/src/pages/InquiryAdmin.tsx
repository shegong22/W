import { useEffect, useState } from "react";
import { ArrowUpRight, Check, LogOut, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const statusLabels = { new: "新询盘", contacted: "已联系", quoted: "已报价", closed: "已完成" } as const;
type InquiryStatus = keyof typeof statusLabels;
type Draft = { status: InquiryStatus; notes: string };

export default function InquiryAdmin() {
  const { user, loading, logout } = useAuth({ redirectOnUnauthenticated: true });
  const inquiries = trpc.inquiries.list.useQuery(undefined, { enabled: Boolean(user?.role === "admin") });
  const [drafts, setDrafts] = useState<Record<number, Draft>>({});
  const utils = trpc.useUtils();
  const update = trpc.inquiries.update.useMutation({ onSuccess: async () => { toast.success("询盘处理信息已保存"); await utils.inquiries.list.invalidate(); }, onError: error => toast.error(error.message || "保存失败，请稍后重试") });

  useEffect(() => {
    if (!inquiries.data) return;
    setDrafts(current => {
      const next = { ...current };
      for (const item of inquiries.data) if (!next[item.id]) next[item.id] = { status: (item.status as InquiryStatus) || "new", notes: item.notes || "" };
      return next;
    });
  }, [inquiries.data]);

  const draftFor = (item: NonNullable<typeof inquiries.data>[number]) => drafts[item.id] || { status: (item.status as InquiryStatus) || "new", notes: item.notes || "" };
  const setDraft = (id: number, patch: Partial<Draft>) => setDrafts(current => ({ ...current, [id]: { ...draftFor(inquiries.data?.find(item => item.id === id)!), ...patch } }));

  if (loading) return <main className="admin-shell"><div className="admin-loading">正在验证管理员权限…</div></main>;
  if (user && user.role !== "admin") return <main className="admin-shell"><div className="admin-empty"><span>403 / 仅限管理员</span><h1>访问受限</h1><p>你的账号已登录，但没有查看客户询盘的权限。</p><Link href="/" className="admin-link">返回 Tide 首页 <ArrowUpRight size={15} /></Link></div></main>;

  return <main className="admin-shell"><header className="admin-topbar"><Link href="/" className="admin-brand">TIDE / 询盘管理</Link><nav className="admin-nav"><Link href="/admin/inquiries">客户询盘</Link><Link href="/admin/media">图片库</Link><Link href="/admin/copy">网站文案</Link></nav><div className="admin-user"><span>{user?.name || user?.email || "管理员"}</span><button onClick={() => void logout()}><LogOut size={15} /> 退出登录</button></div></header><section className="admin-content"><div className="admin-heading"><div><span>内部运营 / 客户需求</span><h1>客户询盘</h1><p>查看 Tide 网站提交的产品、COA、OEM/ODM 和采购需求，并记录跟进进度。</p></div><button className="admin-refresh" onClick={() => void inquiries.refetch()}><RefreshCw size={15} /> 刷新</button></div>{inquiries.isLoading ? <div className="admin-empty">正在加载询盘…</div> : inquiries.error ? <div className="admin-empty">询盘加载失败，请刷新页面或使用管理员账号登录。</div> : inquiries.data?.length ? <div className="inquiry-table">{inquiries.data.map(item => { const draft = draftFor(item); return <article className="inquiry-row" key={item.id}><div className="inquiry-meta"><strong>{item.name}</strong><a href={`mailto:${item.email}`}>{item.email}</a><time>{new Date(item.createdAt).toLocaleString("zh-CN")}</time><span className={`inquiry-status inquiry-status-${draft.status}`}>{statusLabels[draft.status]}</span></div><p>{item.requirement}</p><div className="inquiry-followup"><label>处理状态<select value={draft.status} onChange={event => setDraft(item.id, { status: event.target.value as InquiryStatus })}><option value="new">新询盘</option><option value="contacted">已联系</option><option value="quoted">已报价</option><option value="closed">已完成</option></select></label><label>管理员备注<textarea value={draft.notes} placeholder="记录客户偏好、报价、跟进结果…" onChange={event => setDraft(item.id, { notes: event.target.value })} /></label><button type="button" className="admin-save-followup" onClick={() => update.mutate({ id: item.id, status: draft.status, notes: draft.notes.trim() || null })} disabled={update.isPending}><Check size={14} /> 保存处理信息</button></div></article>; })}</div> : <div className="admin-empty"><span>暂无询盘</span><h2>当前收件箱为空</h2><p>客户通过 Contact 页面提交的新表单会显示在这里。</p></div>}</section></main>;
}
