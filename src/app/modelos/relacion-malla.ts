import { CicloMalla } from "./ciclo-malla";
import { CursoMalla } from "./curso-malla";

export interface RelacionMalla {
    ciclo: CicloMalla;
    cursos: CursoMalla[];
}
