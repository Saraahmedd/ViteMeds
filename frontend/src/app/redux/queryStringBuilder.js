export function formulateQueryString(queryObj) {
  const excludedFields = ['fields',"limit",'sort',"page"]; 
  const filteredQueryObj = { ...queryObj };

  excludedFields.forEach((field) => {
    delete filteredQueryObj[field];
  });

  let queryStr = '';

  for (const key in filteredQueryObj) {
    if (filteredQueryObj.hasOwnProperty(key)) {
      const value = filteredQueryObj[key];
      if (typeof value === 'object') {
        for (const prop in value) {
          if (value.hasOwnProperty(prop)) {
            queryStr += `${key}[${prop}]=${value[prop]}&`;
          }
        }
      } else {
        queryStr += `${key}=${value}&`;
      }
    }
  }
  queryStr = queryStr.slice(0, -1);

  if (queryObj.limit) {
    queryStr += `&limit=${queryObj.limit}`;
  }
  if (queryObj.page) {
    queryStr += `&page=${queryObj.page}`;
  }
  if (queryObj.sort) {
    queryStr += `&sort=${queryObj.sort}`;
  }

  return queryStr;
}
