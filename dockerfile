FROM  node:16
WORKDIR /app
COPY package.json ./
RUN npm install 
COPY . .

ENV PORT 3001 
ENV MONGO_URL = "mongodb+srv://dbPikky:dbPikky@pikkydb.v4uzk.mongodb.net/test"
CMD [ "node","server.js" ]






