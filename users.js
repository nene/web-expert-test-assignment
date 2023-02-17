function displayUsers(users) {
  const container = document.getElementById("users");
  container.innerHTML = "";
  container.appendChild(usersToHtml(users));
}

function usersToHtml(users) {
  const userElements = users.map((user) => {
    return html("div", { className: "user" }, [
      html("img", {
        className: "user-map",
        alt: "Map image",
        width: 300,
        heigh: 200,
        src: createMapUrl(user.address.geo),
      }),
      html("div", { className: "user-field" }, [
        html("span", { className: "user-label" }, "Name: "),
        html("span", { className: "user-name" }, user.name),
      ]),
      html("div", { className: "user-field" }, [
        html("span", { className: "user-label" }, "Username: "),
        html("span", { className: "user-username" }, user.username),
      ]),
      html("div", { className: "user-field" }, [
        html("span", { className: "user-label" }, "E-mail: "),
        html("span", { className: "user-email" }, user.email),
      ]),
      html("div", { className: "user-field" }, [
        html("span", { className: "user-label" }, "Phone: "),
        html("span", { className: "user-phone" }, user.phone),
      ]),
      html("div", { className: "user-field" }, [
        html("span", { className: "user-label" }, "Website: "),
        html(
          "a",
          { className: "user-website", href: "http://" + user.website },
          user.website
        ),
      ]),
      html("div", { className: "user-field" }, [
        html("span", { className: "user-label" }, "Address: "),
        html(
          "span",
          { className: "user-address" },
          [
            user.address.street,
            user.address.suite,
            user.address.city,
            user.address.zipcode,
          ].join(", ")
        ),
      ]),
      html("div", { className: "user-field" }, [
        html("span", { className: "user-label" }, "Company: "),
        html(
          "span",
          { className: "user-company" },
          `${user.company.name} (${user.company.catchPhrase}, ${user.company.bs})`
        ),
      ]),
    ]);
  });

  return html("div", {}, userElements);
}

function createMapUrl({ lat, lng }) {
  const token =
    "pk.eyJ1IjoicmVua3UiLCJhIjoiY2xlOGdqYTQ0MDV1NzNvbW9rZ2R6Zmd6NiJ9.-ti9ZkUPQ2ckf8KEq8v0Rw";
  return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${lng},${lat},2,0/300x200?access_token=${token}`;
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
  Object.assign(el, attributes);
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
