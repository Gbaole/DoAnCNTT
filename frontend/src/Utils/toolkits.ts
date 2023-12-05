function convertCurrency(am: String) {
  return `${am.toLocaleString()}đ`;
}

function prettyDate(time: Date) {
  var date = new Date(time),
    diff = (Date.now() - date.getTime()) / 1000,
    day_diff = Math.floor(diff / 86400);
  if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return;

  return (
    (day_diff == 0 &&
      ((diff < 60 && "vừa xong") ||
        (diff < 120 && "1 phút") ||
        (diff < 3600 && Math.floor(diff / 60) + " phút") ||
        (diff < 7200 && "1 tiếng") ||
        (diff < 86400 && Math.floor(diff / 3600) + " tiếng"))) ||
    (day_diff == 1 && "Hôm qua") ||
    (day_diff < 7 && day_diff + " ngày") ||
    (day_diff < 31 && Math.ceil(day_diff / 7) + " tuần")
  );
}

function lorem(n: number) {
  const loremIpsum: String =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ultricies ligula. Sed eu congue purus. Nullam convallis diam urna, eu fringilla turpis finibus at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas viverra lacinia metus nec aliquam. Fusce id bibendum enim, id tristique tortor. Integer a elit justo. Mauris pellentesque lectus ac sapien varius, nec efficitur dolor imperdiet. Quisque vehicula justo ligula, sit amet sagittis felis sagittis at. Donec ut dui nec odio commodo laoreet. Praesent a bibendum libero. Nulla lacinia leo ut nulla fermentum, nec vulputate metus tempus. Nam elementum nunc vitae varius placerat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.";

  let paragraphs: String[] = [];
  for (let i = 0; i < n; i++) {
    paragraphs.push(loremIpsum);
  }

  return paragraphs;
}

function getCloudinaryVideoThumbnail(path) {
  if (path) {
    const array = path.split(".");
    array.pop();
    array.push("jpg");
    return array.join(".");
  }
  return "";
}

export { prettyDate, convertCurrency, lorem, getCloudinaryVideoThumbnail };
