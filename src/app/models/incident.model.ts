export interface Incident {
  id: number;
  tipoDocumentoUsuario: string;
  numDocumentoUsuario: number;
  numDocumentoCliente: number;
  descripcion: string;
  solucionado: boolean;
  solucionId: number | null;
  solucionadoPor: string | null;
  fechaSolucion: string | null;
  estado: string;
  creadoPor: string;
  fechaCreacion: string;
  modificadoPor: string | null;
  fechaModificacion: string | null;
}
