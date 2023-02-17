function displayUsers(users) {
  const container = document.getElementById("users");
  container.innerHTML = "";
  container.appendChild(usersToHtml(users));
}

function usersToHtml(users) {
  const userElements = users.map((user) => {
    return html("p", {}, user.name);
  });

  return html("div", {}, userElements);
}

function filterUsersByName(users, searchString) {
  const regex = new RegExp(escapeRegExp(searchString).trim(), "i");
  return users.filter((user) => regex.test(user.name));
}

/**
 * Helper for dynamic creation of HTML elements
 * @param {string} tagName
 * @param {Object} attributes
 * @param {string | HTMLElement[]} contents
 */
function html(tagName, attributes, contents) {
  const el = document.createElement(tagName);
  if (typeof contents === "string") {
    el.innerHTML = contents;
  } else if (Array.isArray(contents)) {
    contents.forEach((child) => {
      el.appendChild(child);
    });
  }
  return el;
}

// Taken from:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

displayUsers(ALL_USERS);

document.getElementById("search-box").addEventListener("keyup", (e) => {
  displayUsers(filterUsersByName(ALL_USERS, e.target.value));
});
