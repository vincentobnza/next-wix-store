import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-screen-lg space-y-12 px-5 py-10">
      <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
        <div className="basis-2/5">
          <Skeleton className="aspect-square w-full" />
        </div>
        <div className="basis-3/5 space-y-2">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-16 w-1/4" />
          <Skeleton className="h-16 w-1/2" />
        </div>
      </div>
    </main>
  );
}
