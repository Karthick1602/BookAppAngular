import { Component } from '@angular/core';




interface MenuItem {
  label: string;
  icon?: string;
  routerLink?: string;
  items?: MenuItem[];
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})

export class MenuBarComponent {
  userMenuItems: MenuItem[];
  adminMenuItems: MenuItem[];
  regularMenuItems: MenuItem[];

  constructor() {

    this.regularMenuItems = [
      { label: 'Home', routerLink: '/home' },
      { label: 'Books', routerLink: '/book' },
      {label: 'Login', routerLink: '/login'},
      {label: 'Register', routerLink: '/register'}
    ];

    this.userMenuItems = [
      { label: 'Home', routerLink: '/home' },
      { label: 'Reviews', routerLink: '/review' },
    
      {
        label: 'User',
        items: [
          { label: 'Profile', routerLink: '/profile' },
          { label: 'Logout', routerLink: '/login' }
        ]
      }
    ];

    this.adminMenuItems = [
          {label: 'Home', routerLink:'/home'},
          { label: 'Books', routerLink: '/book' },
          { label: 'Reviews', routerLink: '/review' },
          
          {
            label: 'Admin',
            items: [
              { label: 'Profile', routerLink: '/profile' },
              { label: 'Users', routerLink: '/user' },
              { label: 'Logout', routerLink:'/login'}
            ]
          }

       
    ];
  }

  isAdmin():boolean {
    if(sessionStorage.getItem('isAdmin')){
      return true;
    }else{
      return false;
    }
    }
    isLoggedIn(): boolean {
      if(sessionStorage.getItem('loggedIn')){
        return true;
      }else{
        return false;
      }
    }
}
