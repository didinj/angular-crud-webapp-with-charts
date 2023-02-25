import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Cases } from '../cases';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent {
  displayedColumns: string[] = ['name', 'age', 'status'];
  data: Cases[] = [];
  isLoadingResults = true;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getCases().subscribe({
      next: (res) => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      },
      error: (e) => {
        console.log(e);
        this.isLoadingResults = false;
      },
      complete: () => console.info('complete')
    });
  }
}
