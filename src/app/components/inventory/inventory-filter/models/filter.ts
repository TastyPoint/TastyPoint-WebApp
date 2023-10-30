export interface InventoryFilterOptions {
  name: string
}

export interface InventoryFilterCallback {
  onSearch(options: InventoryFilterOptions): void
  onReset(): void
}
