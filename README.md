# Blog Post Generator

## Cron

Daily: `0 6 * * *`

every 3 days: `* 6 */3 * *`

## Vercel

```
  "crons": [
    {
      "path": "/api/generate",
      "schedule": "0 6 * * *"
    }
  ],
```
