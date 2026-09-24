# Setting up the Prayer Vigil page (about 15 minutes)

You'll have three files: `index.html`, `naomi.jpg`, and `Code.gs`.

## Part 1: The Google Sheet (stores the sign-ups)

1. Go to sheets.google.com and create a blank sheet. Name it **Prayer Vigil for Naomi**.
2. Click **Extensions → Apps Script**.
3. Delete what's in the editor, paste in everything from `Code.gs`, and click **Save**.
4. Click **Deploy → New deployment**. Click the gear icon and choose **Web app**.
   - Description: Prayer vigil sign-ups
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**. Google will ask you to authorize it. Choose your account, then **Advanced → Go to project (unsafe) → Allow**. This warning is normal for your own scripts.
6. Copy the **Web app URL** (it ends in `/exec`).

The first sign-up creates a **Sign-ups** tab with names, cities, WhatsApp numbers, and who's leading. Phone numbers stay in your sheet and are never shown on the page.

## Part 2: Fill in the settings

Open `index.html` in any text editor and find the SETTINGS block near the bottom:

```js
START_GHANA_TIME: "2026-10-03T18:00",   // vigil start in Ghana time
ZOOM_LINK: "https://zoom.us/j/...",      // your Zoom link
SCRIPT_URL: "https://script.google.com/macros/s/.../exec"  // from Part 1
```

Until you add the date, the page says "Date to be announced" and still shows the hours.

## Part 3: Publish on GitHub Pages

1. On github.com, create a new **public** repository, for example `pray-for-naomi`.
2. Click **Add file → Upload files**, drag in `index.html` and `naomi.jpg`, and click **Commit changes**.
3. Go to **Settings → Pages**. Under "Branch," choose **main** and **/ (root)**, then click **Save**.
4. After a minute or two your page is live at `https://YOUR-USERNAME.github.io/pray-for-naomi/`.

Paste that link into the WhatsApp invitation.

## Making changes later

- To change the date or Zoom link, edit `index.html` on GitHub (pencil icon) and commit. The page updates in a minute or two.
- To remove a sign-up, delete that row in the **Sign-ups** tab of your Google Sheet.
- If you edit `Code.gs` later, use **Deploy → Manage deployments → Edit → New version** so the same URL keeps working.
