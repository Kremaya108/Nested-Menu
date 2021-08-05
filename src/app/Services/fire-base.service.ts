import {AngularFirestore} from '@angular/fire/firestore';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export default class FireBaseService {

  private readonly COLLECTION_PATH = 'My_Menus';

  constructor(protected firesotre: AngularFirestore) {
  }


  saveToFireBase(object) {
    const subject = new Subject<boolean>();
    this.firesotre.collection(this.COLLECTION_PATH).add(object).then(data => {
      subject.next(true);
    }).catch(() => {
      subject.next(false);
    });
    return subject.asObservable();
  }

  getAllDocuments() {
    const subject = new Subject<any>();
    this.firesotre.collectionGroup(this.COLLECTION_PATH).get().subscribe(data => {
      const menus = [];
      data.forEach(doc => {
        menus.push({name: 'Menu-' + (menus.length + 1), data: doc.data()});
      });
      subject.next(menus);
    }, (error) => {
      subject.error(error);
    });

    return subject.asObservable();
  }
}
