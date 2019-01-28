// tslint:disable:no-console
import * as React from 'react';
import * as subDays from 'date-fns/sub_days';
import * as format from 'date-fns/format';
import * as isSameDay from 'date-fns/is_same_day';

export interface IConference {
  name: string;
  url: string;
  startDate: string;
  endDate: string;
  city: string;
  country: string;
  twitter: string;
}

export interface INotification {
  conference: IConference;
  date: Date
}

export default class ConferenceItem extends React.Component<{ data: IConference }, {}> {

  public createNotification = async (conference: IConference, days: number) => {
    const reg = await navigator.serviceWorker.getRegistration();
    if (reg) {
      // Список напоминаний
      const notifications: INotification[] = JSON.parse(localStorage.getItem('notifications') || '[]');
      // Если напоминание уже есть, не добавлять. Иначе добавить в localStorage
      if (
        notifications.find(notification =>
          isSameDay(notification.conference.startDate, conference.startDate)
          && isSameDay(notification.date, subDays(conference.startDate, days))
        )
      ) {
        return reg.showNotification(`Конференция ${conference.name}`, {
          lang: 'ru-RU',
          body: 'Напоминание уже установлено',
        });
      } else {
        notifications.push({ conference, date: subDays(conference.startDate, days) });
        localStorage.setItem('notifications', JSON.stringify(notifications));

        return reg.showNotification(`Конференция ${conference.name}`, {
          lang: 'ru-RU',
          body: `Напоминание запланировано на ${format(subDays(conference.startDate, days), 'DD.MM.YY')}`,
        });
      }

    }
  };
  public addNotification = async (conference: IConference, days: number) => {
    if (!( 'Notification' in window )) {
      alert('Ваш браузер не поддерживает HTML5 Notifications');
    } else if (Notification.permission === 'granted') {
      return this.createNotification(conference, days);
    } else if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        return permission === 'granted' ? this.createNotification(conference, days) : Promise.resolve(null);
      });
    }
  };

  public render () {
    const conference = this.props.data;
    return (
      <div className={'conference'}>
        <span><a href={conference.url}>{conference.name}</a></span>
        <span className={'conference__time'}>{format(conference.startDate, 'DD.MM.YYYY')} - {format(conference.endDate, 'DD.MM.YYYY')}</span>
        <span>{conference.city}, {conference.country}</span>
        <span className="conference__alarm">
          <svg className="conference__alarm-icon">
            <use xlinkHref={'#icon-alarm_add'}/>
          </svg>
          <span className={'conference__alarm-day'} onClick={this.addNotification.bind(this, conference, 3)}>3d</span>
          <span className={'conference__alarm-day'} onClick={this.addNotification.bind(this, conference, 7)}>7d</span>
          <span className={'conference__alarm-day'} onClick={this.addNotification.bind(this, conference, 14)}>14d</span>
        </span>
      </div>
    );
  }
}
