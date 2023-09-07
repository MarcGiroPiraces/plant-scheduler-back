export const getLastInsertedIdQuery: string = `
  SELECT LAST_INSERT_ID() as id
  `;
