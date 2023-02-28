import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent {
  public errorMessage!:string;
  public customer : Customer = {} as Customer
  startDate = new Date(2019, 0, 1);
  constructor(
    private customerService: CustomerService,
    private router: Router){}
  ngOnInit(){
   
  }
  submitCreate(){
    console.log(this.customer);
    this.customerService.createCustomer(this.customer).subscribe(data => {
      this.router.navigate(['/']).then();
      this.customer = data;
    },(error)=>{
      this.errorMessage = error;
      this.router.navigate(['/customer/add']).then();
    })
  }

}
