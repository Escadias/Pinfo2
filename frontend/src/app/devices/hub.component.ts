import { Component } from '@angular/core' ;
import { Location } from "@angular/common";
import { Hub } from '../_models/hub' ;
import { Device } from '../_models/device' ;
import { PlotComponent } from '../Plot/plot.component';
import { DeviceService } from "../_services/devices.service";
import { ActivatedRoute, Params } from '@angular/router' ;
import { Socket } from "../_models/socket";

@Component({
    selector: 'hub',
    templateUrl: 'hub.component.html',
    styleUrls: ['../sidenav/sidenav.component.css'],
    providers: [DeviceService]
})

export class HubComponent {
    private hub: Hub;
    private hubId: number;
    private socketsId: number[];
    sockets = new Array<Socket>();
    private dstart = new Array<String>();
    private dend = new Array<String>(); 
    private tstart = new Array<String>();
    private tend = new Array<String>();
    private isLiveData: boolean;

    constructor(private deviceService: DeviceService, private route: ActivatedRoute, private loc: Location) { }

    ngOnInit(): void {
        this.route.params
      .switchMap((params: Params) => this.deviceService.getDevice(+params['id'], "hub"))
      .subscribe(hub => { this.hub = hub; this.socketsId = hub.link });

      for (let x of this.socketsId) {
          this.deviceService.getDevice(x, "socket").then(sock => {this.sockets.push(sock);
              console.log(sock.id);});
      }
    }

  show_live() {
        let x = document.getElementById("panel-live");
        let y = document.getElementById("panel-history");

        if (x.className.indexOf("w3-hide") !== -1 && y.className.indexOf("w3-hide") === -1) {
            x.className = x.className.replace(" w3-hide", "");
            y.className += " w3-hide";
        }
    }

    show_history() {
        let x = document.getElementById("panel-live");
        let y = document.getElementById("panel-history");

        if (y.className.indexOf("w3-hide") !== -1 && x.className.indexOf("w3-hide") === -1) {
            y.className = y.className.replace(" w3-hide", "");
            x.className += " w3-hide";
        }
    }

    getHistory(): number[] {
        let xd = this.tstart.pop().valueOf();
        this.tstart.push(xd);
        let ad = this.dstart.pop();
        this.dstart.push(ad);
        let dtstart = Date.parse(ad.replace("00:00", xd).valueOf());

        let xf = this.tend.pop().valueOf();
        this.tend.push(xf);
        let af = this.dend.pop();
        this.dend.push(af);
        let dtend = Date.parse(af.replace("00:00", xf).valueOf());

        let retour = [dtstart, dtend];
        console.log(retour[0] + " " + retour[1]);

        return [dtstart, dtend];
    } 
 
    updateDate(n: number, newValue) { 
        let x = new String(newValue);
        if (n === 1) {
            this.dstart.push(x.valueOf());
        } else if (n === 2) { 
            this.dend.push(x.valueOf()); 
        } else if (n === 3) {
            this.tstart.push(x.valueOf());
        } else {
            this.tend.push(x.valueOf());
        }
    } 
}