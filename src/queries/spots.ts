export const createSpotQuery = `
  INSERT INTO spots (name, createdby)
  VALUES (?, ?)`;

export const getLastInsertSpotIdQuery = `
  SELECT
    LAST_INSERT_ID() as id`;

export const getUserSpotsFromDbByIdQuery = `
  SELECT
    s.id,
    s.name,
    u.name username,
    s.createdAt,
    s.updatedAt,
    s.updatedBy
  FROM users u
  INNER JOIN spots s ON u.id = s.createdBy
  WHERE s.createdBy = ?
  `;

export const deleteSpotFromDbByIdQuery = `
  DELETE FROM spots
  WHERE id = ?`;

export const getSpotByIdQuery = `
  SELECT * FROM spots
  WHERE id = ?`;

export const updateSpotByIdQuery = `
  UPDATE spots
  SET name = ?, updatedBy = ?, updatedAt = NOW()
  WHERE id = ?`;
