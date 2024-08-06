import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { Member } from '../modal/member';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
})
export class MemberComponent {
  myForm!: FormGroup;
  members: any[] = []; // Array to store members
  membersSubscription: any;
  membersList: Member[] = [];
  selectedMember: any;
  showModal:boolean=false
  selectedFile: File | null = null; // Store the selected file
  imagePreview: string | ArrayBuffer | null = null; // Store the image preview URL

  member:  Member[] = [];

  selectAll: any;
files: any;
  selectedFileName: any;
  image: any;
  ipp: any;

  constructor(
    private fb: FormBuilder,
    private memberService: ServiceService,
    private afAuth: AngularFireAuth,
    private firebases:AngularFirestore
  ) {}
  ngOnInit(): void {
    this.myForm = this.fb.group({
      id:[''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      addressone: ['', Validators.required],
      addresstwo: ['', Validators.required],
      addressthree: ['', Validators.required],
      postalcode: ['', Validators.required],
      dob: ['', Validators.required],
      phonenumber: ['', Validators.required],
      email: ['', Validators.required],
      memberId:[''],
      maths:[false],
      science:[false],
      english:[false],
      malayalam:[false],
      social:[false],
      gk:[false],
      hindi:[false],
      selectAll:[false],
      imageField:['']

    });

    // console.log("------>",  this.getaMembersIn())
    console.log("------>",this.selectedFile)
    console.log(this.selectedFileName)

    const storedMember =localStorage.getItem('/memberList')
    if(storedMember){
      this.membersList=JSON.parse(storedMember)
    }else {
      this.getaMembersIn();
    }

    const ref= localStorage.getItem("refresh")
    if(ref==='true'){
      localStorage.removeItem('refresh'); // Clear the flag

    }
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
      this.selectedFileName = file.name;  // Store the file name

    }
  }

  submitForm(): void {
    if (this.myForm.valid) {
      // Check if form is valid before proceeding
      const member = this.myForm.value as Member; // Get entire member object from form

      if (member.id) {
        this.updateMember(member); // If ID exists, update member
        this.dismissModal()
      } else {
        this.addMember(); // Otherwise, add new member
      }
    } else {
      alert('Fill out the fields'); // Display alert if form is invalid
    }
  }

  addMember(): void {
    const formValues = this.myForm.value;

    // Check if firstname or lastname are empty
    if (!formValues.firstname || !formValues.lastname) {
      console.error('Error: First name and last name are required');
      return; // Exit function early if validation fails
    }

    // Construct new member object
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
      Maths:formValues.maths,
      Science:formValues.science,
      English:formValues.english,
      Malayalam:formValues.malayalam,
      Social:formValues.social,
      Gk:formValues.gk,
      Hindi:formValues.hindi,
      FileUpload: this.imagePreview as string // Use the image preview URL


    };

    // Call member service to add member
    this.memberService.addMember(newMember).then(
      () => {
        alert('Member added successfully!');
        this.myForm.reset(); // Optionally reset the form after successful submission
      },
      (error) => {
        console.error('Error adding member: ', error);
      }
    );
  }

  getaMembersIn() {
    this.memberService.getaMember().subscribe({
      next: (res) => {
        this.membersList = res.map((e: any) => {
          console.log(this.membersList)
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
        localStorage.setItem("memberList",JSON.stringify(this.membersList))
      },
      error: (err) => {
        alert('Error while fetching student data');
        console.error('Error fetching student data:', err);
      },
    });
  }

  deletePicture(): void {
    this.imagePreview = null;
    this.selectedMember.FileUpload = null;
  }


  deleteMembers(member: Member) {
    this.selectedMember = member;
    if (window.confirm('Are you sure you want to delete ' + member.first_name + ' ' + member.last_name + ' ?')) {
      this.memberService.deleteMember(member.id).then(
        () => {
          alert('File deleted successfully');
          // Logic to update the UI after deletion
        },
        error => {
          console.error('Error deleting file', error);
        }
      );
    }
  }

  reset(){

    this.myForm.get('firstname')?.reset(); // Resetting firstname control
    this.myForm.get('lastname')?.reset(); // Resetting lastname control
    this.myForm.get('addressone')?.reset();
    this.myForm.get('addresstwo')?.reset();
    this.myForm.get('addressthree')?.reset();
    this.myForm.get('postalcode')?.reset();
    this.myForm.get('phonenumber')?.reset();
    this.myForm.get('email')?.reset();
    this.myForm.get('dob')?.reset();
    }

  editMember(n: any) {
    this.myForm.patchValue({
      id:n.id,
      firstname: n.first_name,
      lastname: n.last_name,
      addressone: n.address_line_1,
      addresstwo: n.address_line_2,
      addressthree: n.address_line_3,
      postalcode: n.postal_code,
      dob: n.dob,
      phonenumber: n.cell_phone,
      email: n.email,
      maths: n.Maths || false,
    science: n.Science || false,
    english: n.English || false,
    malayalam: n.Malayalam || false,
    social: n.Social || false,
    gk: n.Gk || false,
    hindi: n.Hindi || false,
    imageField :n.FileUpload

    });
    this.imagePreview = n.FileUpload;
  }


  updateMember(member: Member): void {
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
      Maths:formValues.maths,
      Science:formValues.science,
      English:formValues.english,
      Malayalam:formValues.malayalam,
      Social:formValues.social,
      Gk:formValues.gk,
      Hindi:formValues.hindi,
      FileUpload: this.imagePreview as string //
    };

    this.memberService.updateMember(newMember).then(
      () => {
        alert('Member updated successfully!');
        this.reset(); // Reset form after successful update
        this.showModal=false
        location.reload();


      },
      (error) => {
        console.error('Error updating member: ', error);
      }
    );
}
showMemberDetails(member: Member): void {
  this.selectedMember = member;
  const files=member.FileUpload;
  this.editMember(member)
  this.showModal=true;
// this.onFileSelected(member)

  // Trigger modal display (optional if using Bootstrap's data attributes)
}
dismissModal() {
  this.reset();
  this.showModal = false;
}




}
