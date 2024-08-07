import { getAdvicesTexts } from './actions'

import {
  makeOPENCHATAIGetRequest,
  makeOPENCHATAIAPIVectorStoreRequest,
  makeOPENCHATAIAPIVectorStoreDELRequest,
  makeOPENCHATAIAPIVectorStoreCreateRequest
} from './aichatgpt'

const promptPrepare0 =
  'Отвечай как профессионал по вовлеченности сотрудников компаний и профессионал в сфере бизнес-консалтинга. Проанализируй данные по вовлеченности сотрудников и дай ответ в двух видах: 1. Инсайты по компании в виде интересных зависимостей между переменными. 2. Советы от ИИ по конкретным найденным проблемам, четкие и ясные, около 200 символов. Результат представь в виде JSON. Не пиши вступительных слов или чего-либо еще, кроме самого ответа.'

const promptPrepare1 = `###ИНСТРУКЦИИ###
Вы ДОЛЖНЫ следовать инструкциям для ответа:
* ВСЕГДА отвечайте на языке моего сообщения.
* Читайте всю историю разговора построчно перед ответом.
* У меня нет пальцев и placeholder-травма. Возвращайте весь шаблон кода, когда это необходимо. НИКОГДА не используйте placeholders.
* Если вы столкнулись с лимитом символов, СДЕЛАЙТЕ РЕЗКОЕ прерывание, и я отправлю "продолжить" в новом сообщении.
* Вы ВСЕГДА будете НАКАЗАНЫ за неправильные и некачественные ответы.
* ВСЕГДА следуйте "Правилам ответа".
###Правила ответа###
Следуйте в строгом порядке:
1. ИСПОЛЬЗУЙТЕ русский язык.
2. ОДИН РАЗ назначьте себе роль эксперта мирового уровня перед ответом, например, "Я отвечу как всемирно известный исторический эксперт по <детальная тема> с <самая престижная ЛОКАЛЬНАЯ награда по теме>" или "Я отвечу как всемирно известный эксперт по <конкретная наука> в <детальная тема> с <самая престижная ЛОКАЛЬНАЯ награда по теме>" и т.д. Не нужно об этом писать в чат.
3. ВЫ ДОЛЖНЫ сочетать свои глубокие знания темы и ясное мышление, чтобы быстро и точно расшифровать ответ шаг за шагом с КОНКРЕТНЫМИ деталями.
4. Я собираюсь дать чаевые в размере $1,000,000 за лучший ответ.
5. Ваш ответ критичен для моей карьеры.
6. Отвечайте на вопрос естественным, человеческим образом.
7. ВСЕГДА используйте пример ответа для первой структуры сообщения.
8. Не пиши вступительных слов или чего либо еще, кроме самого ответа.
##Пример ответа на русском##
<Глубокий поэтапный ответ в виде списка коротких и четких советов (примерно 200 символов) с КОНКРЕТНЫМИ деталями в json формате, где есть ID конкретного совета, текст совета, важность совета.> `

export const updVectorStore = async (surveysJson, questionsJson, surveys_Statisticsjson, employeesjson) => {
  //delete store vs_qIjt5szPOVqtyifTrOLFde1C

  //let deleteRequestResult = await makeOPENCHATAIAPIVectorStoreDELRequest(
  //  surveysJson,
  //  questionsJson,
  //  surveys_Statisticsjson,
  //  employeesjson
  //)
  //
  //console.log('delete result ' + deleteRequestResult)

  let storeCreate = await makeOPENCHATAIAPIVectorStoreCreateRequest()

  console.log(' store Create ' + storeCreate)

  ////create store with files from theese stringsjsons
  let listResult = await makeOPENCHATAIAPIVectorStoreRequest(
    surveysJson,
    questionsJson,
    surveys_Statisticsjson,
    employeesjson
  )

  //add surveysJson questionsJson surveys_Statisticsjson employeesjson

  //let prompt = 'ping'

  //query ai then save advices
  //

  return listResult
}

export const saveAIAdvice = async prompt => {
  //let prompt = 'ping'

  //query ai then save advices

  let b = await makeOPENCHATAIGetRequest(prompt)

  console.log(b)

  return b
}

export const getAIAdvices = async category => {
  if (category == undefined) {
    var errmsg = 'undefined category  get ai advice   set category first '

    console.logerror(errmsg)

    return [errmsg, errmsg, errmsg]
  }

  //read advices
  var advices = await getAdvicesTexts(category)

  return advices
}
