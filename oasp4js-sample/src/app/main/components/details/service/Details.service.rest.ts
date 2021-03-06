import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../oasp/oasp-security/http-client.service';
import 'rxjs/add/operator/map';
import { BusinessOperations } from '../../../../main/BusinessOperations';
import { SecurityService } from '../../../../oasp/oasp-security/oasp-security.service';

@Injectable()
export class DetailsRestService {

  BO: BusinessOperations = new BusinessOperations();
  constructor(private securityService: SecurityService, private http: HttpClient) { }

  disableLoading() {
    this.http.disableLoading();
  };

  getPositions(data) {
    return this.http.post(this.BO.orderSearchPOST, JSON.stringify(data))
                    .map(res => res.json());
  };

  getMenus() {
    return this.http.get(this.BO.offersGET)
                    .map(res =>  res.json());
  };

  updateOrder(order, positions) {
    let data = {
      order: order,
      positions : positions
    };
    for (let i = 0 ; i < data.positions.length; i++) {
      data.positions[i].orderId = data.order.id;
      data.positions[i].revision = null;
    }
    this.http.post(this.BO.orderPOST, JSON.stringify(data))
             .map(res =>  res.json())
             .subscribe(() => { this.http.disableLoading(); },
                        err =>  { this.http.disableLoading(); });
  };
}
