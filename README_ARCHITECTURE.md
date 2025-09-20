## Mobile Architecture (Expo + React Native)

Esta app sigue MVC a nivel de feature y separación tipo Clean Architecture. La UI es tonta, la lógica de negocio vive en el backend (Python/Django) y la app móvil orquesta casos de uso y repositorios.

### Estructura de carpetas

```
src/
  application/
    di/                      # Factories y wiring de dependencias
    usecases/                # Casos de uso de aplicación
  domain/                    # Contratos livianos (tipos, interfaces)
    entities/                # Tipos/DTOs (sin reglas)
    repositories/            # Interfaces de acceso a datos
    services/                # Servicios de aplicación (sin reglas de dominio)
  section/
    <section>/
      controllers/           # Hooks/controladores (estado + efectos)
      views/                 # Views sin lógica (solo props)
      widgets/               # Componentes UI de la sección
  infra/
    http/                    # Cliente API, interceptores, errores
    repositories/
      http/                  # Implementaciones de repositorios (HTTP)
  ui/
    styles/                  # Hojas de estilo por view
    theme/                   # tokens.ts (colors, spacing, radii, typography)
```

### Principios
- Views: presentacionales, sin `useState`/`useEffect`.
- Controladores: orquestan estado/UI y disparan casos de uso.
- Casos de uso: encapsulan llamadas a servicios/repositorios y representan objetivos de aplicación.
- Repositorios: interfaces en `domain/`, implementaciones en `infra/` consumiendo el backend.
- Dominio en mobile: solo contratos/tipos. LAS REGLAS viven en el backend.

### Estilos y tema
- Usa `src/ui/theme/tokens.ts` para colores, spacing, radii, typography.
- Cada view tiene su hoja en `src/ui/styles/<ViewName>.styles.ts`.

### Separación del backend (Python/Django)
- Modelos/entidades con reglas, servicios de negocio y evaluaciones se implementan en un proyecto aparte (Django), idealmente dockerizado.
- Mobile NO duplica reglas; solo orquesta input → caso de uso → backend → render.
- Recomendación: versionar API y publicar contratos (OpenAPI/JSON Schema) para tipado fuerte.

### Convenciones
- Nombres: componentes `PascalCase`, hooks `useX`, casos de uso `<Verb><Noun>UseCase` con método `run()`.
- Errores de red: mapear a `ApiError` en infraestructura.
- Inyección de dependencias: factories en `application/di`.

### Cómo crear una nueva feature
1. Estructura MVC:
```
src/section/MySection/
  controllers/useMySectionController.ts
  views/MySectionView.tsx
  widgets/
```
2. Estilos y tokens:
```
src/ui/styles/MyFeatureView.styles.ts
```
3. Contratos (si faltan):
```
src/domain/entities/MyEntity.ts
src/domain/repositories/MyEntityRepository.ts
```
4. Implementación HTTP del repositorio:
```
src/infra/repositories/http/HttpMyEntityRepository.ts
```
5. Caso de uso y wiring en controlador:
```
src/application/usecases/DoMyThing.ts
src/application/di/container.ts
```

### Ejemplo existente: Búsqueda
- Contratos: `SearchRepository`, `SearchQuery`.
- Implementación HTTP: `HttpSearchRepository`.
- Caso de uso: `ExecuteSearchUseCase`.
- Controlador: en `handleSubmit` invoca `useCase.run(query)`.

### Configuración de API
- Base URL vía `process.env.EXPO_PUBLIC_API_BASE_URL`.
- Fallback por defecto: `http://localhost:8000/api`.

### Testing rápido
- `npm run start` para Expo.
- `npx tsc --noEmit` para type-check.

### Áreas futuras (productos financieros)
- En Django: `CreditApplication`, `Customer`, `Scoring`, `Offer`, `RepaymentPlan`.
- En mobile: repositorios HTTP y casos de uso `Submit/Evaluate/Approve/Generate/Track`.


