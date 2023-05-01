import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'employee/home',
    pathMatch: 'full'

  },
  {
    path: 'employee/home',
    component: HomeComponent
  },
  {
    path: 'employee/edit/:employeeId',
    component: EditEmployeeComponent
  },
  {
    path: 'employee/add',
    component: CreateEmployeeComponent
  },
  {
    path: 'employee/view/:employeeId',
    component: ViewEmployeeComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
