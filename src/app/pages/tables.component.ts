import { Component, inject } from '@angular/core';
import { LibButton, LibCard, LibTable } from '@benhalverson/my-awesome-lib';
import type { TableColumn } from '@benhalverson/my-awesome-lib';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [LibButton, LibCard, LibTable],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Table Component</h1>
        <p class="page-description">Data table built with Angular CDK Table</p>
      </div>

      <div data-testid="users-table">
      <lib-card title="Users Table" [elevated]="true">
        <lib-table [columns]="userColumns" [data]="users"  [filterEnabled]="false" [pageSize]="50"></lib-table>
        <div footer>
          <div class="table-footer-actions">
            <lib-button variant="primary" (click)="onAddUser()">Add User</lib-button>
            <lib-button variant="outline" (click)="onExport()">Export CSV</lib-button>
          </div>
        </div>
      </lib-card>
      </div>

      <lib-card title="Products Table" [elevated]="true">
        <lib-table [columns]="productColumns" [data]="products"></lib-table>
        <div footer>
          <div class="table-footer-actions">
            <lib-button variant="primary">Add Product</lib-button>
            <lib-button variant="secondary">Import</lib-button>
          </div>
        </div>
      </lib-card>

      <lib-card title="Projects Table" [elevated]="true">
        <lib-table [columns]="projectColumns" [data]="projects"></lib-table>
      </lib-card>

      <lib-card title="Code Example" [elevated]="true">
        <pre><code>{{codeExample}}</code></pre>
      </lib-card>
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .page-header {
      margin-bottom: 2rem;
    }

    .page-header {
      background: var(--app-card-bg);
      padding: 2rem;
      border-radius: 0.5rem;
      margin-bottom: 2rem;
    }

    .page-header h1 {
      margin: 0 0 0.5rem;
      font-size: 2.25rem;
      font-weight: 800;
      color: #111827;
    }

    .page-description {
      margin: 0;
      font-size: 1.125rem;
      color: #6b7280;
    }

    :host-context(.dark-mode) .page-header h1 {
      color: #f9fafb;
    }

    :host-context(.dark-mode) .page-description {
      color: #d1d5db;
    }

    lib-card {
      margin-bottom: 2rem;
    }

    .table-footer-actions {
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
    }

    pre {
      background: #f3f4f6;
      padding: 1.5rem;
      border-radius: 0.5rem;
      overflow-x: auto;
      margin: 0;
    }

    code {
      font-family: 'Courier New', monospace;
      font-size: 0.875rem;
      color: #1f2937;
    }
  `]
})
export class TablesComponent {
  private modalService = inject(ModalService);

  userColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: false },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ];

  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Active' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Editor', status: 'Inactive' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer', status: 'Active' },
  ];

  productColumns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Product Name' },
    { key: 'price', label: 'Price' },
    { key: 'stock', label: 'In Stock' },
    { key: 'category', label: 'Category' },
  ];

  products = [
    { id: 101, name: 'Laptop Pro', price: '$1,299', stock: '15', category: 'Electronics' },
    { id: 102, name: 'Wireless Mouse', price: '$29', stock: '150', category: 'Accessories' },
    { id: 103, name: 'USB-C Cable', price: '$19', stock: '200', category: 'Accessories' },
    { id: 104, name: 'Monitor 4K', price: '$499', stock: '8', category: 'Electronics' },
    { id: 105, name: 'Keyboard', price: '$79', stock: '45', category: 'Accessories' },
  ];

  projectColumns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Project Name' },
    { key: 'status', label: 'Status' },
    { key: 'progress', label: 'Progress' },
    { key: 'dueDate', label: 'Due Date' }
  ];

  projects = [
    { id: 1, name: 'Website Redesign', status: 'In Progress', progress: '75%', dueDate: '2025-11-15' },
    { id: 2, name: 'Mobile App', status: 'In Progress', progress: '45%', dueDate: '2025-12-01' },
    { id: 3, name: 'API Integration', status: 'Completed', progress: '100%', dueDate: '2025-10-28' },
    { id: 4, name: 'Database Migration', status: 'Pending', progress: '20%', dueDate: '2025-11-30' },
  ];

  codeExample = `import { LibTable } from '@benhalverson/my-awesome-lib';
import type { TableColumn } from '@benhalverson/my-awesome-lib';

@Component({
  imports: [LibTable],
  template: \`
    <lib-table 
      [columns]="columns" 
      [data]="data">
    </lib-table>
  \`
})
export class MyComponent {
  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' }
  ];

  data = [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Jane', email: 'jane@example.com' }
  ];
}`;

  onAddUser(): void {
    this.modalService.showAlert('Add user form would open here', 'Add User');
  }

  onExport(): void {
    this.modalService.showSuccess('Data exported successfully!', 'Export Complete');
  }
}
