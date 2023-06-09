import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';

import { AdminProductService } from 'src/app/services/admin-product.service';

@Component({
  selector: 'app-admin-product-category',
  templateUrl: './admin-product-category.component.html',
  styleUrls: ['./admin-product-category.component.css'],
})
export class AdminProductCategoryComponent {
  products: any;
  categories: any;
  errMessage: string = '';
  categoryName: string = '';
  searchProduct: Product[] = [];

  typeSort: string = ''; // Kiểu sort: asc: tăng dần, desc: giảm dần

  constructor(
    private _service: AdminProductService,
    private route: ActivatedRoute
  ) {
    // get categoryName
    this.categoryName = this.route.snapshot.params['categoryName'];
    console.log(this.categoryName);

    // Get all category
    this._service.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => (this.errMessage = err),
    });

    // Get all products
    this._service.getProductForCategory(this.categoryName).subscribe({
      next: (data) => (this.products = data),
      error: (err) => (this.errMessage = err),
    });
  }

  // Xử lý chia trang
  pageSize = 20;
  currentPage = 1;
  pageNumbers: number[] = [];

  getProductsForCurrentPage(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.products.slice(startIndex, endIndex);
  }

  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.products.length / this.pageSize); // Tính số trang dựa trên số lượng sản phẩm và kích thước trang
    if (totalPages == 0) return [];

    return Array(totalPages)
      .fill(0)
      .map((x, i) => i + 1); // Tạo một mảng các số trang từ 2 đến totalPages
  }

  goToPage(page: number, event: any) {
    this.currentPage = page;
    const target = event.target || event.srcElement;
    const allBtnPages = document.querySelectorAll('.page');
    if (allBtnPages) {
      for (let i = 0; i < allBtnPages.length; i++) {
        allBtnPages[i].classList.remove('active');
      }
      target.classList.add('active');
    }
  }

  nextPage() {
    this.currentPage =
      this.currentPage < this.getPageNumbers().length
        ? (this.currentPage = this.currentPage + 1)
        : 1;
    const allBtnPages = document.querySelectorAll('.page');
    if (allBtnPages) {
      for (let i = 0; i < allBtnPages.length; i++) {
        allBtnPages[i].classList.remove('active');
      }
      allBtnPages[this.currentPage - 1].classList.add('active');
    }
  }

  prevPage() {
    this.currentPage =
      this.currentPage > 1
        ? (this.currentPage = this.currentPage - 1)
        : this.getPageNumbers().length;
    const allBtnPages = document.querySelectorAll('.page');
    if (allBtnPages) {
      for (let i = 0; i < allBtnPages.length; i++) {
        allBtnPages[i].classList.remove('active');
      }
      allBtnPages[this.currentPage - 1].classList.add('active');
    }
  }
  // --------------------------------------------

  // show hide modal confrim delte
  showModal() {
    const deleteCourseModal = document.getElementById('delete-course-modal');
    if (deleteCourseModal) {
      deleteCourseModal.classList.add('show');
    }
  }

  hideModal() {
    const deleteCourseModal = document.getElementById('delete-course-modal');
    if (deleteCourseModal) {
      deleteCourseModal.classList.remove('show');
    }

    this.deleteOneProductBtnClicked = false;
    this.selectedOneProduct = '';
    this.deleteMultiProductBtnClicked = false;
  }

  selectedOneProduct: string = '';
  selectedMultiProduct: Array<string> = [];
  deleteOneProductBtnClicked = false;
  deleteMultiProductBtnClicked = false;

  clickOneDeleteProductBtn(productId: string) {
    this.selectedOneProduct = productId;
    this.deleteOneProductBtnClicked = true;
    this.showModal();
  }

  saveMultiSelectedProduct(productId: string, event: any) {
    const checkboxElement = event.target as HTMLInputElement;
    if (checkboxElement.checked) {
      this.selectedMultiProduct.push(productId);
    } else {
      this.selectedMultiProduct = this.selectedMultiProduct.filter(
        (id) => id != productId
      );
    }
  }

  clickMultiDeleteProductBtn() {
    if (this.selectedMultiProduct.length == 0) {
      alert('Chưa chọn sản phẩm nào mà đói xóa à?');
      return;
    }
    this.deleteMultiProductBtnClicked = true;
    this.showModal();
  }

  deleteProduct(productId: string) {
    this._service.deleteProduct(productId).subscribe({
      next: (data) => (this.products = data),
      error: (err) => (this.errMessage = err),
    });

    this.hideModal();
  }

  confirmDeleteProduct() {
    if (this.deleteOneProductBtnClicked) {
      this.deleteProduct(this.selectedOneProduct);
    } else {
      for (let i = 0; i < this.selectedMultiProduct.length; i++) {
        this.deleteProduct(this.selectedMultiProduct[i]);
      }
    }

    // Get all products
    this._service.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => (this.errMessage = err),
    });
  }

  // product in search bar
  getProductInSearch(searchProducts: Product[]) {
    this.products = searchProducts;
  }
}
