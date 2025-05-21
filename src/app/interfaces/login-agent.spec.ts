import { LoginAgent } from './login-agent';

describe('LoginAgent Interface', () => {
  
  it('should create an object that conforms to LoginAgent interface', () => {
    // Arrange & Act
    const loginAgentData: LoginAgent = {
      tipoDocumento: 'CC',
      numeroDocumento: '123456789',
      contrasena: 'password123'
    };

    // Assert
    expect(loginAgentData).toBeDefined();
    expect(loginAgentData.tipoDocumento).toBe('CC');
    expect(loginAgentData.numeroDocumento).toBe('123456789');
    expect(loginAgentData.contrasena).toBe('password123');
  });

  it('should accept different types of documents', () => {
    // Arrange & Act
    const loginAgentWithCE: LoginAgent = {
      tipoDocumento: 'CE',
      numeroDocumento: '987654321',
      contrasena: 'password456'
    };
    
    const loginAgentWithPEP: LoginAgent = {
      tipoDocumento: 'PEP',
      numeroDocumento: '112233445',
      contrasena: 'password789'
    };

    // Assert
    expect(loginAgentWithCE.tipoDocumento).toBe('CE');
    expect(loginAgentWithPEP.tipoDocumento).toBe('PEP');
  });

  it('should validate properties exist in an object', () => {
    // Arrange
    const loginAgentData: LoginAgent = {
      tipoDocumento: 'CC',
      numeroDocumento: '123456789',
      contrasena: 'password123'
    };
    
    // Act & Assert
    expect('tipoDocumento' in loginAgentData).toBe(true);
    expect('numeroDocumento' in loginAgentData).toBe(true);
    expect('contrasena' in loginAgentData).toBe(true);
  });
  
  it('should use LoginAgent in a function that expects that interface', () => {
    // Arrange
    function validateLoginAgentData(data: LoginAgent): boolean {
      return Boolean(
        data.tipoDocumento && 
        data.numeroDocumento && 
        data.contrasena &&
        data.contrasena.length >= 8
      );
    }
    
    const validLoginData: LoginAgent = {
      tipoDocumento: 'CC',
      numeroDocumento: '123456789',
      contrasena: 'password123'
    };
    
    const invalidLoginData: LoginAgent = {
      tipoDocumento: 'CC',
      numeroDocumento: '123456789',
      contrasena: '123'
    };
    
    // Act & Assert
    expect(validateLoginAgentData(validLoginData)).toBe(true);
    expect(validateLoginAgentData(invalidLoginData)).toBe(false);
  });
  
  it('should create LoginAgent object from JSON', () => {
    // Arrange
    const jsonData = '{"tipoDocumento":"CC","numeroDocumento":"123456789","contrasena":"password123"}';
    
    // Act
    const loginAgentData = JSON.parse(jsonData) as LoginAgent;
    
    // Assert
    expect(loginAgentData.tipoDocumento).toBe('CC');
    expect(loginAgentData.numeroDocumento).toBe('123456789');
    expect(loginAgentData.contrasena).toBe('password123');
  });
  
  it('should serialize LoginAgent object to JSON', () => {
    // Arrange
    const loginAgentData: LoginAgent = {
      tipoDocumento: 'CC',
      numeroDocumento: '123456789',
      contrasena: 'password123'
    };
    
    // Act
    const jsonString = JSON.stringify(loginAgentData);
    
    // Assert
    expect(jsonString).toBe('{"tipoDocumento":"CC","numeroDocumento":"123456789","contrasena":"password123"}');
  });
});