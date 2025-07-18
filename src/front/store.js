// store.js

export const initialStore = () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  return {
    message: null,
    todos: [
      { id: 1, title: "Make the bed", background: null },
      { id: 2, title: "Do my homework", background: null },
    ],
    token: token || null,
    isLoggedIn: !!token,
    userEmail: email || null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
      return {
        ...store,
        token: action.payload.token,
        isLoggedIn: true,
        userEmail: action.payload.email,
      };

    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      return {
        ...store,
        token: null,
        isLoggedIn: false,
        userEmail: null,
      };

    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "add_task":
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map(todo =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };

    default:
      throw new Error("Unknown action.");
  }
}
