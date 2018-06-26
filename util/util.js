import $ from 'jquery';

const USERNAME_COOKIE = 'kb-public';

// Computes either the first or second half of the array
export const half = (arr, first=true) => {
  let i = 0;
  let end = Math.ceil(arr.length / 2);
  if (!first) {
    i = end;
    end = arr.length;
  }

  const result = [];
  for (; i < end; i++) {
    result.push(arr[i]);
  }

  return result;
};

export const singular = (text) => {
  if (text.length === 0) {
    return '';
  } else if (text.charAt(text.length - 1) === 's') {
    return text.substring(0, text.length - 1);
  }

  return text;
}

export const getCookie = (name) => {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) {
    return match[2];
  }

  return '';
};

export const getUsername = () => {
  return getCookie(USERNAME_COOKIE);
}

export const getData = (url, onSuccess, onFailure, withCredentials=true) => {
  $.ajax({
    type: 'GET',
    url: url,
    dataType: "text",
    xhrFields: {
      withCredentials: withCredentials
    },
    success: function(json) {
      if (onSuccess) {
        onSuccess(json);
      }
    },
    error: function (xhr) {
      if (onFailure) {
        onFailure(xhr);
      }
    }
  });
};

export const postData = (url, data, onSuccess, onFailure, withCredentials=true) => {
  $.ajax({
    type: 'POST',
    url: url,
    data: JSON.stringify(data),
    dataType: "text",
    xhrFields: {
      withCredentials: withCredentials
    },
    success: function(json) {
      if (onSuccess) {
        onSuccess(json);
      }
    },
    error: function (xhr) {
      if (onFailure) {
        onFailure(xhr.responseText);
      }
    }
  });
};
