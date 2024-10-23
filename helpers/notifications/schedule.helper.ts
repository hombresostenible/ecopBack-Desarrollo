import cron from "node-cron";

import { sendNotificationToClientsController } from "../../controllers/User/notifications/websocketNotifications.controller";
import {
  cronNotifcationDailyController,
  cronNotifcationMonthlyController,
  cronNotifcationWeeklyController,
} from "../../controllers/User/notifications/notifications.controller";

// Función para sumar días a una fecha
const addDaysFromToday = (today: Date, days: number) => {
  const result = new Date(today);
  result.setDate(result.getDate() + days);
  return result;
};

// Función para sumar semanas a una fecha
const addWeeksFromToday = (today: Date, weeks: number) => {
  return addDaysFromToday(today, weeks * 7);
};

// Función para sumar meses a una fecha
const addMonthsFromToday = (today: Date, months: number) => {
  const result = new Date(today);
  result.setMonth(result.getMonth() + months);
  return result;
};

// CRON para notificaciones diarias
cron.schedule("58 13 * * *", async () => {
  const today = new Date();
  const notificationsToSend = await cronNotifcationDailyController(true, today);

  if (notificationsToSend) {
    for (const notification of notificationsToSend) {
      const userId = notification.userId;

      await sendNotificationToClientsController(userId, notification);

      notification.executionDate = addDaysFromToday(today, 1);
      await notification.save();
    }
  }
});

// CRON para notificaciones semanales
cron.schedule("0 9 * * *", async () => {
  const today = new Date();
  const notificationsToSend = await cronNotifcationWeeklyController(
    true,
    today
  );

  if (notificationsToSend) {
    for (const notification of notificationsToSend) {
      const userId = notification.userId;

      if (notification.executionDate) {
        await sendNotificationToClientsController(userId, notification);

        notification.executionDate = addWeeksFromToday(today, 1);
        await notification.save();
      }
    }
  }
});

// CRON para notificaciones mensuales
cron.schedule("0 9 * * *", async () => {
  const today = new Date();
  const notificationsToSend = await cronNotifcationMonthlyController(
    true,
    today
  );

  if (notificationsToSend) {
    for (const notification of notificationsToSend) {
      const userId = notification.userId;

      if (notification.executionDate) {
        await sendNotificationToClientsController(userId, notification);

        // Actualiza el executionDate desde la fecha actual
        notification.executionDate = addMonthsFromToday(today, 1);
        await notification.save();
      }
    }
  }
});
