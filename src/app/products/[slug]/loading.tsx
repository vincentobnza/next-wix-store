import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-screen-xl space-y-12 px-5 py-10">
      <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
        <div className="basis-2/5">
          <Skeleton className="aspect-square w-full" />
        </div>

        <div className="basis-3/5 flex grow">
          <Skeleton className="h-full w-full" />
        </div>
      </div>
    </main>
  );
}
