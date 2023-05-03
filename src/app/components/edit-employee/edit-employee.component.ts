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
  public emptyFirstName:boolean = false;
  public emptyLastName:boolean = false;
  public emptyPhone:boolean = false;
  public emptyEmail:boolean = false;
  public emptyGender:any = false;
  public emptyDob: boolean = false;
  public emptyDoj: boolean = false;
  public emptyAddress1: boolean = false;
  public emptyStreet: boolean = false;
  public emptyDistrict: boolean = false;
  public emptyState: boolean = false;
  public emptyCountry: boolean = false;
  public emptyPinCode: boolean = false;
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
      empDateOfBirth: this.builder.control('',Validators.required),
      empHomeAddrLine1: this.builder.control('',Validators.required),
      empHomeAddrLine2: this.builder.control('',Validators.nullValidator),
      empHomeAddrStreet: this.builder.control('',Validators.required),
      empHomeAddrDistrict: this.builder.control('',Validators.required),
      empHomeAddrState: this.builder.control('',Validators.required),
      empDateOfJoining: this.builder.control('',Validators.required),
      empHomeAddrCountry: this.builder.control('',Validators.required),
      empHomeAddrPinCode: this.builder.control('',Validators.required),
    });
  ngOnInit(){
    this.genderList = ['MALE','FEMALE','OTHER'];
    this.activeRoute.paramMap.subscribe((param: ParamMap)=> {
      this.employeeId = param.get('employeeId');
    })
    if(this.employeeId){
      this.employeeService.GetEmployeeById(this.employeeId).subscribe((data: any)=> {
        this.employee = data;
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
      this.emptyFirstName = this.employeeForm.value.empFirstName === "" ? true : false;
      this.emptyLastName = this.employeeForm.value.empLastName === "" ? true : false;
      this.emptyPhone = this.employeeForm.value.empPhoneNumber === "" ? true : false;
      this.emptyEmail = this.employeeForm.value.empEmailId === "" ? true : false;
      this.emptyDob = this.employeeForm.value.empDateOfBirth === "" ? true : false;
      this.emptyDoj = this.employeeForm.value.empDateOfJoining === "" ? true : false;
      this.emptyGender = this.employeeForm.value.empGender;
      this.emptyGender = this.emptyGender.length > 0 ? false : true;
      this.emptyAddress1 = this.employeeForm.value.empHomeAddrLine1 === "" ? true : false;
      this.emptyStreet = this.employeeForm.value.empHomeAddrStreet === "" ? true : false;
      this.emptyDistrict = this.employeeForm.value.empHomeAddrDistrict === "" ? true : false;
      this.emptyState = this.employeeForm.value.empHomeAddrState === "" ? true : false;
      this.emptyCountry = this.employeeForm.value.empHomeAddrCountry === "" ? true : false;
      this.emptyPinCode = this.employeeForm.value.empHomeAddrPinCode === "" ? true : false;
    
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
