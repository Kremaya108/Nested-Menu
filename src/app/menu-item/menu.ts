
export class Menu {
  name: string;
  submenus: Array<Menu>;

  constructor(name: string, submenus: Array<Menu>) {
    this.name = name;
    this.submenus = submenus;
  }
}
