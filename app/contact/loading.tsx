export default function ContactLoading() {
  return (
    <div className="flex h-[calc(100vh-56px)] min-h-[500px] flex-col overflow-hidden bg-white md:flex-row">
      {/* Left panel skeleton */}
      <div
        className="flex flex-shrink-0 flex-col justify-between p-6 md:w-[40%] md:p-8"
        style={{
          background: "linear-gradient(180deg, #1877F2 0%, #1464D8 100%)",
        }}
      >
        <div>
          <div className="h-20 w-20 animate-pulse rounded-full bg-white/20" />
          <div className="mt-4 h-7 w-40 animate-pulse rounded bg-white/30" />
          <div className="mt-2 h-4 w-28 animate-pulse rounded bg-white/20" />
          <div className="mt-4 h-4 w-48 animate-pulse rounded bg-white/20" />
        </div>
        <div className="space-y-3">
          <div className="h-4 w-32 animate-pulse rounded bg-white/20" />
          <div className="h-4 w-24 animate-pulse rounded bg-white/20" />
          <div className="border-t border-white/20 pt-4">
            <div className="h-3 w-24 animate-pulse rounded bg-white/20" />
          </div>
        </div>
      </div>
      {/* Right panel skeleton */}
      <div className="flex min-h-0 flex-1 flex-col border-l border-fb-border bg-fb-gray/30 md:w-[60%]">
        <div className="flex items-center gap-3 border-b border-fb-border bg-white px-4 py-3">
          <div className="h-10 w-10 animate-pulse rounded-full bg-fb-gray" />
          <div className="flex-1">
            <div className="h-4 w-24 animate-pulse rounded bg-fb-gray" />
            <div className="mt-1 h-3 w-16 animate-pulse rounded bg-fb-gray" />
          </div>
        </div>
        <div className="flex-1 space-y-3 p-4">
          <div className="flex justify-end">
            <div className="h-10 w-3/4 max-w-xs animate-pulse rounded-2xl rounded-br-md bg-fb-blue/30" />
          </div>
          <div className="flex justify-end">
            <div className="h-10 w-2/3 max-w-sm animate-pulse rounded-2xl rounded-br-md bg-fb-blue/30" />
          </div>
          <div className="flex justify-start">
            <div className="h-8 w-24 animate-pulse rounded-2xl rounded-bl-md bg-white" />
          </div>
        </div>
        <div className="border-t border-fb-border bg-white p-4">
          <div className="h-10 w-full animate-pulse rounded-full bg-fb-gray" />
        </div>
      </div>
    </div>
  );
}
