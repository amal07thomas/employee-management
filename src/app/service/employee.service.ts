import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // public serverUrl: string = 'http://localhost:3000'; // json server url
  public serverUrl: string = 'http://15.207.222.215:8080/api';
  constructor(private httpClient: HttpClient) { }

  public getAllEmployees(): Observable<any[]>{
    let dataUrl: string = `${this.serverUrl}/employees`;
    return this.httpClient.get<any[]>(dataUrl).pipe(catchError(this.handleError));
  }
  public deleteEmployee(employeeId: string): Observable<{}>{
    let dataUrl: string = `${this.serverUrl}/employees/${employeeId}`;
    return this.httpClient.delete<{}>(dataUrl).pipe(catchError(this.handleError));
  }
  public updateEmployee(employee: any,employeeId: number): Observable<any>{
    let dataUrl: string = `${this.serverUrl}/employees/${employeeId}`;
    return this.httpClient.put<any>(dataUrl,employee).pipe(catchError(this.handleError));
  }
  public GetEmployeeById(employeeId: string): Observable<any>{
    let dataUrl = `${this.serverUrl}/employees/${employeeId}`;
    return this.httpClient.get<any>(dataUrl).pipe(catchError(this.handleError));
  }
  public createEmployee(employee: any): Observable<any>{  
    let dataUrl: string = `${this.serverUrl}/employees`;
    return this.httpClient.post<any>(dataUrl,employee).pipe(catchError(this.handleError));
  }
  
  public handleError(error: HttpErrorResponse){
    let errorMessage: string = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = `Error: ${error.error.message}`
    }else{
      errorMessage = `Status: ${error.status} \n Message: ${error.message}`
    }
    return throwError(errorMessage);
  }
}
