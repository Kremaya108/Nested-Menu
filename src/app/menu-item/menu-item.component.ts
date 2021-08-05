import {Component, Input} from '@angular/core';
import {faPlus, faTrashAlt, faPencilAlt, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {Menu} from './menu';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})

export class MenuItemComponent {

  @Input() subMenus: Array<Menu>;
  readonly NEW_SUBMENU = 'New Submenu';
  readonly FIRST_INDEXER = '001';
  openItems = [];
  renameItem;
  addIcon = faPlus;
  deleteIcon = faTrashAlt;
  renameIcon = faPencilAlt;
  rightIcon = faChevronRight;


  itemClicked(item: Menu) {
    if (this.openItems.includes(item)) {
      this.openItems.splice(this.openItems.indexOf(item), 1);
    } else {
      this.openItems.push(item);
    }
  }

  getNewSubmenuName(submenus: Menu[]) {
    let newName = this.NEW_SUBMENU;
    if (Object.values(submenus).some(item => item.name === newName)) {
      let indexer = this.FIRST_INDEXER;
      newName += ` ${indexer}`;
      while (Object.values(submenus).some(item => item.name === newName)) {
        let parsedIndexer = parseInt(indexer, 10);
        const newIndexer = this.getPaddedNumber(++parsedIndexer, 3);
        newName = newName.replace(` ${indexer}`, ` ${newIndexer}`);
        indexer = newIndexer;
      }
    }
    return newName;
  }

  getPaddedNumber(num, size) {
    let s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }

  addSubmenu(item: Menu) {
    if (!item.submenus) {
      item.submenus = [];
    }
    const newSubmenuName = this.getNewSubmenuName(item.submenus);
    item.submenus.push(new Menu(newSubmenuName, null));
    if (!this.openItems.includes(item)) {
      this.openItems.push(item);
    }
  }

  deleteSubmenu(item: Menu) {
    this.subMenus.splice(this.subMenus.indexOf(item), 1);
  }

  renameSubmenu(item: Menu) {
    this.renameItem = item;
  }


}
