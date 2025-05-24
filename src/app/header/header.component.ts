import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
declare var $: any;

@Component({
    selector: 'app-header',
    imports: [RouterLink],
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    /*====================================
			Mobile Menu
		======================================*/ 	
		$('.menu').slicknav({
			prependTo:".mobile-nav",
			duration: 300,
			closeOnClick:true,
		});
  }

}
