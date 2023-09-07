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

export const getUserByIdQuery: string = `
  SELECT *
  FROM users
  WHERE id = ?
  `;

export const getUserPasswordByEmailQuery: string = `
  SELECT
    id,
    password
  FROM users
  WHERE email = ?
  `;

export const updateUserQuery: string = `
  UPDATE users
  SET name = ?, email = ?, password = ?, updatedAt = NOW()
  WHERE id = ?
  `;

export const deleteUserQuery: string = `
  DELETE FROM users
  WHERE id = ?
  `;
