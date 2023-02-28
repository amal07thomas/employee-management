import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from 'src/app/modals/delete-modal/delete-modal.component';
import { CustomerService } from 'src/app/service/customer.service';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  displayedColumns: string[] = ['id', 'name', 'company', 'country', 'date', 'email', 'edit', 'delete'];
  customers : any[] = [];
  dataToDeleteModal:any
  public errorMessage!:string;
  searchText!:any;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private customerService: CustomerService,
    private dialogRef: MatDialog
    ){}

  ngOnInit(){
    this.getAllCustomers();
  }
  getAllCustomers(){
    this.customerService.getAllCustomers().subscribe((data) => {
      this.customers = data;
      this.dataSource = new MatTableDataSource<any>(this.customers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    },(error) =>{
      this.errorMessage = error;
    })
  }
  deleteCustomer(){

  }
  openDeleteCustomerModal(customer: any){
    let dialoge = this.dialogRef.open(DeleteModalComponent,{
      width: "390px",
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        customer,
        message: 'Do You Want to Delete the Customer'
      }
    });
    dialoge.afterClosed().subscribe(result => {
      if(result){
        this.getAllCustomers();
      }else{
        console.log(`Dialog result: ${result}`)

      }
    })
  }
  searchCustomer(){
    if(this.searchText === ""){
      this.getAllCustomers();
    }else{
      this.customerService.getAllCustomers().subscribe((data) => {
        this.customers = data;
      },(error)=>{
        this.errorMessage = error;
      })
      this.customers = this.customers.filter(item => {
        return item.first.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase())
      })
      this.dataSource = new MatTableDataSource<any>(this.customers);
      this.dataSource.paginator = this.paginator;
    }
  }

}
