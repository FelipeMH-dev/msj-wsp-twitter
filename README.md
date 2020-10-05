# msj-wsp-twitter
Prototipo recolector de mensajes en tiempo real de WHATSAPP y TWITTER

Falta o por hacer:
- Pintar los mensajes de Twitter en tiempo real, ya que solo los recibe y almacena en base de datos y los muestra al hacer un reload de pagina.
- Guardar mensajes favoritos
- Crear una vista donde se podra visualizar los mensajes favoritos




# Software requerido
* Nodejs
* Mongodb
* ngrok (en desarrollo, necesitas tener ngrok.exe en la carpeta de tu proyecto). 
Twilio necesita un dominio para llegar a nuestro servidor, es por ello que se necesita de ngrok.

  Pasos:
  - Ejecuta ngrok con el siguiente comando: .\ngrok http 3000 (tienes que cambiar el puerto 3000 en caso que estes utilizando otro)
  - Copia la direccion que te entrega ngrok, ejemplo: https://4cbd1a02638f.ngrok.io
  - Recuerda que estara activa durante 8 horas
  - CONFIGURA TU NUMERO DE WHATSAPP en https://www.twilio.com/console/sms/whatsapp/learn te pediran enviar un mensaje predeterminado (join sound-inch por ejemplo)
    a un numero (este es si no lo cambian -> +141552388) luego de completar el procedimiento...
  - Ingresa a https://www.twilio.com/console/sms/whatsapp/sandbox  
  - Copia la direccion en WHEN A MESSAGE COMES IN y agrega /sms
  - Deberia quedar asi:  https://4cbd1a02638f.ngrok.io/sms

# Variables de entorno para Twilio

Debes copiar ACCOUNT SID y AUTH TOKEN de la consola https://www.twilio.com/console y luego debes generar un archivo .env en tu proyecto, agregas:

* TWILIO_ACCOUNT_SID = ACCOUNT SID
* TWILIO_AUTH_TOKEN = AUTH TOKEN 
* PHONE_NUMBER = (recibes un numero compartido el cual es +14155238886)
* PORT (optional)

# Credenciales para utilizar  API Twitter
Necesitaras crear una cuenta de desarrollador en https://developer.twitter.com/en/apply-for-access tendras que esperar
a que twitter valide tu cuenta.
Cuando tengas acceso a tu cuenta de desarrollador crea un proyecto y luego obtienes la API KEY, APY KEY SECRET, ACCESS TOKEN & ACCESS TOKEN SECRET.
Estas credenciales las utilizas en el archivo socket.js


# Recursos útiles
* ngrok
* [Solicitar Msj de wsp entrante de Twilio](https://www.twilio.com/docs/sms/twiml#twilios-request-to-your-application)
* https://www.twilio.com/docs/usage/webhooks/sms-webhooks


Se tomo como comienzo el prototipo de aplicación de mensajeria de FAZT https://www.youtube.com/watch?v=sw3CPCRk-XE ASI QUE VEANLO PARA QUE ENTIENDAN DE UNA MEJOR MANERA
ALGUNAS PROCEDIMIENTOS Y vayan a darle LIKE ;).
Para comunicarse conmigo enviar email a mansillafelipe1993@gmail.com
