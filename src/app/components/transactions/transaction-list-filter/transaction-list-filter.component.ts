import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-transaction-list-filter',
  templateUrl: './transaction-list-filter.component.html',
  styleUrls: ['./transaction-list-filter.component.css']
})
export class TransactionListFilterComponent {
  @Input() participants!: string[];
  @Input() payer: string | undefined;
  @Input() involved: string | undefined;

  @Output() changedFilter = new EventEmitter<{ payer?: string, participant?: string }>();

  constructor() { }

  onFilterChange(): void {
    this.changedFilter.emit({
      payer: this.payer,
      participant: this.involved,
    })
  }
}
