import { useMemo } from "react";
import { trpc } from "@/lib/trpc";

export function useSiteCopy() {
  const query = trpc.copy.publicList.useQuery();
  const copy = useMemo(() => new Map((query.data ?? []).map(item => [item.contentKey, item.value])), [query.data]);
  const get = (key: string, fallback: string) => copy.get(key) || fallback;
  return { get, isLoading: query.isLoading };
}
