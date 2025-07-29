function convert() {
  const raw = document.getElementById("input").value;
  const nameMatch = raw.match(/<lightboard-kakaochat name="(.+?)" participants="(.+?)">/);
  if (!nameMatch) {
    alert("형식 오류: <lightboard-kakaochat> 태그 없음");
    return;
  }

  const title = nameMatch[1];
  const participants = nameMatch[2];
  const messages = [...raw.matchAll(/\[Message\]Sender:(.+?)\|Time:(.+?)\|Side:(left|right)\|Content:(.+)/g)];

  let body = `<lightboard-kakaochat name="${title}" participants="${participants}">\n`;

  for (const [_, sender, time, side, content] of messages) {
    body += `[Message]Sender:${sender}|Time:${time}|Side:${side}|Content:${content}\n`;
  }

  body += `</lightboard-kakaochat>`;

  const fullHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: sans-serif; background: #f0f2f5; padding: 20px; }
    lightboard-kakaochat { display: block; white-space: pre-line; font-family: monospace; background: #fff; padding: 20px; border: 1px solid #ccc; }
  </style>
</head>
<body data-id="lightboard-kakaochat">
${body}
</body>
</html>`;

  document.getElementById("result").innerText = fullHtml;
}

function copyToClipboard() {
  const text = document.getElementById("result").innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("복사 완료!");
  }, () => {
    alert("복사 실패");
  });
}