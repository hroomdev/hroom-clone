'use client'
import React, { useState, useEffect, useCallback } from 'react'

import { useRouter } from 'next/navigation'
import { Truculenta } from 'next/font/google'

import Grid from '@mui/material/Grid'

const local = 'ru-RU'

import { formatDistanceToNow, subDays, intervalToDuration } from 'date-fns'

import DashboardCard from './../../DashboardCard'
import DashboardApexLineChart from '@views/dashboards/dashboard/src/DashboardApexLineChart'
import DashboardTransactions from '@views/dashboards/dashboard/src/DashboardTransactions'
import TeamsTransactions from '@views/dashboards/dashboard/src/TeamsTransactions'
import DashboardBarChart from '@views/dashboards/dashboard/src/DashboardBarChart'
import DashboardHeatmapChart from '@views/dashboards/dashboard/src/DashboardHeatmapChart'

import ProgressLinearWithLabel from '../../ProgressLinearWithLabel'
import { TotalRevenue } from '../../components/TotalRevenue'

import { Icon13 } from '../../icons/Icon13'
import { RemixIconsLineMapCarLine3 } from '../../icons/RemixIconsLineMapCarLine3'
import { RemixIconsLineSystemArrowRightLine1 } from '../../icons/RemixIconsLineSystemArrowRightLine1'
import { RemixIconsLineSystemErrorWarningLine1 } from '../../icons/RemixIconsLineSystemErrorWarningLine1'

import './style.css'

import { StackedBar } from './../../StackedBar'

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}

var initialMetricByTeam = 'Ambassadorship'
var initialTimeInterval = 'quarter'

//AI advices
var initiaLCategory3Advice1 = 'Найдите слабые метрики команд и ознакомьтесь с советами помощника.hc'
var initiaLCategory3Advice2 = 'Проанализируйте срезы в разделе Аналитика, чтобы исследовать слабые метрики глубже.hc'
var initiaLCategory3Advice3 =
  'Не знаете с чего начать? Спросите у помощника как улучшить слабые метрики или что делать дальше.hc'

export const DashboardBuilder = ({ companyId, data }) => {
  var depVar = 1

  //ai advices
  const [category3Advice1, setCategory3Advice1] = useState(initiaLCategory3Advice1) // Declare a state variable...
  const [category3Advice2, setCategory3Advice2] = useState(initiaLCategory3Advice2) // Declare a state variable...
  const [category3Advice3, setCategory3Advice3] = useState(initiaLCategory3Advice3) // Declare a state variable...

  //user data
  const [selectedEngagementMetricKey, setSelected] = useState(initialMetricByTeam) // Declare a state variable...
  const [selectedTeamTimeIntervalKey, setSelectedTimeInterval] = useState(initialTimeInterval)

  //user data
  const [d, setData] = useState(data) // Declare a state variable...

  //set data to ui elements
  const [curToNow, setCurToNow] = useState(data.curToNow) // Declare a state variable...
  const [nowToNext, setNowToNext] = useState(data.nowToNext) // Declare a state variable...
  const [currentQuizStarts, setCurrentQuizStarts] = useState(data.currentQuizStarts) // Declare a state variable...
  const [nextQuizStarts, setNextQuizStarts] = useState(data.nextQuizStarts) // Declare a state variable...
  const [participationPercent, setParticipationPercent] = useState(data.participationPercent) // Declare a state variable...
  const [participantsQuizPassed, setParticipantsQuizPassed] = useState(data.participantsQuizPassed) // Declare a state variable...
  const [participantsQuizAll, setParticipantsQuizAll] = useState(data.participantsQuizAll) // Declare a state variable...
  const [totalRevenueStats, setTotalRevenueStats] = useState(data.totalRevenueStats) // Declare a state variable...
  const [seriesApexLineMetrics, setSeriesApexLineMetrics] = useState(data.seriesApexLineMetrics) // Declare a state variable...
  const [categoriesApexLineMetrics, setCategoriesApexLineMetrics] = useState(data.categoriesApexLineMetrics) // Declare a state variable...
  const [transactionsMetricStats, setTransactionsMetricStats] = useState(data.transactionsMetricStats) // Declare a state variable...
  const [transactionsMetricDiffStats, setTransactionsMetricDiffStats] = useState(data.transactionsMetricDiffStats) // Declare a state variable...
  const [teamsMetricStats, setTeamsMetricStats] = useState(data.teamsMetricStats) // Declare a state variable...
  const [teamsMetricDiffStats, setTeamsMetricDiffStats] = useState(data.teamsMetricDiffStats) // Declare a state variable...
  const [acutelys, setAcutelys] = useState(data.acutelys) // Declare a state variable...
  const [teamMetricStory, setTeamMetricStory] = useState(data.teamsMetricStory)

  const setSelectedHandle = value => {
    setSelected(value)
  }

  const setSelectedTimeIntervalHandle = value => {
    setSelectedTimeInterval(value)
  }

  useEffect(() => {
    const f = async () => {
      //if (loading) return :todo change id to company ID
      return

      if (checkIsAvailable(id) == false) {
        console.log('checkIsAvailable(id) == false : DaSHBOARDbUILDER ')

        return
      } else {
        console.log('available ')
      }

      console.log('getDashboardData from db available id  ' + id)
      var data = Item(id)

      console.log('call fetch data from f data ' + JSON.stringify(data))

      if (data == undefined) return

      setCurToNow(data.curToNow)
      setNowToNext(data.nowToNext)
      setCurrentQuizStarts(data.currentQuizStarts)
      setNextQuizStarts(data.nextQuizStarts)
      setParticipationPercent(data.participationPercent)
      setParticipantsQuizPassed(data.participantsQuizPassed)
      setParticipantsQuizAll(data.participantsQuizAll)
      setTotalRevenueStats(data.totalRevenueStats)
      setSeriesApexLineMetrics(data.seriesApexLineMetrics)
      setCategoriesApexLineMetrics(data.categoriesApexLineMetrics)
      setTransactionsMetricStats(data.transactionsMetricStats)
      setTransactionsMetricDiffStats(data.transactionsMetricDiffStats)
      setTeamsMetricStats(data.teamsMetricStats)
      setTeamsMetricDiffStats(data.teamsMetricDiffStats)
      setAcutelys(data.acutelys)
      setTeamMetricStory(data.teamsMetricStory)
      console.log(JSON.stringify(data))
    }

    f()

    return () => {}
  }, [depVar])

  //console.log('diffstats : DashboardBuilder ' + JSON.stringify(d.teamsMetricDiffStats))
  return (
    <div className='dashboard-builder'>
      <div className='container-2'>
        <div className='body-2'>
          <div className='row'>
            <p className='div-6'>
              <span className='text-wrapper-9'>С возвращением, </span>
              <span className='text-wrapper-10'>Константин 👋🏻</span>
            </p>
            <div className='frame-4'>
              <div className='text-3'>
                <p className='text-wrapper-11'>
                  Мы подготовили для тебя данные
                  <br />
                  за всё время по всем командам.
                </p>
              </div>
              <div className='chart-2' />
              <p className='element-2'>
                Последний опрос
                <br />
                {curToNow} назад / {currentQuizStarts}
              </p>
              <p className='element-2'>
                Следующий опрос
                <br />
                через {nowToNext} / {nextQuizStarts}
              </p>
              <div className='frame-5'>
                <div className='frame-6'>
                  <div className='name-7'>Участие</div>
                  <div className='title-2'>{participationPercent}%</div>
                  <div className='name-8'>
                    {participantsQuizPassed}/{participantsQuizAll}
                  </div>
                </div>
                <div className='group'>
                  <ProgressLinearWithLabel value={participationPercent}></ProgressLinearWithLabel>
                </div>
              </div>
            </div>
          </div>
          <div className='row-2'>
            <Grid container spacing={6} flex>
              <Grid item xs='auto'>
                <TotalRevenue
                  className='total-revenue-instance'
                  frameClassName='total-revenue-2'
                  icon='/static/img/icon-29.svg'
                  line='/static/img/line-2.svg'
                  text='8.2'
                  stats={totalRevenueStats}
                />
              </Grid>
              <Grid item xs={5}>
                <DashboardApexLineChart series={seriesApexLineMetrics} categories={categoriesApexLineMetrics} />
              </Grid>
              <Grid item xs>
                <DashboardTransactions stats={transactionsMetricStats} statsDiffs={transactionsMetricDiffStats} />
              </Grid>
            </Grid>
          </div>
          <div className='row-2'>
            <div className='card'>
              <div className='image'>
                <img className='element-image' alt='Element image' src='/static/img/3d-image-4-1.png' />
                <div className='tree'>
                  <div className='overlap'>
                    <div className='group-2'>
                      <div className='overlap-group-3'>
                        <div className='oval' />
                        <img className='path' alt='Path' src='/static/img/path-1.svg' />
                      </div>
                    </div>
                    <img className='path-2' alt='Path' src='/static/img/path.svg' />
                  </div>
                </div>
                <div className='overlap-wrapper'>
                  <div className='overlap-2'>
                    <div className='path-3'>
                      <div className='overlap-group-4'>
                        <div className='oval-2' />
                        <img className='path-3' alt='Path' src='/static/img/path-3.svg' />
                      </div>
                    </div>
                    <img className='path-4' alt='Path' src='/static/img/path-2.svg' />
                  </div>
                </div>
                <img className='tree-2' alt='Tree' src='/static/img/tree.png' />
              </div>
              <div className='row-3'>
                <div className='frame-7'>
                  <div className='text-4'>Советы от искусственного интеллекта</div>
                  <div className='icon-3'>
                    <RemixIconsLineMapCarLine3 className='icon-instance-node-2' color='#B29DF8' />
                    <div className='text-5'>Все советы</div>
                  </div>
                </div>
              </div>
              <div className='row-4'>
                <div className='frame-8'>
                  <div className='frame-5'>
                    <div className='text-6'>5</div>
                    <div className='text-7'>
                      критичных
                      <br />
                      точек
                    </div>
                  </div>
                  <div className='frame-5'>
                    <div className='text-6'>10</div>
                    <div className='text-8'>рекомендаций</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row-5'>
            <div className='card-2'>
              <div className='row-6'>
                <div className='frame-9'>
                  <p className='text-9'>
                    Вопросы, касающиеся личной инициативы и самоорганизации, вызывают смешанные реакции среди
                    сотрудников, что указывает на необходимость более ясного определения ролей и ожиданий.
                  </p>
                </div>
                <div className='remix-icons-line-wrapper'>
                  <RemixIconsLineSystemErrorWarningLine1 className='icon-instance-node-2' color='#A189F2' />
                </div>
              </div>
              <div className='div-7'>
                <div className='row-7'>
                  <div className='chip-label'>
                    <div className='text-wrapper-12'>критично</div>
                  </div>
                  <div className='text-10'>все команды</div>
                </div>
              </div>
            </div>
            <div className='card-2'>
              <div className='row-6'>
                <div className='frame-9'>
                  <p className='text-9'>
                    Сотрудники компании высоко оценивают возможности для профессионального роста, но выражают
                    неудовлетворенность в области обратной связи и четкости целей.
                  </p>
                </div>
                <div className='remix-icons-line-wrapper'>
                  <RemixIconsLineSystemErrorWarningLine1 className='icon-instance-node-2' color='#A189F2' />
                </div>
              </div>
              <div className='div-7'>
                <div className='row-7'>
                  <div className='chip-label'>
                    <div className='text-wrapper-12'>критично</div>
                  </div>
                  <div className='text-10'>все команды</div>
                </div>
              </div>
            </div>
            <div className='card-2'>
              <div className='row-6'>
                <div className='frame-9'>
                  <p className='text-9'>
                    Некоторые группы сотрудников выражают озабоченность отсутствием равных возможностей для развития
                    карьеры, что требует разработки более инклюзивных стратегий развития персонала.
                  </p>
                </div>
                <div className='remix-icons-line-wrapper'>
                  <RemixIconsLineSystemErrorWarningLine1 className='icon-instance-node-2' color='#A189F2' />
                </div>
              </div>
              <div className='div-7'>
                <div className='row-7'>
                  <div className='chip-label'>
                    <div className='text-wrapper-12'>критично</div>
                  </div>
                  <div className='text-10'>все команды</div>
                </div>
              </div>
            </div>
          </div>
          <div className='row-2'>
            <Grid container spacing={6} flex>
              <Grid item xs='auto'>
                <TeamsTransactions
                  propSelectedMetric={selectedEngagementMetricKey}
                  setSelectedHandle={setSelectedHandle}
                  teamStats={teamsMetricStats}
                  teamStatsDiff={teamsMetricDiffStats}
                />
              </Grid>
              <Grid item xs={5}>
                <DashboardBarChart
                  setSelectedTimeInterval={setSelectedTimeIntervalHandle}
                  propSelectedMetricId={selectedEngagementMetricKey}
                  propSelectedTimeInterval={selectedTeamTimeIntervalKey}
                  teamStats={teamsMetricStats}
                  teamMetricStory={teamMetricStory}
                />
              </Grid>
              <Grid item xs>
                <div className='col'>
                  <div className='frame-10'>
                    <div className='card-3'>
                      <div className='frame-11'>
                        <p className='text-11'>Улучшите обратную связь от руководства для повышения вовлеченности</p>
                      </div>
                      <div className='div-7'>
                        <div className='row-7'>
                          <div className='chip-label'>
                            <div className='text-wrapper-12'>критично</div>
                          </div>
                          <div className='text-10'>Продажи</div>
                        </div>
                      </div>
                    </div>
                    <div className='card-3'>
                      <div className='frame-11'>
                        <p className='text-11'>Усильте внутреннюю коммуникацию и прозрачность решений.</p>
                      </div>
                      <div className='div-7'>
                        <div className='row-7'>
                          <div className='chip-label'>
                            <div className='text-wrapper-12'>критично</div>
                          </div>
                          <div className='text-10'>Финансы</div>
                        </div>
                      </div>
                    </div>
                    <div className='card-4'>
                      <div className='frame-11'>
                        <p className='text-11'>
                          Сотрудники отдела разработки <br />
                          высоко ценят возможности профессионального роста, но испытывают недостаток обратной связи от
                          руководства.
                        </p>
                      </div>
                      <div className='div-7'>
                        <div className='row-7'>
                          <div className='chip-label'>
                            <div className='text-wrapper-12'>критично</div>
                          </div>
                          <div className='text-10'>Разработка</div>
                        </div>
                      </div>
                    </div>
                    <div className='icon-4'>
                      <RemixIconsLineMapCarLine3 className='icon-instance-node-2' color='#B29DF8' />
                      <div className='text-5'>Все советы</div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>

          <Grid container spacing={6} flex>
            <Grid item xs='12'>
              <DashboardHeatmapChart teamsMetricStats={teamsMetricStats} teamsMetricDiffStats={teamsMetricDiffStats} />
            </Grid>
          </Grid>

          <div className='row-2'>
            <div className='card-5'>
              <div className='body-4'>
                <StackedBar arrFiveValuesPercent={acutelys[0].data}></StackedBar>
                <div className='deta'>
                  <div className='div-8'>
                    <p className='text-12'>{acutelys[0].question}</p>
                  </div>
                  <div className='row-8'>
                    <div className='text-13'>{acutelys[0].submetric}</div>
                    <div className='text-14'>{acutelys[0].metric}</div>
                  </div>
                </div>
              </div>
              <div className='body-4'>
                <StackedBar arrFiveValuesPercent={acutelys[1].data}></StackedBar>

                <div className='deta'>
                  <div className='div-8'>
                    <div className='text-12'>{acutelys[1].question}</div>
                  </div>
                  <div className='row-8'>
                    <div className='text-13'>{acutelys[1].submetric}</div>
                    <div className='text-14'>{acutelys[1].metric}</div>
                  </div>
                </div>
              </div>
              <div className='body-4'>
                <StackedBar arrFiveValuesPercent={acutelys[2].data}></StackedBar>
                <div className='deta'>
                  <div className='div-8'>
                    <p className='text-12'>{acutelys[2].question}</p>
                  </div>
                  <div className='row-8'>
                    <div className='text-13'>{acutelys[2].submetric}</div>
                    <div className='text-14'>{acutelys[2].metric}</div>
                  </div>
                </div>
              </div>
              <div className='body-4'>
                <StackedBar arrFiveValuesPercent={acutelys[3].data}></StackedBar>
                <div className='deta'>
                  <div className='div-8'>
                    <p className='text-12'>{acutelys[3].question}</p>
                  </div>
                  <div className='row-8'>
                    <div className='text-13'>{acutelys[3].submetric}</div>
                    <div className='text-14'>{acutelys[3].metric}</div>
                  </div>
                </div>
              </div>
              <div className='body-4'>
                <StackedBar arrFiveValuesPercent={acutelys[4].data}></StackedBar>
                <div className='deta'>
                  <div className='div-8'>
                    <p className='text-12'>{acutelys[4].question}</p>
                  </div>
                  <div className='row-8'>
                    <div className='text-13'>{acutelys[4].submetric}</div>
                    <div className='text-14'>{acutelys[4].metric}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row-2'>
            <div className='topic-you-are'>
              <div className='card-header-2'>
                <div className='frame-12'>
                  <div className='frame-13'>
                    <div className='text-wrapper-15'>Вопрос</div>
                    <div className='text-wrapper-15'>К ответам &gt;</div>
                  </div>
                  <p className='text-wrapper-16'>
                    Какое одно улучшение вы могли бы предложить, чтобы сделать эту организацию лучшим местом для работы?
                  </p>
                </div>
              </div>
              <div className='card-body'>
                <div className='list-2'>
                  <div className='text-15'>
                    <div className='text-16'>Процент ответов</div>
                    <div className='text-17'>98%</div>
                  </div>
                </div>
                <div className='list-3'>
                  <div className='text-18'>
                    <div className='text-16'>Респонденты</div>
                    <div className='text-17'>4 397</div>
                  </div>
                </div>
                <div className='rectangle' />
                <div className='row-9'>
                  <div className='list-4'>
                    <div className='text-19'>
                      <div className='text-20'>Карьера</div>
                      <div className='frame-14'>
                        <div className='text-21'>22%</div>
                        <div className='text-22'>Возникновения</div>
                      </div>
                    </div>
                  </div>
                  <div className='list-5'>
                    <div className='text-23'>
                      <div className='text-24'>Высшее руковдство</div>
                      <div className='frame-14'>
                        <div className='text-21'>22%</div>
                        <div className='text-22'>Возникновения</div>
                      </div>
                    </div>
                  </div>
                  <div className='list-6'>
                    <div className='text-25'>
                      <div className='text-26'>Руководитель</div>
                      <div className='frame-15'>
                        <div className='text-21'>22%</div>
                        <div className='text-22'>Возникновения</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='new-project'>
              <div className='text-27'>
                <div className='frame-16'>
                  <div className='name-9'>Выжимка помощника</div>
                  <div className='frame-17'>
                    <div className='name-10'>Напряжённая атмосфера</div>
                    <img className='divider' alt='Divider' src='/static/img/divider.svg' />
                    <div className='name-11'>Добавить спорт в льготы</div>
                    <img className='divider' alt='Divider' src='/static/img/divider.svg' />
                    <div className='name-11'>Улучшить качество обратной связи</div>
                    <img className='divider' alt='Divider' src='/static/img/divider.svg' />
                    <div className='name-11'>Сделать прозрачнее план развития</div>
                    <img className='divider' alt='Divider' src='/static/img/divider.svg' />
                    <div className='name-11'>Чаще пересматривать зарплаты</div>
                    <img className='divider' alt='Divider' src='/static/img/divider.svg' />
                    <div className='name-11'>Увеличить премии</div>
                  </div>
                </div>
              </div>
              <div className='frame-18'>
                <div className='remix-icons-line-map-wrapper'>
                  <RemixIconsLineMapCarLine3 className='icon-instance-node-2' color='#B29DF8' />
                </div>
                <div className='remix-icons-line-system-arrow-right-line-1-wrapper'>
                  <RemixIconsLineSystemArrowRightLine1 className='icon-instance-node-2' color='#B29DF8' />
                </div>
              </div>
            </div>
          </div>
          <div className='row-2'>
            <DashboardCard
              color={'light'}
              title={category3Advice1}
              stats={''}
              trendNumber={''}
              avatarIcon={'ri-car-line'}
              ritoric={'Что делать дальше'}
              chipLabel={'рекомендация'}
            ></DashboardCard>
            <DashboardCard
              color={'light'}
              title={category3Advice2}
              stats={''}
              trendNumber={''}
              avatarIcon={'ri-car-line'}
              ritoric={'Что делать дальше'}
              chipLabel={'рекомендация'}
              style={{
                height: '255'
              }}
            ></DashboardCard>

            <DashboardCard
              className={'card-6'}
              color={'light'}
              title={category3Advice3}
              stats={''}
              trendNumber={''}
              avatarIcon={'ri-car-line'}
              ritoric={'Что делать дальше'}
              chipLabel={'рекомендация'}
            ></DashboardCard>
          </div>
          <div className='row-11' />
          <div className='row-11' />
        </div>
        <div className='div-9' />
        <div className='div-9' />
      </div>
    </div>
  )
}
