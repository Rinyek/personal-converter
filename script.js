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

  let messageHTML = "";
  let lastSender = null;

  for (const [_, sender, time, side, content] of messages) {
    const showSender = side === "left" && sender !== lastSender;
    messageHTML += `
    <div class="message ${side}">
      ${showSender ? `<div class="sender">${sender}</div>` : ""}
      <div class="bubble">${content}</div>
      <div class="time">${time}</div>
    </div>`;
    if (side === "left") lastSender = sender;
  }

  const fullHTML = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body { font-family: sans-serif; background: #f0f2f5; padding: 20px; }
    .chat-container { background: #ABC1D1; padding: 20px; border-radius: 8px; max-width: 700px; margin: 20px auto; }
    .chat-header { font-weight: bold; margin-bottom: 20px; }
    .message { margin-bottom: 16px; display: flex; flex-direction: column; }
    .sender { font-size: 0.85em; color: #444; margin-bottom: 4px; }
    .bubble { padding: 10px 16px; border-radius: 16px; max-width: 80%; line-height: 1.4; }
    .left .bubble { background: white; color: black; align-self: flex-start; }
    .right .bubble { background: #FFDE00; color: black; align-self: flex-end; }
    .time { font-size: 0.75em; color: #666; margin-top: 4px; align-self: flex-end; }
  </style>
</head>
<body>
  <div class="chat-container">
    <div class="chat-header">${title} (${participants}명)</div>${messageHTML}
  </div>
</body>
</html>`;

  document.getElementById("result").textContent = fullHTML;
}

function copyToClipboard() {
  const text = document.getElementById("result").textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert("복사 완료!");
  }, () => {
    alert("복사 실패");
  });
}