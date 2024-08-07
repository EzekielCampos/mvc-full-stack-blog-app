module.exports = {
 
  // This will modify the date and convert it to month/day/year format
    format_date: (date) => {
      const year = new Date(date).getFullYear();
      const day = String(date.getDate());
      const month = String(date.getMonth() + 1); // Months are zero-based
      return `${month}/${day}/${year}`;
   
  }
  }
  