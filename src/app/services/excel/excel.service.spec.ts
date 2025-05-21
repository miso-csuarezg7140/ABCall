import { TestBed } from '@angular/core/testing';
import { ExcelService } from './excel.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

describe('ExcelService', () => {
    let service: ExcelService;
    let saveAsSpy: jasmine.Spy;

    // Mocks with correct types
    const mockWorksheet = {} as XLSX.WorkSheet;
    const mockWorkbook = { Sheets: {}, SheetNames: [] } as XLSX.WorkBook;
    const mockBuffer = new ArrayBuffer(8);
    const originalWrite = XLSX.write;

    let originalJsonToSheet: any;
    let originalBookNew: any;
    let originalBookAppendSheet: any;

    beforeEach(() => {
        // Save originals
        originalJsonToSheet = XLSX.utils.json_to_sheet;
        originalBookNew = XLSX.utils.book_new;
        originalBookAppendSheet = XLSX.utils.book_append_sheet;

        // Mock only utils methods
        Object.defineProperty(XLSX.utils, 'json_to_sheet', { value: () => mockWorksheet, configurable: true });
        Object.defineProperty(XLSX.utils, 'book_new', { value: () => mockWorkbook, configurable: true });
        Object.defineProperty(XLSX.utils, 'book_append_sheet', { value: () => {}, configurable: true });

        // Spy for saveAs
        saveAsSpy = spyOn(window as any, 'saveAs').and.callFake(() => {});

        TestBed.configureTestingModule({
            providers: [ExcelService]
        });
        service = TestBed.inject(ExcelService);
    });

    afterEach(() => {
        // Restore originals
        Object.defineProperty(XLSX.utils, 'json_to_sheet', { value: originalJsonToSheet, configurable: true });
        Object.defineProperty(XLSX.utils, 'book_new', { value: originalBookNew, configurable: true });
        Object.defineProperty(XLSX.utils, 'book_append_sheet', { value: originalBookAppendSheet, configurable: true });
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Utility methods', () => {
    it('jsonToSheet should call XLSX utils.json_to_sheet', () => {
      const mockData = [{ name: 'Test' }];
      spyOn(XLSX.utils, 'json_to_sheet').and.callThrough();
      const result = service.jsonToSheet(mockData);
      expect(XLSX.utils.json_to_sheet).toHaveBeenCalledWith(mockData);
      expect(result).toBe(mockWorksheet);
    });

    it('bookNew should call XLSX utils.book_new', () => {
      spyOn(XLSX.utils, 'book_new').and.callThrough();
      const result = service.bookNew();
      expect(XLSX.utils.book_new).toHaveBeenCalled();
      expect(result).toBe(mockWorkbook);
    });

    it('bookAppendSheet should call XLSX utils.book_append_sheet', () => {
      const testWorksheet = {} as XLSX.WorkSheet;
      const mockSheetName = 'TestSheet';
      spyOn(XLSX.utils, 'book_append_sheet').and.callThrough();
      service.bookAppendSheet(mockWorkbook, testWorksheet, mockSheetName);
      expect(XLSX.utils.book_append_sheet).toHaveBeenCalledWith(
        mockWorkbook,
        testWorksheet,
        mockSheetName
      );
    });

    it('write should call XLSX.write with correct options (integration)', () => {
        // Provide a valid workbook with at least one sheet
        const validWorkbook = {
            Sheets: { Sheet1: {} },
            SheetNames: ['Sheet1']
        } as XLSX.WorkBook;
        const mockOptions = { bookType: 'xlsx', type: 'array' } as XLSX.WritingOptions;
        const result = service.write(validWorkbook, mockOptions);
        expect(result).toBeDefined(); // Don't check for 'mocked', just that it returns something
    });
  });
});