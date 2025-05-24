import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, PreloaderComponent, FooterComponent],
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MelizzaFrontEnd';
}
