import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Member } from '../modal/member';
import { Observable, map, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private basePath = '/uploads'; // Base path for file uploads in Firebase Storage


  constructor(private firebases:AngularFirestore,    private storage: AngularFireStorage
  ) { }


  addMember(member:Member){
    member.member_id=this.firebases.createId();
    return this.firebases.collection('/member').add(member);
  }


  getaMember() {
    return this.firebases.collection('/member').snapshotChanges();

  }

// deleteMember(member: Member) {
//    this.firebases.doc('/member/' + member.id).delete();
// }

deleteMember(memberId: string): Promise<void> {
  return this.firebases.doc('/member/' + memberId).delete();
}

deleteMembers(memberId: string,fileUpload: string): Promise<void> {
  return this.firebases.doc('/member/'+ memberId + fileUpload).delete();
}

// updateStudent(member:Member) {
//   this.deleteMember(member);
//   this.addMember(member);
// }


updateMember( member: Member): Promise<void> {  {
  return this.firebases.collection('/member/').doc(member.id).update(member); // Correct the path
}

}
uploadFile(file: File): Promise<string> {
  const filePath = `${this.basePath}/${Date.now()}_${file.name}`;
  const fileRef = this.storage.ref(filePath);
  const uploadTask = this.storage.upload(filePath, file);

  return new Promise((resolve, reject) => {
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(
          (url) => resolve(url),
          (error) => reject(error)
        );
      })
    ).subscribe();
  });
}



}
