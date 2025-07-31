export function formatDate(date) {
    return new Date(date).toLocaleTimeString("fr", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "numeric",
    });
}