import {Component, OnDestroy} from '@angular/core';
import FireBaseService from './Services/fire-base.service';
import {Subscription} from 'rxjs';
import {Menu} from './menu-item/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{

  menus = [];
  getDocumentsSubscription: Subscription;
  saveMenuSubscription: Subscription;
  selectedMenu;
  newMenu = {name: 'New Menu', data: {Menu: [new Menu('Menu', null)]}};

  constructor(private firebaseService: FireBaseService) {
    this.getAllDocuments();
  }

  getAllDocuments() {
    this.getDocumentsSubscription = this.firebaseService.getAllDocuments().subscribe(menus => {
      this.menus = menus;
      this.menus.unshift(this.newMenu);
      this.selectedMenu = this.menus[0];
    }, (error) => {
      console.log(error);
    });
  }

  ngOnDestroy() {
    if (this.getDocumentsSubscription) {
      this.getDocumentsSubscription.unsubscribe();
    }
    if (this.saveMenuSubscription) {
      this.saveMenuSubscription.unsubscribe();
    }
  }

  changeMenuSelection(menu) {
    this.selectedMenu = menu;
  }

  saveCurrentMenu() {
    this.saveMenuSubscription = this.firebaseService.saveToFireBase(JSON.parse(JSON.stringify(this.selectedMenu.data))).subscribe(() => {
      this.getAllDocuments();
    }, (error) => {
      console.log(error);
    });
  }

}
