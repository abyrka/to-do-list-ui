import apiClient from "./api-client";

export function getUsers() {
  return apiClient.get("/user/list");
}

export function getUserTodoItems(userId) {
  return apiClient.get(`user/${userId}/items`);
}

export function createTodoItems(userId, text) {
  return apiClient.post("to-do-list/create", {
    userId,
    text,
  });
}

export function updateTodoItems(id, text) {
  return apiClient.put("to-do-list/update", {
    id,
    text,
  });
}

export function deleteTodoItem(id) {
  console.log(id);
  return apiClient.delete("to-do-list/delete", {
    data: { id },
  });
}

export function completeTodoItems(id, complete) {
  return apiClient.put("to-do-list/complete", {
    id,
    complete,
  });
}
