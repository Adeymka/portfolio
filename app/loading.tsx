import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen p-4 pb-12 md:p-6">
      <div className="mx-auto flex w-full max-w-[1540px] gap-6">
        {/* Left sidebar skeleton — hidden on small screens */}
        <aside className="hidden w-[280px] shrink-0 space-y-4 lg:block">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[180px] w-full" />
          <Skeleton className="h-[120px] w-full" />
        </aside>
        <div className="min-w-0 flex-1 space-y-6">
          {/* Profile header skeleton */}
          <div className="overflow-hidden rounded-2xl bg-fb-card shadow-card">
            <Skeleton className="h-[200px] w-full rounded-t-2xl md:h-[300px]" />
            <div className="px-5 md:px-8 lg:px-10">
              <div className="-mt-[50px] md:-mt-[75px]">
                <Skeleton className="h-[100px] w-[100px] rounded-full border-4 border-white md:h-[150px] md:w-[150px]" />
                <div className="mt-5 space-y-2">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-5 w-64" />
                  <div className="flex gap-4 pt-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-6 border-t border-fb-border py-5">
                  <Skeleton className="h-10 w-12" />
                  <Skeleton className="h-10 w-12" />
                  <Skeleton className="h-10 w-12" />
                </div>
              </div>
            </div>
          </div>
          {/* Feed skeleton */}
          <div className="rounded-2xl bg-fb-card p-4 shadow-card md:p-6">
            <div className="flex gap-3">
              <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
              <Skeleton className="h-10 flex-1 rounded-full" />
            </div>
            <div className="mt-4 flex gap-2">
              <Skeleton className="h-9 w-20 rounded-full" />
              <Skeleton className="h-9 w-16 rounded-full" />
              <Skeleton className="h-9 w-24 rounded-full" />
            </div>
            <div className="mt-6 space-y-4">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-[180px] w-full rounded-lg" />
              <Skeleton className="h-[220px] w-full rounded-lg" />
            </div>
          </div>
        </div>
        <aside className="hidden w-[280px] shrink-0 space-y-4 xl:block">
          <Skeleton className="h-[140px] w-full" />
          <Skeleton className="h-[200px] w-full" />
        </aside>
      </div>
    </main>
  );
}
