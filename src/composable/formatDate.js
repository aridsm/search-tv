export function useDate() {
  function formatDate(date) {
    const meses = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];
    let newData = new Date(date);
    let formatedDate =
      newData.getDate() +
      " " +
      meses[newData.getMonth()] +
      " " +
      newData.getFullYear();
    return formatedDate;
  }

  return { formatDate };
}
