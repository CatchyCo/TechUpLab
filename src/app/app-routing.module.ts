import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfPinComponent } from './components/list-of-pin/list-of-pin.component';


const routes: Routes = [
  {path:'',component:ListOfPinComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
