Reglas para Desarrollo Web Frontend
## Siempre Hacer Primero
- ﻿**Invocar la skill ui-ux-pro-max** antes de escribir cualquier código frontend, cada sesión, sin excepciones.
- ﻿**Invocar la skill frontend-design** después de ui-ux-pro-max, cada sesión, sin excepciones.
## Imágenes de Referencia
- ﻿﻿Si se proporciona una imagen de referencia: igualar exactamente el layout, espaciado, tipografía y calores. Usar contenido placeholder (imágenes via https://placehold.co/, texto genérico). No mejorar ni agregar al diseño.
- ﻿﻿Si no hay imagen de referencia: diseñar desde cero con alto nivel de calidad (ver
- guardrails abajo).
## Servidor Local
- ﻿﻿**Siempre servir en localhost** - nunca abrir directamente el archivo HTML.
- ﻿﻿Iniciar el servidor con: node serve.mjs en la raíz del proyecto.
- ﻿﻿Esto levanta el proyecto en http://localhost:3000
- ﻿﻿Si el servidor ya está corriendo, no iniciar una segunda instancia.
- ﻿﻿En Windows: correr el comando en PowerShell o CMD desde la carpeta del proyecto.

## Salidas por Defecto
- ﻿﻿Un solo archivo index.html con todos los estilos inline, a menos que el usuario indique lo contrario.
- ﻿﻿Tailwind CSS via CDN: < script src="https://cdn.tailwindcss.com></script>
- ﻿﻿Imágenes placeholder: https://placehold.co/ANCHOxALTO
- ﻿Mabile-first responsive

## Assets de Marca
- ﻿﻿Siempre revisar la carpeta brand_assets/ antes de diseñar. Puede contener logos, guías de color, guías de estilo o imágenes.
- ﻿﻿Si existen assets, usarlos. No usar placeholders donde haya assets reales disponibles.
- ﻿﻿Si hay un logo, usarlo. Si hay una paleta de colores definida, usar esos valores exactos - no inventar colores de marca.

## Guardrails Anti-Genérico
- ﻿**Colores:** Nunca usar la paleta por defecto de Tailwind (indigo-500, blue-600, etc.). Elegir un color de marca personalizado y derivar desde ahí.
- ﻿**Sombras:** Nunca usar shadow-md plano. Usar sombras en capas, teñidas de color con opacidad baja.
- ﻿**Tipografía:** Nunca usar la misma fuente para títulos y cuerpo. Combinar una display/serif con una sans limpia. Aplicar tracking ajustado (-0.03em') en titulos grandes, line-height generoso (1.7) en cuerpo.
_**Gradientes:** Capas múltiples de gradientes radiales. Agregar grano/textura via filtro SVG noise para profundidad.
- ﻿**Animaciones:** Solo animar transform y opacity. Nunca transition-all. Usar easing estilo spring.
- ﻿**Estados interactivos:** Cada elemento clickeable necesita estados hover, focus-visible y active. Sin excepciones.
_**|mágenes:** Agregar overlay de gradiente (bg-gradient-to-t from-black/60") y una capa de tratamiento de color con mix-biend-multiply.
_**Espaciado:** Usar tokens de espaciado intencionales y consistentes — no pasos
aleatorios de Tailwind.
-**Profundidad:** Las superficies deben tener un sistera de capas (base → elevado
→ flotante), no todas al mismo nivel z.

## Reglas Duras
- No agregar secciones, funcionalidades o contenido que no esté en la referencia
- No "mejorar" un diseño de referencia - igualario
- No usar transition-all
- No usar azul/indigo por defecto de Tailwind como color
