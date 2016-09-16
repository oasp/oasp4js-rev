import { Component, EventEmitter } from '@angular/core'
import { Table } from '../../../models/table/Table.model'
import { OrderPosition } from '../../../models/orderposition/Orderposition.model'
import { PaginationComponent } from '../../../../oasp/oasp-ui/table-pagination/Pagination.component'
import { GridTableComponent } from '../../../../oasp/oasp-ui/grid-table/view/Grid-table.component'
import { DetailsRestService } from '../service/Details.service.rest'
import { OaspI18n } from '../../../../oasp/oasp-i18n/oasp-i18n.service';

@Component({
  selector:'tableDetails',
  templateUrl:'app/main/views/details/view/Details.component.html',
  inputs:['parentTable'],
  outputs:['resultEvent', 'closeWindowEvent'],
  providers:[DetailsRestService, OaspI18n],
  directives:[PaginationComponent, GridTableComponent],
})

export class DetailsComponent{
  resultEvent:EventEmitter<Table> = new EventEmitter<Table>();
  closeWindowEvent = new EventEmitter();

  public headers: string[] ;
  public attributeNames: string[] = ["id", "offerName", "state", "price", "comment"];

  public parentTable:Table;
  public offers = [];
  public offerToAdd = null;
  public selectedPosition = null;
  public viewMenu: boolean = true;

  public numItems: number;
  public positions: OrderPosition[] = [];
  public order;
  public i18n;

  public pageData = {
      pagination: {
          size: 4,
          page: 1,
          total: true
      }};

  constructor(private oaspI18n:OaspI18n, private detailsRestService: DetailsRestService){
      this.i18n = oaspI18n.getI18n();
      this.headers = [this.i18n.details.number,this.i18n.details.description, this.i18n.details.state, this.i18n.details.price, this.i18n.details.comment];
  }

  ngOnInit(){
      this.loadPositions();
      this.detailsRestService.getMenus().subscribe(data => this.offers = data);
  }

  loadPositions(){
      this.detailsRestService.getPositions(this.parentTable.id)
                                            .subscribe(data => {
                                                                this.positions = data.result[0].positions;
                                                                this.order = data.result[0].order});
  }

  openMenu(){
    this.viewMenu = !this.viewMenu;
  }

  pagination(value){
      this.pageData.pagination.total = value;
      this.loadPositions();
  }

  clickedRow(valor){
      this.selectedPosition = valor;
  }

  addCommand(){
      this.viewMenu = !this.viewMenu;
      this.positions.push(new OrderPosition(undefined, 0, "", undefined, this.offerToAdd.id, this.offerToAdd.name, this.offerToAdd.price,'ORDERED', undefined, undefined));
      this.resetValues();
  }

  removeCommand(){
      this.positions.splice(this.positions.indexOf(this.selectedPosition),1);
  }

  resetValues(){
      this.selectedPosition = null;
      this.offerToAdd = null;
  }

  cancel(){
      this.resultEvent.emit(this.parentTable);
      this.closeWindowEvent.emit(false);
  }

  submit(){
      this.resultEvent.emit(this.parentTable);
      this.detailsRestService.updateOrder(this.order, this.positions);
      this.closeWindowEvent.emit(false);
  }

}
