import { Incident } from './incident.model';

describe('Incident Model', () => {
  
  it('should create an Incident object with all required properties', () => {
    const incident: Incident = {
      id: 1,
      tipoDocumentoUsuario: 'CC',
      numDocumentoUsuario: 123456789,
      numDocumentoCliente: 987654321,
      descripcion: 'Descripción del incidente',
      solucionado: false,
      solucionId: null,
      solucionadoPor: null,
      fechaSolucion: null,
      estado: 'ACTIVO',
      creadoPor: 'Usuario1',
      fechaCreacion: '2023-05-20T10:30:00',
      modificadoPor: null,
      fechaModificacion: null
    };

    expect(incident).toBeTruthy();
    expect(incident.id).toBe(1);
    expect(incident.tipoDocumentoUsuario).toBe('CC');
    expect(incident.numDocumentoUsuario).toBe(123456789);
    expect(incident.numDocumentoCliente).toBe(987654321);
    expect(incident.descripcion).toBe('Descripción del incidente');
    expect(incident.solucionado).toBe(false);
    expect(incident.estado).toBe('ACTIVO');
    expect(incident.creadoPor).toBe('Usuario1');
    expect(incident.fechaCreacion).toBe('2023-05-20T10:30:00');
  });

  it('should create an Incident object with solved status', () => {
    const solvedIncident: Incident = {
      id: 2,
      tipoDocumentoUsuario: 'CE',
      numDocumentoUsuario: 123456789,
      numDocumentoCliente: 987654321,
      descripcion: 'Incidente resuelto',
      solucionado: true,
      solucionId: 5,
      solucionadoPor: 'Técnico1',
      fechaSolucion: '2023-05-21T15:45:00',
      estado: 'INACTIVO',
      creadoPor: 'Usuario2',
      fechaCreacion: '2023-05-20T09:00:00',
      modificadoPor: 'Técnico1',
      fechaModificacion: '2023-05-21T15:45:00'
    };

    expect(solvedIncident).toBeTruthy();
    expect(solvedIncident.solucionado).toBe(true);
    expect(solvedIncident.solucionId).toBe(5);
    expect(solvedIncident.solucionadoPor).toBe('Técnico1');
    expect(solvedIncident.fechaSolucion).toBe('2023-05-21T15:45:00');
    expect(solvedIncident.estado).toBe('INACTIVO');
    expect(solvedIncident.modificadoPor).toBe('Técnico1');
    expect(solvedIncident.fechaModificacion).toBe('2023-05-21T15:45:00');
  });

  it('should handle incident creation with minimum required fields', () => {
    // Define la función que crea un incidente con validaciones
    const createIncident = (data: Partial<Incident>): Incident | Error => {
      const requiredFields = ['id', 'tipoDocumentoUsuario', 'numDocumentoUsuario', 
                             'numDocumentoCliente', 'descripcion', 'estado', 'creadoPor'];
      
      for (const field of requiredFields) {
        if (!(field in data)) {
          return new Error(`El campo '${field}' es obligatorio`);
        }
      }
      
      // Valores por defecto para campos opcionales
      const incident: Incident = {
        id: data.id as number,
        tipoDocumentoUsuario: data.tipoDocumentoUsuario as string,
        numDocumentoUsuario: data.numDocumentoUsuario as number,
        numDocumentoCliente: data.numDocumentoCliente as number,
        descripcion: data.descripcion as string,
        solucionado: data.solucionado ?? false,
        solucionId: data.solucionId ?? null,
        solucionadoPor: data.solucionadoPor ?? null,
        fechaSolucion: data.fechaSolucion ?? null,
        estado: data.estado as string,
        creadoPor: data.creadoPor as string,
        fechaCreacion: data.fechaCreacion || new Date().toISOString(),
        modificadoPor: data.modificadoPor ?? null,
        fechaModificacion: data.fechaModificacion ?? null
      };
      
      return incident;
    };

    // Caso de éxito
    const result1 = createIncident({
      id: 3,
      tipoDocumentoUsuario: 'CC',
      numDocumentoUsuario: 123456789,
      numDocumentoCliente: 987654321,
      descripcion: 'Nueva descripción',
      estado: 'ACTIVO',
      creadoPor: 'Usuario3'
    });

    expect(result1 instanceof Error).toBe(false);
    if (!(result1 instanceof Error)) {
      expect(result1.id).toBe(3);
      expect(result1.solucionado).toBe(false); // Valor por defecto
      expect(result1.solucionId).toBeNull(); // Valor por defecto
    }

    // Caso de error: falta un campo obligatorio
    const result2 = createIncident({
      id: 4,
      tipoDocumentoUsuario: 'CC',
      // Falta numDocumentoUsuario
      numDocumentoCliente: 987654321,
      descripcion: 'Descripción incompleta',
      estado: 'ACTIVO',
      creadoPor: 'Usuario4'
    });

    expect(result2 instanceof Error).toBe(true);
    if (result2 instanceof Error) {
      expect(result2.message).toContain('numDocumentoUsuario');
    }
  });

  it('should validate state values are correct', () => {
    // Función para validar estado
    const validateIncidentState = (incident: Incident): boolean => {
      const validStates = ['ACTIVO', 'INACTIVO'];
      return validStates.includes(incident.estado);
    };

    const validIncident: Incident = {
      id: 5,
      tipoDocumentoUsuario: 'CC',
      numDocumentoUsuario: 123456789,
      numDocumentoCliente: 987654321,
      descripcion: 'Incidente con estado válido',
      solucionado: false,
      solucionId: null,
      solucionadoPor: null,
      fechaSolucion: null,
      estado: 'ACTIVO',
      creadoPor: 'Usuario5',
      fechaCreacion: '2023-05-20T10:30:00',
      modificadoPor: null,
      fechaModificacion: null
    };

    const invalidIncident: Incident = {
      ...validIncident,
      id: 6,
      estado: 'PENDIENTE' as any // Estado inválido
    };

    expect(validateIncidentState(validIncident)).toBe(true);
    expect(validateIncidentState(invalidIncident)).toBe(false);
  });
});