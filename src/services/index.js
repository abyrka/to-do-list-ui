import axios from "axios";

import apiClient from "./api-client";

export function getUsers() {
  return apiClient.get("/user/list");
}

export function getUserTodoItems(userId) {
  return apiClient.get(`user/${userId}/items`);
}

export function getTodoItemAttachments(itemId) {
  return apiClient.get(`/to-do-item/${itemId}/attachments`);
}

export function createTodoItems(userId, text) {
  return apiClient.post("to-do-item/create", {
    userId,
    text,
  });
}

export function updateTodoItems(id, text) {
  return apiClient.put("to-do-item/update", {
    id,
    text,
  });
}

export function deleteTodoItem(id) {
  return apiClient.delete("to-do-item/delete", {
    data: { id },
  });
}

export function completeTodoItems(id, complete) {
  return apiClient.put("to-do-item/complete", {
    id,
    complete,
  });
}

export function deleteAttachment(id) {
  console.log(id);
  return apiClient.delete("attachment/delete", {
    data: { id },
  });
}

export function uploadAttachment(itemId, file) {
  const formData = new FormData();
  formData.append("itemId", itemId);
  formData.append("file", file);

  return axios
    .post("http://localhost:8000/attachment/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(function () {
      console.log("SUCCESS!!");
      return true;
    })
    .catch(function () {
      console.log("FAILURE!!");
      return false;
    });
}

export function downloadAttachment(id) {
  axios
    .get(`http://localhost:8000/attachment/${id}`, {
      headers: {
        "Content-Type": "application/octet-stream",
      },
    })
    .then(function (response) {
      console.log("SUCCESS!!");
      const blob = new Blob([response.data], {
          type: "application/octet-stream",
        }),
        url = window.URL.createObjectURL(blob);

      window.open(url);
    })
    .catch(function () {
      console.log("FAILURE!!");
    });
}
