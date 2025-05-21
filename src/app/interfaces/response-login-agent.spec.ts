import { ResponseLoginAgent } from './response-login-agent';
import { LoginAgent } from './login-agent';

describe('ResponseLoginAgent Interface', () => {
  
  it('should create an object that conforms to ResponseLoginAgent interface', () => {
    // Arrange & Act
    const responseData: ResponseLoginAgent = {
      statusCode: 200,
      statusDescription: 'Success',
      data: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        type: 'Bearer',
        refreshToken: 'abc123def456',
        expiresIn: 3600,
        roles: ['AGENT', 'SUPPORT'],
        userType: 'AGENT',
        documentNumber: '123456789',
        documentType: 1,
        names: 'Juan',
        surnames: 'Pérez'
      }
    };

    // Assert
    expect(responseData).toBeDefined();
    expect(responseData.statusCode).toBe(200);
    expect(responseData.statusDescription).toBe('Success');
    expect(responseData.data).toBeDefined();
    expect(responseData.data.token).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
    expect(responseData.data.roles).toContain('AGENT');
    expect(responseData.data.names).toBe('Juan');
  });

  it('should handle error response', () => {
    // Arrange & Act
    const errorResponse: ResponseLoginAgent = {
      statusCode: 401,
      statusDescription: 'Unauthorized',
      data: {
        token: '',
        type: '',
        refreshToken: '',
        expiresIn: 0,
        roles: [],
        userType: '',
        documentNumber: '',
        documentType: 0,
        names: '',
        surnames: ''
      }
    };

    // Assert
    expect(errorResponse).toBeDefined();
    expect(errorResponse.statusCode).toBe(401);
    expect(errorResponse.statusDescription).toBe('Unauthorized');
  });

  it('should support type checking with TypeScript', () => {
    // Este test verifica que TypeScript puede inferir correctamente los tipos
    
    // Arrange
    const mockResponse: ResponseLoginAgent = {
      statusCode: 200,
      statusDescription: 'Success',
      data: {
        token: 'token123',
        type: 'Bearer',
        refreshToken: 'refresh123',
        expiresIn: 3600,
        roles: ['ROLE1', 'ROLE2'],
        userType: 'AGENT',
        documentNumber: '123456789',
        documentType: 1,
        names: 'Juan',
        surnames: 'Pérez'
      }
    };
    
    // Act
    const extractTokenInfo = (response: ResponseLoginAgent) => {
      return {
        token: response.data.token,
        expiresIn: response.data.expiresIn,
        roles: response.data.roles
      };
    };
    
    const tokenInfo = extractTokenInfo(mockResponse);
    
    // Assert
    expect(tokenInfo.token).toBe('token123');
    expect(tokenInfo.expiresIn).toBe(3600);
    expect(tokenInfo.roles).toEqual(['ROLE1', 'ROLE2']);
  });

  it('should be used in a function that processes authentication response', () => {
  // Arrange
  // Define tipos explícitos para mejorar la inferencia de tipos
  type SuccessResult = {
    isAuthenticated: true;
    token: string;
    userName: string;
    documentInfo: {
      type: number;
      number: string;
    };
    permissions: string[];
  };
  
  type FailureResult = {
    isAuthenticated: false;
    errorMessage: string;
  };
  
  type LoginResult = SuccessResult | FailureResult;
  
  const processLoginResponse = (response: ResponseLoginAgent): LoginResult => {
    if (response.statusCode === 200) {
      return {
        isAuthenticated: true,
        token: response.data.token,
        userName: `${response.data.names} ${response.data.surnames}`,
        documentInfo: {
          type: response.data.documentType,
          number: response.data.documentNumber
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

  const successResponse: ResponseLoginAgent = {
    statusCode: 200,
    statusDescription: 'Success',
    data: {
      token: 'validToken',
      type: 'Bearer',
      refreshToken: 'validRefresh',
      expiresIn: 3600,
      roles: ['AGENT_ADMIN'],
      userType: 'AGENT',
      documentNumber: '123456789',
      documentType: 1,
      names: 'Juan',
      surnames: 'Pérez'
    }
  };

  const failedResponse: ResponseLoginAgent = {
    statusCode: 401,
    statusDescription: 'Invalid credentials',
    data: {
      token: '',
      type: '',
      refreshToken: '',
      expiresIn: 0,
      roles: [],
      userType: '',
      documentNumber: '',
      documentType: 0,
      names: '',
      surnames: ''
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
    expect(successResult.userName).toBe('Juan Pérez');
    expect(successResult.documentInfo.number).toBe('123456789');
    expect(successResult.permissions).toEqual(['AGENT_ADMIN']);
  }

  expect(failureResult.isAuthenticated).toBe(false);
  // TypeScript puede inferir ahora que failureResult es de tipo FailureResult
  if (!failureResult.isAuthenticated) {
    expect(failureResult.errorMessage).toBe('Invalid credentials');
  }
});

  it('should serialize and deserialize correctly to/from JSON', () => {
    // Arrange
    const originalResponse: ResponseLoginAgent = {
      statusCode: 200,
      statusDescription: 'Success',
      data: {
        token: 'testToken',
        type: 'Bearer',
        refreshToken: 'testRefresh',
        expiresIn: 1800,
        roles: ['SUPERVISOR'],
        userType: 'AGENT',
        documentNumber: '987654321',
        documentType: 2,
        names: 'María',
        surnames: 'González'
      }
    };

    // Act
    const jsonString = JSON.stringify(originalResponse);
    const parsedResponse = JSON.parse(jsonString) as ResponseLoginAgent;

    // Assert
    expect(parsedResponse.statusCode).toBe(originalResponse.statusCode);
    expect(parsedResponse.statusDescription).toBe(originalResponse.statusDescription);
    expect(parsedResponse.data.token).toBe(originalResponse.data.token);
    expect(parsedResponse.data.roles).toEqual(originalResponse.data.roles);
    expect(parsedResponse.data.names).toBe(originalResponse.data.names);
    expect(parsedResponse.data.surnames).toBe(originalResponse.data.surnames);
  });
});