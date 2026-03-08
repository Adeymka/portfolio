import Skeleton from "@/components/ui/Skeleton";

export default function ProjectsLoading() {
  return (
    <div className="min-h-screen">
      <Skeleton className="h-[180px] w-full rounded-t-2xl md:h-[220px]" />
      <div className="sticky top-[72px] z-40 border-b border-fb-border bg-white/95 px-4 py-3 md:px-6">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-9 w-16 rounded-full" />
          <Skeleton className="h-9 w-20 rounded-full" />
          <Skeleton className="h-9 w-24 rounded-full" />
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="aspect-video w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
