import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public user: Array<Object>;
  item: any;
  http: any;
  token: any;
  constructor(
    private auth: AuthService
  ) {} 
  ionViewWillEnter() {
		this.auth.getDashboard();
	}
  getdata() {
    return new Promise((resolve, reject) => {
      this.http.get('https://ds.kaltimprov.go.id/api/profil', {
      headers: {
        "Authorization": "Bearer " + this.token
      }
      })
      .subscribe(data =>
      {
      console.log (data)
       });
    });
}
  logout() {
		this.auth.logout();
	}
  ngOnInit() {
  }
}
