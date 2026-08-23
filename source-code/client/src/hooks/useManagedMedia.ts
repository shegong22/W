import { useMemo } from "react";
import { trpc } from "@/lib/trpc";

export function useManagedMedia() {
  const query = trpc.media.publicList.useQuery();
  const assets = useMemo(() => new Map((query.data ?? []).map((asset) => [asset.slot, asset])), [query.data]);
  const get = (slot: string, fallback: string) => {
    const managedUrl = assets.get(slot)?.url;
    if (!managedUrl) return fallback;
    return managedUrl.includes("/manus-storage/") ? `/assets/${managedUrl.split("/manus-storage/").pop()}` : managedUrl;
  };
  return { get, isLoading: query.isLoading };
}
