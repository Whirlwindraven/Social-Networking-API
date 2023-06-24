// Function to append the appropriate suffix to the date
const appendDateSuffix = (date) => {
    let dateString = date.toString();
  
    // Gets the last digit of the dateString
    const lastDigit = dateString.slice(-1);
  
    switch (lastDigit) {
      case '1':
        dateString += 'st';
        break;
      case '2':
        dateString += 'nd';
        break;
      case '3':
        dateString += 'rd';
        break;
      default:
        dateString += 'th';
        break;
    }
  
    return dateString;
  };
  
  // Function to format a timestamp
  module.exports = (
    timestamp,
    { monthLength = 'short', dateSuffix = true } = {}
  ) => {
    // Month names mapping
    const monthNames = {
      0: monthLength === 'short' ? 'Jan' : 'January',
      1: monthLength === 'short' ? 'Feb' : 'February',
      2: monthLength === 'short' ? 'Mar' : 'March',
      3: monthLength === 'short' ? 'Apr' : 'April',
      4: 'May',
      5: monthLength === 'short' ? 'Jun' : 'June',
      6: monthLength === 'short' ? 'Jul' : 'July',
      7: monthLength === 'short' ? 'Aug' : 'August',
      8: monthLength === 'short' ? 'Sep' : 'September',
      9: monthLength === 'short' ? 'Oct' : 'October',
      10: monthLength === 'short' ? 'Nov' : 'November',
      11: monthLength === 'short' ? 'Dec' : 'December',
    };
  
    // Create a new Date object from the timestamp
    const dateObj = new Date(timestamp);
  
    // Format month using the monthNames mapping
    const month = monthNames[dateObj.getMonth()];
  
    // Format the day of the month
    const dayOfMonth = dateSuffix
      ? appendDateSuffix(dateObj.getDate())
      : dateObj.getDate();
  
    // Get the year
    const year = dateObj.getFullYear();
  
    // Get the hour in 12-hour format
    let hour = dateObj.getHours() > 12 ? dateObj.getHours() - 12 : dateObj.getHours();
  
    // If hour is 0 (12:00am), change it to 12
    hour = hour === 0 ? 12 : hour;
  
    // Get the minutes, padded with a leading zero if less than 10
    const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();
  
    // Determine if it's AM or PM
    const period = dateObj.getHours() >= 12 ? 'PM' : 'AM';
  
    // Format the timestamp
    const formattedTimestamp = `${month} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${period}`;
  
    return formattedTimestamp;
  };
  