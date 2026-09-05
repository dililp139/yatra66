export const googleConsentHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign in with Google - yatra666</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    body {
      background: #f0f4f9;
      color: #1f1f1f;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1.5rem 1rem;
    }
    .card {
      background: #ffffff;
      width: 100%;
      max-width: 440px;
      border-radius: 28px;
      padding: 2.25rem 2rem;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
      border: 1px solid #e1e3e1;
    }
    .google-logo {
      display: block;
      margin-bottom: 1.25rem;
    }
    h1 {
      font-size: 1.55rem;
      font-weight: 500;
      color: #1f1f1f;
      margin-bottom: 0.35rem;
      letter-spacing: -0.2px;
    }
    .subtitle {
      font-size: 1rem;
      color: #444746;
      margin-bottom: 1.5rem;
      line-height: 1.4;
    }
    .app-brand {
      color: #0b57d0;
      font-weight: 600;
    }
    .consent-banner {
      background: #f8fafd;
      border: 1px solid #d3e3fd;
      border-radius: 12px;
      padding: 1rem;
      font-size: 0.86rem;
      color: #444746;
      margin-bottom: 1.5rem;
      line-height: 1.45;
    }
    .consent-banner strong {
      color: #1f1f1f;
    }
    .permissions-list {
      list-style: none;
      margin: 0.75rem 0 0.25rem;
      font-size: 0.825rem;
    }
    .permissions-list li {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      margin-bottom: 0.45rem;
      color: #303030;
    }
    .permissions-list svg {
      color: #0b57d0;
      flex-shrink: 0;
      margin-top: 2px;
    }
    .form-group {
      margin-bottom: 1.25rem;
    }
    label {
      display: block;
      font-size: 0.825rem;
      font-weight: 600;
      color: #444746;
      margin-bottom: 0.4rem;
    }
    input {
      width: 100%;
      padding: 0.85rem 1rem;
      border: 1px solid #747775;
      border-radius: 8px;
      font-size: 0.95rem;
      color: #1f1f1f;
      outline: none;
      transition: all 0.2s;
    }
    input:focus {
      border-color: #0b57d0;
      box-shadow: 0 0 0 2px rgba(11, 87, 208, 0.2);
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 0.75rem;
      margin-top: 2rem;
    }
    .btn-cancel {
      background: transparent;
      border: none;
      color: #0b57d0;
      font-weight: 600;
      font-size: 0.9rem;
      padding: 0.6rem 1.25rem;
      border-radius: 20px;
      cursor: pointer;
      transition: background 0.15s;
    }
    .btn-cancel:hover {
      background: #f0f4f9;
    }
    .btn-submit {
      background: #0b57d0;
      border: none;
      color: #ffffff;
      font-weight: 600;
      font-size: 0.9rem;
      padding: 0.7rem 1.6rem;
      border-radius: 20px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12);
    }
    .btn-submit:hover {
      background: #0842a0;
      box-shadow: 0 2px 8px rgba(11, 87, 208, 0.35);
    }
    .footer {
      width: 100%;
      max-width: 440px;
      display: flex;
      justify-content: space-between;
      margin-top: 1.25rem;
      font-size: 0.75rem;
      color: #747775;
      padding: 0 0.5rem;
    }
    .footer a {
      color: #747775;
      text-decoration: none;
      margin-left: 1rem;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="card">
    <svg class="google-logo" width="40" height="40" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
    </svg>

    <h1>Sign in with Google</h1>
    <div class="subtitle">Choose an account to continue to <strong class="app-brand">yatra666</strong></div>

    <div class="consent-banner">
      To continue, Google will share your name, email address, language preference, and profile picture with <strong>yatra666</strong>.
      <ul class="permissions-list">
        <li>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>See your primary Google Account email address</span>
        </li>
        <li>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>See your personal info, including name and public profile details</span>
        </li>
      </ul>
    </div>

    <form id="googleAuthForm">
      <div class="form-group">
        <label for="googleEmail">Google Email address</label>
        <input type="email" id="googleEmail" name="email" placeholder="name@gmail.com" required autofocus />
      </div>

      <div class="form-group">
        <label for="googleName">Your Name</label>
        <input type="text" id="googleName" name="name" placeholder="First and last name" required />
      </div>

      <div class="actions">
        <button type="button" class="btn-cancel" onclick="window.close()">Cancel</button>
        <button type="submit" class="btn-submit">
          <span>Approve & Continue</span>
        </button>
      </div>
    </form>
  </div>

  <div class="footer">
    <span>English (United States)</span>
    <div>
      <a href="#" onclick="return false;">Help</a>
      <a href="#" onclick="return false;">Privacy</a>
      <a href="#" onclick="return false;">Terms</a>
    </div>
  </div>

  <script>
    document.getElementById('googleAuthForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('googleEmail').value.trim();
      const name = document.getElementById('googleName').value.trim();
      if (!email || !name) return;

      const user = {
        email: email,
        name: name,
        avatarUrl: 'https://lh3.googleusercontent.com/a/default-user',
        authProvider: 'google'
      };

      if (window.opener && !window.opener.closed) {
        window.opener.postMessage({
          type: 'GOOGLE_AUTH_SUCCESS',
          user: user
        }, '*');
        window.close();
      } else {
        alert('Google account approved for yatra666: ' + name + ' (' + email + ')');
      }
    });
  </script>
</body>
</html>`;