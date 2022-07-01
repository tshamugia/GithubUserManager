const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// Network CALL for TOP Github USERS
export function GithubTopUsers(page) {
  const fetchUsers = fetch(
    `https://api.github.com/search/users?q=followers:%3E=1000&page=${page}&per_page=20`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${GITHUB_TOKEN}`,
      },
    }
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Something went wrong!!!');
  });
  return fetchUsers;
}

// Network CALL for User Detail Information
export function GithubUserDetailInfo(user) {
  const userDetail = fetch(`https://api.github.com/users/${user.login}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + `${GITHUB_TOKEN}`,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Something went wrong!!!');
  });
  return userDetail;
}

// Network CALL for User Detail Page Information
export function ForUserDetailPage(userName) {
  const userDetailPage = fetch(`https://api.github.com/users/${userName.id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + `${GITHUB_TOKEN}`,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Something went wrong!!!');
  });
  return userDetailPage;
}

// Network CALL for User Detail Page Repositories
export function ForUserRepositories(userName) {
  const repositories = fetch(
    `https://api.github.com/users/${userName.id}/orgs`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${GITHUB_TOKEN}`,
      },
    }
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Something went wrong!!!');
  });
  return repositories;
}

// Network CALL for User Detail Page ORGS
export function ForUserOrgs(userName) {
  const orgs = fetch(`https://api.github.com/users/${userName.id}/repos`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + `${GITHUB_TOKEN}`,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Something went wrong!!!');
  });
  return orgs;
}
