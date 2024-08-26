const handleCommit = async (path: string, message: string) => {
  const res = await fetch('/api/vcs/commit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ path, message })
  });

  if (!res.ok) {
    const message = await res.json();
    throw new Error('(commit)' + message);
  }

  alert('successfully commit');
}