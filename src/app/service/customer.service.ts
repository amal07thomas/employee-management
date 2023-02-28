import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public serverUrl: string = 'http://localhost:3000'; // json server url
  constructor(private httpClient: HttpClient) { }

  public getAllCustomers(): Observable<any[]>{
    let dataUrl: string = `${this.serverUrl}/customer`;
    return this.httpClient.get<any[]>(dataUrl).pipe(catchError(this.handleError));
  }
  public deleteCustomer(customerId: string): Observable<{}>{
    let dataUrl: string = `${this.serverUrl}/customer/${customerId}`;
    return this.httpClient.delete<{}>(dataUrl).pipe(catchError(this.handleError));
  }
  public updateCustomer(customer: any,customerId: number): Observable<any>{
    let dataUrl: string = `${this.serverUrl}/customer/${customerId}`;
    return this.httpClient.put<any>(dataUrl,customer).pipe(catchError(this.handleError));
  }
  public GetCustomerById(customerId: string): Observable<any>{
    let dataUrl = `${this.serverUrl}/customer/${customerId}`;
    return this.httpClient.get<any>(dataUrl).pipe(catchError(this.handleError));
  }
  public createCustomer(customer: any): Observable<any>{
    let dataUrl: string = `${this.serverUrl}/customer`;
    return this.httpClient.post<any>(dataUrl,customer).pipe(catchError(this.handleError));
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
