import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from '../model/group';
import {StandingOrder, StandingOrderCreationData} from '../model/standingorder';

@Injectable({
  providedIn: 'root'
})
export class StandingOrderService {

  constructor(private http: HttpClient) { }

  loadStandingOrders(group: Group): Observable<StandingOrder[]> {
    return this.http.get<StandingOrder[]>(environment.baseUrl + '/standingorders/' + group.id);
  }

  deleteStandingOrder(standingOrder: StandingOrder, group: Group): Observable<unknown> {
    return this.http.delete<unknown>(environment.baseUrl + '/standingorders/' + group.id + '/' + standingOrder.id);
  }

  addStandingOrder(standingOrder: StandingOrderCreationData, group: Group): Observable<StandingOrder> {
    return this.http.post<StandingOrder>(environment.baseUrl + '/standingorders/' + group.id, standingOrder);
  }
}
