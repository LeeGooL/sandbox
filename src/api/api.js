import queryString from "query-string";

export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = "36db8ce06f265ad84e634303761011ce";

export const API_KEY_4 =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNmRiOGNlMDZmMjY1YWQ4NGU2MzQzMDM3NjEwMTFjZSIsInN1YiI6IjVmZmVlMjU1NTk0Yzk0MDAzZThmNjJjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8eKsDrg6gfOua231Rfx1zBWY2urBSSw4WkdlDt1zwyA";

export const fetchApi = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((response) => {
        response.json().then((error) => {
          reject(error);
        });
      });
  });
};

export default class CallApi {
  static get(url, options = {}) {
    const { params = {} } = options;

    const queryStringParams = {
      api_key: API_KEY_3,
      ...params,
    };

    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
  }

  static post(url, options = {}) {
    const { params = {}, body = {} } = options;

    const queryStringParams = {
      api_key: API_KEY_3,
      ...params,
    };

    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
  }
}
