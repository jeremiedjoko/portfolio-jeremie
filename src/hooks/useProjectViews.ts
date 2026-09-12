import { useEffect, useState } from "react";

interface ViewsResponse {
  project_id: string;
  count: number;
}

export function useProjectViews(projectId: string) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!projectId) return;

    let cancelled = false;

    fetch(`/api/views/${projectId}`, { method: "POST" })
      .then((res) => res.json())
      .then((data: ViewsResponse) => {
        if (!cancelled) setCount(data.count);
      })
      .catch(() => {
        if (!cancelled) setCount(null);
      });

    return () => {
      cancelled = true;
    };
  }, [projectId]);

  return count;
}