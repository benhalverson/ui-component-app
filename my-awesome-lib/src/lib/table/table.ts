import { Component, Input, ViewChild } from '@angular/core';
import type { AfterViewInit, OnChanges } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

export interface TableColumn {
  /** Unique identifier for the column */
  key: string;
  /** Display label for the column */
  label: string;
  /** Whether the column is sortable */
  sortable?: boolean;
}

type RowRecord = Record<string, unknown>;
/**
 * A reusable table component with sorting, pagination, and filtering capabilities.
 * Inputs:
 * - columns: Array of column definitions (key, label, sortable).
 * - data: Array of row data objects.
 * - pageSize: Number of rows per page (default: 10).
 * - pageSizeOptions: Options for rows per page (default: [5, 10, 25, 50]).
 * - showFirstLastButtons: Whether to show first/last buttons in paginator (default: true).
 * - stickyHeader: Whether the header row is sticky (default: true).
 * - filterEnabled: Whether to show the filter input (default: true).
 * - filterPlaceholder: Placeholder text for the filter input (default: 'Filter').  
 */
@Component({
  selector: 'lib-table',
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatPaginatorModule],
  template: `
    <div class="lib-table-container">
      @if (filterEnabled) {
      <div class="lib-table-toolbar">
        <input
          type="text"
          class="lib-table-filter-input"
          [attr.placeholder]="filterPlaceholder"
          (input)="onFilterInput($any($event.target).value)"
          aria-label="Filter table" />
      </div>
      }

      <table mat-table [dataSource]="dataSource" matSort class="lib-table">
        @for (column of columns; track column.key) {
        <ng-container [matColumnDef]="column.key">
          <th mat-header-cell *matHeaderCellDef mat-sort-header [disabled]="!column.sortable" class="lib-table-header">
            {{ column.label }}
          </th>
          <td mat-cell *matCellDef="let row" class="lib-table-cell">
            {{ row[column.key] }}
          </td>
        </ng-container>
        }

        <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: stickyHeader" class="lib-table-header-row"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns" class="lib-table-row"></tr>
      </table>

      @if (dataSource.data.length === 0) {
      <div class="lib-table-empty">
        No data available
      </div>
      }

      <mat-paginator
        [length]="dataSource.filteredData.length || dataSource.data.length"
        [pageSize]="pageSize"
        [pageSizeOptions]="pageSizeOptions"
        [showFirstLastButtons]="showFirstLastButtons">
      </mat-paginator>
    </div>
  `,
  styles: [`
    .lib-table-container {
      overflow-x: auto;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
    }

    .lib-table-toolbar {
      display: flex;
      justify-content: flex-end;
      padding: 0.5rem;
      border-bottom: 1px solid #e5e7eb;
      background-color: #f9fafb;
    }

    .lib-table-filter-input {
      max-width: 240px;
      width: 100%;
      padding: 0.5rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      outline: none;
      font-size: 0.875rem;
    }

    .lib-table-filter-input:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }

    .lib-table {
      width: 100%;
      border-collapse: collapse;
      background-color: white;
    }

    .lib-table-header {
      padding: 0.75rem 1rem;
      text-align: left;
      font-weight: 600;
      color: #374151;
      background-color: #f9fafb;
      border-bottom: 2px solid #e5e7eb;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .lib-table-cell {
      padding: 0.75rem 1rem;
      color: #111827;
      border-bottom: 1px solid #e5e7eb;
    }

    .lib-table-header-row {
      background-color: #f9fafb;
    }

    .lib-table-row {
      transition: background-color 0.2s;
    }

    .lib-table-row:hover {
      background-color: #f3f4f6;
    }

    .lib-table-row:last-child .lib-table-cell {
      border-bottom: none;
    }

    .lib-table-empty {
      padding: 3rem;
      text-align: center;
      color: #6b7280;
      background-color: white;
    }
  `]
})


export class LibTable implements AfterViewInit, OnChanges {
  /** Columns to display in the table */
  @Input() columns: TableColumn[] = [];
  /** Number of rows per page (default: 10) */
  @Input() pageSize = 10;
  /** Options for rows per page (default: [5, 10, 25, 50]) */
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50];
  /** Whether to show first/last buttons in paginator (default: true) */
  @Input() showFirstLastButtons = true;
  /** Whether the header row is sticky (default: true) */
  @Input() stickyHeader = true;
  /** Whether to show the filter input (default: true) */
  @Input() filterEnabled = true;
  /** Placeholder text for the filter input (default: 'Filter') */
  @Input() filterPlaceholder = 'Filter';
  /** Data records to display in the table */
  @Input() set data(value: unknown[]) {
    this._data = value ?? [];
    this.dataSource.data = this._data as RowRecord[];
    this.updateDisplayedColumns();
  }
  get data(): unknown[] {
    return this._data;
  }

  private _data: unknown[] = [];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<RowRecord>([]);

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.attachSort();
    this.attachPaginator();
    this.configureFilter();
    this.updateDisplayedColumns();
  }

  ngOnChanges(): void {
    this.updateDisplayedColumns();
  }

  private attachSort(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (row: RowRecord, columnId: string): string | number => {
        const v = row?.[columnId];
        if (v == null) return '';
        if (typeof v === 'string') return v.toLowerCase();
        if (typeof v === 'number') return v;
        if (v instanceof Date) return v.getTime();
        if (typeof v === 'boolean') return v ? 1 : 0;
        return String(v);
      };
    }
  }

  private attachPaginator(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  private configureFilter(): void {
    // Match across all displayed columns, case-insensitive
    this.dataSource.filterPredicate = (row: RowRecord, filter: string): boolean => {
      if (!filter) return true;
      const lc = filter.trim().toLowerCase();
      // If no columns provided, consider all keys in the row
      const keys = this.displayedColumns?.length ? this.displayedColumns : Object.keys(row ?? {});
      return keys.some(k => {
        const v = row?.[k];
        if (v == null) return false;
        if (typeof v === 'string') return v.toLowerCase().includes(lc);
        if (typeof v === 'number') return String(v).includes(lc);
        if (v instanceof Date) return String(v.toISOString()).toLowerCase().includes(lc);
        if (typeof v === 'boolean') return (v ? 'true' : 'false').includes(lc);
        return String(v).toLowerCase().includes(lc);
      });
    };
  }

  /** Handle filter input changes */
  onFilterInput(value: string): void {
    this.dataSource.filter = (value ?? '').trim().toLowerCase();
    // Reset to first page when filtering changes to avoid empty pages
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private updateDisplayedColumns(): void {
    if (this.columns?.length) {
      this.displayedColumns = this.columns.map(col => col.key);
    }
  }
}
