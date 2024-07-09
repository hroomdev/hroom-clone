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
RUN npm install -g next
RUN npm install -g pnpm
RUN npx @next/codemod built-in-next-font . --force
RUN npm install
RUN ls -l
# Экспонируем порт 8000 для нашего приложения
EXPOSE 8001
#RUN npm run dev
CMD ["npm", "run", "dev"]

