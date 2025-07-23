# Token Verifier

Stateless JWT verifier for Cloudflare Workers.
Used to guard routes in distributed apps. No public HTTP access —  only callable via RPC.

---

## 🧩 How it works

This worker exposes no `fetch` method.
It must be bound as a service to other Workers using `wrangler.jsonc`.

Example binding:

```jsonc
{
  "services" : [{
    "service": "token-verifier",
    "binding": "TOKEN_VERIFIER",
    "entrypoint": "TokenVerifier"
  }]
}
```

## 🔐 JWT Secret
Required to verify tokens. Set it like this:

```bash
pnpm wrangler secret put JWT_SECRET
```

For local development, add this to `.dev.vars`:

```bash
JWT_SECRET=test
```

## 🪵 Logging with [cflo](https://github.com/gambonny/cflo)
This worker uses cflo for structured logging.

You can configure logs via `wrangler.jsonc` or the Cloudflare dashboard:

```jsonc
{
  "vars": {
    "LOG_LEVEL": "debug",  // "info", "warn", "error"
    "LOG_FORMAT": "json"   // or "pretty"
  }
}
```
