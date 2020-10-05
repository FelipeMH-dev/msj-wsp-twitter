# msj-wsp-twitter
Prototipo recolector de mensajes en tiempo real de wsp y twitter


# Software requerido
* Nodejs
* Mongodb
* ngrok (en desarrollo, necesitas tener ngrok.exe en la carpeta de tu proyecto). 
Twilio necesita un dominio para llegar a nuestro servidor, es por ello que se necesita de ngrok.

  Pasos:
  - Ejecuta ngrok con el siguiente comando: .\ngrok http 3000
  - Copia la direccion que te entrega ngrok, ejemplo: https://4cbd1a02638f.ngrok.io
  - Recuerda que estara activa durante 8 horas
  - Ingresa a https://www.twilio.com/console/sms/whatsapp/sandbox  
  - Copia la direccion en WHEN A MESSAGE COMES IN y agrega /sms
  - Deberia quedar asi:  https://4cbd1a02638f.ngrok.io/sms


# Variables de entorno para Twilio
Debes copias ACCOUNT SID y AUTH TOKEN de la consola https://www.twilio.com/console y generar un archivo .env en tu proyecto, agregas:

* TWILIO_ACCOUNT_SID
* TWILIO_AUTH_TOKEN
* PHONE_NUMBER (recibes un numero compartido el cual es +14155238886)
* PORT (optional)

# Credenciales para utlizar  API Twitter
Necesitaras crear una cuenta de desarrollador en https://developer.twitter.com/en/apply-for-access tendras que esperar
a que twitter valide tu cuenta.
Crea un proyecto y luego obtienes la API KEY, APY KEY SECRET, ACCESS TOKEN & ACCESS TOKEN SECRET.
Esta credenciales las utilizas en el archivo socket.js


# Recursos útiles
* ngrok
* [Solicitar Msj de wsp entrante de Twilio](https://www.twilio.com/docs/sms/twiml#twilios-request-to-your-application)
* https://www.twilio.com/docs/usage/webhooks/sms-webhooks


Se tomo como comienzo el prototipo de aplicación de mensajeria de FAZT https://www.youtube.com/watch?v=sw3CPCRk-XE 
vayan a darle LIKE ;)
