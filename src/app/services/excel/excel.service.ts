// Sugerencia de ruta: src/app/services/excel/excel.service.ts
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  /**
   * Genera un archivo Excel a partir de un array de datos y lo descarga.
   * @param data Los datos a incluir en la hoja de Excel.
   * @param fileName El nombre del archivo a descargar (ej. 'reporte.xlsx').
   * @param sheetName El nombre de la hoja dentro del libro de Excel (ej. 'Datos').
   */
  generateExcel(data: any[], fileName: string, sheetName: string = 'Data'): void {
    try {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const workbook: XLSX.WorkBook = { Sheets: { [sheetName]: worksheet }, SheetNames: [sheetName] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveExcelFile(excelBuffer, fileName);
    } catch (error) {
      console.error('Error generating Excel file:', error);
      // Podrías lanzar el error o manejarlo de otra forma (ej. mostrar un Swal)
      throw error; 
    }
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: 'application/octet-stream'});
    saveAs(data, fileName);
  }

  // Métodos individuales si prefieres más granularidad (opcional)
  jsonToSheet(data: any[]): XLSX.WorkSheet {
    return XLSX.utils.json_to_sheet(data);
  }

  bookNew(): XLSX.WorkBook {
    return XLSX.utils.book_new();
  }

  bookAppendSheet(workbook: XLSX.WorkBook, worksheet: XLSX.WorkSheet, sheetName: string): void {
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  }

  write(workbook: XLSX.WorkBook, options: XLSX.WritingOptions): any {
    return XLSX.write(workbook, options);
  }
}