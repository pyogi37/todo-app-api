const development = {
  name: "development",
  db: "todo_list_db",
  jwt_secrert: "todolist",
};

const production = {
  name: "production",
  db: process.env.TODOLIST_DB,
  jwt_secrert: process.env.TODOLIST_JWT_SECRET,
};

module.exports =
  eval(process.env.TODOLIST_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.TODOLIST_ENVIRONMENT);
