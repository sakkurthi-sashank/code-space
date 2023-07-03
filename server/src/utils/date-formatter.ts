export const dateFormatter = (date: string | number | Date): string => {
  const convertedDate = new Date(date);
  const formateDate = convertedDate.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "numeric",
  });
  const formateTime = convertedDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${formateDate} ${formateTime}`;
};
