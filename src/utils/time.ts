export function getRelatifTime(postTime: Date): string {
  const now = new Date();
  const postDate = postTime.getTime();
  const selisihDetik = Math.floor((now.getTime() - postDate) / 1000);

  if (selisihDetik < 60) {
    return `${selisihDetik}s`;
  }

  const selisihMenit = Math.floor(selisihDetik / 60);
  if (selisihMenit < 60) {
    return `${selisihMenit}m`;
  }

  const selisihJam = Math.floor(selisihMenit / 60);
  if (selisihJam < 24) {
    return `${selisihJam}h`;
  }

  const selisihHari = Math.floor(selisihJam / 24);
  return `${selisihHari}d`;
}
