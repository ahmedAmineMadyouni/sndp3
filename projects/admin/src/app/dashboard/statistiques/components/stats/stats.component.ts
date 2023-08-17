import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
import { statsService } from '../../services/stats.service';
import { AdminDataService } from 'projects/admin/src/app/auth/services/admin-data.service';
import { TasksService } from '../../../tasks-admin/services/tasks.service';
import { take } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeclarationService } from '../../../declaration-admin/services/declaration.service';
import { EntretienService } from '../../../manage-entretien/services/entretien.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit, AfterViewInit {
  private accidents!: any[] 

  private amendes: any[] = [];

  public button1=false
  private demandeEntretiens: any[] = [];
  private task: any[] = [];
  private entretiens: any[] = [];


@ViewChild('chartDepenses', { static: false })
private chartDepensesRef!: ElementRef;

  @ViewChild('chartAccidents', { static: true })
  private chartAccidentsRef!: ElementRef;

  @ViewChild('chartAmendes', { static: true })
  private chartAmendesRef!: ElementRef;

  @ViewChild('chartTaskStatus', { static: true })
  private chartTaskStatusRef!: ElementRef;

  @ViewChild('chartEntretienStatus', { static: true })
  private chartEntretienStatusRef!: ElementRef;


  @ViewChild('chartDemandeEntretienStatus', { static: true })
  private chartDemandeEntretienStatusRef!: ElementRef;

  constructor(private statsService: statsService,
    private dataService:AdminDataService,
    private entretienService:EntretienService,
    private taskService:TasksService,
    private service :DeclarationService,
    private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadAccidentData()    
    this.loadTaskData()
   this.loadAmendesData()
   this.loadEntretienData()
   this.loadDemandeData()
    
   
  }

  ngAfterViewInit(): void {
    this.initializeChart();
    
  }


  loadDemandeData(){
    this.spinner.show()
    this.dataService.demandeEntretien$.pipe(take(1)).subscribe((data:any[])=>{
      if(data==null){
        this.spinner.show()
        this.entretienService.getAllDemandeEntretien().pipe(take(1)).subscribe((res:any[])=>{
          this.dataService.setDemandeEntretienData(res)
          this.demandeEntretiens=res
          this.updateChartDemandeEntretien()
          this.spinner.hide()          
        })
      }else{
        this.demandeEntretiens=data
        this.updateChartDemandeEntretien()
        
      }
    })
  }
  loadAccidentData(){
    this.spinner.show()
    this.dataService.accidentData$.pipe(take(1)).subscribe((data:any[])=>{
      if(data==null){
        this.spinner.show()
        this.service.getAllAccident().pipe(take(1)).subscribe((res:any[])=>{
          if(JSON.stringify(res)!==JSON.stringify(data)){
            this.dataService.setAccidentData(res);}
            this.accidents= res;
            this.updateChartAccident()   
        })
      }else{
        this.accidents=data
        this.updateChartAccident()
      }
    })
  }

  loadEntretienData(){
    this.dataService.entretienData$.pipe(take(1)).subscribe((data:any[])=>{
     
      if(data==null){
        this.spinner.show()
        this.entretienService.getAllEntretien().pipe(take(1)).subscribe((res:any[])=>{
          console.log(data)
          if(JSON.stringify(res)!==JSON.stringify(data)){
            this.dataService.setEntretienData(res);
          }
            this.entretiens= res;
            this.updateChartEntretien()
         })
      }else{
        this.entretiens=data
      this.updateChartEntretien()
    }    
    })
  }

  loadAmendesData(){
    this.dataService.amendesData$.pipe(take(1)).subscribe(data=>{
      if(data==null){
        this.spinner.show()
        this.service.getAllAmendes().pipe(take(1)).subscribe((res:any[])=>{
          if(JSON.stringify(res)!==JSON.stringify(data)){
            this.dataService.setAmendesData(res);}
            this.amendes= res;
            this.updateChartAmendes()
          })
      }else{this.amendes=data
      this.updateChartAmendes()}
    })
  }

  private initializeChart(): void {
    const chartAccidentsElement = this.chartAccidentsRef.nativeElement;
    if (chartAccidentsElement) {
      const chartAccidents = echarts.init(chartAccidentsElement);
      chartAccidents.resize();
    }

    const chartAmendesElement = this.chartAmendesRef.nativeElement;
    if (chartAmendesElement) {
      const chartAmendes = echarts.init(chartAmendesElement);
      chartAmendes.resize();
    }
   
    const chartTaskStatusElement = this.chartTaskStatusRef.nativeElement;
    if(chartTaskStatusElement){
      const chartTask= echarts.init(chartTaskStatusElement);
      chartTask.resize();
    }
    const chartEntretienStatusElement= this.chartEntretienStatusRef.nativeElement;
    if(chartEntretienStatusElement){
      const chartEntretien=echarts.init(chartEntretienStatusElement)
      chartEntretien.resize()
    }
    const chartDemandeEntretienStatusElement=this.chartDemandeEntretienStatusRef.nativeElement
    if(chartDemandeEntretienStatusElement){
      const chartDemandeEntretien=echarts.init(chartDemandeEntretienStatusElement)
      chartDemandeEntretien.resize()
    }
  }
  loadTaskData(){
    this.dataService.newTaskData$.pipe(take(1)).subscribe(res=>{
      if(res==null){
        this.spinner.show()
        this.taskService.getTasks().pipe(take(1)).subscribe((resp:any)=>{
          if(JSON.stringify(resp)!==JSON.stringify(res)){
            this.dataService.setNewTaskData(resp);
          }
          this.task=resp;
          this.updateChartTask()
        })
      }else{this.task=res
      this.updateChartTask()}
    })
  }

  private updateChartAccident():void{
     // Mise à jour du graphique des accidents
     const accidentsByMonth: { [key: string]: number } = {}
     for (const accident of this.accidents) {
       const date = new Date(accident.dateAcident)
       const month = ("0" + (date.getMonth() + 1)).slice(-2)
       const year = date.getFullYear()
       const key = `${month}-${year}`
 
       if (!accidentsByMonth[key]) {
         accidentsByMonth[key] = 0
       }
       accidentsByMonth[key]++
     }
     const chartAccidentsElement = this.chartAccidentsRef.nativeElement
     if (chartAccidentsElement) {
       echarts.dispose(chartAccidentsElement)
       const chartAccidents = echarts.init(chartAccidentsElement)
       chartAccidents.setOption({
         tooltip: {
           trigger: 'axis',
           axisPointer: {
             type: 'shadow'
           }
         },
         xAxis: {
           type: 'category',
           data: Object.keys(accidentsByMonth),
         },
         yAxis: {
           type: 'value',
           axisLabel:{
            formatter: function (value:any) {
              if (value % 1 === 0) { // Check if value is a whole number
                return value.toString(); // Display as string without decimal part
              } else {
                return ''; // Hide decimal numbers
              }
              
            }
           }
         },
         series: [{
           data: Object.values(accidentsByMonth),
           type: 'line',
           name: 'Accidents',
         }]
         
       });
     }
  }
  private updateChartAmendes():void{
     // Mise à jour du graphique des amendes
     const amendesByMonth: { [key: string]: number } = {};
     for (const amende of this.amendes) {
       const date = new Date(amende.dateAmendes);
       const month = ("0" + (date.getMonth() + 1)).slice(-2);
       const year = date.getFullYear();
       const key = `${month}-${year}`;
 
       if (!amendesByMonth[key]) {
         amendesByMonth[key] = 0;
       }
 
       amendesByMonth[key]++;
     }
 
     const chartAmendesElement = this.chartAmendesRef.nativeElement;
     if (chartAmendesElement) {
       echarts.dispose(chartAmendesElement);
       const chartAmendes = echarts.init(chartAmendesElement);
       chartAmendes.setOption({
         tooltip: {
           trigger: 'axis',
           axisPointer: {
             type: 'shadow'
           }
         },
         xAxis: {
           type: 'category',
           data: Object.keys(amendesByMonth),
         },
         yAxis: {
          type: 'value',
          axisLabel: {
            formatter: function (value:any) {
              if (value % 1 === 0) { // Check if value is a whole number
                return value.toString(); // Display as string without decimal part
              } else {
                return ''; // Hide decimal numbers
              }
            }
            
          }
          
         },
         series: [{
           data: Object.values(amendesByMonth),
           type: 'line',
           name: 'Amendes',
         }]
       });
       this.button1=!this.button1
       //this.initializeChartDepense()
 
     }
  }
  private updateChartEntretien():void{
    // Mise à jour du graphique des entretien par voiture
    const entretienStatusByMonth: { [key: string]: number } = {};
    for(const entretien of this.entretiens){
      const marque =entretien.voitureMarque;
      const modele = entretien.voitureModele
      const matricule = entretien.voiturePhotoId
      const key = `${matricule}-${modele}--${marque}`;
      if(!entretienStatusByMonth[key]){
        entretienStatusByMonth[key]=0
      }
      entretienStatusByMonth[key]++
    }
    const chartEntretienStatusElement=this.chartEntretienStatusRef.nativeElement
    if(chartEntretienStatusElement){
      echarts.dispose(chartEntretienStatusElement)
      const chartEntretien =echarts.init(chartEntretienStatusElement)
      chartEntretien.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: Object.keys(entretienStatusByMonth),
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            rotate: 45, // Rotate the labels by 45 degrees
            formatter: function (value:any) {
              if (value % 1 === 0) { // Check if value is a whole number
                return value.toString(); // Display as string without decimal part
              } else {
                return ''; // Hide decimal numbers
              }
            }
          }
        },
        series: [{
          data: Object.values(entretienStatusByMonth),
          type: 'line',
          name: ' nombre entretien par voiture',
        }]
      })
    }
  }
  private updateChartTask():void{
    // Mise à jour du graphique des mission
    const taskStatusByMonth: { [key: string]: number } = {};
    for( const task of this.task ){
      const date = new Date(task.dateMission);
      const status =task.missionStatus;
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      const key = `${month}-${year}-${status}`;
      if(!taskStatusByMonth[key]){
        taskStatusByMonth[key]=0;
      }
      taskStatusByMonth[key]++;
    }
    const chartTaskStatusElement= this.chartTaskStatusRef.nativeElement;
    if( chartTaskStatusElement){
      echarts.dispose(chartTaskStatusElement)
      const chartTask =echarts.init(chartTaskStatusElement)
      chartTask.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: Object.keys(taskStatusByMonth),
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            rotate: 30, // Rotate the labels by 45 degrees
            formatter: function (value:any) {
              if (value % 1 === 0) { // Check if value is a whole number
                return value.toString(); // Display as string without decimal part
              } else {
                return ''; // Hide decimal numbers
              }
            }
          }
        },
        series: [{
          data: Object.values(taskStatusByMonth),
          type: 'line',
          name: 'tasks status',
        }]
      });
    }
  }

  private initializeChartDepense(){
    const chartDepensesElement = this.chartDepensesRef.nativeElement;
    if (chartDepensesElement) {
      const chartDepenses = echarts.init(chartDepensesElement);
      chartDepenses.resize();
    }
  }
  private updateChartDemandeEntretien():void{
    // Mise à jour du graphique des mission
    const DemandeEntretienStatusByMonth: { [key: string]: number } = {};
    for( const demande of this.demandeEntretiens ){
      const date = new Date(demande.dateDemandes);
      
     const status =demande.completed;
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      const key = `${month}-${year}-${status}`;
      if(!DemandeEntretienStatusByMonth[key]){
        DemandeEntretienStatusByMonth[key]=0;
      }
      DemandeEntretienStatusByMonth[key]++;
    }
    const chartDemandeEntretienElement= this.chartDemandeEntretienStatusRef.nativeElement;
    if( chartDemandeEntretienElement){
      echarts.dispose(chartDemandeEntretienElement)
      const chartTask =echarts.init(chartDemandeEntretienElement)
      chartTask.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: Object.keys(DemandeEntretienStatusByMonth),
          axisLabel: {
            rotate: 45 // Rotate the labels by 45 degrees
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            rotate: 30 ,// Rotate the labels by 45 degrees
            formatter: function (value:any) {
              if (value % 1 === 0) { // Check if value is a whole number
                return value.toString(); // Display as string without decimal part
              } else {
                return ''; // Hide decimal numbers
              }
            }
          }
          
        },
        series: [{
          data: Object.values(DemandeEntretienStatusByMonth),
          type: 'line',
          name: 'demande entretien status',
        }]
      });
    }
  }
  showDepense(){
    this.spinner.show()
    this.updateChartDepense()
    this.spinner.hide()
  }


  private updateChartDepense(): void {

    const depensesByMonth: { [key: string]: number } = {};
    for (const amende of this.amendes) {
      const date = new Date(amende.dateAmendes);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      const key = `${month}-${year}`;
  
      if (!depensesByMonth[key]) {
        depensesByMonth[key] = 0;
      }
  
      depensesByMonth[key] += amende.montant; // Utilisez l'attribut 'montant' de l'amende pour les dépenses
    }
    for(const entretien of this.entretiens){
      const date = new Date(entretien.dateE);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      const key = `${month}-${year}`;
  
      if (!depensesByMonth[key]) {
        depensesByMonth[key] = 0;
      }
  
      depensesByMonth[key] +=entretien.montant
    }
  
    const chartDepensesElement = this.chartDepensesRef.nativeElement;
    if (chartDepensesElement) {
      echarts.dispose(chartDepensesElement);
      const chartDepenses = echarts.init(chartDepensesElement);
      chartDepenses.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: Object.keys(depensesByMonth),
          axisLabel: {
            fontSize: 10 // Set a smaller font size
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: function (value:any) {
              if (value >= 1000) {
                return value / 1000 + 'k'; // Display values in thousands (e.g., 1000 as 1k)
              } else {
                return value.toString();
              }
            }
          },
          axisPointer: {
            type: 'shadow'
          },
          splitLine: {
            show: true
          }
        },
        series: [{
          data: Object.values(depensesByMonth).map(value => ({ value })),
          type: 'line',
          name: 'Dépenses',
          
        }]
      });
    }
  }
}
