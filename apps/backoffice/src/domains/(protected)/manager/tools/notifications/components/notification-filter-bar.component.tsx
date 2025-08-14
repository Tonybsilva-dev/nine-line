"use client";

import React from "react";
import { Button } from "@nine-line/ui";
import { NotificationFilter } from "../types";

interface NotificationFilterBarProps {
  activeFilter: NotificationFilter;
  onFilterChange: (filter: NotificationFilter) => void;
  translations: (key: string) => string;
  isSidebar?: boolean;
  counts: {
    all: number;
    archived: number;
    favorite: number;
  };
}

export const NotificationFilterBar: React.FC<NotificationFilterBarProps> = ({
  activeFilter,
  onFilterChange,
  translations,
  isSidebar = false,
  counts,
}) => {
  const filters: { key: NotificationFilter; label: string; count: number }[] = [
    { key: "all", label: translations("filters.all"), count: counts.all },
    {
      key: "archived",
      label: translations("filters.archived"),
      count: counts.archived,
    },
    {
      key: "favorite",
      label: translations("filters.favorite"),
      count: counts.favorite,
    },
  ];

  if (isSidebar) {
    return (
      <div className="space-y-3">
        <div className="text-sm font-medium text-foreground mb-4">
          {translations("filters.title")}
        </div>
        {filters.map((filter) => (
          <Button
            key={filter.key}
            variant={activeFilter === filter.key ? "default" : "ghost"}
            className="w-full justify-between"
            onClick={() => onFilterChange(filter.key)}
          >
            <span>{filter.label}</span>
            <span className="text-xs bg-background/20 px-2 py-1 rounded-full">
              {filter.count}
            </span>
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex gap-1 overflow-x-auto pb-4 pt-2 scrollbar-hide">
        {filters.map((filter) => (
          <Button
            key={filter.key}
            variant={activeFilter === filter.key ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(filter.key)}
            className="whitespace-nowrap flex items-center gap-2"
          >
            {filter.label}
            <span className="text-xs bg-background/20 px-2 py-1 rounded-full min-w-[20px]">
              {filter.count}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};
