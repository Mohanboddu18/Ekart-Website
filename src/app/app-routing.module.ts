import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
const routes: Routes = [ 
    { path: '', component: HomeComponent }, 
  ]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule], 
  providers: []
})
export class RouteModule { }