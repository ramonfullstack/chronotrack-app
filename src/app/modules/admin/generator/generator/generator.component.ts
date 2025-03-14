import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GeneratorService } from '../generator.service';
import { ExtraHours } from '../model/ExtrahoursModel';

@Component({
  selector: 'app-statement',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss'],
})
export class GeneratorComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'id',
    'idUser',
    'dayOfWeek',
    'hoursWorked',
    'totalValueEarnedDay',
    'created',
  ];
  dataSource = new MatTableDataSource<ExtraHours>();
  extraHours: ExtraHours = {
    id: 0,
    idUser: 0,
    hoursWorked: 0,
    baseRateDay: 0,
    valueHourBase: 0,
    totalValueEarnedDay: 0,
    dayOfWeek: '',
    created: new Date(),
    updated: new Date(),
    dateSelected: new Date(),
  };

  daysOfWeek: string[] = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userId: number;

  constructor(private service: GeneratorService, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.getUserIdFromLocalStorage();
    this.setDefaultDayOfWeek();
    this.getListExtraHours();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  setDefaultDayOfWeek() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Domingo) até 6 (Sábado)
    this.extraHours.dayOfWeek = this.daysOfWeek[dayOfWeek]; // Define o dia atual
  }

  addCalculo() {
    this.extraHours.idUser = this.userId;
    console.log('extra hours: ' + this.extraHours);
    this.service.saveHourInDatabase(this.extraHours).subscribe(
      (res) => {
        console.log('Hora extra salva com sucesso:', res);
      },
      (error) => {
        console.error('Erro ao salvar hora extra:', error);
      }
    );

    this.extraHours = {
      id: 0,
      idUser: 0,
      hoursWorked: 0,
      baseRateDay: 0,
      valueHourBase: 0,
      totalValueEarnedDay: 0,
      dayOfWeek: '',
      created: new Date(),
      updated: new Date(),
      dateSelected:  new Date(), 
    };

    this.getListExtraHours();

  }

  onDateChange(event: any) {
    const selectedDate = event.value;
    const dayOfWeek = selectedDate.getDay();
    this.extraHours.dayOfWeek = this.daysOfWeek[dayOfWeek];
  }


  getUserIdFromLocalStorage(): void {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = parseInt(storedUserId, 10);
    } else {
      console.error('userId não encontrado no localStorage');
    }
  }

  calcularHoraTotal() {
    if (
      this.extraHours.hoursWorked &&
      this.extraHours.valueHourBase &&
      this.extraHours.baseRateDay
    ) {
      const totalValor =
        this.extraHours.hoursWorked *
        this.extraHours.baseRateDay *
        this.extraHours.valueHourBase;
      this.extraHours.totalValueEarnedDay = totalValor;
    }
  }

  loadFictitiousData() {
    const fictitiousData = this.service.getFictitiousData();
    this.dataSource.data = fictitiousData;
  }

  getListExtraHours(): void {
    if (this.userId) {
      this.service.getHoursByUser(this.userId).subscribe(
        (data) => {
          if (data && Array.isArray(data)) {
            this.dataSource.data = data;
            this.cdRef.detectChanges();
            console.log('Horas extras carregadas:', data);
          } else {
            console.error('Dados de horas extras inválidos', data);
          }
        },
        (error) => {
          console.error('Erro ao carregar as horas extras', error);
        }
      );
    } else {
      console.error('ID do usuário não encontrado');
    }
  }

  exportarPraCsv() {
    console.log('Exportando csv');
    console.log('userId: ' + this.userId);

    // Verifica se o userId está definido antes de chamar o serviço
    if (this.userId) {
      this.service.downloadSalesReport(this.userId).subscribe({
        next: (blob: Blob) => {
          // Cria um link de download e força o download do arquivo CSV
          const a = document.createElement('a');
          const url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = 'ExtraHoursReport.csv';  // Nome do arquivo CSV
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        },
        error: (err) => {
          console.error('Erro ao exportar o CSV', err);
          // Pode adicionar um alerta ou mensagem de erro para o usuário
        }
      });
    } else {
      console.error('userId não definido');
    }
  }
  
  convertToCSV(data: any[]): string {
    const header = Object.keys(data[0]).join(',') + '\n'; // Cabeçalho
    const rows = data.map((row) => Object.values(row).join(',')).join('\n'); // Dados
    return header + rows;
  }
  
  formatDate(date: any): string {
    // Formata a data para um formato legível (exemplo: dd/MM/yyyy HH:mm)
    const formattedDate = new Date(date);
    const day = String(formattedDate.getDate()).padStart(2, '0');
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0'); // Meses começam de 0
    const year = formattedDate.getFullYear();
    const hours = String(formattedDate.getHours()).padStart(2, '0');
    const minutes = String(formattedDate.getMinutes()).padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
  
  downloadCSV(csvString: string) {
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ExtraHours_${new Date().toISOString()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
