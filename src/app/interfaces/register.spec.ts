import { Register } from './register';

describe('Register Interface', () => {
  
  it('should create an object that conforms to Register interface', () => {
    // Arrange & Act
    const registerData: Register = {
      numeroDocumento: '123456789',
      razonSocial: 'Empresa ABC',
      correo: 'contacto@empresa.com',
      contrasena: 'password123'
    };

    // Assert
    expect(registerData).toBeDefined();
    expect(registerData.numeroDocumento).toBe('123456789');
    expect(registerData.razonSocial).toBe('Empresa ABC');
    expect(registerData.correo).toBe('contacto@empresa.com');
    expect(registerData.contrasena).toBe('password123');
  });

  it('should validate properties exist in an object', () => {
    // Arrange
    const registerData: Register = {
      numeroDocumento: '123456789',
      razonSocial: 'Empresa ABC',
      correo: 'contacto@empresa.com',
      contrasena: 'password123'
    };
    
    // Act & Assert
    expect('numeroDocumento' in registerData).toBe(true);
    expect('razonSocial' in registerData).toBe(true);
    expect('correo' in registerData).toBe(true);
    expect('contrasena' in registerData).toBe(true);
  });

  it('should use Register in a function that expects that interface', () => {
    // Arrange
    function validateRegisterData(data: Register): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      return Boolean(
        data.numeroDocumento && 
        data.numeroDocumento.trim().length > 0 &&
        data.razonSocial && 
        data.razonSocial.trim().length > 0 &&
        data.correo && 
        emailRegex.test(data.correo) &&
        data.contrasena && 
        data.contrasena.length >= 8
      );
    }
    
    const validRegisterData: Register = {
      numeroDocumento: '123456789',
      razonSocial: 'Empresa ABC',
      correo: 'contacto@empresa.com',
      contrasena: 'password123'
    };
    
    const invalidRegisterData: Register = {
      numeroDocumento: '123456789',
      razonSocial: 'Empresa ABC',
      correo: 'correo-invalido',
      contrasena: 'pass' // contraseña demasiado corta
    };
    
    // Act & Assert
    expect(validateRegisterData(validRegisterData)).toBe(true);
    expect(validateRegisterData(invalidRegisterData)).toBe(false);
  });
  
  it('should create Register object from JSON', () => {
    // Arrange
    const jsonData = '{"numeroDocumento":"123456789","razonSocial":"Empresa ABC","correo":"contacto@empresa.com","contrasena":"password123"}';
    
    // Act
    const registerData = JSON.parse(jsonData) as Register;
    
    // Assert
    expect(registerData.numeroDocumento).toBe('123456789');
    expect(registerData.razonSocial).toBe('Empresa ABC');
    expect(registerData.correo).toBe('contacto@empresa.com');
    expect(registerData.contrasena).toBe('password123');
  });
  
  it('should serialize Register object to JSON', () => {
    // Arrange
    const registerData: Register = {
      numeroDocumento: '123456789',
      razonSocial: 'Empresa ABC',
      correo: 'contacto@empresa.com',
      contrasena: 'password123'
    };
    
    // Act
    const jsonString = JSON.stringify(registerData);
    
    // Assert
    expect(jsonString).toBe('{"numeroDocumento":"123456789","razonSocial":"Empresa ABC","correo":"contacto@empresa.com","contrasena":"password123"}');
  });
  
  it('should handle empty or invalid values in validation', () => {
    // Arrange
    function isValidRegister(register: Register): { valid: boolean, errors: string[] } {
      const errors: string[] = [];
      
      if (!register.numeroDocumento || register.numeroDocumento.trim().length === 0) {
        errors.push('El número de documento es requerido');
      }
      
      if (!register.razonSocial || register.razonSocial.trim().length === 0) {
        errors.push('La razón social es requerida');
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!register.correo || !emailRegex.test(register.correo)) {
        errors.push('El correo electrónico no es válido');
      }
      
      if (!register.contrasena || register.contrasena.length < 8) {
        errors.push('La contraseña debe tener al menos 8 caracteres');
      }
      
      return {
        valid: errors.length === 0,
        errors
      };
    }
    
    const validRegister: Register = {
      numeroDocumento: '123456789',
      razonSocial: 'Empresa ABC',
      correo: 'contacto@empresa.com',
      contrasena: 'password123'
    };
    
    const emptyRegister: Register = {
      numeroDocumento: '',
      razonSocial: '',
      correo: '',
      contrasena: ''
    };
    
    // Act
    const validResult = isValidRegister(validRegister);
    const invalidResult = isValidRegister(emptyRegister);
    
    // Assert
    expect(validResult.valid).toBe(true);
    expect(validResult.errors.length).toBe(0);
    
    expect(invalidResult.valid).toBe(false);
    expect(invalidResult.errors.length).toBe(4);
  });
});