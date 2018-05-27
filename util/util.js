import $ from 'jquery';
import Config from '../config.json';

export const getCookie = (name) => {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) {
    return match[2];
  }

  return '';
}

export const postData = (url, data, onSuccess, onFailure, withCredentials=true) => {
  // Post loging request to backend
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
