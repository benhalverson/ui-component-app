import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LibButton, LibCard } from '@benhalverson/my-awesome-lib';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, LibButton, LibCard, DatePipe],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Card Components</h1>
        <p class="page-description">Flexible card container with header and footer support</p>
      </div>

      <div class="cards-grid">
        <lib-card title="Simple Card">
          <p>This is a simple card with just a title and content.</p>
          <p>Perfect for basic content containers.</p>
        </lib-card>

        <lib-card title="Elevated Card" [elevated]="true">
          <p>This card has elevation (shadow) for more prominence.</p>
          <p>Use the [elevated]="true" property.</p>
        </lib-card>

        <lib-card [elevated]="true">
          <div header>
            <h3 style="margin: 0; font-size: 1.125rem;">📊 Statistics</h3>
            <p style="margin: 0.5rem 0 0 0; color: #6b7280; font-size: 0.875rem;">
              Last updated: {{ currentDate | date:'short' }}
            </p>
          </div>
          <div class="stats">
            <div class="stat-item">
              <span class="stat-value">1,234</span>
              <span class="stat-label">Total Users</span>
            </div>
            <div class="stat-item">
              <span class="stat-value" style="color: #10b981;">945</span>
              <span class="stat-label">Active</span>
            </div>
          </div>
        </lib-card>

        <lib-card title="With Footer" [elevated]="true">
          <p>Cards can have footers for actions or additional information.</p>
          <p>Use content projection with [footer] selector.</p>
          <div footer>
            <div class="card-footer-actions">
              <lib-button variant="outline">Cancel</lib-button>
              <lib-button variant="primary">Confirm</lib-button>
            </div>
          </div>
        </lib-card>

        <lib-card [elevated]="true">
          <div header>
            <h3 style="margin: 0; font-size: 1.125rem;">💳 Pricing Plan</h3>
          </div>
          <div class="pricing-content">
            <div class="price">
              <span class="currency">$</span>
              <span class="amount">29</span>
              <span class="period">/month</span>
            </div>
            <ul class="features-list">
              <li>✓ Unlimited projects</li>
              <li>✓ 10GB storage</li>
              <li>✓ Priority support</li>
              <li>✓ Advanced analytics</li>
            </ul>
          </div>
          <div footer>
            <lib-button variant="primary" style="width: 100%;">Subscribe Now</lib-button>
          </div>
        </lib-card>

        <lib-card title="Image Card" [elevated]="true">
          <div class="image-placeholder">
            📷 Image Here
          </div>
          <p>Cards can contain any content including images, charts, or custom layouts.</p>
          <div footer>
            <lib-button variant="outline">View Details</lib-button>
          </div>
        </lib-card>
      </div>

      <lib-card title="Code Example" [elevated]="true" style="margin-top: 2rem;">
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

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stats {
      display: flex;
      gap: 2rem;
      justify-content: space-around;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: #3b82f6;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #6b7280;
      margin-top: 0.25rem;
    }

    .card-footer-actions {
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
    }

    .pricing-content {
      text-align: center;
    }

    .price {
      margin: 1.5rem 0;
      display: flex;
      align-items: baseline;
      justify-content: center;
    }

    .currency {
      font-size: 1.5rem;
      color: #6b7280;
    }

    .amount {
      font-size: 3rem;
      font-weight: 800;
      color: #111827;
      margin: 0 0.25rem;
    }

    .period {
      font-size: 1rem;
      color: #6b7280;
    }

    .features-list {
      list-style: none;
      padding: 0;
      margin: 1.5rem 0;
      text-align: left;
    }

    .features-list li {
      padding: 0.5rem 0;
      color: #4b5563;
    }

    .image-placeholder {
      background: #f3f4f6;
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      margin-bottom: 1rem;
      border-radius: 0.5rem;
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
export class CardsComponent {
  currentDate = new Date();

  codeExample = `import { LibCard, LibButton } from '@benhalverson/my-awesome-lib';

@Component({
  imports: [LibCard, LibButton],
  template: \`
    <lib-card title="Card Title" [elevated]="true">
      <p>Card content here</p>
      
      <div footer>
        <lib-button variant="primary">Action</lib-button>
      </div>
    </lib-card>
  \`
})`;
}
