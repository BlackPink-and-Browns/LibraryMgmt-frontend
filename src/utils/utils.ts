export function getDaysLeft(expiresAt: string | null): number | null {
    if (!expiresAt) return null;

    const expiresDate = new Date(expiresAt);
    const today = new Date();

    // Strip time (compare only dates)
    const expiresUTC = new Date(expiresDate.toDateString());
    const todayUTC = new Date(today.toDateString());

    const diffTime = expiresUTC.getTime() - todayUTC.getTime();
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return daysLeft;
  }

  export function formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }