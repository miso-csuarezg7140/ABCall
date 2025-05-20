// Importar manualmente los archivos que quieres incluir en la cobertura
// Enfoque simple que funciona en todas las versiones de Angular

// Servicios
import './app/services/register-client/register-client.service';
import './app/services/incident/incident.service';
import './app/services/client/client.service';
import './app/services/login/login.service';

// Interfaces
import './app/interfaces/login-agent';
import './app/interfaces/login-client';
import './app/interfaces/register';
import './app/interfaces/response-login-agent';
import './app/interfaces/response-login-client';
import './app/interfaces/response-register';

// Componentes
import './app/components/client-detail/client-detail.component';
import './app/components/db-query/db-query.component';
import './app/components/footer/footer.component';
import './app/components/header/header.component';
import './app/components/home/home.component';
import './app/components/incident/incident.component';
import './app/components/incident-detail/incident-detail.component';
import './app/components/login/login.component';
import './app/components/membership/membership.component';
import './app/components/plans/plans.component';
import './app/components/register-client/register-client.component';
import './app/components/register-incident/register-incident.component';

// Modelos
import './app/models/incident.model';
import './app/models/cliente.models';

// Modulos
import './app/app-routing.module';
import './app/app.module';
import './app/modules/auth/auth.module';
import './app/modules/membership/membership.module';

// Interceptores

// Esto es necesario para que el archivo se trate como un módulo
export {};