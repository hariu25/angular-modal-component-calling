import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleComponentComponent } from './sample-component/sample-component.component';
import { ListComponent } from './list/list.component';
import { DataComponent } from './data/data.component';
import { MemberComponent } from './member/member.component';

const routes: Routes = [
{ path:'', redirectTo:'member',pathMatch:'full'},
  {
    path:'member',component:MemberComponent
  },
  {path:'list', component:ListComponent},
  {
    path :'data',component:DataComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
