// async function loadReferences() {
//   const res = await fetch('/api/references');
//   const data = await res.json();

//   const list = document.getElementById('reference-list');
//   if (!list) return;

//   list.innerHTML = data.map(r => `
//     <section class="card">
//       <p>${r.title}</p>
//       <a href="/static/uploads/${r.pdf_path}" target="_blank">📄 เปิด PDF</a>
//       <form method="POST" action="/api/references/delete/${r.id}" onsubmit="return confirm('ลบจริงหรือไม่?')">
//         <button type="submit">🗑 ลบ</button>
//       </form>
//     </section>
//   `).join('');
// }

// window.addEventListener('DOMContentLoaded', loadReferences);
