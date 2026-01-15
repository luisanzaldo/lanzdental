import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const privacyContent = `
**Fecha de última actualización:** Enero 2026

---

### IDENTIDAD Y DOMICILIO DEL RESPONSABLE

**Lanz Dental**, con domicilio en Av. Insurgentes Sur 1337-301, Insurgentes Mixcoac, Benito Juárez, C.P. 03920, Ciudad de México, es el responsable del tratamiento de sus datos personales.

---

### FINALIDADES DEL TRATAMIENTO DE DATOS PERSONALES

Sus datos personales serán utilizados para las siguientes finalidades primarias y necesarias:

- Integración y actualización de su expediente clínico odontológico
- Identificación y contacto con el paciente
- Programación y seguimiento de citas
- Prestación de servicios odontológicos solicitados
- Elaboración de diagnósticos, tratamientos y planes de atención dental
- Facturación y cobranza de servicios prestados
- Comunicación de resultados de estudios y tratamientos
- Atención de quejas, sugerencias y aclaraciones

De manera adicional, sus datos personales podrán ser utilizados para las siguientes finalidades secundarias:

- Envío de recordatorios de citas y seguimiento de tratamientos
- Información sobre nuevos servicios, promociones y campañas de salud bucal
- Evaluación de la calidad de nuestros servicios
- Estudios de mercado y estadísticos

Si usted no desea que sus datos personales sean tratados para las finalidades secundarias, puede manifestarlo enviando un correo electrónico a: contacto@lanzdental.com o comunicándolo directamente en nuestras instalaciones.

---

### DATOS PERSONALES QUE SE RECABAN

Para las finalidades señaladas, podemos recabar los siguientes datos personales:

**Datos de identificación y contacto:**
- Nombre completo
- Fecha de nacimiento
- Edad
- Sexo
- Domicilio
- Teléfono fijo y/o celular
- Correo electrónico
- RFC (en caso de requerir factura)

**Datos sobre salud:**
- Historial clínico odontológico
- Antecedentes médicos generales y heredofamiliares
- Alergias y reacciones adversas a medicamentos
- Enfermedades crónicas o padecimientos actuales
- Medicamentos que consume actualmente
- Estudios de laboratorio y radiografías dentales
- Diagnósticos y tratamientos odontológicos
- Fotografías clínicas intraorales y extraorales (cuando sea necesario para el tratamiento)

**Datos financieros:**
- Información de pago y facturación

---

### TRANSFERENCIA DE DATOS PERSONALES

Sus datos personales podrán ser transferidos a:

- Laboratorios dentales para la elaboración de prótesis, aparatos ortodónticos y otros trabajos protésicos
- Instituciones de salud o médicos especialistas cuando sea necesaria una interconsulta
- Compañías aseguradoras en caso de que usted cuente con seguro dental
- Autoridades competentes cuando sea requerido por ley

Estas transferencias son necesarias para la prestación del servicio odontológico solicitado. No se requiere su consentimiento para estas transferencias, sin embargo, si usted no está de acuerdo, puede manifestarlo en cualquier momento.

No se realizarán transferencias adicionales de sus datos personales, salvo aquellas que sean necesarias para atender requerimientos de información de una autoridad competente debidamente fundados y motivados.

---

### DERECHOS ARCO

Usted tiene derecho a:

- **Acceder** a sus datos personales que poseemos y a los detalles del tratamiento de los mismos
- **Rectificar** sus datos personales en caso de ser inexactos o incompletos
- **Cancelar** sus datos personales cuando considere que no se requieren para alguna de las finalidades señaladas, estén siendo utilizados para finalidades no consentidas o haya finalizado la relación contractual o de servicio
- **Oponerse** al tratamiento de sus datos personales para fines específicos

Para ejercer cualquiera de estos derechos (Derechos ARCO), deberá presentar una solicitud por escrito en nuestro domicilio o al correo electrónico: contacto@lanzdental.com, proporcionando la siguiente información:

- Nombre completo del titular
- Domicilio o correo electrónico para recibir notificaciones
- Documentos que acrediten su identidad (INE, pasaporte o documento equivalente)
- Descripción clara del derecho que desea ejercer
- Documentos o información que facilite la localización de sus datos personales

Daremos respuesta a su solicitud en un plazo máximo de 20 días hábiles, contados desde la fecha en que se recibió. En caso de que la solicitud sea procedente, se hará efectiva dentro de los 15 días hábiles siguientes a la fecha en que se comunique la respuesta.

---

### REVOCACIÓN DEL CONSENTIMIENTO

Usted puede revocar el consentimiento que nos ha otorgado para el tratamiento de sus datos personales en cualquier momento, mediante el mismo procedimiento establecido para el ejercicio de los Derechos ARCO.

Es importante señalar que no en todos los casos podremos atender su solicitud o concluir de inmediato el uso de sus datos, ya que es posible que por alguna obligación legal o para el cumplimiento de obligaciones derivadas de la relación jurídica entre usted y Lanz Dental, requiramos seguir tratando sus datos.

---

### LIMITACIÓN DE USO Y DIVULGACIÓN DE DATOS

Si desea limitar el uso o divulgación de sus datos personales, específicamente para finalidades secundarias como promociones y recordatorios, puede solicitarlo mediante escrito dirigido a nuestro domicilio o al correo: contacto@lanzdental.com.

---

### USO DE COOKIES Y WEB BEACONS

En caso de que Lanz Dental cuente con sitio web, le informamos que no utilizamos cookies, web beacons u otras tecnologías de rastreo en nuestro sitio de internet.

---

### MEDIDAS DE SEGURIDAD

Lanz Dental ha implementado medidas de seguridad administrativas, técnicas y físicas para proteger sus datos personales contra daño, pérdida, alteración, destrucción o uso, acceso o tratamiento no autorizado.

El acceso a sus datos personales está restringido únicamente al personal autorizado que requiera consultarlos para el desempeño de sus funciones.

---

### MODIFICACIONES AL AVISO DE PRIVACIDAD

Nos reservamos el derecho de efectuar modificaciones o actualizaciones al presente Aviso de Privacidad en cualquier momento, para la atención de novedades legislativas, políticas internas o nuevos requerimientos para la prestación de nuestros servicios.

Estas modificaciones estarán disponibles en nuestras instalaciones y, en su caso, en nuestro sitio web. La fecha de la última actualización se indicará al inicio de este documento.

---

### DATOS DE CONTACTO

Para cualquier duda, comentario o aclaración sobre el presente Aviso de Privacidad, puede contactarnos en:

**Domicilio:** Av. Insurgentes Sur 1337-301, Insurgentes Mixcoac, Benito Juárez, C.P. 03920, Ciudad de México

**Teléfono:** 55 2775 1104

**Correo electrónico:** contacto@lanzdental.com

**Horario de atención:** 9:00 am - 7:00 pm

---

### CONSENTIMIENTO

Al proporcionar sus datos personales, usted otorga su consentimiento para que Lanz Dental trate sus datos personales conforme a lo establecido en este Aviso de Privacidad y en términos de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
`;

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ background: '#f8faff', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="privacy-card"
                >
                    <div className="privacy-markdown">
                        <h1 style={{ fontSize: '3.5rem', fontFamily: "'Montserrat', sans-serif", color: '#0077b6', fontWeight: 900, textAlign: 'center', marginBottom: '10px' }}>AVISO DE PRIVACIDAD</h1>
                        <div style={{ width: '80px', height: '6px', background: 'linear-gradient(90deg, #0077b6, #0096c7)', margin: '20px auto 40px', borderRadius: '3px' }}></div>
                        <ReactMarkdown>{privacyContent}</ReactMarkdown>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
