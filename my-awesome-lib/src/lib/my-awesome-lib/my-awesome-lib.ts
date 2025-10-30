import { Component } from '@angular/core';
import { LibButton } from '../button/button';
import { LibCard } from '../card/card';
import { LibTable, TableColumn } from '../table/table';

@Component({
  selector: 'lib-my-awesome-lib',
  imports: [LibButton, LibCard, LibTable],
  templateUrl: './my-awesome-lib.html',
  styleUrl: './my-awesome-lib.css',
})
export class MyAwesomeLib {
  // Sample data for the table
  tableColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: false },
    { key: 'role', label: 'Role', sortable: true },
  ];

  tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'User' },
  ];
}
