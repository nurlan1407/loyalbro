function formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is 0-indexed
    const year = date.getFullYear();
  
    return `${day}.${month}.${year}`;
  }

export default formatTimestamp  