import { Queue } from 'workbox-background-sync'
import { registerRoute } from 'workbox-routing'
import { NetworkOnly } from 'workbox-strategies'

// Create a background sync queue
const bgSyncQueue = new Queue('apiQueue')

// Catch failed POST requests to /api/* and queue them
registerRoute(
  /\/api\/.*\/*.json/,
  new NetworkOnly({
    plugins: [bgSyncQueue]
  }),
  'POST'
)