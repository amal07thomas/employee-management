import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent {
  public customerId!: any;
  public customer: Customer = {} as Customer;
  
  public errorMessage!: string;
  constructor(private activeRoute : ActivatedRoute,
    private customerService: CustomerService,
    private router: Router){}
  ngOnInit(){
    this.activeRoute.paramMap.subscribe((param: ParamMap)=> {
      this.customerId = param.get('customerId');
      console.log(this.customerId);
    })
    if(this.customerId){
      this.customerService.GetCustomerById(this.customerId).subscribe((data: any)=> {
        this.customer = data;
        console.log(this.customer);
      },(error)=>{
        this.errorMessage = error;
      })
    }
  }
  submitUpdate(){
    if(this.customerId){
      this.customerService.updateCustomer(this.customer,this.customerId).subscribe((data: any)=> {
        this.router.navigate(['/']).then();
      },(error)=>{
        this.errorMessage = error;
        this.router.navigate([`/customer/edit/${this.customerId}`]).then();
  
      });
    }
  }

}
