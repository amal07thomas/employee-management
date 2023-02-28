import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {
  public deletedCustomer: any;
  public customers: any;
  public errorMessage!:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private dialogRef: MatDialogRef<DeleteModalComponent>,
  private customerService:CustomerService
  ){
    this.deletedCustomer = data.customer;
  }
  ngOnInit(){
    this.getAllCustomers();
  }
  getAllCustomers(){
    this.customerService.getAllCustomers().subscribe((data)=>{
      this.customers = data;
    },(error)=>{
      this.errorMessage = error;
    })
  }
  deleteCustomer(){
    console.log(this.deletedCustomer);
    this.customerService.deleteCustomer(this.deletedCustomer.id).subscribe((data)=>{
      this.getAllCustomers();
    },(error) =>{
      this.errorMessage = error;
    })
    this.dialogRef.close(true);

  }

}
