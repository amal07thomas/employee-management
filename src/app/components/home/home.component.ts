import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from 'src/app/modals/delete-modal/delete-modal.component';
import { EmployeeService } from 'src/app/service/employee.service';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  displayedColumns: string[] = ['id', 'name', 'lastName', 'phone', 'gender', 'email', 'view', 'edit', 'delete'];
  employees : any[] = [];
  dataToDeleteModal:any
  public errorMessage!:string;
  searchText!:any;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private dialogRef: MatDialog){}

  ngOnInit(){
    this.getAllEmployees();
  }
  getAllEmployees(){
    this.employeeService.getAllEmployees().subscribe((data: any) => {
      this.employees = data;
      this.dataSource = new MatTableDataSource<any>(this.employees.reverse());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    },(error) =>{
      this.errorMessage = error;
    })
  }
  openDeleteEmployeeModal(customer: any){
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
        this.getAllEmployees();
      }else{
        console.log(`Dialog result: ${result}`)

      }
    })
  }
  searchEmployee(){
    if(this.searchText === ""){
      this.getAllEmployees();
    }else{
      this.employeeService.getAllEmployees().subscribe((data) => {
        this.employees = data;
      },(error)=>{
        this.errorMessage = error;
      })
      this.employees = this.employees.filter(item => {
        return item.empFirstName.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase())
      })
      this.dataSource = new MatTableDataSource<any>(this.employees);
      this.dataSource.paginator = this.paginator;
    }
  }

}
