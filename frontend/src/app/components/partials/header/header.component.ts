import { ChangeDetectorRef, Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { HeaderService } from 'src/app/services/header.service';
import { NavItem } from 'src/app/interfaces/nav-item';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { CartProductService } from 'src/app/services/cart-product.service';
import { Cart } from 'src/app/interfaces/cart';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isSearchActive = false;
  user!: User;
  laptop: any;
  phone: any;
  tablet: any;
  earphone: any;
  keyboard: any;
  application: any;
  cart: Cart = new Cart();

  numberProductInCart: number = 0;
  constructor(
    private headerService: HeaderService,
    private userService: UserService,
    private cartService: CartProductService
  ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  }

  ngOnInit() {
    this.headerService.getNavItem().subscribe((d) => {
      this.laptop = d.find((x) => x.category == 'laptop')?.brands;
      this.phone = d.find((x) => x.category == 'phone')?.brands;
      this.tablet = d.find((x) => x.category == 'tablet')?.brands;
      this.earphone = d.find((x) => x.category == 'earphone')?.brands;
      this.keyboard = d.find((x) => x.category == 'keyboard')?.brands;
      this.application = d.find((x) => x.category == 'application')?.brands;
    });
  }

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
  }
  logout() {
    this.cartService.saveCartToUser().subscribe(
      (response) => {
        alert('thành công');
      },
      (error) => {
        alert('thất bại');
      }
    );
    this.userService.logout();
  }
  get isAuth() {
    return this.user.token;
  }

  getNumberItemInCart() {
    let numberItem = 0;
    const userLS = localStorage.getItem('User');
    if (userLS != null) {
      const user = JSON.parse(userLS);
      numberItem = user.cart.items.length;
    } else {
      const cartLS = localStorage.getItem('cart');
      if (cartLS != null) {
        const cart = JSON.parse(cartLS);
        numberItem = cart.items.length;
      } else {
        numberItem = 0;
      }
    }
    return numberItem;
  }
}
