# React Hook Infinite Loop Debugging - Fix Stale Closure Bug in useEffect

## Scenario
A user profile feature allows editing the display name. When saving a new display name, the backend confirms the update **immediately**, but the UI sometimes remains stale (shows the old name) until you reload the page. There are no error messages.

**Goal:** Debug and fix the React effect logic so that *after a save*, the UI always shows the updated display name from the backend, with no reloads.

## Setup Instructions

1. **Prerequisites:**
   - Docker and Docker Compose installed

2. **Clone this repository and enter the project directory.**

3. **Start the environment:**
   ```sh
   ./run.sh
   ```
   This will build and start both mock backend (port 4000) and React frontend (port 3000).

4. **Open the React app:**
   - Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Task Steps

1. **Edit the display name and save.**
2. Observe that sometimes the UI still shows the *old* display name even though the save "works" (the backend data is correct).
3. **Debug the React code in `frontend/src/profile.jsx`:**
   - Focus on the `useEffect` logic and how the profile is loaded/refetched.
   - Identify why the UI does not update after saving.
   - Refactor the `useEffect` dependencies and any related logic to ensure the component always fetches and displays the latest server state *after a save*—no stale data!
4. **Verify your fix:**
   - Change the display name and save.
   - The UI should now immediately show the backend's latest display name, every time.

## Notes
- The backend is very simple and always updates immediately.
- Only the React effect/dependency bug is in scope.
- **No need to change backend or Docker setup.**
