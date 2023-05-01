import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/service/employee.service';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent {
  public selectedItem = 'Male';
  public genderList:any;
  public msg!: string;
  public employees: any;
  public userEmailExists!: boolean;
  public userPhoneExists!: boolean;
  public emptyFirstName:boolean = false;
  public emptyLastName:boolean = false;
  public emptyPhone:boolean = false;
  public emptyEmail:boolean = false;
  public errorMessage!:string;
  public employee : Employee = {} as Employee
  today =new Date();

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private builder: FormBuilder){}
    employeeForm = this.builder.group({
      empFirstName:this.builder.control('',Validators.required),
      empLastName:this.builder.control('',Validators.required),
      empGender: [[], Validators.nullValidator],
      empPhoneNumber: this.builder.control('',Validators.required),
      empEmailId: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      empDateOfBirth: this.builder.control('',Validators.nullValidator),
      empHomeAddrLine1: this.builder.control('',Validators.nullValidator),
      empHomeAddrLine2: this.builder.control('',Validators.nullValidator),
      empHomeAddrStreet: this.builder.control('',Validators.nullValidator),
      empHomeAddrDistrict: this.builder.control('',Validators.nullValidator),
      empHomeAddrState: this.builder.control('',Validators.nullValidator),
      empDateOfJoining: this.builder.control('',Validators.nullValidator),
      empHomeAddrCountry: this.builder.control('',Validators.nullValidator),
      empHomeAddrPinCode: this.builder.control('',Validators.nullValidator),

    });
  ngOnInit(){
   this.genderList = ['Male','Female','Other'];
  }
  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  submitCreate(){
  
    this.emptyFirstName = this.employeeForm.value.empFirstName === "" ? true : false;
    this.emptyLastName = this.employeeForm.value.empLastName === "" ? true : false;
    this.emptyPhone = this.employeeForm.value.empPhoneNumber === "" ? true : false;
    this.emptyEmail = this.employeeForm.value.empEmailId === "" ? true : false;
    console.log(this.employeeForm.value);
    if(this.employeeForm.status === 'VALID'){
      this.employeeService.getAllEmployees().subscribe(data => {
        this.employees = data;
        this.userEmailExists = this.employees.some((user:any) => user.empEmailId === this.employeeForm.value.empEmailId);
        this.userPhoneExists = this.employees.some((user:any) => user.empPhoneNumber === this.employeeForm.value.empPhoneNumber);
        debugger
        if(!this.userEmailExists && !this.userPhoneExists){
          this.employeeService.createEmployee(this.employeeForm.value).subscribe(data => {
         this.router.navigate(['/']).then();
         this.employee = data;
       },(error)=>{
         this.errorMessage = error;
         this.router.navigateByUrl('/employee/add');
       })
       }else{
         return;
       }
      });
      
    
  }
}

}
