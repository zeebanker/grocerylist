# Firebase Setup Guide for Grocery List App

## Step 1: Create a Google Account (skip if you have one)
- Go to [accounts.google.com](https://accounts.google.com) and sign up

## Step 2: Create a Firebase Project
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Create a project"** (or "Add project")
3. Enter a project name: `grocery-list` (or whatever you like)
4. Google Analytics toggle → turn it **OFF** (not needed)
5. Click **"Create project"**
6. Wait for it to finish, then click **"Continue"**

## Step 3: Add a Web App
1. On the project overview page, click the **web icon** `</>` (it's in the center of the page, next to iOS and Android icons)
2. Enter an app nickname: `grocery-list-web`
3. Check ✅ **"Also set up Firebase Hosting"** → select your project
4. Click **"Register app"**
5. You'll see a config snippet that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB1234567890abcdefg",
  authDomain: "grocery-list-xxxxx.firebaseapp.com",
  databaseURL: "https://grocery-list-xxxxx-default-rtdb.firebaseio.com",
  projectId: "grocery-list-xxxxx",
  storageBucket: "grocery-list-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

6. **COPY THIS ENTIRE BLOCK** — you'll paste it to me later
7. Click **"Continue to console"**

> ⚠️ **IMPORTANT:** If you don't see a `databaseURL` in the config, that's OK — we'll get it in the next step.

## Step 4: Create the Realtime Database
1. In the left sidebar, click **"Build"** → **"Realtime Database"**
2. Click **"Create Database"**
3. Choose a location → pick **"United States (us-central1)"** (closest to Minnesota)
4. Select **"Start in test mode"** (we'll secure it later)
5. Click **"Enable"**
6. You'll see your database URL at the top, something like:
   `https://grocery-list-xxxxx-default-rtdb.firebaseio.com/`
7. **Copy this URL** if it wasn't in your config snippet from Step 3

## Step 5: Secure the Database (do this after testing)
1. Go back to **"Realtime Database"**
2. Click the **"Rules"** tab
3. Replace the rules with:

```json
{
  "rules": {
    "households": {
      "karkart-family": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

4. Click **"Publish"**

> This limits reads/writes to only the `households/karkart-family` path, blocking access to everything else in the database.
> **Do this AFTER we confirm everything works**, since test mode is easier for debugging.

## Step 6: Send Me the Config
Paste me the config snippet from Step 3 (and the database URL from Step 4 if it wasn't included). It will look something like:

```
apiKey: "AIzaSy..."
authDomain: "grocery-list-xxxxx.firebaseapp.com"
databaseURL: "https://grocery-list-xxxxx-default-rtdb.firebaseio.com"
projectId: "grocery-list-xxxxx"
storageBucket: "grocery-list-xxxxx.appspot.com"
messagingSenderId: "123456789"
appId: "1:123456789:web:abcdef123456"
```

Then I'll wire it into the app and give you updated files to upload to GitHub.

---

## Quick Reference: What Each Part Does

| Component | Purpose |
|---|---|
| **Realtime Database** | Stores your grocery data in the cloud, syncs across all phones |
| **Shared Household Key** | All family phones share the same data bucket — no login needed |
| **Database Rules** | Limits access to only the `karkart-family` path |
| **Firebase Hosting** | Optional — you can keep using GitHub Pages instead |

## Cost
Everything above is on Firebase's **free Spark plan**:
- 1 GB database storage
- 10 GB/month download
- 100 simultaneous connections

Your grocery list will use a tiny fraction of this. Essentially free forever.
