export function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " سال پیش";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " ماه پیش";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " روز پیش";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " ساعت پیش";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " دقیقه پیش";
  }
  return Math.floor(seconds) + " ثانیه پیش";
}

export function timeSince2(rawDate) {
  const secondsInAMinutes = 60;
  const secondsInAnHours = secondsInAMinutes * 60;
  const secondsInADay = 24 * secondsInAnHours;

  var dateRaw = new Date(rawDate);
  var interval = Math.floor((new Date() - dateRaw) / 1000);

  var days = Math.floor(interval / secondsInADay);

  var hours = Math.floor((interval - days * secondsInADay) / secondsInAnHours);

  var minutes = Math.floor(
    (interval - days * secondsInADay - hours * secondsInAnHours) /
      secondsInAMinutes
  );


  if (days > 2) {
    return `${dateRaw.toLocaleString("fa-IR", {
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })}`;
  } else {
    if (days > 0) {
      return days + " روز پیش";
    } else if (days === 0) {
      if (hours > 0) {
        return hours + " ساعت پیش";
      } else if (hours === 0) {
        if (minutes > 0) {
          return minutes + " دقیقه پیش";
        } else if (minutes === 0) {
          return "چند لحظه پیش";
        } else {
          return "زمان نادرست";
        }
      } else {
        return "زمان نادرست";
      }
    } else {
      return "زمان نادرست";
    }
  }
}

export function Gdate2Persian(date) {
  if (date) {
    var rawDate = new Date(date);
    return rawDate.toLocaleDateString('fa-IR')
  } else {
    return null;
  }
}
