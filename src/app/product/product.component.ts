import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-product',
    imports: [TreeTableModule, CommonModule],
    standalone:true,
    templateUrl: './product.component.html',
    styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  files: TreeNode[] = [];
  originalFiles: TreeNode[] = [];
  cols: any[] = [];

  private searchSubject = new Subject<string>();
  private searchSub!: Subscription;
  currentQuery: string = '';

  ngOnInit() {
    this.cols = [
      { field: 'product', header: 'Product list' },
      { field: 'strength', header: 'Strength' }
    ];

    this.files = [
      {
        data: { product: 'CARDIAC & DIABETIC PRODUCTS' },
        children: [
          {
            data: { product: 'Amlodipine + Atenolol Tablet', strength: '5MG + 50 mg' }
          },
          {
            data: { product: 'Atorvastatin Tablet', strength: '10 mg, 20 mg' }
          },
          {
            data: { product: 'Glimepride + Metformin (By Layer) Tablet', strength: '1mg + 500mg, 2mg + 500mg' }
          },
          {
            data: { product: 'Glimepride + Pioglitzone + Metformin (By Layer) Tablet', strength: '1mg + 15mg + 500mg, 2mg + 15mg + 500mg' }
          },
          {
            data: { product: 'PREGABALIN + NOTRIPTYLINE Tablet', strength: '75 mg + 10 mg' }
          },
          {
            data: { product: 'Methylcobalamine + Pregabaline Cap. (In Drug)', strength: '750 Mcg + 75 Mg' }
          },
          {
            data: { product: 'Rosuvastatin Tablet', strength: '10mg, 20MG' }
          },
          {
            data: { product: 'Telmisartan Tablet ', strength: '40mg' }
          },
          {
            data: { product: 'Telmisartan + AMLODIPINE Tablet', strength: '40mg + 5mg' }
          },
          {
            data: { product: 'Telmisartan40 with Hydrochlorithiazide Tablet', strength: '12.5 mg' }
          },
        ]
      },
      {
        data: { product: 'ANTI MALARIAL' },
        children: [
          { data: { product: 'Amodiaquine Tablets', strength: '' } },
          { data: { product: 'Artesunate Tablets', strength: '50mg, 100mg' } },
          { data: { product: 'α - β Arteether Injection', strength: '75mg/ml, 150mg/ml, 225mg/ml' } },
          { data: { product: 'Artemether Injection', strength: '80mg/ml' } },
          { data: { product: 'Artemether + Lumefantrine Tablets', strength: '20mg + 120mg, 40mg + 240mg, 80mg + 480mg' } },
          { data: { product: 'Artemether + Lumefantrine Suspension', strength: '180mg + 1080mg' } },
          { data: { product: 'Artesunate + Amodiaquine Tablets', strength: '50mg + 200mg, 100mg + 400mg' } },
          { data: { product: 'Artesunate + Sulfadoxine + Pyrimethamine Tablets', strength: '100mg + 250mg +12.5mg, 200mg + 500mg + 25mg' } },
          { data: { product: 'Quinine Sulphate Tablets', strength: '300mg' } },
          { data: { product: 'Quinine Di-Hydrochloride Injection', strength: '300mg/ml' } },
          { data: { product: 'Sulphadoxine + Pyrimithamine Tablets', strength: '500mg +25mg' } },
          { data: { product: 'Artesunate Injection + Sodium chloride Injection + Sodium Bicarbonate injection', strength: '60 mg' } },
        ]
      },
      {
        data: { product: 'ANTI-FUNGAL' },
        children: [
          { data: { product: 'Clotrimazole Vaginal Tablets', strength: '100mg' } },
          { data: { product: 'Clotrimazole Cream', strength: '1% w/w' } },
          { data: { product: 'Clotrimazole Cream (For Vaginal Use)', strength: '2% w/w' } },
          { data: { product: 'Fluconazole Tablets', strength: '150mg , 200mg' } },
          { data: { product: 'Griseofulvin Tablets', strength: '125mg, 250mg, 500mg' } },
          { data: { product: 'Ketoconazole Tablets', strength: '200mg' } },
          { data: { product: 'Miconazole Nitrate Cream', strength: '2% w/w' } },
          { data: { product: 'Nystatin Tablets (For Vaginal Use)', strength: '100,000 IU' } },
          { data: { product: 'Nystatin Tablets ( For Oral Use), Sugar Coated Tablets', strength: '500,000 IU' } },
          { data: { product: 'Nystatin Suspension', strength: '100,000 IU/ml' } }
        ]
      },
      {
        data: { product: 'DERMA TABLETS & CAPSULES' },
        children: [
          { data: { product: 'Azithromycin Tablet', strength: '250mg, 500mg' } },
          { data: { product: 'KETOCONAZOLE Tablet', strength: '200mg' } },
          { data: { product: 'Levocetirizine Tablet', strength: '5mg' } },
          { data: { product: 'Levocetirizine + Montelukast Sodium Tablet', strength: '5mg +10MG' } },
          { data: { product: 'Levocetirizine Hcl + Montelukast Sodium Tablet', strength: '2.5mg + 4mg' } },
          { data: { product: 'Montelukast + Fexofenadine Tablet', strength: '10 Mg + 120 Mg' } },
          { data: { product: 'FEXOFENADINE Tablet', strength: '120 MG' } },
          { data: { product: 'Deflazacort Tablet', strength: '6mg' } },
          { data: { product: 'Omega-3 Fatty Acids(Epa+Dha)+ Ginkgo Biloba+Ginseng+ Grape Seed Extract+Green Tea Extract+ Piperine+Wheat Germ Oil + Vitamins +Minerals+ Antioxidant SOFTGEL CAPSULE (In Drug)', strength: 'SOFTGEL CAPSULE' } },
          { data: { product: 'TERBINAFINE- Tablet', strength: '250mg' } },
          { data: { product: 'Itraconazole Capsule', strength: '100 MG, 200 MG' } },
          { data: { product: 'HYDROXYZINE Tablet', strength: '25 MG' } }
        ]
      },
      {
        data: { product: 'GENERAL TABLETS & CAPSULES' },
        children: [
          { data: { product: 'Azithromycin Tab.', strength: '250mg, 500mg' } },
          { data: { product: 'Albendazole + Ivermectin Tablet (MONOPACK)', strength: '400mg + 6MG' } },
          { data: { product: 'Calcium Carbonate + Vitamin D3 I.U CHEWABLE Tab.', strength: '500 MG + 250 mg' } },
          { data: { product: 'Calcitriol + Calcium Carbonate + Zinc Sulphate Softgel Capsule', strength: '0.25mg + 500mg + 7.5mg' } },
          { data: { product: 'Vitamin K2-7 45 mcg + Omega-3 Marine Triglycerides (EPA 90 Mg.+DHA 60mg.) + Calcium Citrate Maleate 500mg + Calcitriol 0.25 Mcg + Methylcobalamin 750mcg + Folic Acid 400mcg + Boron 1.5mg Softgel Capsule', strength: 'Softgel Capsule' } },
          { data: { product: 'Cholecalciferol 60,000 I.U Softgel Capsules', strength: 'Softgel Capsule' } },
          { data: { product: 'Cefixime Trihydrate Dispersible Tab.', strength: '100mg, 200MG' } },
          { data: { product: 'Cefixime Trihydrate + Lactic Acid Bacillus Tab.', strength: '200mg' } },
          { data: { product: 'Cefixime Trihydrate + Potassium Clavulanate Tab.', strength: '200 MG +125MG, 200MG + 200MG, 200MG + 500MG' } },
          { data: { product: 'Levocetirizine Tab.', strength: '5mg' } },
          { data: { product: 'Levocetirizine + Ambroxol Tablet', strength: '5mg + 60MG' } },
          { data: { product: 'Levocetirizine + Montelukast Sodium Tab.', strength: '5mg + 10MG' } },
          { data: { product: 'Levocetirizine Hcl + Montelukast Sodium Tab.', strength: '2.5mg + 4mg' } },
          { data: { product: 'Montelukast + Fexofenadine Tablet', strength: '10 Mg + 120 Mg' } },
          { data: { product: 'Levocetirizine Hydrochloride + Phenylephrine Hydrochloride + Paracetamol + Caffeine Anhydrous Tablet', strength: '2.5 Mg + 5Mg + 325Mg + 30 Mg' } },
          { data: { product: 'Paracetamol IP + Phenylephrine HCL IP + Caffeine (Anhydrous) IP + Diphenhydramine HCL IP Tablet', strength: '500mg + 5mg + 30mg + 25mg' } },
          { data: { product: 'Diacerin + Glucosamine + Msm + Mecobalamin Tab.', strength: '50mg + 750mg + 250mg + 750MCG' } },
          { data: { product: 'Diclofenac Potassium + Paracetamol + Chlorzoxazone Tab.', strength: '50mg + 325mg + 250mg' } },
          { data: { product: 'Diclofenac Potassium + Serratiopeptidase 10 Mg Tab.', strength: '50 Mg + 10mg' } },
          { data: { product: 'Diclofenac Potassium + Paracetamol + Serratiopeptidase Tab.', strength: '50mg + 325mg + 10mg' } },
          { data: { product: 'Doxylamine succinate + Pyridoxine hydrochloride + folic acid.', strength: '10mg + 10mg + 4mg' } },
          { data: { product: 'Drotaverine + Mefenamic Acid Tab.', strength: '80mg + 250mg' } },
          { data: { product: 'Esomeprazole (EC) + Domperidone Sustained Release Cap.', strength: '40mg + 30mg' } },
          { data: { product: 'Ferrous Ascorbate + Folic Acid + Zinc Tab.(IN DRUG)', strength: '100mg + 1.5mg + 22.5mg' } },
          { data: { product: 'Carbonyl Iron + Folic Acid + B12 + Zinc Cap.', strength: '100mg + 1.5mg +15MCG' } },
          { data: { product: 'FEXOFENADINE TABLET', strength: '120mg' } },
          { data: { product: 'Cefuroxime Axetil Tablet', strength: '500mg' } },
          { data: { product: 'Deflazacort Tab.', strength: '6mg' } },
          { data: { product: 'Tramadol + Paracetamol Tablet', strength: '50mg + 325mg' } },
          { data: { product: 'TERBINAFINE Tablet', strength: '250mg' } },
          { data: { product: 'Diclofenac Sodium + Paracetamol Tablet', strength: '50mg + 325mg' } },
          { data: { product: 'Cefpodoxime Dispersible Tab.', strength: '100mg, 200MG' } },
          { data: { product: 'Cefpodoxime + Potassium Clavulanate Tab.', strength: '200mg + 125mg' } },
          { data: { product: 'Multivitamins + Multiminerals + Antioxidant Cap.', strength: 'SOFTGEL CAPSULE' } },
          { data: { product: 'Omega-3 Fatty Acids(Epa+Dha)+ Ginkgo Biloba+Ginseng+ Grape Seed Extract+Green Tea Extract+ Piperine+Wheat Germ Oil + Vitamins +Minerals+ Antioxidant SOFTGEL CAPSULE (In Drug)', strength: 'SOFTGEL CAPSULE' } },
          { data: { product: 'Ginseng 42.5mg + Multivitamins + Multiminerals + Nutrients Soft Gel Capsule', strength: 'SOFTGEL CAPSULE' } },
          { data: { product: 'Aceclofenac + Paracetamol Tab.+Chlorzoxazone Tab.', strength: '100mg + 325mg + 250mg' } },
          { data: { product: 'Aceclofenac + Paracetamol + Serratiopeptidase Tab.', strength: '100mg + 325mg + 15mg' } },
          { data: { product: 'Aceclofenac Sustained Release Tab.', strength: '200mg' } },
          { data: { product: 'Aceclofenac + Thiocolchicoside + Paracetamol Tab.', strength: '100mg + 4mg + 325mg' } },
          { data: { product: 'Ofloxacin + Ornidazole Tab.', strength: '200mg + 500mg' } },
          { data: { product: 'Betahistine HCL Tab.', strength: '16mg' } },
          { data: { product: 'L-Ornithine-L-Aspartate + Pancreatin', strength: '150mg + 100mg' } },
          { data: { product: 'Levofloxacin Tab.', strength: '500mg' } },
          { data: { product: 'Cefixime + Ofloxacin Oral', strength: '200mg + 200mg' } },
          { data: { product: 'LINEZOLID TABLET', strength: '600mg' } },
          { data: { product: 'Lycopene 5000mcg + Methylcobalamine 750mcg +Lutein + Multivitamins + Antioxidant Soft Gel Cap.', strength: 'SOFTGEL CAPSULE' } },
          { data: { product: 'Multivitamins + Multiminerals + Multinutrients + Antioxidant Cap.', strength: 'SOFTGEL CAPSULE' } },
          { data: { product: 'Mecobalamin + Gabapentin Tablet', strength: '500mcg + 300mg' } },
          { data: { product: 'Mecobalamin + Alpha Lipoic Acid + Pyridoxine + Folic Acid + Zinc + Nutrients Capsule (In Drug)', strength: '1500 Mcg + 100mg + 3mg + 1.5mg + 22.5mg' } },
          { data: { product: 'Methylcobalamine + Pregabaline Cap. (In Drug)', strength: '750mcg + 75mg' } },
          { data: { product: 'Amoxycillin + Potassium Clavulanate Tab + Lactic Acid Bacillus Tab.', strength: '500mg + 125mg' } },
          { data: { product: 'Amoxycillin + Potassium Clavulanate Tab.', strength: '250mg + 125mg' } },
          { data: { product: 'Amoxycillin + Dicloxacillin Cap. + Lactic Acid Bacillus Cap.', strength: '250mg + 250mg' } },
          { data: { product: 'Nimesulide + Paracetamol Tab.', strength: '100mg + 325mg' } },
          { data: { product: 'Omeprazole Cap.', strength: '20mg' } },
          { data: { product: 'Omeprazole + Domperidone 10mg Cap.', strength: '20mg + 10mg' } },
          { data: { product: 'Ondansetron Mouth Dissolving Tab.', strength: '4mg' } },
          { data: { product: 'Pantaprazole Tab.', strength: '40mg' } },
          { data: { product: 'Pantaprazole + Domperidone Tab.', strength: '40mg + 10mg' } },
          { data: { product: 'Pantaprazole + Domperidone Sustained Release Cap.', strength: '40mg + 30mg' } },
          { data: { product: 'Pantaprazole (EC) + Levosulpiride(SR) .', strength: '40mg + 75mg' } },
          { data: { product: 'Paracetamol Tab.', strength: '650mg' } },
          { data: { product: 'Rabeprazole Tab.', strength: '20mg' } },
          { data: { product: 'Rabeprazole + Domperidone Sustained Release Cap.', strength: '20mg + 30mg' } },
          { data: { product: 'Rabeprazole + Levosulpiride Capsule', strength: '20mg + 75mg' } },
          { data: { product: 'Rabeprazole + Itopride Cap.', strength: '20mg + 150mg' } },
          { data: { product: 'Cipro Floxacin Tab.', strength: '500mg' } },
          { data: { product: 'Cipro Floxacin + Tinidazole Tab.', strength: '500mg + 600mg' } },
          { data: { product: 'Fluconazole Tablet', strength: '150mg' } },
          { data: { product: 'Natural Micronised Progesteron 200mg SoftGel Capsule', strength: 'SoftGel Capsule' } },
          { data: { product: 'Prebiotic + Probiotic + L-Glutathione Cap.', strength: '300MG' } },
          { data: { product: 'URSODEOXYCHOLIC ACID 300MG', strength: '300MG' } },
          { data: { product: 'HYDROXYZINE TABLET', strength: '25 MG' } },
        ]
      },
      {
        data: { product: 'Syrup & Suspension' },
        children: [
          { data: { product: 'Calcium Carbonate + Magnesium Hydroxide + Zinc Gluconate + Vitamin D3 - 200 I.U Suspension', strength: '625mg + 180mg + 14mg' } },
          { data: { product: 'Paracetamol + Phenylephrine + Cpm Suspension With Monocarton', strength: '125mg + 5mg + 1mg' } },
          { data: { product: 'Levocetirizine Hcl + Montelukast Sodium Suspension In Monocarton', strength: '2.5mg + 4mg' } },
          { data: { product: 'Cyproheptadine + Tricholine Citrate + Sorbital Syrup', strength: '2mg + 0.275mg' } },
          { data: { product: 'Ferrous Ascorbate + Folic Acid + Zinc Syrup', strength: '' } },
          { data: { product: 'Ferrous Ascorbate + Folic Acid + Cyanocobalamin Syrup', strength: '' } },
          { data: { product: 'Multivitamin + Multiminerals + Antioxidant Syrup 100ML', strength: '100ml, 200ml' } },
          { data: { product: 'B-Complex With L-Lysine & Zinc 100ml', strength: '100ml, 200ml' } },
          { data: { product: 'Aceclofenac + Paracetamol Syrup', strength: '50mg + 125mg' } },
          { data: { product: 'Ofloxacin Suspension', strength: '50mg' } },
          { data: { product: 'Ofloxacin + Ornidazole Suspension', strength: '50mg + 125mg' } },
          { data: { product: 'Silymarine + B1 + B2 + B6 + B12 + Nicotinamide + D-Panthenol Syrup', strength: '35mg + 1.5mg + 1.5mg + 1mg + 1mg + 20mg + 5mg' } },
          { data: { product: 'Dextromethorphan Hydrobromide + Phenylephrin Hcl + Chlorpheniramine Maleate Syrup', strength: '10mg + 5mg + 2mg' } },
          { data: { product: 'Ambroxol Hydrochloride + Terbutalinesulphate + Guaiphenesin + Menthol with Monocarton', strength: '15mg + 1.25mg + 50mg + 2.5mg' } },
          { data: { product: 'Terbutaline Sulphate + Bromhexine Hcl + Guaifensin + Menthol Syrup', strength: '1.25mg + 4mg + 50mg + 2.5mg' } },
          { data: { product: 'Levosalbutamol + Ambroxol + Guihpensien Syrup', strength: '1mg + 30mg + 50mg' } },
          { data: { product: 'Lycopene + Multivitamins + Multiminerals + Antioxidants Syrup With Monocarton', strength: '' } },
          { data: { product: 'Lycopene + Methylcobalamine 750mcg + Multivitamins + Multiminerals + Antioxidant Cap.', strength: '' } },
          { data: { product: 'PARACETAMOL SUSPENSION', strength: '250 MG' } },
          { data: { product: 'Mefenamic Acid + Paracetamol Suspension In Mono Cartoon', strength: '50mg + 125mg' } },
          { data: { product: 'Megadrate + Simethicone Suspension (Sanflr Flavour)', strength: '400mg + 20mg' } },
          { data: { product: 'Sucralfate + oxetacaine Oral Suspension In Monocarton', strength: '1000mg + 20mg' } },
          { data: { product: 'REDIMIX ORS LIQUID (ORANGE FLAVOUR)', strength: '' } },
          { data: { product: 'Fungal Diastase + Papain + B Complex Syrup 100ml', strength: '100ml, 200ml, 300ml' } },
          { data: { product: 'Fungal Diastase & Pepsin Syrup 200ml', strength: '200ml' } }
        ]
      },
      {
        data: { product: 'PAEDIATRIC DROPS & DRY SYRUPS' },
        children: [
          { data: { product: 'Azithromycin Suspension In Mono Cartoon', strength: '200mg' } },
          { data: { product: 'Cefixime Dry Syrup', strength: '50mg' } },
          { data: { product: 'Cefixime Dry Syrup WITH WATER', strength: '50mg' } },
          { data: { product: 'CEFIXIME DRY SYRUP WITH WATER', strength: '100mg' } },
          { data: { product: 'Cefixime + Potassium Clavulanate Dry Syrup WITH WATER', strength: '50mg + 28.5mg' } },
          { data: { product: 'Cyproheptadine Hcl + Tricholine Citrate + Sorbitol Syrup With carton', strength: '1.5mg + 55mg' } },
          { data: { product: 'Dicyclomine & Dimethicone Drops WITH MONOCARTON', strength: '10mg + 40mg' } },
          { data: { product: 'Deflazacort Syrup In Mono Cartoon', strength: '6mg' } },
          { data: { product: 'Cefpodoxime Dry Syrup With Monocarton', strength: '50mg' } },
          { data: { product: 'Multivitamin + Multiminerals + Antioxidant Drops', strength: '' } },
          { data: { product: 'Amoxycillin + Potassium Clavulanate Dry Syrup', strength: '200mg + 28.5mg' } },
          { data: { product: 'Fungal Diastase + Papain + B Complex Drops', strength: '' } }
        ]
      },
      {
        data: { product: 'EYE, EAR & NASAL DROPS' },
        children: [
          { data: { product: 'Xylometazoline 0.05% Nasal Drops', strength: '0.05%' } },
          { data: { product: 'Xylometazoline 0.1% Nasal Drops', strength: '0.10%' } },
          { data: { product: 'Moxifloxacin 5% Eye Drop', strength: '5%' } },
        ]
      },
    ];

    this.originalFiles = JSON.parse(JSON.stringify(this.files));

    this.searchSub = this.searchSubject
      .pipe(debounceTime(300))
      .subscribe(query => this.applyFilter(query));
  }

  onGlobalFilter(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();

    if (!query) {
      this.files = JSON.parse(JSON.stringify(this.originalFiles));
      return;
    }

    this.files = this.filterTree(this.originalFiles, query);
  }

  applyFilter(query: string) {
    if (!query) {
      this.files = JSON.parse(JSON.stringify(this.originalFiles));
    } else {
      this.files = this.filterTree(this.originalFiles, query.toLowerCase());
    }
  }

  filterTree(nodes: TreeNode[], query: string): TreeNode[] {
    const filtered: TreeNode[] = [];

    for (let node of nodes) {
      const match = Object.values(node.data).some(val =>
        String(val).toLowerCase().includes(query)
      );

      let children: any = [];
      if (node.children) {
        children = this.filterTree(node.children, query);
      }

      if (match || children.length > 0) {
        filtered.push({
          ...node,
          children: children.length > 0 ? children : undefined,
        });
      }
    }

    return filtered;
  }

  ngOnDestroy() {
    this.searchSub?.unsubscribe();
  }

  highlight(text: string): string {
    if (!this.currentQuery) return text;

    const re = new RegExp(`(${this.currentQuery})`, 'gi');
    return text.replace(re, '<span class="highlight">$1</span>');
  }

}
