// pages/dashboard.tsx
import { useEffect, useState } from 'react';
import { Reminder } from '../types/reminder';
import { User } from '../types/user';
import { Event } from '../types/event';
import styles from "../pages/Dashboard.module.css";

const Dashboard = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const remindersResponse = await fetch('/api/reminders/getReminders');
        const remindersData: Reminder[] = await remindersResponse.json();
        setReminders(remindersData);
  
        const usersResponse = await fetch('/api/users/getUsers');
        const usersData: User[] = await usersResponse.json();
        setUsers(usersData);
  
        const eventsResponse = await fetch('/api/events/getEvents');
        const eventsData: Event[] = await eventsResponse.json();
        setEvents(eventsData);
  
        setLoading(false);
      } catch {
        setError('Failed to load data');
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  if (loading) return <p className={styles.loading}>Loading data...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <section>
        <h2>Reminders</h2>
        <ul>
          {reminders.map((reminder) => (
            <li key={reminder.id}>
              <strong>Type:</strong> {reminder.type}, <strong>Date:</strong> {new Date(reminder.scheduledDate).toLocaleString()}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>Username:</strong> {user.username}, <strong>Email:</strong> {user.email}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Events</h2>
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <strong>Title:</strong> {event.title}, <strong>Date:</strong> {new Date(event.date).toLocaleString()}, <strong>Participants:</strong> {event.participants.join(', ')}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
