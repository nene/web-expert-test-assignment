function renderUsers(users) {
  const userElements = users.map((user) => {
    return html("p", {}, user.name);
  });

  return html("div", {}, userElements);
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

document.getElementById("users").appendChild(renderUsers(data));
