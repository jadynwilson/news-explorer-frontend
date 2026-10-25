const TOKEN_PREFIX = "mock-jwt-";
const USERS_KEY = "mockUsers";
const DELAY_MS = 400;

function respond(produceResult) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(produceResult());
      } catch (err) {
        reject(err.message);
      }
    }, DELAY_MS);
  });
}

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getEmailFromToken(token) {
  if (!token || !token.startsWith(TOKEN_PREFIX)) {
    throw new Error("Invalid token");
  }
  return token.slice(TOKEN_PREFIX.length);
}

function findUser(email) {
  const users = readJson(USERS_KEY, {});
  return users[email] || { email, name: email.split("@")[0] };
}

export function register({ email, name }) {
  return respond(() => {
    const users = readJson(USERS_KEY, {});
    if (users[email]) {
      throw new Error("This email is not available");
    }
    users[email] = { email, name };
    writeJson(USERS_KEY, users);
    return { email, name };
  });
}

export function login({ email }) {
  return respond(() => ({ token: `${TOKEN_PREFIX}${email}` }));
}

export function checkToken(token) {
  return respond(() => findUser(getEmailFromToken(token)));
}

export function getSavedArticles(token) {
  return respond(() => readJson(`saved:${getEmailFromToken(token)}`, []));
}

export function saveArticle(token, article) {
  return respond(() => {
    const key = `saved:${getEmailFromToken(token)}`;
    const saved = readJson(key, []);
    if (!saved.some((item) => item.url === article.url)) {
      saved.push(article);
      writeJson(key, saved);
    }
    return article;
  });
}

export function deleteArticle(token, url) {
  return respond(() => {
    const key = `saved:${getEmailFromToken(token)}`;
    const saved = readJson(key, []);
    writeJson(
      key,
      saved.filter((item) => item.url !== url),
    );
    return { url };
  });
}
