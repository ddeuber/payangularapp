import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Transaction} from "../../model/transaction";

@Component({
  selector: 'app-transaction-details-container',
  templateUrl: './transaction-details-container.component.html',
  styleUrls: ['./transaction-details-container.component.css']
})
export class TransactionDetailsContainerComponent {
  transaction: Transaction;

  constructor(private router: Router) {
    this.transaction = router.getCurrentNavigation()?.extras?.state as Transaction;
  }
}
