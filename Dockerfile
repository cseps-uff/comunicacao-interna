FROM node:18-alpine

WORKDIR /app

# Copia os arquivos de dependência e instala
COPY package*.json ./
RUN npm install

# Copia o resto do projeto e faz o build (para garantir que rode liso no Linux do Umbrel)
COPY . .
RUN npm run build

# Expõe a porta e inicia o site
EXPOSE 3000
CMD ["npm", "start"]