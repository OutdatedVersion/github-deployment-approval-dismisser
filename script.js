// ==UserScript==
// @name         dismiss deployment "approval requested" notifications
// @namespace    http://tampermonkey.net/
// @version      2025-04-09
// @description  automatically dismiss "approval requested" notifications to reduce noise
// @author       hi@bwatkins.dev
// @match        https://github.com/notifications
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

const isDeploymentApprovalNotification = (elem) => {
  const rocket = elem.querySelector('.octicon-rocket');
  if (!rocket) {
    return false;
  }
  const spans = elem.querySelectorAll('span');
  for (const span of spans) {
    const text = span.innerText?.trim();
    if (text === 'approval requested') {
      return true;
    }
  }
  return false;
};

const getNotificationCheckbox = (elem, notificationId) => {
  return elem.querySelector(`input[type='checkbox'][value='${notificationId}']`);
};

(async function() {
  'use strict';
  await new Promise(resolve => setTimeout(resolve, 50));

  for (const elem of document.querySelectorAll('.notifications-list-item')) {
    if (!isDeploymentApprovalNotification(elem)) {
      continue;
    }

    const notificationId = elem.getAttribute('data-notification-id');
    if (!notificationId) {
      continue;
    }

    const checkbox = getNotificationCheckbox(elem, notificationId);
    if (!checkbox) {
      continue;
    }
    checkbox.click();
  }

  const btn = document.querySelector("form[action='/notifications/beta/archive'] button");
  if (!btn) {
    return;
  }
  btn.click();
})();
