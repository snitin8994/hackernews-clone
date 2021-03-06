export function timeFromUnix(time) {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(Math.floor(between / 60), " minute");
  } else if (between < 86400) {
    return pluralize(Math.floor(between / 3600), " hour");
  } else if (between < (86400 * 365)) {
    return pluralize(Math.floor(between / 86400), " day")
  }
  else {
    return pluralize(Math.floor(between / (86400*365)), " year");

  }
}

function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return time + label + "s";
}
