export const getAllUsersQuery: string = `
  SELECT
    id,
    name,
    email,
    createdAt,
    updatedAt
  FROM users
  WHERE 1=1
`;

export const registerUserQuery: string = `
  INSERT INTO users (name, email, password)
  VALUES (?, ?, ?)
  `;

export const getLastInsertUserIdQuery: string = `
  SELECT LAST_INSERT_ID() as id
  `;

export const getUserByIdQuery: string = `
  SELECT
    id,
    name,
    email,
    createdAt,
    updatedAt
  FROM users
  WHERE id = ?
  `;
