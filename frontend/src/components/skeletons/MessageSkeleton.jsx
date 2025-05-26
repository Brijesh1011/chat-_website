const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {skeletonMessages.map((_, idx) => {
        const isStart = idx % 2 === 0;
        return (
          <div
            key={idx}
            className={`flex items-start gap-2 ${isStart ? "flex-row" : "flex-row-reverse"}`}
          >
            {/* Avatar Skeleton */}
            <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse" />

            {/* Message Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-16 bg-gray-300 rounded animate-pulse" />
              <div className="h-16 w-[200px] bg-gray-300 rounded-lg animate-pulse" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;
