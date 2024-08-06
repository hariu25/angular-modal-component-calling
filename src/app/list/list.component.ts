import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceService } from './../service/service.service';
import { Component, OnInit } from '@angular/core';
import { DataComponent } from '../data/data.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  membersList :any
datalist: any;
constructor(private ServiceService:ServiceService, private ngService :NgbModal){}

ngOnInit(): void {


  this.getMember()
}



getMember(){
  this.ServiceService.getaMember().subscribe((result) => {



    this.membersList= result.map((e :any)=>{
     const data =e.payload.doc.data();
    //  data.id = e.payload.doc.id;
     return data
    })

  },(error)=>{
    console.error("no data",error);

  })

  }

  addDataList(data :any){

debugger
    const modalOptions = {
      size: 'lg', // Set the size of the modal (e.g., 'sm', 'lg', 'xl')
      // windowClass: 'custom-modal-class',  Add custom class to the modal window
      // backdropClass: 'custom-backdrop-class'  Add custom class to the backdrop
    };

    const modRef = this.ngService.open(DataComponent, modalOptions); // Ensure DataComponent is the correct component
    debugger;
    modRef.componentInstance.dataMember = data;


  }

}



