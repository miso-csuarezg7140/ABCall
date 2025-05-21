import { Client } from './client.models';

describe('Client Model', () => {
  
  it('should create a Client object with all required properties', () => {
    const client: Client = {
      tipoDocumentoUsuario: 'CC',
      numDocumentoUsuario: 123456789,
      numDocumentoCliente: 987654321,
      descripcion: 'Cliente corporativo'
    };

    expect(client).toBeTruthy();
    expect(client.tipoDocumentoUsuario).toBe('CC');
    expect(client.numDocumentoUsuario).toBe(123456789);
    expect(client.numDocumentoCliente).toBe(987654321);
    expect(client.descripcion).toBe('Cliente corporativo');
  });

  it('should create a Client with different document types', () => {
    const clientWithCE: Client = {
      tipoDocumentoUsuario: 'CE',
      numDocumentoUsuario: 234567890,
      numDocumentoCliente: 567890123,
      descripcion: 'Cliente con cédula de extranjería'
    };

    expect(clientWithCE).toBeTruthy();
    expect(clientWithCE.tipoDocumentoUsuario).toBe('CE');
  });

  it('should validate client object against interface structure', () => {
    // Una función de validación que podría usarse en la aplicación
    const validateClientStructure = (obj: any): boolean => {
      return (
        typeof obj.tipoDocumentoUsuario === 'string' &&
        typeof obj.numDocumentoUsuario === 'number' &&
        typeof obj.numDocumentoCliente === 'number' &&
        typeof obj.descripcion === 'string'
      );
    };

    // Objeto válido
    const validClient: Client = {
      tipoDocumentoUsuario: 'TI',
      numDocumentoUsuario: 345678901,
      numDocumentoCliente: 901234567,
      descripcion: 'Cliente con tarjeta de identidad'
    };

    // Objeto inválido (tipos incorrectos)
    const invalidClient = {
      tipoDocumentoUsuario: 123, // Debería ser string
      numDocumentoUsuario: '456789012', // Debería ser number
      numDocumentoCliente: 123456789,
      descripcion: 'Cliente con datos incorrectos'
    };

    expect(validateClientStructure(validClient)).toBe(true);
    expect(validateClientStructure(invalidClient)).toBe(false);
  });

  it('should handle client creation with factory function', () => {
    // Una función factoría que podría utilizarse para crear clientes
    const createClient = (
      tipoDocumento: string,
      numDocumentoUsuario: number,
      numDocumentoCliente: number,
      descripcion: string
    ): Client => {
      return {
        tipoDocumentoUsuario: tipoDocumento,
        numDocumentoUsuario,
        numDocumentoCliente,
        descripcion
      };
    };

    const client = createClient(
      'PEP',
      567890123,
      234567890,
      'Cliente con permiso especial de permanencia'
    );

    expect(client).toBeTruthy();
    expect(client.tipoDocumentoUsuario).toBe('PEP');
    expect(client.numDocumentoUsuario).toBe(567890123);
    expect(client.numDocumentoCliente).toBe(234567890);
    expect(client.descripcion).toBe('Cliente con permiso especial de permanencia');
  });

  it('should compare two client objects correctly', () => {
    const client1: Client = {
      tipoDocumentoUsuario: 'CC',
      numDocumentoUsuario: 123456789,
      numDocumentoCliente: 987654321,
      descripcion: 'Cliente uno'
    };

    const client2: Client = {
      tipoDocumentoUsuario: 'CC',
      numDocumentoUsuario: 123456789,
      numDocumentoCliente: 987654321,
      descripcion: 'Cliente uno'
    };

    const client3: Client = {
      tipoDocumentoUsuario: 'CC',
      numDocumentoUsuario: 123456789,
      numDocumentoCliente: 111222333,
      descripcion: 'Cliente diferente'
    };

    // Comparar los objetos
    expect(JSON.stringify(client1)).toEqual(JSON.stringify(client2)); // Deberían ser iguales
    expect(JSON.stringify(client1)).not.toEqual(JSON.stringify(client3)); // Deberían ser diferentes
  });
});