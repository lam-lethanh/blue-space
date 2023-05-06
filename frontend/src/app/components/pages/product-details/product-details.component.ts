import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { SearchBarComponent } from '../../partials/search-bar/search-bar.component';
import { SearchBarService } from 'src/app/services/search-bar.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailsComponent {
  VietnameseKey = {
    cpu: 'Bộ xử lý',
    operatingSystem: 'Hệ điều hành',
    ram: 'RAM',
    gpu: 'Card đồ họa',
    storage: 'Ổ cứng',
    batteryCapacity: 'Dung lượng Pin',
    'battery-capacity': 'Dung lượng Pin',
    screen: 'Màn hình',
    keyboard: 'Bàn phím',
    bluetooth: 'Bluetooth',
    camera: 'Camera',
    weight: 'Trọng lượng',
    color: 'Màu sắc',
    size: 'Kích thước',
    material: 'Chất liệu',
    core: 'Số nhân',
    simSlot: 'Khe sim',
    cable: 'Dây cáp',
    earphone: 'Tai nghe',
    model: 'Mẫu',
    connection: 'Kết nối',
    connectionDistance: 'Khoảng cách kết nối',
    switch: 'Switch',
    type: 'Loại',
    numberOfKeys: 'Số phím',
    ledLight: 'Đèn led',
    otherFunction: 'Các chức năng khác',
    DPI: 'Độ phân giải',
    led: 'Led',
    batteryTime: 'Thời gian pin',
    frequency: 'Tần số',
    impedance: 'Trở kháng',
    compatible: 'Tương thích',
    micrphone: 'Microphone',
    language: 'Ngôn ngữ',
    numberOfUser: 'Số người dùng',
    operationSystem: 'Hệ điều hành',
    pen: 'Bút vẽ',
    materialKeycaps: 'Chất liệu phím',
  };

  product: Product = new Product();
  comboProduct: any;
  selectedColor: string = '';
  quantity: number = 1;
  constructor(
    private route: ActivatedRoute,
    private productSerivce: ProductService,
    private searchBarService: SearchBarService,
    private router: Router
  ) {}
  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.productSerivce.getProductById(id).subscribe((d) => {
      this.product = d;
    });
    this.productSerivce.getComboProduct(id).subscribe((d) => {
      this.comboProduct = d;
    });
  }

  addToCart(product: Product, quantity: number) {
    const item = Object.assign({}, product);
    item.specifications = Object.assign({}, product.specifications);
    if (this.selectedColor != '') {
      item.specifications.color = [this.selectedColor];
    } else {
      item.specifications.color = [product.specifications.color[0]];
    }
    console.log(item);
    console.log(quantity);
    // Viết serivce truyền item và quantity
    alert(item.productName + '\n Số lượng:' + quantity);
  }
  getColor(event: any) {
    this.selectedColor = event.target.value;
    console.log(this.selectedColor); // In ra giá trị đang được chọn
  }
  suggestions: any;
  searchTerm = '';
  getProductCompare() {
    this.searchBarService.getData(this.searchTerm).subscribe((d) => {
      this.suggestions = d.slice(0, 5);
    });
  }
  compare(id: string) {
    this.router.navigateByUrl(
      '/comparision?id1=' + this.product.id + '&id2=' + id
    );
  }
  popUp: boolean = false;
  onPopupClick(event: any) {
    if (event.target.classList.contains('popup-container')) {
      this.closePopup();
    }
  }

  openPopup() {
    this.popUp = true;
  }
  closePopup() {
    this.popUp = false;
  }

  show = false;
  toggleCollapsed() {
    this.show = !this.show;
  }
}
