import { ServiceService } from './../service/service.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Member } from '../modal/member';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {


  @Input() dataMember: any;
  myForm !: FormGroup
  displayValue: any;
  constructor(private fb :FormBuilder,private ServiceService: ServiceService,  public activeModal: NgbActiveModal){}

  ngOnInit(): void {
  this.myForm=this.fb.group({
    id:[''],
    firstname: [''],
    lastname: [''],
    addressone: [''],
    addresstwo: [''],
    addressthree: [''],
    postalcode: [''],
    dob: [''],
    phonenumber: [''],
    email: [''],
    memberId:[''],

  })


  debugger
  this.displayValue =this.dataMember;
  console.log("DAta Details", this.displayValue)

    this.myForm.patchValue({
      firstname:this.displayValue.first_name,
      lastname:this.displayValue.last_name,
      addressone:this.displayValue.address_line_1,
      addresstwo:this.displayValue.address_line_2,
      addressthree:this.displayValue.address_line_3,
      phonenumber:this.displayValue.cell_phone,
      email:this.displayValue.email,
      dob:this.displayValue.dob,
      postalcode:this.displayValue.postal_code,
      id:this.displayValue.id,
    })
  }

  // submitForm(){

  // const formValues=this.myForm.value

  //   const newMember: Member = {
  //     member_id: formValues.memberId, // This will be set by the MemberService
  //     first_name: formValues.firstname,
  //     last_name: formValues.lastname,
  //     address_line_1: formValues.addressone,
  //     address_line_2: formValues.addresstwo,
  //     address_line_3: formValues.addressthree,
  //     postal_code: formValues.postal_code,
  //     cell_phone: formValues.phonenumber,
  //     email: formValues.email,
  //     dob: formValues.dob,
  //     id: formValues.id,
  //     Maths: false,
  //     Science: false,
  //     English: false,
  //     Malayalam: false,
  //     Social: false,
  //     Gk: false,
  //     Hindi: false,
  //     FileUpload: ''
  //   };

  // this.ServiceService.addMember(newMember).then((data:any)=>{


  //   alert(" Added Successfully")
  // })
  // }

  closeModal() {
    this.activeModal.close('Close click');
  }

  updateMember(): void {

    const formValues = this.myForm.value;
    const newMember: Member = {
      member_id: formValues.memberId, // This will be set by the MemberService
      first_name: formValues.firstname,
      last_name: formValues.lastname,
      address_line_1: formValues.addressone,
      address_line_2: formValues.addresstwo,
      address_line_3: formValues.addressthree,
      postal_code: formValues.postalcode,
      cell_phone: formValues.phonenumber,
      email: formValues.email,
      dob: formValues.dob,
      id: formValues.id,
      Maths: false,
      Science: false,
      English: false,
      Malayalam: false,
      Social: false,
      Gk: false,
      Hindi: false,
      FileUpload: ""
    };

    this.ServiceService.updateMember(newMember).then(
      () => {
        alert('Member updated successfully!');




      },
      (error) => {
        console.error('Error updating member: ', error);
      }
    );
}
}
