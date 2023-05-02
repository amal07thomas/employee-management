import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {
  public deletedEmployee: any;
  public employees: any;
  public errorMessage!:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private dialogRef: MatDialogRef<DeleteModalComponent>,
  private employeeService:EmployeeService
  ){
    this.deletedEmployee = data.customer;
  }
  ngOnInit(){
    this.getAllEmployees();
  }
  getAllEmployees(){
    this.employeeService.getAllEmployees().subscribe((data)=>{
      this.employees = data;
    },(error)=>{
      this.errorMessage = error;
    })
  }
  deleteEmployee(){
    console.log(this.deletedEmployee);
    this.employeeService.deleteEmployee(this.deletedEmployee.id).subscribe((data)=>{
      this.getAllEmployees();
    },(error) =>{
      this.errorMessage = error;
    })
    this.dialogRef.close(true);

  }

}
