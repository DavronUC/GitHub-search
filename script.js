const form = document.querySelector('.search-bar');
const input = document.querySelector('.search-bar input');
const noResults = document.querySelector('.no-results');

const avatar = document.querySelector('.avatar');
const name = document.querySelector('.name');
const username = document.querySelector('.username');
const joined = document.querySelector('.joined');
const bio = document.querySelector('.bio');
const repos = document.querySelector('.stats div:nth-child(1) strong');
const followers = document.querySelector('.stats div:nth-child(2) strong');
const following = document.querySelector('.stats div:nth-child(3) strong');
const locationEl = document.querySelector('.location');
const twitter = document.querySelector('.twitter');
const blog = document.querySelector('.blog');
const company = document.querySelector('.company');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = input.value.trim();

  if (!username) return;

  const url = `https://api.github.com/users/${username}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      noResults.style.display = 'block';
      return;
    }

    const data = await response.json();
    noResults.style.display = 'none';
    updateUI(data);

  } catch (err) {
    console.log('Xatolik:', err);
    noResults.style.display = 'block';
  }
});

function updateUI(user) {
  avatar.src = user.avatar_url;
  name.textContent = user.name || 'Not Available';
  username.textContent = '@' + user.login;
  joined.textContent = `Joined ${new Date(user.created_at).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })}`;
  bio.textContent = user.bio || 'This profile has no bio';
  repos.textContent = user.public_repos;
  followers.textContent = user.followers;
  following.textContent = user.following;
  locationEl.textContent = user.location || 'Not Available';
  twitter.textContent = user.twitter_username || 'Not Available';
  blog.textContent = user.blog || 'Not Available';
  blog.href = user.blog || '#';
  company.textContent = user.company || 'Not Available';
}
