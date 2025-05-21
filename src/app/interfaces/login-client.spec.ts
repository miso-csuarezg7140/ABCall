import { LoginClient } from './login-client';

describe('LoginClient Interface', () => {
  
  it('should create an object that conforms to LoginClient interface', () => {
    // Arrange & Act
    const loginClientData: LoginClient = {
      numeroDocumento: '123456789',
      contrasena: 'password123'
    };

    // Assert
    expect(loginClientData).toBeDefined();
    expect(loginClientData.numeroDocumento).toBe('123456789');
    expect(loginClientData.contrasena).toBe('password123');
  });

  it('should validate properties exist in an object', () => {
    // Arrange
    const loginClientData: LoginClient = {
      numeroDocumento: '123456789',
      contrasena: 'password123'
    };
    
    // Act & Assert
    expect('numeroDocumento' in loginClientData).toBe(true);
    expect('contrasena' in loginClientData).toBe(true);
  });

  it('should use LoginClient in a function that expects that interface', () => {
    // Arrange
    function validateLoginClientData(data: LoginClient): boolean {
      return Boolean(
        data.numeroDocumento && 
        data.contrasena &&
        data.contrasena.length >= 8
      );
    }
    
    const validLoginData: LoginClient = {
      numeroDocumento: '123456789',
      contrasena: 'password123'
    };
    
    const invalidLoginData: LoginClient = {
      numeroDocumento: '123456789',
      contrasena: '123'
    };
    
    // Act & Assert
    expect(validateLoginClientData(validLoginData)).toBe(true);
    expect(validateLoginClientData(invalidLoginData)).toBe(false);
  });
  
  it('should create LoginClient object from JSON', () => {
    // Arrange
    const jsonData = '{"numeroDocumento":"123456789","contrasena":"password123"}';
    
    // Act
    const loginClientData = JSON.parse(jsonData) as LoginClient;
    
    // Assert
    expect(loginClientData.numeroDocumento).toBe('123456789');
    expect(loginClientData.contrasena).toBe('password123');
  });
  
  it('should serialize LoginClient object to JSON', () => {
    // Arrange
    const loginClientData: LoginClient = {
      numeroDocumento: '123456789',
      contrasena: 'password123'
    };
    
    // Act
    const jsonString = JSON.stringify(loginClientData);
    
    // Assert
    expect(jsonString).toBe('{"numeroDocumento":"123456789","contrasena":"password123"}');
  });
  
  it('should handle empty or invalid values', () => {
    // Arrange
    function isValidLogin(login: LoginClient): boolean {
      return (
        !!login.numeroDocumento && 
        login.numeroDocumento.trim().length > 0 &&
        !!login.contrasena && 
        login.contrasena.trim().length > 0
      );
    }
    
    const emptyLogin: LoginClient = {
      numeroDocumento: '',
      contrasena: ''
    };
    
    const validLogin: LoginClient = {
      numeroDocumento: '123456789',
      contrasena: 'password123'
    };
    
    // Act & Assert
    expect(isValidLogin(emptyLogin)).toBe(false);
    expect(isValidLogin(validLogin)).toBe(true);
  });
});