export const customToFixed = (value: number, digit: number = 2) => {
  if (Number.isInteger(value)) return value;
  const factor = Math.pow(10, digit);
  return Math.trunc(value * factor) / factor;
};

export const generateColors = (items: string[]): Record<string, string> => {
  const baseColors = [
    "#8884d8",
    "#f08080",
    "#82ca9d",
    "#87ceeb",
    "#4682b4",
    "#f4a460",
    "#dda0dd",
    "#6495ed",
    "#ffb6c1",
    "#ffa07a",
    "#cd5c5c",
    "#6b7280",
    "#10b981",
    "#f59e0b",
    "#3b82f6",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
    "#20b2aa",
    "#9370db",
    "#00ced1",
    "#fa8072",
    "#66cdaa",
    "#d8bfd8",
    "#bc8f8f",
    "#87cefa",
    "#e9967a",
  ];
  const colors: Record<string, string> = {};
  items.forEach((item, index) => {
    colors[item] = baseColors[index % baseColors.length];
  });
  return colors;
};

export const generateChannelColors = (
  channels: string[]
): Record<string, string> => {
  const baseColors = [
    "#8884d8",
    "#f08080",
    "#82ca9d",
    "#87ceeb",
    "#4682b4",
    "#f4a460",
    "#dda0dd",
    "#6495ed",
    "#ffb6c1",
    "#ffa07a",
    "#cd5c5c",
    "#6b7280",
    "#10b981",
    "#f59e0b",
    "#3b82f6",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
  ];
  const colors: Record<string, string> = {};
  channels.forEach((channel, index) => {
    colors[channel] = baseColors[index % baseColors.length];
  });
  return colors;
};
