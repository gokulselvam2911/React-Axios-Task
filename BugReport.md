# Bug Report – React Axios CRUD User Management App

## BUG-001 – No user-friendly error message when initial fetch fails

**Module / Feature:** User List – Fetch Users (GET)  
**Environment:**
- Browser: Chrome (latest)
- API: https://6716a7d63fcb11b265d33f1b.mockapi.io/crud-mock-api

**Pre-Conditions:**
- API URL is incorrect or server is unavailable (simulate by changing URL or turning off network).

**Steps to Reproduce:**
1. Start the app with a broken/invalid API URL.
2. Open the app in the browser.

**Expected Result:**
- A clear user-friendly message should appear, e.g.  
  *“Unable to load users. Please try again later.”*
- Spinner should stop after failure.

**Actual Result:**
- Spinner stops, but the user list remains empty.
- Error is only visible in the browser console (`console.error("Error fetching users:", error)`).
- No feedback shown to the end-user in the UI.

**Severity:** Medium  
**Priority:** Medium  
**Status:** New  
**Type:** Error Handling / UX  

---

## BUG-002 – No user-friendly message when add user (POST) fails

**Module / Feature:** Add User (POST)  
**Environment:**
- Browser: Chrome (latest)
- API: MockAPI

**Pre-Conditions:**
- Add form is accessible.
- API temporarily fails (broken URL / network issue).

**Steps to Reproduce:**
1. Open the app and navigate to **Add New User** form.
2. Fill all fields with valid data.
3. Temporarily break API URL or disconnect network.
4. Click **“Add User”**.

**Expected Result:**
- A clear UI message such as  
  *“Failed to add user. Please try again later.”*
- Form remains with existing data so user can retry.

**Actual Result:**
- Error is logged to console only (`console.error("Error adding user", error)`).
- User does not get any in-app notification.
- Form may reset depending on exact execution timing.

**Severity:** Medium  
**Priority:** Medium  
**Status:** New  
**Type:** Error Handling / UX  

---

## BUG-003 – No confirmation before deleting user

**Module / Feature:** Delete User (DELETE)  
**Environment:**
- Browser: Chrome (latest)
- API: MockAPI

**Pre-Conditions:**
- At least one user is visible in the list.

**Steps to Reproduce:**
1. Open the app and scroll to **User List**.
2. Click **“Delete”** on any user.

**Expected Result:**
- A confirmation dialog should appear, e.g.  
  *“Are you sure you want to delete this user?”*  
- Only upon confirmation should DELETE request be sent.

**Actual Result:**
- Clicking **“Delete”** immediately triggers a DELETE API call.
- User is deleted without any confirmation.

**Severity:** Medium  
**Priority:** Low  
**Status:** New  
**Type:** UX / Safety  

---

## BUG-004 – No visual indication when entire app is in saving state

**Module / Feature:** Add / Edit User – Saving State  
**Environment:**
- Browser: Chrome (latest)

**Pre-Conditions:**
- Either AddUser or EditUser form is submitted.

**Steps to Reproduce:**
1. Submit Add or Edit form with valid data.
2. Observe UI during save process.

**Expected Result:**
- Button shows loading (which it does 👍).
- Additionally, either:
  - Form fields should be disabled during save, or
  - There should be some global indication that saving is in progress.

**Actual Result:**
- Only the button shows spinner, but the rest of the form is still editable.
- User may think they can change inputs while save is already happening.

**Severity:** Low  
**Priority:** Low  
**Status:** New  
**Type:** UX / Usability  
