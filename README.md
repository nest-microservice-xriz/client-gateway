
## Dev

1. Clonar repo
2. Instalar dependencias
3. Crear arhivo .env
4. Levantar servicio de NATS
docker run -d --name nats-server -p 4222:4222 -p -p 8222:8222 nats 
5. Tener levantado todo los microservicios
6. Levantar proyecto con 'npm run start:dev'

## Nats
docker run -d --name nats-server -p 4222:4222 -p -p 8222:8222 nats 