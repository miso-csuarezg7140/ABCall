import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Incident {
    id: number;
    title: string;
    description: string;
    status: string;
    history: string;
    imageUrl: string;
}

@Injectable({
    providedIn: 'root'
})
export class IncidentsService {

    constructor() { }

    getIncidents(): Observable<Incident[]> {
        const incidents: Incident[] = [
            {
                id: 1,
                title: 'Incidente 1',
                description: 'Descripción del incidente registrado...',
                status: 'Registrado',
                history: 'Recién recibido',
                imageUrl: 'https://via.placeholder.com/300'
            },
            {
                id: 2,
                title: 'Incidente 2',
                description: 'Descripción del incidente en curso...',
                status: 'En curso',
                history: 'Recién recibido',
                imageUrl: 'https://via.placeholder.com/300'
            },
            {
                id: 3,
                title: 'Incidente 3',
                description: 'Descripción del incidente en curso...',
                status: 'En curso',
                history: 'Recién recibido',
                imageUrl: 'https://via.placeholder.com/300'
            },
            {
                id: 4,
                title: 'Incidente 4',
                description: 'Descripción del incidente registrado...',
                status: 'Registrado',
                history: 'Recién recibido',
                imageUrl: 'https://via.placeholder.com/300'
            }
        ];
        return of(incidents);
    }
}
