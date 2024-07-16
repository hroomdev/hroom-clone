# Используем официальный Node.js образ в качестве базового
FROM node@sha256:34b7aa411056c85dbf71d240d26516949b3f72b318d796c26b57caaa1df5639a
# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app
RUN ls -l
# Копируем package.json и package-lock.json в рабочую директорию
#COPY package.json /app
# Копируем остальные файлы проекта в рабочую директорию
#COPY /javascript-version .
COPY . .
RUN ls -l
#ADD ./* /home/app/
# Устанавливаем зависимости

RUN npm install pg
RUN npm install -g npm@10.8.1
RUN npm install
RUN npm install -g pnpm
RUN npm install -g next
RUN npx @next/codemod built-in-next-font . --force
RUN npm install axios

RUN ls -l
# Экспонируем порт 8000 для нашего приложения
EXPOSE 3000

#RUN npm run dev
# Declare an argument for the web server

USER root
#COPY docker-entrypoint.sh .
#RUN ls -l
#RUN chmod +x docker-entrypoint.sh
#RUN ls -l docker-entrypoint.sh
#ENTRYPOINT ["docker-entrypoint.sh"]
#WORKDIR
#ENTRYPOINT ["npm","run","dev"]

#production
#RUN npm run build
RUN ls -l
RUN mkdir -p /app/npm
RUN ls -l /app/npm
RUN npm run build
ENTRYPOINT ["npm","run","start"]
