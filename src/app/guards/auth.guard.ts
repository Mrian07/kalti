import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { take, map } from 'rxjs/operators';

import { AuthService } from './../services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(
		private auth: AuthService,
		private router: Router,
		private alertCtrl: AlertController
	) {}

// menggunakan auth.service untuk memeriksa apakah pengguna memiliki token di penyimpanan. Mengembalikan nilai true jika ada token
// mengembalikan false jika pengguna tidak memiliki token dan membuka halaman login awal.
	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
		return this.auth.user.pipe(
			take(1),
			map((user) => {
				console.log('Can activate: ', user);
				if (!user) {
					this.alertCtrl
						.create({
							header: 'Unauthorized',
							message: 'Tampaknya ada yang salah',
							buttons: ['OK'],
						})
						.then((alert) => alert.present());

					this.router.navigateByUrl('/');
					return false;
				} else {
					return true;
				}
			})
		);
	}
}
