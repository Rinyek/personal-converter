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

  let html = `<div class="chat-container">
    <div class="chat-header">${title} (${participants}명)</div>`;

  for (const [_, sender, time, side, content] of messages) {
    html += `
    <div class="message ${side}">
      ${side === "left" ? `<div class="sender">${sender}</div>` : ""}
      <div class="bubble">${content}</div>
      <div class="time">${time}</div>
    </div>`;
  }

  html += `</div>`;
  document.getElementById("result").innerHTML = html;
}