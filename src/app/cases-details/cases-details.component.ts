import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Cases } from '../cases';

@Component({
  selector: 'app-cases-details',
  templateUrl: './cases-details.component.html',
  styleUrls: ['./cases-details.component.scss']
})
export class CasesDetailsComponent {

  cases: Cases = { _id: '', name: '', gender: '', age: 0, address: '', city: '', country: '', status: '', updated: new Date() };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  getCasesDetails(id: string) {
    this.api.getCasesById(id)
      .subscribe((data: any) => {
        this.cases = data;
        console.log(this.cases);
        this.isLoadingResults = false;
      });
  }

  ngOnInit(): void {
    this.getCasesDetails(this.route.snapshot.params['id']);
  }

  deleteCases(id: any) {
    this.isLoadingResults = true;
    this.api.deleteCases(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/cases']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
