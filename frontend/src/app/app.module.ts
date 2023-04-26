import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { SearchBarComponent } from './components/partials/search-bar/search-bar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { TabsComponent } from './components/partials/tabs/tabs.component';
import { TabComponent } from './components/partials/tab/tab.component';
import { SliderComponent } from './components/partials/slider/slider.component';
import { ComparisionComponent } from './components/pages/comparision/comparision.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';
import { StarsRatingComponent } from './components/partials/stars-rating/stars-rating.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { CatalogComponent } from './components/pages/catalog/catalog.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchBarComponent,
    HomeComponent,
    TabsComponent,
    TabComponent,
    SliderComponent,
    ComparisionComponent,
    ProductDetailsComponent,
    StarsRatingComponent,
    FooterComponent,
    CatalogComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    SwiperModule,
    NgbModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
