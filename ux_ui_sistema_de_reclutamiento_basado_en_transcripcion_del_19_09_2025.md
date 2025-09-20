# Descripción UX/UI para Mockups – Sistema de Reclutamiento

> Alcance: sólo frontal (frontend). Sin detalles de backend, base de datos ni infraestructura. Todo lo aquí descrito se basa en los puntos planteados por **Javier** y en las **solicitudes de Gloria y Jorge** en la transcripción.

---

## 1) Arquitectura de navegación (a alto nivel)
- **Inicio / Dashboard**
  - Vistas rápidas por **Puestos activos** (15–20/mes), **Clientes**, **Estado del pipeline** y **Alertas** (SLA, pendientes).
  - KPIs visibles: *candidatos nuevos hoy/semana, tiempo promedio por etapa, % aptos, entrevistas agendadas*, fuentes (LinkedIn, Bumeran, Indeed, Facebook, referidos).
  - Atajos: “Crear puesto”, “Publicar”, “Cargar candidatos”, “Generar informe al cliente”.
- **Puestos (lista)**
  - Tabla/kanban de **puestos** con filtros por cliente, seniority, estado (abierto, en shortlist, cubierto, cancelado).
  - Cada fila muestra: nombre del puesto, cliente, responsable, fecha de apertura, SLAs, candidatos en cada etapa.
- **Detalle de Puesto / Pipeline**
  - Vista **kanban por etapas** (ver §2) + pestañas: *Candidatos, Publicaciones, Pruebas, Entrevistas, Informes, Actividad*.
- **Candidatos (explorar BD)**
  - Explorador de base de talento con **facetas** (carrera, skills, años de experiencia, ubicación, fuente, estado). Guardado de búsquedas.
- **Calendario**
  - Agenda integrada (semanal/diaria) para entrevistas internas y con cliente; vista equipo.
- **Informes**
  - Generador de shortlist y reportes al cliente (plantillas, branding, exportar a Google Doc/PDF).
- **Configuración**
  - **Plantillas de puestos** (campos críticos/deseables), **Formularios de postulación**, **Roles & permisos**, **Integraciones**.

---

## 2) Pipeline/Embudo estándar (etapas y UI)
> Según lo discutido: **postulación → filtros iniciales → pruebas → entrevista interna → entrevista con cliente → decisión/envío de informe**.

**Vista Kanban** (arrastrar/soltar tarjetas):
1. **Postulados**
   - Origen visible (LinkedIn/Bumeran/Indeed/Facebook/Referido/Manual). Badge de fecha de llegada.
   - Acciones: *Abrir perfil*, *Enviar primer contacto (WhatsApp/Email)*, *Mover a Filtro*.
2. **Filtro estructurado** (formulario “declaración jurada”)
   - Validación de **criterios críticos** vs **deseables** definidos en el puesto.
   - Tarjetas con **Match %**, checklist de criterios, avisos de inconsistencias.
3. **Filtro CV/IA (opcional)**
   - Resumen IA del CV (gaps vs perfil). *Cuidado visual* indicando que es apoyo; decisión humana final.
4. **Pruebas**
   - Asignación a **plataformas de evaluación** (psicométricas/técnicas). Estado: *pendiente, en curso, completada*. Puntajes/gráficos.
5. **Entrevista interna**
   - Botón **“Agendar”** (selector de slots tipo Calendly). Registro de notas y adjuntos.
   - Opción **“Grabar/Transcribir”** (si se usa Zoom/Teams): contenedor de transcript y **respuestas clave**.
6. **Entrevista con cliente**
   - Agenda compartida con el cliente; confirmaciones y recordatorios.
   - Campo **“Feedback del cliente”** (rápido: apto/duda/no apto + comentario).
7. **Informe / Envío al cliente**
   - Constructor de **shortlist**: arrastrar candidatos, ordenar, toggles de secciones (perfil, pruebas, resumen, riesgos).
   - **Plantilla** (logo del cliente, portada, índice). Botón **“Generar en Google Doc/PDF”** y **“Marcar como enviado”**.
8. **Cierre** (cubierto / no cubierto)
   - Registro de motivo, tiempo total, fuente ganadora.

**Elementos comunes de tarjeta de candidato**:
- Foto/Iniciales, nombre, **Match %**, años de experiencia, carrera, skills clave, **fuente**, estado de pruebas, próximos pasos, **responsable**.
- Chips de **crítico/deseable** (verde/ámbar/rojo). Botones: *Ver perfil*, *Agendar*, *Enviar al cliente*, *Descartar* (con razones).

---

## 3) Perfil de Candidato (pestañas)
- **Resumen**
  - Encabezado con Match %, estado, puesto asociado y responsable.
  - “Semáforo” por criterio crítico/deseable; **alertas de gaps**.
- **Formulario/Declaración**
  - Respuestas estructuradas del candidato (fecha, disponibilidad, expectativas, requisitos legales). Aceptación de veracidad.
- **CV**
  - Visor del archivo y extracto parseado (educación, experiencia, logros).
- **Evaluaciones**
  - Resultados y gráficos (percentiles, cortes). Links al detalle en la plataforma.
- **Entrevistas**
  - Agenda, notas, registro (opcional) y **transcripción** con buscador; marcador de preguntas clave.
- **Historial & Actividad**
  - Línea de tiempo: contactos, cambios de etapa, comentarios de equipo/cliente.
- **Documentos**
  - CVs, certificados; arrastrar/soltar.
- **Comunicación** (opcional)
  - Integración con WhatsApp Web/email (deep links) o **módulo interno** de mensajes (si se habilita).
- **Acciones rápidas**
  - *Programar prueba*, *Agendar entrevista*, *Enviar al cliente*, *Generar ficha*, *Etiquetar*.

---

## 4) Publicación y Postulación (front)
- **Publicar puesto**
  - Form de creación con **campos críticos** (obligatorios) y **deseables** (peso configurable). Guardar como **plantilla** por familia de puestos.
  - Botones: *Publicar en bolsas* (LinkedIn, Bumeran, Indeed, Facebook) + *Generar landing* con **formulario de postulación**.
- **Landing/Formulario para postulantes**
  - Diseño simple/responsivo. Subida de CV, campos estructurados, casilla de **declaración jurada** y consentimiento de datos.
  - Confirmación visual y email automático.

---

## 5) Calendario y Agenda
- Vista semanal/diaria del equipo con filtros por reclutador/cliente.
- **Selector de slots** para enviar link al candidato (estilo Calendly).
- Confirmaciones, recordatorios y **estado** (confirmada, reagendada, no-show).

---

## 6) Informes al Cliente (reportería en Google)
- **Constructor de shortlist** con vista previa de la plantilla.
- Campos editables: resumen, fortalezas, riesgos, resultados de pruebas, comentarios del equipo.
- **Exportar a Google Doc** (y PDF), guardar en carpeta del cliente; **tracking de envío**.

---

## 7) Roles y Permisos (frontal)
- **Perfiles sugeridos**: *Reclutador*, *Coordinación*, *Evaluador (psico/técnico)*, *Gerencia*, *Cliente (lectura/feedback)*.
- Cada rol con vistas/acciones delimitadas (p.ej., el cliente sólo ve shortlist y deja feedback).

---

## 8) Fuentes y Trazabilidad
- Mostrar y filtrar por **fuente** (LinkedIn/Bumeran/Indeed/Facebook/Referido/Manual).
- Métrica por fuente en Dashboard y en cada puesto.

---

## 9) Notificaciones y estados vacíos
- **Centro de notificaciones** (tareas asignadas, candidatos con 48h sin movimiento, pruebas vencidas).
- **Estados vacíos** con copia guía (qué hacer) y accesos directos.

---

## 10) Accesibilidad, Responsive e Idioma
- Diseño responsive (lista/panel divididos colapsables).
- Atajos de teclado básicos (abrir perfil, mover etapa, buscar).
- Español como idioma base (microcopys claros y consistentes).

---

## 11) Integraciones (nivel UI)
- **Google Workspace**: abrir/guardar informes en Google Drive/Docs.
- **Reuniones**: Zoom/Teams (botones de “Unirse”, “Ver transcripción” si existe).
- **Mensajería**: Deep links a WhatsApp Web y correo; **módulo interno opcional** (tipo Slack/Discord) si se prioriza centralizar comunicación.

---

## 12) Consideraciones planteadas por los participantes
- **De Javier**
  - Forzar un **formato único** de postulación para mejorar filtrado y crear base de datos.
  - **Dos enfoques de filtro**: estructurado (más robusto/barato) y apoyo IA sobre CV (resumen/gaps).
  - **Pruebas** automáticas por tipo de puesto; **calendario** para entrevistas; opción de **transcripción** y resumen de entrevistas.
  - **Generador de informes** semi-automatizado con revisión humana antes de enviar al cliente.
  - **Varios pipelines** (un embudo por puesto) y trazabilidad por **fuente**.
- **De Gloria**
  - Optimizar tiempos en filtros y seguimiento; **reportería en Google**; mantener/crear **base de datos** propia.
  - Soportar **15–20 puestos/mes** y crear parámetros/plantillas por puesto.
  - Resumen claro “**apto/no apto**” y por qué (criterios críticos/deseables).
- **De Jorge**
  - Uso vía **navegador (Chrome)**, en la **nube**, con buena conexión.
  - Posible **módulo de comunicación** integrado (opcional) o uso de integraciones.

---

## 13) Componentes UI clave (para el diseño)
- **Header** con búsqueda global y conmutador de organización/cliente.
- **Sidebar**: Inicio, Puestos, Candidatos, Calendario, Informes, Configuración.
- **Kanban** de pipeline con tarjetas ricas y acciones rápidas.
- **Panels** deslizables (drawer) para ver/editar candidato sin salir del kanban.
- **Form builder** (de puesto y de postulación) con campos “crítico/deseable”.
- **Score chips** (Match %, badges de fuente, estado de pruebas).
- **Modal de agenda** (selector de slots + envío de invitación).
- **Wizard de Informe** (selección de candidatos → previsualización → exportación Google Doc/PDF).
- **Centro de notificaciones** con filtros y acciones.

---

## 14) Microcopys sugeridos
- Botones: *Crear puesto*, *Publicar*, *Invitar a prueba*, *Agendar*, *Enviar al cliente*, *Generar informe*, *Marcar como enviado*.
- Estados: *Pendiente de prueba*, *Esperando transcripción*, *Feedback del cliente requerido*, *SLA por vencer*.
- Vacíos: “Aún no hay candidatos en esta etapa. **Publica** el puesto o **importa** candidatos”.

---

## 15) Priorización de MVP (sólo frontal)
1) **Kanban de pipeline** + **Perfil de candidato** + **Form de postulación**
2) **Agenda** (slots) + **Asignación de pruebas**
3) **Informes al cliente en Google Doc/PDF**
4) **Explorador de candidatos** (BD) + **Dashboard básico**
5) **Integraciones de mensajería** (deep links) y **módulo interno** (opcional)

> Con esto puedes diseñar los **mockups** de cada pantalla/flujo priorizado y sus componentes. Si quieres, puedo convertir esta descripción en un **mapa de pantallas** con wireframes de baja fidelidad a partir de aquí.

