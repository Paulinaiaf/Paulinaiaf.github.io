const GAS_ENDPOINT = "https://script.google.com/macros/s/AKfycbwp-o35fkDcGvOug7Pk2zNb_9JVSkYLbyX64T4PstBCsrsh6SEuUi1CMK1HKqqM2RIC5w/exec";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const btn = form.querySelector('.submit-btn');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Enviando...';
    btn.disabled = true;

    const payload = {
      firstName: document.getElementById('firstName').value.trim(),
      lastName:  document.getElementById('lastName').value.trim(),
      email:     document.getElementById('email').value.trim(),
      subject:   document.getElementById('subject').value.trim(),
      message:   document.getElementById('message').value.trim()
    };

    try {
      await fetch(GAS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',                         // simple, evita CORS
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      btn.innerHTML = '<i class="bi bi-check-circle me-2"></i>¡Mensaje enviado!';
      btn.classList.remove('btn-primary'); btn.classList.add('btn-success');
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        btn.classList.remove('was-validated');
        btn.classList.remove('btn-success'); btn.classList.add('btn-primary');
        form.reset();
      }, 2000);

    } catch (err) {
      console.error(err);
      btn.innerHTML = '<i class="bi bi-exclamation-triangle me-2"></i>Error al enviar';
      btn.classList.remove('btn-primary'); btn.classList.add('btn-danger');
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        btn.classList.remove('btn-danger'); btn.classList.add('btn-primary');
      }, 3000);
    }
  });
});
