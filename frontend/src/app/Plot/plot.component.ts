import { Component, Input, ViewChild } from '@angular/core';
import { DataForPlotService } from '../_services';
import { BaseChartDirective } from 'ng2-charts';


@Component({
    selector: 'plot',
    templateUrl: 'plot.component.html',
    providers: [
        
    ]
})


export class PlotComponent {
    errorMessage : any;

    
    // lineChart
    @Input()
    lineChartData:Array<any>; /*= [
        {
            data: [65, 59, 80, 81, 56, 55, 40],
            label: 'Consumption'
        },    
    ]*/

    @Input()
    lineChartLabels:Array<any>; /*= [
            '14:00', '14:10', '14:20', '14:30', '14:40', '14:50', '15:00'
        ];*/

    

    lineChartOptions:any = {
        responsive: true
    };
    lineChartColors:Array<any> = [
        { // blue
            backgroundColor: 'rgba(33,150,243,0.2)',
            borderColor: 'rgba(33,150,243,1)',
            pointBackgroundColor: 'rgba(33,150,243,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(33,150,243,1)'
        }
    ];
    lineChartLegend:boolean = true;
    lineChartType:string = 'line';
    
    constructor(/*private dataForPlotService: DataForPlotService*/) {
    }

    /*setValuesForPlot(): void{
        this.dataForPlotService.getValues().subscribe(Values => {
                                                            this.lineChartData=Values.lineChartData;
                                                            this.lineChartLabels=Values.lineChartLabels;
                                                        },
                                                        error => this.errorMessage = <any> error);
    }*/
    
    /*public randomize():void {
        let _lineChartData:Array<any> = new Array(this.lineChartData.length);
        for (let i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
            for (let j = 0; j < this.lineChartData[i].data.length; j++) {
            _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }
        this.lineChartData = _lineChartData;
    }*/
    
    // events
    public chartClicked(e:any):void {
        console.log(e);
    }
    
    public chartHovered(e:any):void {
        console.log(e);
    }

    @ViewChild(BaseChartDirective) chart : BaseChartDirective;

}
