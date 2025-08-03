async function loadReferences() {
  const res = await fetch('/api/references');
  const result = await res.json();

  const container = document.getElementById('reference-list');
  if (!container) return;

  const rows = result.data || result;

  container.innerHTML = `
    <table class="ref-table">
      <thead>
        <tr>
          <th>ชื่อบทความ</th>
          <th>PDF</th>
          <th>แก้ไข</th>
          <th>ลบ</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map(r => `
          <tr data-id="${r.id}">
            <td>
              <span class="title-text">${r.title}</span>
              <input type="text" class="title-edit" value="${r.title}" style="display:none; width:100%">
            </td>
            <td><a href="/pdf/${r.pdf_path}" target="_blank">📄 เปิด PDF</a></td>
            <td>
              <button class="edit-btn">✏️</button>
              <button class="save-btn" style="display:none;">💾</button>
            </td>
            <td>
              <form method="POST" action="/api/references/delete/${r.id}" onsubmit="return confirm('ลบจริงหรือไม่?')">
                <button type="submit">🗑</button>
              </form>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  // Add edit/save handlers
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const row = e.target.closest('tr');
      row.querySelector('.title-text').style.display = 'none';
      row.querySelector('.title-edit').style.display = 'block';
      row.querySelector('.edit-btn').style.display = 'none';
      row.querySelector('.save-btn').style.display = 'inline-block';
    });
  });

  document.querySelectorAll('.save-btn').forEach(btn => {
    btn.addEventListener('click', async e => {
      const row = e.target.closest('tr');
      const id = row.getAttribute('data-id');
      const newTitle = row.querySelector('.title-edit').value;

      const res = await fetch(`/api/references/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle })
      });

      if (res.ok) {
        row.querySelector('.title-text').textContent = newTitle;
        row.querySelector('.title-text').style.display = 'block';
        row.querySelector('.title-edit').style.display = 'none';
        row.querySelector('.edit-btn').style.display = 'inline-block';
        row.querySelector('.save-btn').style.display = 'none';
      } else {
        alert('❌ บันทึกไม่สำเร็จ');
      }
    });
  });
}

window.addEventListener('DOMContentLoaded', loadReferences);


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reference-form');
  const toggleBtn = document.getElementById('toggle-form-btn');

  toggleBtn.addEventListener('click', () => {
    const isVisible = form.style.display === 'block';
    form.style.display = isVisible ? 'none' : 'block';
    toggleBtn.textContent = isVisible ? '[+]' : '[−]';
  });
});
