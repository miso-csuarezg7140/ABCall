import { ResponseLoginClient } from './response-login-client';
import { LoginClient } from './login-client';

describe('ResponseLoginClient Interface', () => {
  
  it('should create an object that conforms to ResponseLoginClient interface', () => {
    // Arrange & Act
    const responseData: ResponseLoginClient = {
      statusCode: 200,
      statusDescription: 'Success',
      data: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        type: 'Bearer',
        refreshToken: 'abc123def456',
        expiresIn: 3600,
        roles: ['CLIENT', 'USER'],
        userType: 'CLIENT',
        clientId: 1234,
        documentNumber: '123456789',
        socialReason: 'Empresa ABC',
        email: 'cliente@empresa.com'
      }
    };

    // Assert
    expect(responseData).toBeDefined();
    expect(responseData.statusCode).toBe(200);
    expect(responseData.statusDescription).toBe('Success');
    expect(responseData.data).toBeDefined();
    expect(responseData.data.token).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
    expect(responseData.data.roles).toContain('CLIENT');
    expect(responseData.data.email).toBe('cliente@empresa.com');
  });

  it('should handle error response', () => {
    // Arrange & Act
    const errorResponse: ResponseLoginClient = {
      statusCode: 401,
      statusDescription: 'Unauthorized',
      data: {
        token: '',
        type: '',
        refreshToken: '',
        expiresIn: 0,
        roles: [],
        userType: '',
        clientId: 0,
        documentNumber: '',
        socialReason: '',
        email: ''
      }
    };

    // Assert
    expect(errorResponse).toBeDefined();
    expect(errorResponse.statusCode).toBe(401);
    expect(errorResponse.statusDescription).toBe('Unauthorized');
  });

  it('should be used in a function that processes authentication response', () => {
    // Arrange
    // Define tipos explícitos para mejorar la inferencia de tipos
    type SuccessResult = {
      isAuthenticated: true;
      token: string;
      clientInfo: {
        id: number;
        documentNumber: string;
        socialReason: string;
        email: string;
      };
      permissions: string[];
    };
    
    type FailureResult = {
      isAuthenticated: false;
      errorMessage: string;
    };
    
    type AuthResult = SuccessResult | FailureResult;
    
    const processLoginResponse = (response: ResponseLoginClient): AuthResult => {
      if (response.statusCode === 200) {
        return {
          isAuthenticated: true,
          token: response.data.token,
          clientInfo: {
            id: response.data.clientId,
            documentNumber: response.data.documentNumber,
            socialReason: response.data.socialReason,
            email: response.data.email
          },
          permissions: response.data.roles
        };
      } else {
        return {
          isAuthenticated: false,
          errorMessage: response.statusDescription
        };
      }
    };

    const successResponse: ResponseLoginClient = {
      statusCode: 200,
      statusDescription: 'Success',
      data: {
        token: 'validToken',
        type: 'Bearer',
        refreshToken: 'validRefresh',
        expiresIn: 3600,
        roles: ['CLIENT_ADMIN'],
        userType: 'CLIENT',
        clientId: 5678,
        documentNumber: '987654321',
        socialReason: 'Empresa XYZ',
        email: 'admin@xyz.com'
      }
    };

    const failedResponse: ResponseLoginClient = {
      statusCode: 401,
      statusDescription: 'Invalid credentials',
      data: {
        token: '',
        type: '',
        refreshToken: '',
        expiresIn: 0,
        roles: [],
        userType: '',
        clientId: 0,
        documentNumber: '',
        socialReason: '',
        email: ''
      }
    };

    // Act
    const successResult = processLoginResponse(successResponse);
    const failureResult = processLoginResponse(failedResponse);

    // Assert
    // Primero verificamos la propiedad isAuthenticated 
    expect(successResult.isAuthenticated).toBe(true);
    
    // Comprobación de tipo mediante discriminadores de unión
    if (successResult.isAuthenticated) {
      // Dentro de este bloque TypeScript sabe que successResult es de tipo SuccessResult
      expect(successResult.token).toBe('validToken');
      expect(successResult.clientInfo.id).toBe(5678);
      expect(successResult.clientInfo.documentNumber).toBe('987654321');
      expect(successResult.clientInfo.socialReason).toBe('Empresa XYZ');
      expect(successResult.clientInfo.email).toBe('admin@xyz.com');
      expect(successResult.permissions).toEqual(['CLIENT_ADMIN']);
    }

    expect(failureResult.isAuthenticated).toBe(false);
    // TypeScript puede inferir ahora que failureResult es de tipo FailureResult
    if (!failureResult.isAuthenticated) {
      expect(failureResult.errorMessage).toBe('Invalid credentials');
    }
  });

  it('should serialize and deserialize correctly to/from JSON', () => {
    // Arrange
    const originalResponse: ResponseLoginClient = {
      statusCode: 200,
      statusDescription: 'Success',
      data: {
        token: 'testToken',
        type: 'Bearer',
        refreshToken: 'testRefresh',
        expiresIn: 1800,
        roles: ['CLIENT'],
        userType: 'CLIENT',
        clientId: 9999,
        documentNumber: '111222333',
        socialReason: 'Cliente Test',
        email: 'test@cliente.com'
      }
    };

    // Act
    const jsonString = JSON.stringify(originalResponse);
    const parsedResponse = JSON.parse(jsonString) as ResponseLoginClient;

    // Assert
    expect(parsedResponse.statusCode).toBe(originalResponse.statusCode);
    expect(parsedResponse.statusDescription).toBe(originalResponse.statusDescription);
    expect(parsedResponse.data.token).toBe(originalResponse.data.token);
    expect(parsedResponse.data.roles).toEqual(originalResponse.data.roles);
    expect(parsedResponse.data.clientId).toBe(originalResponse.data.clientId);
    expect(parsedResponse.data.documentNumber).toBe(originalResponse.data.documentNumber);
    expect(parsedResponse.data.socialReason).toBe(originalResponse.data.socialReason);
    expect(parsedResponse.data.email).toBe(originalResponse.data.email);
  });

  it('should be used with login service correctly', () => {
    // Arrange - Simular el servicio de login que observamos en el workspace
    class MockLoginService {
      loginCliente(data: LoginClient) {
        // Solo para simular la estructura de retorno
        const mockResponse: ResponseLoginClient = {
          statusCode: 200,
          statusDescription: 'Success',
          data: {
            token: 'mock-token',
            type: 'Bearer',
            refreshToken: 'mock-refresh',
            expiresIn: 3600,
            roles: ['CLIENT'],
            userType: 'CLIENT',
            clientId: 1234,
            documentNumber: data.numeroDocumento,
            socialReason: 'Cliente Simulado',
            email: 'cliente@simulado.com'
          }
        };
        
        return {
          subscribe: (callbacks: any) => {
            callbacks(mockResponse);
            return { unsubscribe: () => {} };
          }
        };
      }
    }
    
    const loginService = new MockLoginService();
    const mockLoginData: LoginClient = {
      numeroDocumento: '123456789',
      contrasena: 'password123'
    };
    
    // Act & Assert
    loginService.loginCliente(mockLoginData).subscribe((response: ResponseLoginClient) => {
      expect(response.statusCode).toBe(200);
      expect(response.data.documentNumber).toBe(mockLoginData.numeroDocumento);
      expect(response.data.token).toBeTruthy();
    });
  });
});