/* =========================================================
   VIDHATA PLASTICS — FORM HANDLER
   js/form.js
   ========================================================= */

'use strict';

// ── Web3Forms API Key ─────────────────────────────────────
// Retrieve a free key from https://web3forms.com
const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE';

// ── Form Validation ───────────────────────────────────────
const validators = {
  required: (val) => val.trim() !== '' || 'This field is required',
  email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Please enter a valid email',
  phone: (val) => /^[\+]?[\d\s\-\(\)]{8,15}$/.test(val.trim()) || 'Please enter a valid phone number',
  minLength: (min) => (val) => val.trim().length >= min || `Minimum ${min} characters required`,
};

function validateField(input) {
  const rules = input.dataset.validate?.split(',').map(r => r.trim()) || [];
  let errorMsg = '';

  for (const rule of rules) {
    let result;
    if (rule === 'required') result = validators.required(input.value);
    else if (rule === 'email')    result = validators.email(input.value);
    else if (rule === 'phone')    result = validators.phone(input.value);
    else if (rule.startsWith('min:')) {
      const min = parseInt(rule.split(':')[1]);
      result = validators.minLength(min)(input.value);
    }

    if (result !== true) {
      errorMsg = result;
      break;
    }
  }

  const errorEl = document.getElementById(input.id + '-error');
  const isValid = !errorMsg;

  input.classList.toggle('error', !isValid);
  if (errorEl) {
    errorEl.textContent = errorMsg;
    errorEl.style.display = errorMsg ? 'flex' : 'none';
  }

  return isValid;
}

// ── Quote Form ────────────────────────────────────────────
function initQuoteForm() {
  const form = document.getElementById('quote-form');
  if (!form) return;

  const inputs = form.querySelectorAll('[data-validate]');
  const submitBtn = form.querySelector('[type="submit"]');
  const successMsg = document.getElementById('form-success');
  const errorMsg = document.getElementById('form-error-msg');

  // Live validation
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) validateField(input);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    let allValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) allValid = false;
    });

    if (!allValid) {
      // Scroll to first error
      const firstError = form.querySelector('.error');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Collect form data
    const data = new FormData(form);
    const fields = Object.fromEntries(data.entries());

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="icon-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12a9 9 0 11-6.219-8.56"/>
      </svg>
      Sending...
    `;

    // Build mailto link details
    const subject = `Quote Request from ${fields.name} - ${fields.company || 'N/A'}`;
    const rawBody = `New Quote Request from Vidhata Website\n\n` +
      `Name: ${fields.name}\n` +
      `Company: ${fields.company || 'N/A'}\n` +
      `Email: ${fields.email}\n` +
      `Phone: ${fields.phone || 'N/A'}\n` +
      `Product Type: ${fields.product_type || 'N/A'}\n` +
      `Message:\n${fields.message}\n\n` +
      `---\nSent from vidhata.co.in contact form`;

    const subjectEnc = encodeURIComponent(subject);
    const bodyEnc = encodeURIComponent(rawBody);

    // Attempt Web3Forms submission if key is configured
    let isWeb3FormsSubmitted = false;
    if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== 'YOUR_ACCESS_KEY_HERE') {
      try {
        const formData = new FormData();
        formData.append('access_key', WEB3FORMS_ACCESS_KEY);
        formData.append('name', fields.name);
        formData.append('company', fields.company || 'N/A');
        formData.append('email', fields.email);
        formData.append('phone', fields.phone || 'N/A');
        formData.append('product_type', fields.product_type || 'N/A');
        formData.append('message', fields.message);
        formData.append('from_name', 'Vidhata Plastics Website');
        formData.append('subject', subject);

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        const resData = await response.json();
        if (resData.success) {
          isWeb3FormsSubmitted = true;
          if (successMsg) {
            const successDesc = successMsg.querySelector('p');
            if (successDesc) {
              successDesc.innerHTML = `Your message was sent directly. We will get back to you within 24 hours.`;
            }
            const fallbackSection = successMsg.querySelector('div[style*="border-top"]');
            if (fallbackSection) fallbackSection.style.display = 'none';
          }
        }
      } catch (err) {
        console.warn('Web3Forms submission failed, falling back to mailto:', err);
      }
    }

    if (!isWeb3FormsSubmitted) {
      // Simulate processing delay for UX
      await new Promise(r => setTimeout(r, 800));

      // Open mailto link
      window.location.href = `mailto:vikrant@vidhata.co.in?cc=info@vidhata.co.in&subject=${subjectEnc}&body=${bodyEnc}`;

      // Populate fallback details
      const fallbackText = document.getElementById('fallback-text');
      if (fallbackText) fallbackText.value = rawBody;

      const btnWaFallback = document.getElementById('btn-wa-fallback');
      if (btnWaFallback) {
        btnWaFallback.href = `https://wa.me/919885100808?text=${encodeURIComponent('Hello Vidhata, here is my quote request:\n\n' + rawBody)}`;
      }

      // Toggle fallback action container
      const toggleBtn = document.getElementById('toggle-fallback');
      const fallbackActions = document.getElementById('fallback-actions');
      if (toggleBtn && fallbackActions) {
        toggleBtn.onclick = () => {
          const isHidden = fallbackActions.style.display === 'none' || fallbackActions.style.display === '';
          fallbackActions.style.display = isHidden ? 'flex' : 'none';
          toggleBtn.textContent = isHidden ? 'Hide Fallback Options' : "Mail App didn't open?";
        };
      }

      // Copy action
      const copyBtn = document.getElementById('btn-copy-fallback');
      if (copyBtn) {
        copyBtn.onclick = () => {
          navigator.clipboard.writeText(rawBody).then(() => {
            copyBtn.textContent = '✓ Copied!';
            setTimeout(() => { copyBtn.textContent = '📋 Copy Text'; }, 2000);
          });
        };
      }

      if (successMsg) {
        const fallbackSection = successMsg.querySelector('div[style*="border-top"]');
        if (fallbackSection) fallbackSection.style.display = 'block';
        const successDesc = successMsg.querySelector('p');
        if (successDesc) {
          successDesc.innerHTML = `We have opened your default mail client to dispatch your request to <strong>vikrant@vidhata.co.in</strong>.`;
        }
      }
    }

    // Show success
    form.style.display = 'none';
    if (successMsg) {
      successMsg.style.display = 'flex';
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
      </svg>
      Send Request
    `;
  });
}

// ── WhatsApp Click ────────────────────────────────────────
function initWhatsApp() {
  const waBtn = document.querySelector('.whatsapp-float');
  if (!waBtn) return;

  const phone = '919885100808';
  const message = encodeURIComponent('Hello Vidhata Plastics! I\'d like to discuss a manufacturing project.');
  waBtn.href = `https://wa.me/${phone}?text=${message}`;
}

// ── Newsletter Form ───────────────────────────────────────
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]')?.value;
    const btn = form.querySelector('button');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      form.querySelector('input').classList.add('error');
      return;
    }

    btn.textContent = '✓ Subscribed!';
    btn.style.background = 'var(--clr-success)';
    form.querySelector('input').value = '';
    setTimeout(() => {
      btn.textContent = 'Subscribe';
      btn.style.background = '';
    }, 3000);
  });
}

// ── Career Application Form ────────────────────────────────
function initCareerForm() {
  const form = document.getElementById('career-form');
  if (!form) return;

  const inputs = form.querySelectorAll('[data-validate]');
  const submitBtn = form.querySelector('[type="submit"]');
  const successMsg = document.getElementById('career-success');

  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let allValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) allValid = false;
    });

    if (!allValid) return;

    const data = new FormData(form);
    const fields = Object.fromEntries(data.entries());

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const subject = `Job Application: ${fields.position || 'General'} - ${fields.name}`;
    const rawBody = `Job Application\n\n` +
      `Name: ${fields.name}\n` +
      `Email: ${fields.email}\n` +
      `Phone: ${fields.phone}\n` +
      `Position: ${fields.position || 'N/A'}\n` +
      `Experience: ${fields.experience || 'N/A'} years\n` +
      `Cover Letter:\n${fields.cover_letter || 'N/A'}`;

    const subjectEnc = encodeURIComponent(subject);
    const bodyEnc = encodeURIComponent(rawBody);

    // Attempt Web3Forms submission if key is configured
    let isWeb3FormsSubmitted = false;
    if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== 'YOUR_ACCESS_KEY_HERE') {
      try {
        const formData = new FormData();
        formData.append('access_key', WEB3FORMS_ACCESS_KEY);
        formData.append('name', fields.name);
        formData.append('email', fields.email);
        formData.append('phone', fields.phone);
        formData.append('position', fields.position || 'N/A');
        formData.append('experience', fields.experience || 'N/A');
        formData.append('cover_letter', fields.cover_letter || 'N/A');
        formData.append('from_name', 'Vidhata Plastics Careers');
        formData.append('subject', subject);

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        const resData = await response.json();
        if (resData.success) {
          isWeb3FormsSubmitted = true;
          if (successMsg) {
            const successDesc = successMsg.querySelector('p');
            if (successDesc) {
              successDesc.innerHTML = `Your application was submitted directly. Our HR team will review it and get back to you.`;
            }
            const fallbackSection = successMsg.querySelector('div[style*="border-top"]');
            if (fallbackSection) fallbackSection.style.display = 'none';
          }
        }
      } catch (err) {
        console.warn('Web3Forms career submission failed, falling back to mailto:', err);
      }
    }

    if (!isWeb3FormsSubmitted) {
      await new Promise(r => setTimeout(r, 600));
      window.location.href = `mailto:info@vidhata.co.in?subject=${subjectEnc}&body=${bodyEnc}`;

      // Populate fallback details
      const fallbackText = document.getElementById('career-fallback-text');
      if (fallbackText) fallbackText.value = rawBody;

      // Toggle fallback action container
      const toggleBtn = document.getElementById('career-toggle-fallback');
      const fallbackActions = document.getElementById('career-fallback-actions');
      if (toggleBtn && fallbackActions) {
        toggleBtn.onclick = () => {
          const isHidden = fallbackActions.style.display === 'none' || fallbackActions.style.display === '';
          fallbackActions.style.display = isHidden ? 'flex' : 'none';
          toggleBtn.textContent = isHidden ? 'Hide Fallback Options' : "Mail App didn't open?";
        };
      }

      // Copy action
      const copyBtn = document.getElementById('career-btn-copy');
      if (copyBtn) {
        copyBtn.onclick = () => {
          navigator.clipboard.writeText(rawBody).then(() => {
            copyBtn.textContent = '✓ Copied!';
            setTimeout(() => { copyBtn.textContent = '📋 Copy to Clipboard'; }, 2000);
          });
        };
      }

      if (successMsg) {
        const fallbackSection = successMsg.querySelector('div[style*="border-top"]');
        if (fallbackSection) fallbackSection.style.display = 'block';
        const successDesc = successMsg.querySelector('p');
        if (successDesc) {
          successDesc.innerHTML = `Opening your default mail client to submit your application details to <strong>info@vidhata.co.in</strong>.`;
        }
      }
    }

    form.style.display = 'none';
    if (successMsg) {
      successMsg.style.display = 'flex';
    }
  });
}

// ── URL Autofill ──────────────────────────────────────────
function checkUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const productName = params.get('product');
  if (productName) {
    const messageField = document.getElementById('q-msg');
    const categoryField = document.getElementById('q-product');
    
    if (messageField) {
      messageField.value = `Hello, I am interested in inquiring about the following medical product: ${productName}.\n\nPlease send me technical specifications, certifications, and high-volume manufacturing pricing.`;
    }
    
    if (categoryField) {
      categoryField.value = 'Medical Device';
    }
  }
}

// ── Init All ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initQuoteForm();
  initWhatsApp();
  initNewsletter();
  initCareerForm();
  checkUrlParams();
});

