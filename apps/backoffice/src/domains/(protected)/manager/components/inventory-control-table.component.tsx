"use client";

import React, { useState } from "react";
import { Plus, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  Checkbox,
} from "@nine-line/ui";

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  minQuantity: number;
  status: "in_stock" | "low_stock" | "out_of_stock";
  lastRestocked: string;
}

interface InventoryControlTableProps {
  inventory: {
    totalItems: number;
    lowStock: number;
    outOfStock: number;
    items: InventoryItem[];
  };
  translations: {
    title: string;
    subtitle: string;
    addItem: string;
    status: string;
    itemName: string;
    quantity: string;
    rowsSelected: string;
    previous: string;
    next: string;
  };
}

export function InventoryControlTable({
  inventory,
  translations,
}: InventoryControlTableProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_stock":
        return (
          <Badge variant="default" className="bg-green-500 text-white">
            Alto
          </Badge>
        );
      case "low_stock":
        return (
          <Badge variant="default" className="bg-yellow-500 text-white">
            Baixo
          </Badge>
        );
      case "out_of_stock":
        return (
          <Badge variant="default" className="bg-red-500 text-white">
            Sem Estoque
          </Badge>
        );
      default:
        return <Badge variant="secondary">Desconhecido</Badge>;
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
      setSelectAll(false);
    } else {
      setSelectedRows(inventory.items.map((item) => item.id));
      setSelectAll(true);
    }
  };

  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
      setSelectAll(false);
    } else {
      const newSelected = [...selectedRows, id];
      setSelectedRows(newSelected);
      if (newSelected.length === inventory.items.length) {
        setSelectAll(true);
      }
    }
  };

  return (
    <Card className="bg-card border border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex flex-col">
          <CardTitle className="text-2xl font-bold text-card-foreground">
            {translations.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {translations.subtitle}
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          {translations.addItem}
        </Button>
      </CardHeader>
      <CardContent>
        {/* Tabela de Estoque */}
        <div className="rounded-lg border border-border overflow-hidden">
          {/* Cabeçalho da Tabela */}
          <div className="bg-muted/50 px-4 py-3 flex items-center space-x-4 border-b border-border">
            <Checkbox
              checked={selectAll}
              onCheckedChange={handleSelectAll}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <span className="text-sm font-medium text-card-foreground w-24">
              {translations.status}
            </span>
            <span className="text-sm font-medium text-card-foreground flex-1">
              {translations.itemName}
            </span>
            <span className="text-sm font-medium text-card-foreground w-24 text-right">
              {translations.quantity}
            </span>
            <div className="w-8" />
          </div>

          {/* Linhas da Tabela */}
          <div className="divide-y divide-border">
            {inventory.items.map((item) => (
              <div
                key={item.id}
                className="px-4 py-3 flex items-center space-x-4 hover:bg-muted/30 transition-colors"
              >
                <Checkbox
                  checked={selectedRows.includes(item.id)}
                  onCheckedChange={() => handleSelectRow(item.id)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <div className="w-24">{getStatusBadge(item.status)}</div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-card-foreground">
                    {item.name}
                  </span>
                </div>
                <div className="w-24 text-right">
                  <span className="text-sm font-medium text-card-foreground">
                    {item.quantity}
                  </span>
                </div>
                <div className="w-8 flex justify-center">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rodapé com Paginação */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {selectedRows.length} de {inventory.items.length}{" "}
            {translations.rowsSelected}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-muted text-muted-foreground hover:bg-muted/80"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {translations.previous}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-muted text-muted-foreground hover:bg-muted/80"
            >
              {translations.next}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
