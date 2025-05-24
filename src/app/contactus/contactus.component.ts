import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CountryISO, SearchCountryField,  NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@Component({
    selector: 'app-contactus',
    imports: [ReactiveFormsModule, NgxIntlTelInputModule, CommonModule],
    standalone: true,
    templateUrl: './contactus.component.html',
    styleUrl: './contactus.component.css'
})
export class ContactusComponent {
  inquiryForm: FormGroup;
  isSubmit = false;

  CountryISO = CountryISO;
  searchFields = [SearchCountryField.Name, SearchCountryField.DialCode, SearchCountryField.Iso2];
  
  constructor(private formBuilder: FormBuilder) {
    this.inquiryForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      phone: [undefined, [Validators.required]],
      message: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(){
    debugger
    this.isSubmit = true;
    if (this.inquiryForm.invalid) {
      return;
    }
    const fieldValues = this.inquiryForm.getRawValue();
    var bodymsg = "Name: "+fieldValues.name+"\nCountry Code: "+ fieldValues.phone.countryCode+"\nContact Number: "+fieldValues.phone.internationalNumber+"\nEmail: "+fieldValues.email+"\nMessage: "+fieldValues.message+"";
    var mailLink = "mailto:office@melizzalifescience.com?subject="+fieldValues.subject+"&body="+bodymsg;
    window.open(encodeURI(mailLink),"_blank");
  }
}
