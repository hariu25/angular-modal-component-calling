import { Component } from '@angular/core';

@Component({
  selector: 'app-sample-component',
  templateUrl: './sample-component.component.html',
  styleUrls: ['./sample-component.component.css']
})
export class SampleComponentComponent {


  openDialog(){
    document.getElementById('myModal')
  }


}
