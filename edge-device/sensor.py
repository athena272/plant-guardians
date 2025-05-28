import machine
import time
import json
import network
import ubinascii
from machine import Pin, I2C
import mqtt
from machine import Timer
import camera

# Configurações
WIFI_SSID = "sua-rede"
WIFI_PASSWORD = "sua-senha"
MQTT_BROKER = "mqtt.googleapis.com"
MQTT_PORT = 8883
MQTT_CLIENT_ID = ubinascii.hexlify(machine.unique_id()).decode()
MQTT_TOPIC = "projects/seu-projeto/topics/detections"
MQTT_COMMANDS_TOPIC = "projects/seu-projeto/topics/commands"

# Configuração do sensor PIR
pir = Pin(14, Pin.IN)  # GPIO14 para o sensor PIR

# Configuração da câmera
camera.init(0, format=camera.JPEG)
camera.quality(10)  # Qualidade mais baixa para economizar banda
camera.framesize(camera.FRAME_VGA)  # 640x480

# Configuração do atuador (exemplo: LED)
actuator = Pin(2, Pin.OUT)  # GPIO2 para o LED

# Configuração do timer para captura periódica
capture_timer = Timer(0)

def connect_wifi():
    """Conecta ao WiFi."""
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print('Conectando ao WiFi...')
        wlan.connect(WIFI_SSID, WIFI_PASSWORD)
        while not wlan.isconnected():
            time.sleep(1)
    print('WiFi conectado!')
    print('IP:', wlan.ifconfig()[0])

def on_message(topic, msg):
    """Callback para mensagens MQTT recebidas."""
    try:
        data = json.loads(msg)
        if data.get("command") == "deterrent:on":
            duration = data.get("duration", 5)  # Duração padrão: 5 segundos
            activate_deterrent(duration)
    except Exception as e:
        print("Erro ao processar mensagem:", e)

def activate_deterrent(duration):
    """Ativa o mecanismo de dissuasão pelo tempo especificado."""
    print(f"Ativando dissuasor por {duration} segundos")
    actuator.value(1)  # Liga o atuador
    time.sleep(duration)
    actuator.value(0)  # Desliga o atuador

def capture_and_send():
    """Captura imagem e envia via MQTT."""
    try:
        # Captura imagem
        buf = camera.capture()
        
        # Prepara mensagem
        message = {
            "timestamp": time.time(),
            "device_id": MQTT_CLIENT_ID,
            "pir_triggered": pir.value() == 1,
            "image": ubinascii.b2a_base64(buf).decode()
        }
        
        # Publica no tópico
        client.publish(MQTT_TOPIC, json.dumps(message))
        print("Imagem enviada!")
        
    except Exception as e:
        print("Erro ao capturar/enviar:", e)

def main():
    # Conecta ao WiFi
    connect_wifi()
    
    # Configura cliente MQTT
    client = mqtt.MQTTClient(
        MQTT_CLIENT_ID,
        MQTT_BROKER,
        port=MQTT_PORT,
        ssl=True,
        ssl_params={'certfile': '/cert.pem'}
    )
    
    # Configura callbacks
    client.set_callback(on_message)
    
    # Conecta ao broker
    client.connect()
    client.subscribe(MQTT_COMMANDS_TOPIC)
    
    # Configura timer para captura periódica (a cada 30 segundos)
    capture_timer.init(period=30000, mode=Timer.PERIODIC, callback=lambda t: capture_and_send())
    
    # Loop principal
    while True:
        # Verifica mensagens MQTT
        client.check_msg()
        
        # Se o PIR detectar movimento, captura e envia imediatamente
        if pir.value() == 1:
            capture_and_send()
            time.sleep(1)  # Evita múltiplas capturas
        
        time.sleep(0.1)

if __name__ == "__main__":
    main() 