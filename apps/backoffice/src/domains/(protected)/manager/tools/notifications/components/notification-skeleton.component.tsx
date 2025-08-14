"use client";

import React from "react";
import { Skeleton } from "@nine-line/ui";

export const NotificationSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <Skeleton className="w-10 h-10 rounded-lg" />
      </div>

      {/* Filter Bar Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-8 w-32" />
      </div>

      {/* Notifications List Skeleton */}
      <div className="space-y-3">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="p-3 rounded-lg border">
            <div className="flex items-start gap-3">
              {/* Status indicators skeleton */}
              <div className="flex flex-col items-center gap-1 pt-1">
                <Skeleton className="w-2 h-2 rounded-full" />
                <Skeleton className="w-3 h-3 rounded" />
              </div>

              {/* Content skeleton */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>

                  {/* Timestamp and actions skeleton */}
                  <div className="flex flex-col items-end gap-2">
                    <Skeleton className="h-3 w-16" />
                    <div className="flex items-center gap-1">
                      <Skeleton className="w-6 h-6 rounded" />
                      <Skeleton className="w-6 h-6 rounded" />
                    </div>
                  </div>
                </div>

                {/* Actions skeleton (sometimes visible) */}
                {index % 3 === 0 && (
                  <div className="flex items-center gap-2 mt-3">
                    <Skeleton className="h-7 w-16" />
                    <Skeleton className="h-7 w-16" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
