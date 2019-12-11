import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loggedIn: boolean;

  constructor(
    private apiService: APIService,
    private router: Router
    ) {
  }
  
  ngOnInit() {
    this.apiService.emmiter.subscribe(
      logged => {
        this.loggedIn = logged
      }
    );
    this.apiService.verifyCacheUser();
  }

  doLogout(){
    this.apiService.destroyToken();
    this.router.navigate(['/login']);
  }
}
