import React from 'react'

import { Menu } from '../../components/Menu'
import { SelectCustome } from '../../components/SelectCustome'
import { TotalRevenue } from '../../components/TotalRevenue'
import { Transactions } from '../../components/Transactions'
import { Icon13 } from '../../icons/Icon13'
import { RemixIconsLineBusinessBarChartBoxLine4 } from '../../icons/RemixIconsLineBusinessBarChartBoxLine4'
import { RemixIconsLineBusinessCalendarLine3 } from '../../icons/RemixIconsLineBusinessCalendarLine3'
import { RemixIconsLineMapCarLine5 } from '../../icons/RemixIconsLineMapCarLine5'
import { RemixIconsLineSystemArrowRightLine1 } from '../../icons/RemixIconsLineSystemArrowRightLine1'
import './style.css'

/*
<Menu
          className='menu-instance'
          icon={<RemixIconsLineBusinessBarChartBoxLine4 className='icon-instance-node' color='#E7E3FC' />}
          logoClassName='design-component-instance-node'
          menu='semi-dark'
          menuDrawerClassName='menu-2'
          override={<RemixIconsLineBusinessCalendarLine3 className='icon-instance-node' color='#E7E3FC' />}
        />
        */
export const DashboardBuilder = () => {
  return (
    <div className='dashboard-builder'>
      <div className='menu-wrapper'></div>
      <div className='div-6'>
        <div className='body-2'>
          <div className='row'>
            <div className='text-2'>
              <p className='welcome-back-felecia'>
                <span className='text-wrapper-6'>Welcome back, </span>
                <span className='text-wrapper-7'>Felecia 👋🏻 </span>
              </p>
              <p className='your-progress-this'>
                Your progress this week is Awesome. let&#39;s keep it up
                <br />
                and get a lot of points reward!
              </p>
            </div>
          </div>
          <div className='row-2'>
            <p className='text-wrapper-8'>Данные за всё время по всем командам</p>
            <div className='rectangle' />
            <p className='element-2'>
              Последний опрос
              <br />
              неделю назад / 23 мая 2024
            </p>
            <p className='element-2'>
              Следующий опрос
              <br />
              через 2 дня / 3 июня 2024
            </p>
          </div>
          <div className='row-3'>
            <TotalRevenue
              activitiyGaugeClassName='total-revenue-3'
              chartClassName='total-revenue-2'
              className='total-revenue-instance'
              hasListSubheader={false}
              ringMiddle='/static/img/ring-middle-1.svg'
            />
            <img className='chart-3' alt='Chart' src='/static/img/chart-6.png' />
            <Transactions
              bodyClassName='transactions-3'
              bodyClassNameOverride='transactions-4'
              className='transactions-instance'
              frameClassName='transactions-2'
              icon='/static/img/icon-50.svg'
              icon1='/static/img/icon-52.svg'
              icon2='/static/img/icon-47.svg'
              icon3='/static/img/icon-46.svg'
              icon4='/static/img/icon-55.svg'
              icon5='/static/img/icon-47.svg'
              img='/static/img/icon-46.svg'
              text='Лояльность'
              text1='Обратная связь'
            />
          </div>
          <div className='row-3'>
            <div className='card'>
              <div className='image'>
                <img className='element-image' alt='Element image' src='/static/img/3d-image-4-1.png' />
                <div className='tree'>
                  <div className='overlap'>
                    <div className='group'>
                      <div className='overlap-group-2'>
                        <div className='oval' />
                        <img className='path' alt='Path' src='/static/img/path-1.svg' />
                      </div>
                    </div>
                    <img className='path-2' alt='Path' src='/static/img/path.svg' />
                  </div>
                </div>
                <div className='overlap-wrapper'>
                  <div className='overlap-2'>
                    <div className='overlap-group-wrapper'>
                      <div className='overlap-group-3'>
                        <div className='oval-2' />
                        <img className='overlap-group-wrapper' alt='Path' src='/static/img/path-3.svg' />
                      </div>
                    </div>
                    <img className='path-3' alt='Path' src='/static/img/path-2.svg' />
                  </div>
                </div>
                <img className='tree-2' alt='Tree' src='/static/img/tree.png' />
              </div>
              <div className='frame-wrapper'>
                <div className='frame-4'>
                  <div className='text-3'>Советы искусственного интеллекта</div>
                  <div className='icon-2'>
                    <RemixIconsLineMapCarLine5 className='icon-instance-node-2' color='#8C57FF' />
                    <div className='text-4'>Все советы</div>
                  </div>
                </div>
              </div>
              <div className='row-4'>
                <div className='frame-5'>
                  <div className='frame-6'>
                    <div className='text-5'>5</div>
                    <div className='text-6'>
                      критичных
                      <br />
                      точек
                    </div>
                  </div>
                  <div className='frame-6'>
                    <div className='text-5'>10</div>
                    <div className='text-7'>рекомендаций</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row-5'>
            <div className='card-2'>
              <div className='row-6'>
                <div className='frame-7'>
                  <p className='text-8'>
                    Вопросы, касающиеся личной инициативы и самоорганизации, вызывают смешанные реакции среди
                    сотрудников, что указывает на необходимость более ясного определения ролей и ожиданий.
                  </p>
                </div>
                <div className='remix-icons-line-map-wrapper'>
                  <RemixIconsLineMapCarLine5 className='icon-instance-node-2' color='#8C57FF' />
                </div>
              </div>
              <div className='div-7'>
                <div className='row-7'>
                  <div className='chip-label'>
                    <div className='text-wrapper-9'>критично</div>
                  </div>
                  <div className='text-9'>все команды</div>
                </div>
              </div>
            </div>
            <div className='card-2'>
              <div className='row-6'>
                <div className='frame-7'>
                  <p className='text-8'>
                    Вопросы, касающиеся личной инициативы и самоорганизации, вызывают смешанные реакции среди
                    сотрудников, что указывает на необходимость более ясного определения ролей и ожиданий.
                  </p>
                </div>
                <div className='remix-icons-line-map-wrapper'>
                  <RemixIconsLineMapCarLine5 className='icon-instance-node-2' color='#8C57FF' />
                </div>
              </div>
              <div className='div-7'>
                <div className='row-7'>
                  <div className='chip-label'>
                    <div className='text-wrapper-9'>критично</div>
                  </div>
                  <div className='text-9'>все команды</div>
                </div>
              </div>
            </div>
            <div className='card-2'>
              <div className='row-6'>
                <div className='frame-7'>
                  <p className='text-8'>
                    Вопросы, касающиеся личной инициативы и самоорганизации, вызывают смешанные реакции среди
                    сотрудников, что указывает на необходимость более ясного определения ролей и ожиданий.
                  </p>
                </div>
                <div className='remix-icons-line-map-wrapper'>
                  <RemixIconsLineMapCarLine5 className='icon-instance-node-2' color='#8C57FF' />
                </div>
              </div>
              <div className='div-7'>
                <div className='row-7'>
                  <div className='chip-label'>
                    <div className='text-wrapper-9'>критично</div>
                  </div>
                  <div className='text-9'>все команды</div>
                </div>
              </div>
            </div>
          </div>
          <div className='row-3'>
            <img className='chart-4' alt='Chart' src='/static/img/chart-6-1.png' />
            <div className='transactions-5'>
              <div className='card-header'>
                <SelectCustome
                  className='select-custome-instance'
                  hasFormLabel={false}
                  inputText='Воволечённость'
                  inputTextClassName='select-custome-2'
                  showSupportingText={false}
                  size='m'
                  stateProp='default'
                  textConfigurations='input-text'
                />
                <div className='text-wrapper-10'>по командам</div>
              </div>
              <div className='frame-8'>
                <div className='body-3'>
                  <div className='div-7'>
                    <div className='div-8'>
                      <div className='ellipse' />
                      <div className='text-wrapper-11'>Руководители</div>
                    </div>
                    <div className='stats-2'>
                      <div className='text-wrapper-12'>6.1</div>
                      <Icon13 className='icon-instance-node-2' color='#56CA00' />
                      <div className='percentage-2'>1.6</div>
                    </div>
                  </div>
                  <div className='div-7'>
                    <div className='div-8'>
                      <div className='ellipse' />
                      <div className='text-wrapper-11'>Разработка</div>
                    </div>
                    <div className='stats-2'>
                      <div className='text-wrapper-12'>5.2</div>
                      <Icon13 className='icon-instance-node-2' color='#56CA00' />
                      <div className='percentage-2'>1</div>
                    </div>
                  </div>
                  <div className='div-7'>
                    <div className='div-8'>
                      <div className='ellipse' />
                      <div className='text-wrapper-11'>Тестирование</div>
                    </div>
                    <div className='stats-2'>
                      <div className='text-wrapper-12'>6.7</div>
                      <Icon13 className='icon-instance-node-2' color='#56CA00' />
                      <div className='percentage-2'>1.2</div>
                    </div>
                  </div>
                  <div className='div-7'>
                    <div className='div-8'>
                      <div className='ellipse' />
                      <div className='text-wrapper-11'>Продажи</div>
                    </div>
                    <div className='stats-2'>
                      <div className='text-wrapper-12'>6.3</div>
                      <Icon13 className='icon-instance-node-2' color='#56CA00' />
                      <div className='percentage-2'>1.5</div>
                    </div>
                  </div>
                  <div className='div-7'>
                    <div className='div-8'>
                      <div className='ellipse' />
                      <div className='text-wrapper-11'>Финансы</div>
                    </div>
                    <div className='stats-2'>
                      <div className='text-wrapper-12'>5.4</div>
                      <Icon13 className='icon-instance-node-2' color='#56CA00' />
                      <div className='percentage-2'>0.8</div>
                    </div>
                  </div>
                  <div className='div-7'>
                    <div className='div-8'>
                      <div className='ellipse' />
                      <div className='text-wrapper-11'>Дизайн</div>
                    </div>
                    <div className='stats-2'>
                      <div className='text-wrapper-12'>5.4</div>
                      <Icon13 className='icon-instance-node-2' color='#56CA00' />
                      <div className='percentage-2'>0.8</div>
                    </div>
                  </div>
                  <div className='div-7'>
                    <div className='div-8'>
                      <div className='ellipse' />
                      <div className='text-wrapper-11'>Ещё одна команда</div>
                    </div>
                    <div className='stats-2'>
                      <div className='text-wrapper-12'>5.4</div>
                      <Icon13 className='icon-instance-node-2' color='#56CA00' />
                      <div className='percentage-2'>0.8</div>
                    </div>
                  </div>
                </div>
                <div className='body-4'>
                  <div className='div-7'>
                    <div className='div-8'>
                      <div className='ellipse' />
                      <div className='text-wrapper-11'>Аналитика</div>
                    </div>
                    <div className='stats-2'>
                      <div className='text-wrapper-12'>6.1</div>
                      <Icon13 className='icon-instance-node-2' color='#56CA00' />
                      <div className='percentage-2'>1.6</div>
                    </div>
                  </div>
                  <div className='div-7'>
                    <div className='div-8'>
                      <div className='ellipse' />
                      <div className='text-wrapper-11'>Внутренние продажи</div>
                    </div>
                    <div className='stats-2'>
                      <div className='text-wrapper-12'>5.2</div>
                      <Icon13 className='icon-instance-node-2' color='#56CA00' />
                      <div className='percentage-2'>1</div>
                    </div>
                  </div>
                  <div className='div-7'>
                    <div className='div-8'>
                      <div className='ellipse' />
                      <div className='text-wrapper-11'>Исследования</div>
                    </div>
                    <div className='stats-2'>
                      <div className='text-wrapper-12'>6.7</div>
                      <Icon13 className='icon-instance-node-2' color='#56CA00' />
                      <div className='percentage-2'>1.2</div>
                    </div>
                  </div>
                  <div className='div-7'>
                    <div className='div-8'>
                      <div className='ellipse' />
                      <div className='text-wrapper-11'>Маркетинг</div>
                    </div>
                    <div className='stats-2'>
                      <div className='text-wrapper-12'>6.3</div>
                      <Icon13 className='icon-instance-node-2' color='#56CA00' />
                      <div className='percentage-2'>1.5</div>
                    </div>
                  </div>
                  <div className='div-7'>
                    <div className='div-8'>
                      <div className='ellipse' />
                      <div className='text-wrapper-11'>Бэкофис</div>
                    </div>
                    <div className='stats-2'>
                      <div className='text-wrapper-12'>5.4</div>
                      <Icon13 className='icon-instance-node-2' color='#56CA00' />
                      <div className='percentage-2'>0.8</div>
                    </div>
                  </div>
                  <div className='div-7'>
                    <div className='div-8'>
                      <div className='ellipse' />
                      <div className='text-wrapper-11'>Администрация</div>
                    </div>
                    <div className='stats-2'>
                      <div className='text-wrapper-12'>5.4</div>
                      <Icon13 className='icon-instance-node-2' color='#56CA00' />
                      <div className='percentage-2'>0.8</div>
                    </div>
                  </div>
                  <div className='div-7'>
                    <div className='div-8'>
                      <div className='ellipse' />
                      <div className='text-wrapper-11'>Ещё одна команда</div>
                    </div>
                    <div className='stats-2'>
                      <div className='text-wrapper-12'>5.4</div>
                      <Icon13 className='icon-instance-node-2' color='#56CA00' />
                      <div className='percentage-2'>0.8</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row-3'>
            <div className='card-3'>
              <div className='row-8'>
                <div className='frame-9'>
                  <p className='text-10'>
                    Менеджеры в отделе продаж чувствуют необходимость в дополнительной поддержке и тренинга по
                    управлению производительностью, особенно в периоды интенсивного обновления продуктовой линейки.
                  </p>
                </div>
                <div className='remix-icons-line-map-car-line-5-wrapper'>
                  <RemixIconsLineMapCarLine5 className='icon-instance-node-2' color='#8C57FF' />
                </div>
              </div>
              <div className='div-7'>
                <div className='row-7'>
                  <div className='chip-label'>
                    <div className='text-wrapper-9'>критично</div>
                  </div>
                  <div className='text-9'>Продажи</div>
                </div>
              </div>
            </div>
            <div className='card-4'>
              <div className='row-8'>
                <div className='frame-9'>
                  <p className='text-10'>
                    Сотрудники отдела разработки <br />
                    высоко ценят возможности профессионального роста, но испытывают недостаток обратной связи от
                    руководства.
                  </p>
                </div>
                <div className='remix-icons-line-map-car-line-5-wrapper'>
                  <RemixIconsLineMapCarLine5 className='icon-instance-node-2' color='#8C57FF' />
                </div>
              </div>
              <div className='div-7'>
                <div className='row-7'>
                  <div className='chip-label'>
                    <div className='text-wrapper-9'>критично</div>
                  </div>
                  <div className='text-9'>Разработка</div>
                </div>
              </div>
            </div>
            <div className='card-3'>
              <div className='row-8'>
                <div className='frame-9'>
                  <p className='text-10'>
                    Менеджеры в отделе продаж чувствуют необходимость в дополнительной поддержке и тренинга по
                    управлению производительностью, особенно в периоды интенсивного обновления продуктовой линейки.
                  </p>
                </div>
                <div className='remix-icons-line-map-car-line-5-wrapper'>
                  <RemixIconsLineMapCarLine5 className='icon-instance-node-2' color='#8C57FF' />
                </div>
              </div>
              <div className='div-7'>
                <div className='row-7'>
                  <div className='chip-label'>
                    <div className='text-wrapper-9'>критично</div>
                  </div>
                  <div className='text-9'>Продажи</div>
                </div>
              </div>
            </div>
          </div>
          <div className='row-3'>
            <img className='chart-5' alt='Chart' src='/static/img/chart.png' />
          </div>
          <div className='row-3'>
            <div className='card-3'>
              <div className='row-8'>
                <div className='frame-9'>
                  <p className='text-10'>
                    Менеджеры в отделе продаж чувствуют необходимость в дополнительной поддержке и тренинга по
                    управлению производительностью, особенно в периоды интенсивного обновления продуктовой линейки.
                  </p>
                </div>
                <div className='remix-icons-line-map-car-line-5-wrapper'>
                  <RemixIconsLineMapCarLine5 className='icon-instance-node-2' color='#8C57FF' />
                </div>
              </div>
              <div className='div-7'>
                <div className='row-7'>
                  <div className='chip-label'>
                    <div className='text-wrapper-9'>критично</div>
                  </div>
                  <div className='text-9'>Продажи</div>
                </div>
              </div>
            </div>
            <div className='card-4'>
              <div className='row-8'>
                <div className='frame-9'>
                  <p className='text-10'>
                    Сотрудники отдела разработки <br />
                    высоко ценят возможности профессионального роста, но испытывают недостаток обратной связи от
                    руководства.
                  </p>
                </div>
                <div className='remix-icons-line-map-car-line-5-wrapper'>
                  <RemixIconsLineMapCarLine5 className='icon-instance-node-2' color='#8C57FF' />
                </div>
              </div>
              <div className='div-7'>
                <div className='row-7'>
                  <div className='chip-label'>
                    <div className='text-wrapper-9'>критично</div>
                  </div>
                  <div className='text-9'>Разработка</div>
                </div>
              </div>
            </div>
            <div className='card-3'>
              <div className='row-8'>
                <div className='frame-9'>
                  <p className='text-10'>
                    Менеджеры в отделе продаж чувствуют необходимость в дополнительной поддержке и тренинга по
                    управлению производительностью, особенно в периоды интенсивного обновления продуктовой линейки.
                  </p>
                </div>
                <div className='remix-icons-line-map-car-line-5-wrapper'>
                  <RemixIconsLineMapCarLine5 className='icon-instance-node-2' color='#8C57FF' />
                </div>
              </div>
              <div className='div-7'>
                <div className='row-7'>
                  <div className='chip-label'>
                    <div className='text-wrapper-9'>критично</div>
                  </div>
                  <div className='text-9'>Продажи</div>
                </div>
              </div>
            </div>
          </div>
          <div className='row-3'>
            <div className='card-5'>
              <div className='body-5'>
                <div className='chart-6'>
                  <div className='overlap-group-4'>
                    <div className='bar-5' />
                    <div className='bar-6' />
                    <div className='bar-7' />
                    <div className='bar-8' />
                    <div className='bar-9' />
                  </div>
                </div>
                <div className='deta'>
                  <div className='div-8'>
                    <p className='text-11'>
                      Моя организация поддержит меня, если мне понадобится использовать гибкий график работы
                    </p>
                  </div>
                  <div className='row-9'>
                    <div className='text-12'>Баланс работа-жизнь</div>
                    <div className='text-13'>Счастье</div>
                  </div>
                </div>
              </div>
              <div className='body-5'>
                <div className='chart-6'>
                  <div className='overlap-group-4'>
                    <div className='bar-5' />
                    <div className='bar-6' />
                    <div className='bar-7' />
                    <div className='bar-8' />
                    <div className='bar-9' />
                  </div>
                </div>
                <div className='deta'>
                  <div className='div-8'>
                    <p className='text-11'>
                      Моя организация поддержит меня, если мне понадобится использовать гибкий график работы
                    </p>
                  </div>
                  <div className='row-9'>
                    <div className='text-12'>Баланс работа-жизнь</div>
                    <div className='text-13'>Счастье</div>
                  </div>
                </div>
              </div>
              <div className='body-5'>
                <div className='chart-6'>
                  <div className='overlap-group-4'>
                    <div className='bar-5' />
                    <div className='bar-6' />
                    <div className='bar-7' />
                    <div className='bar-8' />
                    <div className='bar-9' />
                  </div>
                </div>
                <div className='deta'>
                  <div className='div-8'>
                    <p className='text-11'>
                      Моя организация поддержит меня, если мне понадобится использовать гибкий график работы
                    </p>
                  </div>
                  <div className='row-9'>
                    <div className='text-12'>Баланс работа-жизнь</div>
                    <div className='text-13'>Счастье</div>
                  </div>
                </div>
              </div>
              <div className='body-5'>
                <div className='chart-6'>
                  <div className='overlap-group-4'>
                    <div className='bar-5' />
                    <div className='bar-6' />
                    <div className='bar-7' />
                    <div className='bar-8' />
                    <div className='bar-9' />
                  </div>
                </div>
                <div className='deta'>
                  <div className='div-8'>
                    <p className='text-11'>
                      Моя организация поддержит меня, если мне понадобится использовать гибкий график работы
                    </p>
                  </div>
                  <div className='row-9'>
                    <div className='text-12'>Баланс работа-жизнь</div>
                    <div className='text-13'>Счастье</div>
                  </div>
                </div>
              </div>
              <div className='body-5'>
                <div className='chart-6'>
                  <div className='overlap-group-4'>
                    <div className='bar-5' />
                    <div className='bar-6' />
                    <div className='bar-7' />
                    <div className='bar-8' />
                    <div className='bar-9' />
                  </div>
                </div>
                <div className='deta'>
                  <div className='div-8'>
                    <p className='text-11'>
                      Моя организация поддержит меня, если мне понадобится использовать гибкий график работы
                    </p>
                  </div>
                  <div className='row-9'>
                    <div className='text-12'>Баланс работа-жизнь</div>
                    <div className='text-13'>Счастье</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row-3'>
            <div className='card-3'>
              <div className='row-8'>
                <div className='frame-9'>
                  <p className='text-10'>
                    Менеджеры в отделе продаж чувствуют необходимость в дополнительной поддержке и тренинга по
                    управлению производительностью, особенно в периоды интенсивного обновления продуктовой линейки.
                  </p>
                </div>
                <div className='remix-icons-line-map-car-line-5-wrapper'>
                  <RemixIconsLineMapCarLine5 className='icon-instance-node-2' color='#8C57FF' />
                </div>
              </div>
              <div className='div-7'>
                <div className='row-7'>
                  <div className='chip-label'>
                    <div className='text-wrapper-9'>критично</div>
                  </div>
                  <div className='text-9'>Продажи</div>
                </div>
              </div>
            </div>
            <div className='card-4'>
              <div className='row-8'>
                <div className='frame-9'>
                  <p className='text-10'>
                    Сотрудники отдела разработки <br />
                    высоко ценят возможности профессионального роста, но испытывают недостаток обратной связи от
                    руководства.
                  </p>
                </div>
                <div className='remix-icons-line-map-car-line-5-wrapper'>
                  <RemixIconsLineMapCarLine5 className='icon-instance-node-2' color='#8C57FF' />
                </div>
              </div>
              <div className='div-7'>
                <div className='row-7'>
                  <div className='chip-label'>
                    <div className='text-wrapper-9'>критично</div>
                  </div>
                  <div className='text-9'>Разработка</div>
                </div>
              </div>
            </div>
            <div className='card-3'>
              <div className='row-8'>
                <div className='frame-9'>
                  <p className='text-10'>
                    Менеджеры в отделе продаж чувствуют необходимость в дополнительной поддержке и тренинга по
                    управлению производительностью, особенно в периоды интенсивного обновления продуктовой линейки.
                  </p>
                </div>
                <div className='remix-icons-line-map-car-line-5-wrapper'>
                  <RemixIconsLineMapCarLine5 className='icon-instance-node-2' color='#8C57FF' />
                </div>
              </div>
              <div className='div-7'>
                <div className='row-7'>
                  <div className='chip-label'>
                    <div className='text-wrapper-9'>критично</div>
                  </div>
                  <div className='text-9'>Продажи</div>
                </div>
              </div>
            </div>
          </div>
          <div className='row-3'>
            <div className='topic-you-are'>
              <div className='card-header-2'>
                <div className='div-6'>
                  <div className='frame-10'>
                    <div className='text-wrapper-13'>Вопрос</div>
                    <div className='text-wrapper-13'>К ответам &gt;</div>
                  </div>
                  <p className='text-wrapper-14'>
                    Какое одно улучшение вы могли бы предложить, чтобы сделать эту организацию лучшим местом для работы?
                  </p>
                </div>
              </div>
              <div className='card-body'>
                <div className='list-2'>
                  <div className='text-14'>
                    <div className='text-15'>Процент ответов</div>
                    <div className='text-16'>98%</div>
                  </div>
                </div>
                <div className='list-3'>
                  <div className='text-17'>
                    <div className='text-15'>Респонденты</div>
                    <div className='text-16'>4 397</div>
                  </div>
                </div>
                <div className='rectangle-2' />
                <div className='row-10'>
                  <div className='list-4'>
                    <div className='text-18'>
                      <div className='text-19'>Карьера</div>
                      <div className='frame-11'>
                        <div className='text-20'>22%</div>
                        <div className='text-21'>Возникновения</div>
                      </div>
                    </div>
                  </div>
                  <div className='list-5'>
                    <div className='text-22'>
                      <div className='text-23'>Высшее руковдство</div>
                      <div className='frame-11'>
                        <div className='text-20'>22%</div>
                        <div className='text-21'>Возникновения</div>
                      </div>
                    </div>
                  </div>
                  <div className='list-6'>
                    <div className='text-24'>
                      <div className='text-25'>Руководитель</div>
                      <div className='frame-12'>
                        <div className='text-20'>22%</div>
                        <div className='text-21'>Возникновения</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='new-project'>
              <div className='text-26'>
                <div className='frame-13'>
                  <div className='name-9'>Выжимка помощника</div>
                  <div className='frame-14'>
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
              <div className='frame-15'>
                <div className='remix-icons-line-map-car-line-4-wrapper'>
                  <RemixIconsLineMapCarLine5 className='icon-instance-node-2' color='#8C57FF' />
                </div>
                <div className='remix-icons-line-wrapper'>
                  <RemixIconsLineSystemArrowRightLine1 className='icon-instance-node-2' color='#8C57FF' />
                </div>
              </div>
            </div>
          </div>
          <div className='row-11'>
            <img className='element-3' alt='Element' src='../../static/img/2-23-2024.svg' />
            <img className='element-4' alt='Element' src='/static/img/3-2-26.svg' />
            <img className='element-5' alt='Element' src='../../static/img/7-3.svg' />
            <img className='element-6' alt='Element' src='/static/img/5.svg' />
            <img
              className='AI-ask-AI-how-ti'
              alt='Ai ask AI how ti'
              src='/static/img/ai-ask-ai-how-ti-improve-banner.svg'
            />
          </div>
          <div className='row-11' />
          <div className='row-3'>
            <div className='list-7'>
              <div className='progress'>
                <div className='overlap-group-5'>
                  <img className='ellipse-2' alt='Ellipse' src='/static/img/ellipse.svg' />
                  <div className='text-27'>72%</div>
                </div>
              </div>
              <div className='text-28'>
                <div className='text-29'>User experience Design</div>
                <div className='text-30'>120 Tasks</div>
              </div>
            </div>
            <div className='list-7'>
              <div className='progress'>
                <div className='overlap-group-5'>
                  <img className='ellipse-2' alt='Ellipse' src='/static/img/ellipse-1.svg' />
                  <div className='text-27'>72%</div>
                </div>
              </div>
              <div className='text-28'>
                <div className='text-29'>User experience Design</div>
                <div className='text-30'>120 Tasks</div>
              </div>
            </div>
            <div className='list-7'>
              <div className='progress'>
                <div className='overlap-group-5'>
                  <img className='ellipse-2' alt='Ellipse' src={'/static/img/ellipse-2.svg'} />
                  <div className='text-27'>72%</div>
                </div>
              </div>
              <div className='text-28'>
                <div className='text-29'>User experience Design</div>
                <div className='text-30'>120 Tasks</div>
              </div>
            </div>
          </div>
        </div>
        <div className='div-9' />
        <div className='div-9' />
      </div>
    </div>
  )
}

export default DashboardBuilder
