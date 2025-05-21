import { ResponseRegister } from './response-register';
import { Register } from './register';

describe('ResponseRegister Interface', () => {
  
  it('should be used in a function that processes register response', () => {
    // Arrange
    // Definir tipos específicos para hacer el código más robusto
    type SuccessResult = {
      success: true;
      message: string;
      registeredUsers: Array<{
        documento: string;
        empresa: string;
      }>;
    };
    
    type WarningResult = {
      success: false;
      warning: true;
      message: string;
    };
    
    type ErrorResult = {
      success: false;
      message: string;
      warning?: false;
    };
    
    type ProcessResult = SuccessResult | WarningResult | ErrorResult;
    
    const processRegisterResponse = (response: ResponseRegister): ProcessResult => {
      if (response.statusCode === 200) {
        return {
          success: true,
          message: 'Registro exitoso',
          registeredUsers: response.data.map((user: Register) => ({
            documento: user.numeroDocumento,
            empresa: user.razonSocial
          }))
        };
      } else if (response.statusCode === 206) {
        return {
          success: false,
          warning: true,
          message: 'Registro con advertencias: ' + response.statusDescription
        };
      } else {
        return {
          success: false,
          message: 'Error: ' + response.statusDescription
        };
      }
    };

    const successResponse: ResponseRegister = {
      statusCode: 200,
      statusDescription: 'Success',
      data: [
        {
          numeroDocumento: '123456789',
          razonSocial: 'Empresa ABC',
          correo: 'contacto@empresa.com',
          contrasena: 'password123'
        }
      ]
    };

    const warningResponse: ResponseRegister = {
      statusCode: 206,
      statusDescription: 'Error de negocio.',
      data: []
    };

    const errorResponse: ResponseRegister = {
      statusCode: 400,
      statusDescription: 'Bad Request',
      data: []
    };

    // Act
    const successResult = processRegisterResponse(successResponse);
    const warningResult = processRegisterResponse(warningResponse);
    const errorResult = processRegisterResponse(errorResponse);

    // Assert
    expect(successResult.success).toBe(true);
    
    // Usar el type guard para asegurar que TypeScript entienda el tipo correcto
    if (successResult.success) {
      // Ahora TypeScript sabe que successResult es de tipo SuccessResult
      expect(successResult.message).toBe('Registro exitoso');
      expect(successResult.registeredUsers.length).toBe(1);
      expect(successResult.registeredUsers[0].documento).toBe('123456789');
      expect(successResult.registeredUsers[0].empresa).toBe('Empresa ABC');
    }

    expect(warningResult.success).toBe(false);
    if ('warning' in warningResult && warningResult.warning) {
      expect(warningResult.message).toContain('Registro con advertencias');
    }

    expect(errorResult.success).toBe(false);
    if (!('warning' in errorResult) || !errorResult.warning) {
      expect(errorResult.message).toContain('Error: Bad Request');
    }
  });
});