import $ from 'jquery';
import Config from '../config.js';

export const getCookie = (name) => {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) {
    return match[2];
  }

  return '';
}

export const getData = (url, onSuccess, onFailure, withCredentials=true) => {
  $.ajax({
    type: 'GET',
    url: url,
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
}

export const postData = (url, data, onSuccess, onFailure, withCredentials=true) => {
  $.ajax({
    type: 'POST',
    url: url,
    data: JSON.stringify(data),
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
}
