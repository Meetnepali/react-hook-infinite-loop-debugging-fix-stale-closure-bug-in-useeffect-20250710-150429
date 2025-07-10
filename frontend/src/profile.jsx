import React, { useState, useEffect } from 'react';

export default function Profile() {
  const [displayName, setDisplayName] = useState('');
  const [editValue, setEditValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      const res = await fetch('http://localhost:4000/profile');
      if (res.ok) {
        const data = await res.json();
        setDisplayName(data.displayName);
        setEditValue(data.displayName);
      }
      setLoading(false);
    }
    fetchProfile();
    // BUG: Missing dependencies! Should refetch after save.
  }, []); // <-- Only runs on mount. Stale issue after save.

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    await fetch('http://localhost:4000/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ displayName: editValue })
    });
    setSaving(false);
    // The UI does not update because useEffect does not rerun!
  }

  return (
    <div style={{ padding: 24, maxWidth: 400 }}>
      <h2>User Profile</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div style={{ marginBottom: 16 }}>
            <b>Display Name:</b> {displayName}
          </div>
          <form onSubmit={handleSave}>
            <input
              data-testid="edit-input"
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              disabled={saving}
            />
            <button type="submit" disabled={saving}>Save</button>
          </form>
        </>
      )}
      {saving && <p>Saving...</p>}
    </div>
  );
}
