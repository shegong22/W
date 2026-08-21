import { useMemo } from "react";
import { trpc } from "@/lib/trpc";

export function useManagedMedia() {
  const query = trpc.media.publicList.useQuery();
  const assets = useMemo(() => new Map((query.data ?? []).map((asset) => [asset.slot, asset])), [query.data]);
  const get = (slot: string, fallback: string) => assets.get(slot)?.url || fallback;
  return { get, isLoading: query.isLoading };
}
