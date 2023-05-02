import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent {
  public employee: Employee = {} as Employee;
  public genderList:any;
  public errorMessage!: string;
  public today =new Date();
  public employeeId!: any;
  public isDisabled = true;
  constructor(private activeRoute : ActivatedRoute,
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
    this.activeRoute.paramMap.subscribe((param: ParamMap)=> {
      this.employeeId = param.get('employeeId');
      console.log(this.employeeId);
    })
    if(this.employeeId){
      this.employeeService.GetEmployeeById(this.employeeId).subscribe((data: any)=> {
        this.employee = data;
        console.log(this.employee);
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
  }

