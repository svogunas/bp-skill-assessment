import { useEffect, useState } from 'react';
import style from './style.module.sass';
import { Link } from 'react-router-dom';
import Button from '@components/Button';
import PeoplePng from './people.png';
import CalendarPng from './calendar.png';
import MapPinPng from './mapPin.png';
import ClockPng from './clock.png';
import HatPng from './hat.png';
import classnames from 'classnames';
import moment from 'moment';
import useUser from '@/hooks/useUser';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Home = () => {
  const { isUser } = useUser();
  const [groups, setGroups] = useState<any>();

  useEffect(() => {
    fetch('/api/v1/en/groups?provider_key=7792d545-2bc6-4ee6-b96e-51bdf1d0d855')
      .then((response) => response.json())
      .then(({ data }) => {
        setGroups(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={style.homeWrapper}>
      <h1>Currently planned groups</h1>
      <div className={style.groupWrapper}>
        {!!groups &&
          groups.map((group: any) => {
            const schedule = group.group_days_schedule;

            let isSequential = true;
            let previousDay: number;
            schedule.forEach((item: any) => {
              const currentDay = parseInt(item.day);
              if (!isSequential) return;
              if (!previousDay) {
                previousDay = currentDay;
                return;
              }
              if (currentDay - previousDay === 1) {
                previousDay = currentDay;
                return;
              }
              isSequential = false;
            });

            const scheduleDays =
              isSequential &&
              schedule[0].day !== schedule[schedule.length - 1].day
                ? `${WEEKDAYS[parseInt(schedule[0].day) - 1]}-${
                    WEEKDAYS[parseInt(schedule[schedule.length - 1].day) - 1]
                  }`
                : schedule
                    .map((item: any) => WEEKDAYS[parseInt(item.day) - 1])
                    .join(', ');

            return (
              <div
                key={group.id}
                className={classnames(style.groupCard, {
                  [style.loggedIn]: isUser,
                })}
              >
                <Link to={`/${group.external_key}`} className={style.groupContent}>
                  <img src={group.image} alt="cover" />
                  <div className={classnames(style.topInfo, style.spots)}>
                    <img src={PeoplePng} alt="people" />
                    <span>{`${
                      group.capacity - group.attendees
                    } spots left`}</span>
                  </div>
                  <div className={classnames(style.topInfo, style.date)}>
                    <img src={CalendarPng} alt="calendar" />
                    <span>{moment(group.start_date).format('MMMM Do')}</span>
                  </div>
                  <h3 className={style.groupTitle}>{group.name}</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: group.activity.description,
                    }}
                    className={style.groupDescription}
                  />
                  <div className={classnames(style.bottomInfo, style.location)}>
                    <img src={MapPinPng} alt="address" />
                    <span>{`${group.location.name}, ${group.location.city}`}</span>
                  </div>
                  <div className={classnames(style.bottomInfo, style.schedule)}>
                    <img src={ClockPng} alt="clock" />
                    <span>{`${scheduleDays} ${schedule[0].start_time.slice(
                      0,
                      -3
                    )}-${schedule[0].end_time.slice(0, -3)}`}</span>
                  </div>
                  <div className={style.badgesWrapper}>
                    <div className={style.badge}>
                      <img src={HatPng} alt="Age" />
                      <span>{`${group.age_groups.join(', ')} year olds`}</span>
                    </div>
                    <div className={style.badge}>
                      <span>{group.difficulty_type.name}</span>
                    </div>
                  </div>
                </Link>
                {isUser && (
                  <Button className={style.enlistButton}>
                    {'Subscribe >'}
                  </Button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
