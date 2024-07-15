# Используем официальный Node.js образ в качестве базового
FROM node:20-alpine
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

RUN npm install -g npm@10.8.1
RUN npm install
RUN npm install -g pnpm
RUN npm install --save-dev cross-env
RUN npm install -g next
RUN npx @next/codemod built-in-next-font . --force
RUN npm install axios

RUN ls -l
# Экспонируем порт 8000 для нашего приложения
EXPOSE 8001
EXPOSE 8000
EXPOSE 3000
EXPOSE 448
EXPOSE 80
EXPOSE 5678
#RUN npm run dev
# Declare an argument for the web server
ARG ENV="dev" #default argument when not provided in the --build-arg
RUN if [ "$ENV" = "prod" ] ; then npm run start; else npm run dev; fi

