import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import classnames from 'classnames';
import ArrowPng from '@/icons/arrow.png';
import BarsPng from '@/icons/bars.png';
import MapPinPng from '@/icons/mapPin.png';
import CalendarPng from '@/icons/calendar.png';
import HatPng from '@/icons/hat.png';
import ClockPng from '@/icons/clock.png';
import PeoplePng from '@/icons/people.png';
import moment from 'moment';
import style from './style.module.sass';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const GroupPage = () => {
  const { slug } = useParams();
  const [group, setGroup] = useState<any>();

  useEffect(() => {
    fetch(`/api/v1/en/groups/${slug}`)
      .then((response) => response.json())
      .then(({ data }) => {
        setGroup(data);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!group) return null;

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
    isSequential && schedule[0].day !== schedule[schedule.length - 1].day
      ? `${WEEKDAYS[parseInt(schedule[0].day) - 1]}-${
          WEEKDAYS[parseInt(schedule[schedule.length - 1].day) - 1]
        }`
      : schedule
          .map((item: any) => WEEKDAYS[parseInt(item.day) - 1])
          .join(', ');

  console.log(group);

  const featureList = [
    {
      icon: BarsPng,
      name: 'Age group and level',
      values: [
        `${group.age_groups.join(', ')} year olds - ${
          group.difficulty_type.name
        }`,
      ],
    },
    {
      icon: MapPinPng,
      name: 'Location',
      values: [group.location.name, group.location.city],
    },
    {
      icon: CalendarPng,
      name: 'Duration',
      values: [
        `${moment(group.start_date).format('MMMM do YYYY')} - ${moment(
          group.end_date
        ).format('MMMM do YYYY')}`,
      ],
    },
    {
      icon: HatPng,
      name: 'Available spots',
      values: [`${group.capacity - group.attendees} spots left`],
    },
    {
      icon: ClockPng,
      name: 'Schedule',
      values: [
        `${scheduleDays} | ${schedule[0].start_time.slice(
          0,
          -3
        )}-${schedule[0].end_time.slice(0, -3)}`,
      ],
      unique: true,
    },
    {
      icon: PeoplePng,
      name: 'Contacts',
      values: [`${group.provider.phone} | ${group.provider.email}`],
      unique: true,
    },
  ];

  return (
    <div className={style.pageWrapper}>
      <Link to="/" className={style.backButton}>
        <img src={ArrowPng} alt="<" />
      </Link>
      <div className={style.groupContent}>
        <div className={style.imageWrapper}>
          {group?.activity.images.map((image: any) => (
            <img
              key={image.name}
              src={`https://dev-api.exoclass.com/${image.path}`}
              alt={image.name}
            />
          ))}
        </div>
        <h1 className={style.groupTitle}>{group.name}</h1>
        <div className={style.featureWrapper}>
          {featureList.map((item) => (
            <div key={item.name} className={style.feature}>
              <img src={item.icon} alt="badge" />
              <div className={style.featureText}>
                <span>{item.name}</span>
                {item.values.map((value) => (
                  <span
                    key={value}
                    className={classnames({ [style.gray]: item.unique })}
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <h3 className={style.descriptionTitle}>Description</h3>
        <div
          dangerouslySetInnerHTML={{ __html: group.activity.description }}
          className={style.descriptionText}
        />
      </div>
      <div className={style.sideWrapper}>
        <span>Select participants</span>
      </div>
    </div>
  );
};

export default GroupPage;
