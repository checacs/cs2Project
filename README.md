# CS2 Skins

Aplicación móvil híbrida para explorar el catálogo de **skins de Counter-Strike 2**, organizado por categorías de arma. Está construida con **Ionic 8 + Angular 20** (componentes *standalone*) y empaquetada para Android con **Capacitor 7**.

> Versión actual: **0.1.0**

---

## ✨ Funcionalidades

- **Pantalla de inicio con categorías**: Rifles, Pistolas, SMGs, Cuchillos, Guantes y Pesadas. Cada tarjeta abre la lista de skins de esa categoría.
- **Listado de skins por categoría** (`/categorias/:type`): imagen y nombre de cada skin, filtrados por la categoría que llega como parámetro de ruta.
- **Scroll infinito**: las skins se cargan de 20 en 20 para que la lista no se bloquee con miles de elementos.
- **Buscador en tiempo real**: filtra por nombre dentro de la categoría mientras escribes.
- **Ficha de detalle en modal**: imagen grande, nombre, tipo de arma y si admite StatTrak™.
- **Favoritos**: puedes añadir skins a una lista de favoritos desde el modal de detalle. La lista se guarda solo en memoria y se pierde al cerrar la app.
- **Avisos tipo *toast***: confirman la carga de una lista o que una skin se ha añadido a favoritos.
- **Menú lateral** y **botón flotante (FAB)** con enlaces a redes sociales de la comunidad de skins (TikTok, X, YouTube e Instagram).

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework UI | Ionic 8 (`@ionic/angular/standalone`) |
| Framework | Angular 20 (standalone components, control flow `@for` / `@if`, `inject()`) |
| Lenguaje | TypeScript 5.9 (modo `strict`) |
| Nativo | Capacitor 7 (Android, App, Haptics, Keyboard, StatusBar) |
| HTTP | `HttpClient` con `withFetch()` + RxJS |
| Iconos | Ionicons 7 |
| Calidad | ESLint (angular-eslint), Karma + Jasmine |

## 📡 Fuente de datos

Los datos de las skins se obtienen de la API pública y gratuita **[ByMykel/CSGO-API](https://github.com/ByMykel/CSGO-API)**:

```
https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json
```

Las interfaces TypeScript que modelan la respuesta (`Skins`, `Weapon`, `Category`, `Rarity`, `Wear`, `Collection`, `Crate`…) están en `src/app/common/interfaces.ts`.

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── common/
│   │   └── interfaces.ts          # Tipado de la respuesta de la API de skins
│   ├── components/
│   │   └── menu/                  # Menú lateral (ion-menu "menu-lateral")
│   ├── pages/
│   │   ├── inicio/                # Pantalla principal con las categorías
│   │   ├── categorias/            # Listado, búsqueda, scroll infinito y modal de detalle
│   │   ├── search-bar/            # Página de búsqueda
│   │   └── tabs/                  # Navegación por pestañas
│   ├── services/
│   │   ├── data-service.ts        # Llamadas a la API y gestión de favoritos
│   │   └── toast-service.ts       # Notificaciones toast reutilizables
│   ├── app.component.*            # Raíz: ion-app + menú + router-outlet
│   └── app.routes.ts              # Rutas con lazy loading (loadComponent)
├── assets/
│   └── images/                    # Imágenes de categorías, cabecera e iconos
└── main.ts                        # Bootstrap: Ionic, router y HttpClient
```

## 🧭 Rutas

| Ruta | Página | Descripción |
|---|---|---|
| `/` | — | Redirige a `/inicio` |
| `/inicio` | `InicioPage` | Selector de categorías |
| `/categorias/:type` | `CategoriasPage` | Skins de una categoría (`Rifles`, `Pistols`, `SMGs`, `Knives`, `Gloves`, `Heavy`) |
| `/search-bar` | `SearchBarPage` | Búsqueda |
| `/tabs/buscar` | `TabsPage` → `SearchBarPage` | Búsqueda dentro de la navegación por pestañas |

## 🚀 Puesta en marcha

### Requisitos

- Node.js 20 o superior y npm
- Ionic CLI: `npm install -g @ionic/cli`
- Para Android: Android Studio y el SDK de Android

### Instalación

```bash
git clone https://github.com/checacs/cs2Project.git
cd cs2Project
npm install
```

### Ejecutar en el navegador

```bash
ionic serve
# o bien
npm start
```

La app queda disponible en `http://localhost:8100` con `ionic serve`, o en `http://localhost:4200` con `npm start`.

### Compilar para Android

```bash
ionic build
npx cap add android      # solo la primera vez
npx cap sync android
npx cap open android     # abre el proyecto en Android Studio
```

### Otros scripts

| Comando | Acción |
|---|---|
| `npm run build` | Build de producción |
| `npm run watch` | Build en modo desarrollo con recompilación automática |
| `npm test` | Tests unitarios con Karma + Jasmine |
| `npm run lint` | Análisis estático con ESLint |

## 🗺️ Próximos pasos

- [ ] Página de **Favoritos** para consultar y eliminar las skins guardadas
- [ ] Guardar los favoritos de forma persistente (por ejemplo, con Capacitor Preferences)
- [ ] Mostrar más datos en el detalle: rareza (con su color), desgastes, colecciones y cajas
- [ ] Precios de mercado de las skins
- [ ] Tests unitarios de los servicios y las páginas

## 📸 Capturas

<!-- Añade aquí capturas de la app, por ejemplo: -->
<!-- ![Inicio](docs/inicio.png) ![Categoría](docs/categoria.png) ![Detalle](docs/detalle.png) -->

## ⚠️ Aviso

Proyecto personal sin ánimo de lucro, hecho con fines educativos. No está afiliado a Valve Corporation ni lo respalda. *Counter-Strike 2* y sus recursos son marcas registradas de Valve Corporation.

## 👤 Autor

**Jose Carlos Muñoz Ferrer** — [@checacs](https://github.com/checacs)
