import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent {
  public employeeId!: any;
  public employee: Employee = {} as Employee;
  public genderList:any;
  public errorMessage!: string;
  public today =new Date();
  public empDob:any;
  public empDoj:any;
  constructor(private activeRoute : ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private builder: FormBuilder,
    public datepipe: DatePipe){}
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
    this.genderList = ['MALE','FEMALE','OTHER'];
    this.activeRoute.paramMap.subscribe((param: ParamMap)=> {
      this.employeeId = param.get('employeeId');
    })
    if(this.employeeId){
      this.employeeService.GetEmployeeById(this.employeeId).subscribe((data: any)=> {
        this.employee = data;
        if(this.employeeForm.value.empDateOfBirth){}
        this.empDob = new Date(this.employee.empDateOfBirth);
        this.empDoj = new Date(this.employee.empDateOfJoining);
      },(error)=>{
        this.errorMessage = error;
      })
    }
  }
  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  updateEmployee(){
    if(this.employeeId){
      this.employeeForm.value.empDateOfBirth = this.datepipe.transform(this.employeeForm.value.empDateOfBirth, 'dd-MM-yyyy');
      this.employeeForm.value.empDateOfJoining = this.datepipe.transform(this.employeeForm.value.empDateOfJoining, 'dd-MM-yyyy');
      this.employeeService.updateEmployee(this.employeeForm.value,this.employeeId).subscribe((data: any)=> {
        this.router.navigate(['/']).then();
      },(error)=>{
        this.errorMessage = error;
        this.router.navigate([`/employee/edit/${this.employeeId}`]).then();
  
      });
    }
  }

}
