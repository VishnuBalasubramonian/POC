import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {filter} from 'rxjs/operators';
import { GlobalService } from '../core/services/global/global.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AdminComponent implements OnInit {

  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor(public globalService: GlobalService, public location: Location, 
              private router: Router) { }

              ngOnInit() {
                const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
          
                if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini')) {
                    // if we are on windows OS we activate the perfectScrollbar function
          
                    document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
                } else {
                    document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
                }
                const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
                const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
          
                this.location.subscribe((ev:PopStateEvent) => {
                    this.lastPoppedUrl = ev.url;
                });
                 this.router.events.subscribe((event:any) => {
                    if (event instanceof NavigationStart) {
                       if (event.url != this.lastPoppedUrl)
                           this.yScrollStack.push(window.scrollY);
                   } else if (event instanceof NavigationEnd) {
                       if (event.url == this.lastPoppedUrl) {
                           this.lastPoppedUrl = undefined;
                           window.scrollTo(0, this.yScrollStack.pop());
                       } else
                           window.scrollTo(0, 0);
                   }
                });
                this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
                     elemMainPanel.scrollTop = 0;
                     elemSidebar.scrollTop = 0;
                });
                if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
                  if(elemMainPanel != null){
                    let ps = new PerfectScrollbar(elemMainPanel);
                    if(elemSidebar != null){
                      ps = new PerfectScrollbar(elemSidebar);
                    }
                  }
                    
                    
                }
            }
            ngAfterViewInit() {
                this.runOnRouteChange();
            }
            isMaps(path){
                var titlee = this.location.prepareExternalUrl(this.location.path());
                titlee = titlee.slice( 1 );
                if(path == titlee){
                    return false;
                }
                else {
                    return true;
                }
            }
            runOnRouteChange(): void {
              if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
                const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
                if(elemMainPanel != null){
                  const ps = new PerfectScrollbar(elemMainPanel);
                  ps.update();
                }
                
                
              }
            }
            isMac(): boolean {
                let bool = false;
                if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
                    bool = true;
                }
                return bool;
            }

}
