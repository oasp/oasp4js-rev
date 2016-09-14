import { Injectable } from '@angular/core';
import {Command} from '../../../models/command/Command.model'
import { BusinessOperations } from '../../../../main/BusinessOperations';
import { Http, Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {LoginService} from '../../login/service/Login.service'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DetailsRestService {

  BO:BusinessOperations = new BusinessOperations();
  constructor(private loginService: LoginService, private http:Http) { }

  getPositions(tableId){
      let csrf = this.loginService.getcsrfToken();
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('X-CSRF-TOKEN', csrf);
    var data = {
      state : "CLOSED",
      tableId : tableId
    };
    return this.http.post(this.BO.orderSearchPOST, JSON.stringify(data), {headers: headers})
                    .map(res => res.json())
  }

  getMenus(){
      let csrf = this.loginService.getcsrfToken();
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('X-CSRF-TOKEN', csrf);
    return this.http.get(this.BO.offersGET)
                    .map(res =>  res.json())
  }

  updateOrder(order, positions){
      let csrf = this.loginService.getcsrfToken();
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('X-CSRF-TOKEN', csrf);
    var data = {
      order: order,
      positions : positions
    }
    for(let i = 0 ; i < data.positions.length; i++){
      data.positions[i].orderId = data.order.id;
      data.positions[i].revision = null;
    }
    this.http.post(this.BO.orderPOST, JSON.stringify(data),  {headers: headers})
             .map(res =>  res.json())
             .subscribe(data => {})
  }
}