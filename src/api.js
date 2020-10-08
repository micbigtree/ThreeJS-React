export const getShapes = (
  url = "https://api.jsonbin.io/b/5f59ebde302a837e95638e0e/latest"
) => {
 return fetch(url, {
    method: "GET",
    headers: {
      "secret-key":
        "$2b$10$ia1eqHlS0SqHe9ynAROzfuR814NIz0UEz.deChs/3ebwLgBCEtzhO",
      "Content-Type": "application/json",
    }
  }).then((response) => response.json());
};

export const getPreviewCameras = (
  url = "https://api.jsonbin.io/b/5f7ec9be65b18913fc5c91b4/latest"
) => {
  return fetch(url, {
    method: "GET",
    headers: {
      "secret-key":
        "$2b$10$ia1eqHlS0SqHe9ynAROzfuR814NIz0UEz.deChs/3ebwLgBCEtzhO",
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};