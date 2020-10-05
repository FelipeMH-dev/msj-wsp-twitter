# msj-wsp-twitter
Prototipo recolector de mensajes en tiempo real de wsp y twitter


# Software requerido
* Nodejs
* Mongodb
* ngrok (en desarrollo). Twilio necesita un dominio para llegar a nuestro servidor, es por ello que se necesita de ngrok.
  Pasos:
  - Ejecuta ngrok con el siguiente comando : .\ngrok http 3000
  - Copia la direccion que te entrega ngrok, ejemplo : https://4cbd1a02638f.ngrok.io
  - Recuerda que estara activa durante 8 horas
  - Ingresa a https://www.twilio.com/console/sms/whatsapp/sandbox  
  - Copia la direccion en WHEN A MESSAGE COMES IN y agrega /sms
  - Deberia quedar asi  https://4cbd1a02638f.ngrok.io/sms

# Variables de entorno
* TWILIO_ACCOUNT_SID
* TWILIO_AUTH_TOKEN
* PHONE_NUMBER
* PORT (optional)

# Recursos útiles
* ngrok
* [Solicitar Msj de wsp entrante de Twilio](https://www.twilio.com/docs/sms/twiml#twilios-request-to-your-application)
* https://www.twilio.com/docs/usage/webhooks/sms-webhooks
