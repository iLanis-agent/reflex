// Reflex engine - stats + rating, node-testable
function stats(times) {
  if (!times.length) return null;
  const s = times.slice().sort((a, b) => a - b);
  const sum = times.reduce((a, b) => a + b, 0);
  return {
    avg: Math.round(sum / times.length),
    best: s[0],
    worst: s[s.length - 1],
    median: s.length % 2 ? s[(s.length - 1) / 2] : Math.round((s[s.length/2 - 1] + s[s.length/2]) / 2)
  };
}
// rough percentile vs published human visual reaction distributions (~N(273, 45) for simple click)
function percentile(ms) {
  const mean = 273, sd = 45;
  const z = (ms - mean) / sd;
  // erf approximation
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z * z / 2);
  let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  p = z > 0 ? 1 - p : p;
  return Math.max(1, Math.min(99, Math.round((1 - p) * 100))); // % of people you beat
}
function rating(avg) {
  if (avg < 180) return { label: 'F1 driver', note: 'Start lights are scared of you.' };
  if (avg < 220) return { label: 'Esports pro', note: 'Faster than most competitive players.' };
  if (avg < 260) return { label: 'Sharp', note: 'Above average reflexes.' };
  if (avg < 300) return { label: 'Average human', note: 'Right in the middle of the bell curve.' };
  if (avg < 350) return { label: 'Warming up', note: 'A little slow - caffeine or sleep debt?' };
  return { label: 'Asleep at the wheel', note: 'Try again after coffee.' };
}
if (typeof module !== 'undefined') module.exports = { stats, percentile, rating };
